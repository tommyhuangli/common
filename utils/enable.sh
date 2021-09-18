grep -vE "^#" $0/../gamelist.txt | xargs -I % sh -c "chmod +x '%'"
cp /etc/hosts.enable /etc/hosts
(crontab -l ; echo "* * * * * disable.sh") 2>&1 | grep -v "no crontab" | grep -v disable.sh |  sort | uniq | crontab -
(crontab -l ; echo "$1 $2 * * * /usr/local/bin/disable.sh") 2>&1 | grep -v "no crontab" | sort | uniq | crontab -
