ps -ax -o etime,pid,command|grep java |awk -v date="$(date +"%Y-%m-%d %r")" '{print $1,$2,$4,date}'|head -1 >> ~/.pstime.log
