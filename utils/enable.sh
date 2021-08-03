chmod +x /Users/charlie/Library/Application\ Support/minecraft/runtime/jre-legacy/mac-os/jre-legacy/jre.bundle/Contents/Home/bin/java
chmod +x "/Users/charlie/Library/Application Support/Badlion Client/Data/jre1.8.0_202.jre/Contents/Home/bin/java"
chmod +x /Applications/Minecraft.app/Contents/MacOS/launcher 
chmod +x /Users/charlie/.lunarclient/jre/zulu8.52.0.23-ca-fx-jre8.0.282-macosx_x64/zulu-8.jre/Contents/Home/bin/java
chmod +x "/Applications/Mini Motorways.app/Contents/MacOS/Mini Motorways"
cp /etc/hosts.enable /etc/hosts
(crontab -l ; echo "* * * * * disable.sh") 2>&1 | grep -v "no crontab" | grep -v disable.sh |  sort | uniq | crontab -
(crontab -l ; echo "$1 $2 * * * /usr/local/bin/disable.sh") 2>&1 | grep -v "no crontab" | sort | uniq | crontab -
