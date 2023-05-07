# Baseline CMS

A dynamic content management system that you have complete control to modify and add to, all built with serverless architecture. Built from Baseline Core with pre-configured Baseblocks.

## Use Cases

- Public
  - Landing Page
  - Optional About Page
  - Blogs List
  - Search Blog Posts
  - View Single Blog Post
  - Show tags on Blog Posts
- Admin
  - Sign in
  - Sign out
  - Blog Post Management
    - List all
    - Create
    - Edit
    - Publish
    - Add images (restrict on size and number of images)
    - Rich text support
  - Tag Management
    - Get all tags
    - Add tag
    - Remove tag
    - Update tag
    - Add tag to post
  - Page Management
    - Add page
    - Modify page content
    - Remove page
  - Asset Management
    - List
    - Upload asset
    - Remove asset
    - View asset
    - Search asset
- User Management
  - User list
  - Invite user
    - Cancel invite
    - Accept invite
  - Change own email
  - Public Profile

# Baseblocks

# Getting Started

## Local Requirements

- [Yarn version 1](https://classic.yarnpkg.com/en/docs/install) `npm install -g yarn@1`
- Node.js 14 [(we suggest using nvm)](https://github.com/nvm-sh/nvm#install--update-script)
- [AWS CLI](https://aws.amazon.com/cli)
- [jq](https://stedolan.github.io/jq/download/)

## Setup

Clone the project, then

1. `yarn`
2. `yarn rename your-project-name` which will update the profile used in all files, make is something unique
3. `yarn region us-east-1` this will set the region where all aws services will be deployed
4. `yarn aws:profile` which will configure AWS CLI with a new profile (if you have issues please update aws cli)
5. Deploy api - from `api/` run `yarn deploy:dev` - wait until it is complete before moving on
6. Deploy web - from `web/` run `yarn deploy:dev`
7. From `api/` create a site user by running `yarn add:user:dev`

## Run Locally

### API

1. `cd api`
2. `yarn start`

### Web

1. `yarn generate:env:local`
2. `cd web`
3. `yarn start`

### Running locally Limitations

- API & Web: No S3, you will need to rely on AWS dev S3
- API: No local Cognito Authorizer, the deployed dev cognito can be used or the payload in `api/package.json` start script
- Web: Cognito UI relies on an active AWS Cognito user pool, use deployed dev

## Local Deploying

### Initial Deploy
#### API

1. `cd api`
2. `yarn deploy:dev`

#### Web

1. `yarn generate:env:dev` not required if you have already run it and there are no new updates to env vars
2. `cd web`
3. `yarn deploy:dev`

### Deploy a Change

Swap `dev` to `prod` to deploy to production.

#### API

1. `cd api`
2. `yarn deploy:dev`

#### Web 

1. `yarn generate:env:dev` not required if you have already run it and there are no new updates to env vars
2. `cd web`
3. `yarn deploy:dev`
4. Allow some time for the Cloudfront cache invalidation to finish to see changes in browser

## Remove Stack

To destroy the deployed stack so it is no longer on AWS run `yarn remove:dev` in api or web.

## Adding a Domain

### Web

- Deploy first
- Set up a Route53 Hosted zone for the desired domain name
- Create a _single_ ACM certificate for `*.$DOMAIN_NAME` & `$DOMAIN_NAME`
- Add an "Alternate domain name" to the Distribution that matches your buckets name
- Edit Route53 and point the domain with an A record to the Distribution

### API

Create an API Gateway custom domain name and attach it to the API Gateway.

### Assets

- Deploy first
- Set up a Route53 Hosted zone for the desired domain name
- Create a _single_ ACM certificate for `*.$DOMAIN_NAME` & `$DOMAIN_NAME`
- Add an "Alternate domain name" to the Distribution that matches your buckets name
- Edit Route53 and point the domain with an A record to the Distribution



# Baseline

If you would like to learn more about what we do please visit [Devika Baseline](https://devikabaseline.com/)
