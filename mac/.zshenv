export JAVA_HOME=~/dev/jdk
export PATH=$JAVA_HOME:/bin:~/dev/mvn/bin:~/dev/node/bin:$PATH
export CLICOLOR=1
export LSCOLORS=ExGxBxDxCxEgEdxbxgxcxd
alias ll='ls -ltrhG'

# Load version control information
autoload -Uz vcs_info
precmd() { vcs_info }

# Format the vcs_info_msg_0_ variable
zstyle ':vcs_info:git:*' formats '[%b]'
 
# Set up the prompt (with git branch name)
setopt PROMPT_SUBST
PROMPT='%n@${PWD/#$HOME/~} ${vcs_info_msg_0_} $ '

parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
