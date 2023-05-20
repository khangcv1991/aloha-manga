import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayEventRequestContextWithAuthorizer,
} from 'aws-lambda';
import { Request } from 'express';

export interface RequestContext extends Request {
  context: APIGatewayEventRequestContextWithAuthorizer<Authorizer>;
  currentUserSub: string;
  projectId?: string;
}

export type Authorizer = APIGatewayEventDefaultAuthorizerContext & {
  claims: { email?: string; sub?: string };
};
