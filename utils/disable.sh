grep -vE "^#" $0/../gamelist.txt | xargs -I % sh -c "chmod -x '%'"
cp /etc/hosts.disable /etc/hosts
pkill java
pkill Chrome
pkill "Mini MotorWays"
pkill "Badlion Client"
pkill "Lunar Client"
