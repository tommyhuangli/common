#! /bin/bash

echo "Select environment(dev-new/test/prod), default is 'prod': "
read k8s_env
if [ -z "$k8s_env" ]
then
  k8s_env="prod"
fi

email_addr=$IHEALTH_EMAIL
echo "Input your ihealth e-mail address: "
if [ ! -z "$IHEALTH_EMAIL" ]
then
  echo "Default is "${IHEALTH_EMAIL}
fi
read email_addr
if [ -z "$email_addr" ]
then
  email_addr=$IHEALTH_EMAIL
fi

echo "Input your mfa code of AWS: "
read token_code
if [ -z "$token_code" ]
then
  echo "Mfa code is required. Exit!"
  exit 1
fi

aws_sts_result=$(aws sts get-session-token --serial-number  arn:aws:iam::358153424697:mfa/${email_addr} --token-code $token_code --output json)
access_key_id=$(echo $aws_sts_result | jq -r .Credentials.AccessKeyId)
aws_secret_access_key=$(echo $aws_sts_result | jq -r .Credentials.SecretAccessKey)
aws_session_token=$(echo $aws_sts_result | jq -r .Credentials.SessionToken)

echo "Get temporary token from AWS"

sed -i -e  '/^\[mfa\]/,/^\[/{/^\[mfa\]/!{/^\[/!d;};}' ~/.aws/credentials
sed -i -e  '/\[mfa\]/d' ~/.aws/credentials

echo "[mfa]" >> ~/.aws/credentials
echo "aws_access_key_id="${access_key_id} >> ~/.aws/credentials
echo "aws_secret_access_key="${aws_secret_access_key} >> ~/.aws/credentials
echo "aws_session_token="${aws_session_token} >> ~/.aws/credentials
echo "region=us-west-2" >> ~/.aws/credentials

aws eks update-kubeconfig --name ${k8s_env}-k8s-cluster --role-arn arn:aws:iam::358153424697:role/${k8s_env}-k8s-admin --profile mfa

