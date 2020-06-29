export PATH=/Users/tommyh/dev/bin:/Users/tommyh/dev/depot/util/bin:$JAVA_HOME/bin:$ANT_HOME/bin:/usr/local/bin:$PATH

alias ll='ls -ltr'

export CLICOLOR='true'
export LSCOLORS="gxfxcxdxbxCgCdabagacad"
export EDITOR=vi

parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
export PS1="\u@\h \W\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "
