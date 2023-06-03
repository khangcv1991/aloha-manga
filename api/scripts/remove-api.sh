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

npx serverless remove --verbose --stage dev --region $REGION --param=\"profile=$PROFILE\"