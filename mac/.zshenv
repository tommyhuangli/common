export JAVA_HOME=~/Applications/jdk
export PATH=$JAVA_HOME:/bin:~/Applications/mvn/bin:$PATH
export CLICOLOR=1
export LSCOLORS=ExGxBxDxCxEgEdxbxgxcxd
alias ll='ls -ltrhG'

# Load version control information
autoload -Uz vcs_info
precmd() { vcs_info }

# Format the vcs_info_msg_0_ variable
zstyle ':vcs_info:git:*' formats 'on branch %b'
 
# Set up the prompt (with git branch name)
setopt PROMPT_SUBST
PROMPT='%n@${PWD/#$HOME/~} ${vcs_info_msg_0_} $ '
