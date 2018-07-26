export P4PORT=perforce.ehealthinsurance.com:1666
export P4USER=lihuang
export P4CLIENT=mac_ifp_test
export P4PASSWD=EC5CADE7B9A91903B7F5EC28D3B53776
export P4EDITOR=/usr/bin/vi

export ANT_HOME="/Users/tommyh/dev/ant"
export ANT_OPTS="-Dfile.encoding=iso-8859-1 -Xmx3000m -XX:MaxPermSize=512m -Dj2eelibs=/Users/tommyh/dev/tomcat/lib"
export JAVA_HOME="/Users/tommyh/dev/jdk"
export JRE_HOME="/Users/tommyh/dev/jdk"
export AE_HOME="/Users/tommyh/git/ifp/appengine"
export BO_HOME="/Users/tommyh/git/ifp/castro_bo"
export CASTRO_HOME="/Users/tommyh/git/ifp/castro"
export CLIENT_HOME="/Users/tommyh/git/ifp/r2d2"
export CONTENT_HOME="/Users/tommyh/depot/content/app"
export LOG_HOME="/Users/tommyh/dev/logs/local_server"
export QE_HOME="/Users/tommyh/git/ifp/qe-platform-api"
export CIDB_MYSQL_URL="jdbc:mysql://sjdevmydb01/ifp_us_dev2"
export CIDB_PASSOWRD="ifp_us_dev1"
export CIDB_URL="jdbc:oracle:thin:@sjdevdb01.ehealthinsurance.com:1521:ID3"
export CIDB_USER="ifp_us_dev1"

export DEV_ENV=QA

export PATH=/Users/tommyh/dev/bin:/Users/tommyh/dev/depot/util/bin:$JAVA_HOME/bin:$ANT_HOME/bin:/usr/local/bin:$PATH

alias ll='ls -ltr'

export CLICOLOR='true'
export LSCOLORS="gxfxcxdxbxCgCdabagacad"
export EDITOR=vi

parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
export PS1="\u@\h \W\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "
