#!/usr/bin/env bash
# Sets REGION, PROFILE, AWS_REGION, PROFILE
export PROFILE="aloha-manga"
export AWS_PROFILE="aloha-manga"
export REGION="ap-southeast-2"
export AWS_REGION="ap-southeast-2"

echo "Testing AWS [$PROFILE] Keys..."
echo $PROFILE
IAM_RESULT=$(aws sts get-caller-identity --query "Account" --output text --profile "$PROFILE")
if [ "$IAM_RESULT" ]; then
    echo "AWS Credentials work!"
else
    printf "\033[31mAWS Keys did not work!\033[39m\n"
    printf "Would you like to continue anyway (y/N)? "
    old_stty_cfg=$(stty -g)
    stty raw -echo
    answer=$(head -c 1)
    stty "$old_stty_cfg"
    if echo "$answer" | grep -iq "^y"; then
        echo Yes
        echo "Continuing (be aware things may not work as expected)"
    else
        echo No
        exit
    fi
fi

# Set the user that will be used for private authorised endpoints - the user that logs in on the client will be ignored.
# AUTHORIZER is a value detected by serverless offline https://github.com/dherault/serverless-offline#remote-authorizers
# This user is and can be linked in local seed data so that there is user specific relationships.
# Restart the API when this is changed.
export AUTHORIZER='{"claims":{"email":"example@devika.com", "sub":"ed805890-d66b-4126-a5d9-0b22e70fce80"}}'  # Admin user
# export AUTHORIZER='{"claims":{"email":"example@devika.com", "sub":"ed805890-d66b-4126-a5d9-0b22e70fce79"}}'   # Non-admin user

# Required to install/use local DynamoDB
# npm run install:dynamodb

npx serverless dynamodb install --stage dev --region $REGION --param=\"profile=$PROFILE\"
# Provides stack trace using source map so the correct file and line numbers are shown
export NODE_OPTIONS=--enable-source-maps

# Start the API with serverless
# npx serverless  plugin install --name serverless-dynamodb-local
# npx serverless  plugin  install --name serverless-offline
# npx serverless  plugin  install--name serverless-esbuild 
# npx serverless  plugin  install --name serverless-offline-watcher

npx serverless offline start --stage dev --region "$REGION" --param="profile=${PROFILE}" --reloadHandler

cd "$CURRENT_DIR" || exit
