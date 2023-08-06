import json
import logging
import os
import boto3
from typing import Callable, Generic, List, Optional, TypeVar
from botocore.exceptions import ClientError
from dataclasses import is_dataclass

IS_OFFLINE = bool(os.environ.get('IS_OFFLINE'))

dynamoDb = None
localDynamoDb = None
remoteDynamoDb = None

T = TypeVar('T')

class Result(Generic[T]):
    def __init__(self, data: List[T]):
        self.data = data
    def to_json(self) -> str:
        return json.dumps(self, default=lambda o: o.__dict__, indent=4)
        
class ResultEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Result):
            return obj.__dict__
        return super().default(obj)

        
def get_dynamodb_connection():
    global remoteDynamoDb
    if remoteDynamoDb is None:
        remoteDynamoDb =  boto3.client('dynamodb', endpoint_url='http://localhost:8000', region_name='localhost')
    return remoteDynamoDb

def get_all(params: dict, map_function: Callable) -> List:
    try:
        dynamoDb = get_dynamodb_connection()
        table = params['TableName']

        scan_input_args = {
            'TableName': table,
        }
        all_records = []
        last_key = None

        while True:
            result = dynamoDb.scan(**scan_input_args)
            result_records = result['Items']

            for record in result_records:
                mapped_record = map_function(record)
                all_records.append(mapped_record)

            last_key = result.get('LastEvaluatedKey')
            if last_key is None:
                break
            scan_input_args['ExclusiveStartKey'] = last_key

        return all_records
    except ClientError as error:
        message = get_error_message(error)
        print(f"Failed to get all records: {message}")
        raise Exception(message)

def get_by_id(params: dict, map_function: Callable):
    try:
        dynamoDb = boto3.resource('dynamodb')
        table = dynamoDb.Table(params['TableName'])
        primary_key_name = params['PrimaryKeyName']
        item_id = params['ItemId']

        result = table.get_item(Key={primary_key_name: item_id})
        item = result.get('Item')

        if item:
            mapped_item = map_function(item)
            return mapped_item
        else:
            return None

    except ClientError as error:
        message = get_error_message(error)
        print(f"Failed to get item by ID: {message}")
        raise Exception(message)

def insert(params: dict, item: any):
    try:
        dynamoDb = get_dynamodb_connection()
        table = params['TableName']
        print(f"dynamo insert {table}")

        dynamo_item = to_dynamodb_item(item)
        print(f"dynamo item: {dynamo_item}")
        response = dynamoDb.put_item(TableName=table,Item=dynamo_item)
        print(f"{response}")
    except ClientError as error:
        message = get_error_message(error)
        print(f"Failed to insert record: {message}")
        raise Exception(message)

def update(params: dict, key: dict, update_expression: str, expression_attribute_values: dict):
    try:
        dynamoDb = get_dynamodb_connection()
        table = params['TableName']

        update_args = {
            'TableName': table,
            'Key': key,
            'UpdateExpression': update_expression,
            'ExpressionAttributeValues': expression_attribute_values,
        }

        dynamoDb.update_item(**update_args)
    except ClientError as error:
        message = get_error_message(error)
        print(f"Failed to update record: {message}")
        raise Exception(message)

    
def get_error_message(error):
    if isinstance(error, Exception):
        return str(error)
    else:
        return str(error)


def to_dynamodb_item(obj):
    if is_dataclass(obj):
        item_data = {}
        for field in obj.__dataclass_fields__:
            value = getattr(obj, field)
            if value is None:
                continue  # Skip attributes with None values
            if isinstance(value, int) or isinstance(value, float):
                item_data[field] = {'N': str(value)}
            elif isinstance(value, str):
                item_data[field] = {'S': value}
            elif isinstance(value, list):
                if all(isinstance(item, str) for item in value):
                    item_data[field] = {'L': [{'S': item} for item in value]}
                elif all(is_dataclass(item) for item in value):
                    item_data[field] = {'L': [to_dynamodb_item(item) for item in value]}
                else:
                    raise ValueError(f"Unsupported list type for field '{field}'")
            elif is_dataclass(value):
                item_data[field] = {'M': to_dynamodb_item(value)}
            else:
                raise ValueError(f"Unsupported data type for field '{field}'")
        return item_data
    else:
        raise ValueError("Input should be a data class instance.")
