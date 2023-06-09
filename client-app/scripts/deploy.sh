#!/usr/bin/env bash
shopt -s failglob
set -eu -o pipefail

# Get Path to root directory assuming this script sits 1 folder above root
PARENT_PATH="$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)/.."
cd "$PARENT_PATH"

if [ "${BITBUCKET_BRANCH:-${GITHUB_REF##*/}}" == "prod" ]; then
  npx serverless deploy --verbose --stage prod --region $AWS_REGION --param="profile=$AWS_PROFILE" --param="bucketId=26344"
else
  npx serverless deploy --verbose --stage dev --region $AWS_REGION --param="profile=$AWS_PROFILE" --param="bucketId=26344"
fi

echo "Done!"
