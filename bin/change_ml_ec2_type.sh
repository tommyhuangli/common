aws --profile xcamp --region us-west-2 ec2 modify-instance-attribute --instance-id `cat ~/.ml_ec2_id` --instance-type "{\"Value\": \"$1\"}"
