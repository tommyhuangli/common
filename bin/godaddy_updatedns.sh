#!/bin/bash
 
# This script is used to check and update your GoDaddy DNS server to the IP address of your current internet connection.
# Special thanks to mfox for his ps script
# https://github.com/markafox/GoDaddy_Powershell_DDNS
#
# First go to GoDaddy developer site to create a developer account and get your key and secret
#
# https://developer.godaddy.com/getstarted
# Be aware that there are 2 types of key and secret - one for the test server and one for the production server
# Get a key and secret for the production server
#
#Enter vaules for all variables, Latest API call requries them.
 
domain="aegisai.us"                       # your domain
type="A"                                    # Record type A, CNAME, MX, etc.
name=$1                                  # name of record to update
ttl="600"                                  # Time to Live min value 600
port="1"                                    # Required port, Min value 1
weight="1"                                  # Required weight, Min value 1
 
headers="Authorization: sso-key $GODADDY_KEY:$GODADDY_SECRET"
 
#echo $headers
 
result=$(curl -s -X GET -H "$headers" \
 "https://api.godaddy.com/v1/domains/$domain/records/$type/$name")

echo $result

dnsIp=$(echo $result | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b")
 echo "dnsIp:" $dnsIp
 
currentIp=$2
if [ -z "$currentIp" ];
 then
  # Get public ip address there are several websites that can do this.
  ret=$(curl -s GET "http://ipinfo.io/json")
  #echo $ret
  currentIp=$(echo $ret | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b")
fi

echo "currentIp:" $currentIp
 
if [ $dnsIp != $currentIp ];
 then
        echo "IP's are not equal, updating record"
        curl -X PUT "https://api.godaddy.com/v1/domains/$domain/records/$type/$name" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "$headers" \
-d "[ { \"data\": \"$currentIp\", \"port\": $port, \"priority\": 0, \"protocol\": \"string\", \"service\": \"string\", \"ttl\": $ttl }]"
fi
 if [ $dnsIp = $currentIp ];
 then
      echo "IP's are equal, no update required"
fi

aws route53 change-resource-record-sets --hosted-zone-id /hostedzone/Z3QY84Y72XGVWN --change-batch '{"Changes":[{"Action":"UPSERT","ResourceRecordSet":{"Name":"a3.x-camp.academy","Type":"A","TTL":300,"ResourceRecords":[{"Value":"'$dnsIp'"}]}}]}'
