ps -ax -o etime,pid,command|grep java |awk -v date="$(date +"%Y-%m-%d %r")" '{print $1,$2,$4,date}'|head -1 >> ~/.pstime.log
p=`ps -p $(cat $HOME/.mcpid) | wc -l`
if [ $p == 2 ]; then
  etime_file="$HOME/.mcetime_`date +%y%m%d`"
  if [ -f $etime_file ]; then
    echo "file existis"
    etime=$(( `cat $etime_file` + 1))
  else
    etime=0
  fi
  eval "echo $etime > $etime_file"
else
  echo "No MC found"
fi
