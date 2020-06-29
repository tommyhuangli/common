cmd='ps aux|grep spigot | head -1 | awk '"'"'{print $2}'"'"
pid=`eval $cmd`
kill $pid
