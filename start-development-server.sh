#!/bin/sh

# Nodejs can be different depend on your environment
# Specify all possible nodejs pathes in NODE_ENGINES variable.
NODE_ENGINES="/opt/nodejs/0.10/bin/node node"
NODE=`echo $(which $NODE_ENGINES) | cut -d ' ' -f1`

# If socket is missed, generate development socket based on current directory and username
if [ -z "$SOCKET" ]; then
    DIR=`basename "$PWD"`
    SOCKET=/tmp/$DIR-$USER.socket
fi

# If SOCKET contains the path to a unix domain socket file,
# make sure the file doesn't exist when the application starts.
# Otherwise the application will break with EADDRTAKEN
case $SOCKET in
    *[!0-9]*) rm -f $SOCKET ;;
esac

# Fire up a supervisor process, that will reload the server everytime a file changes.
# The node process is launched with umask 0000, so that the socket file created by the
# server will be writable by other users (i.e. the nginx user).
SUPERVISOR=./node_modules/.bin/supervisor
umask 0000 && \
    NODE_ENV=development \
    CLUSTER_WORKERS=1 \
    CLUSTER_TIMEOUT=1 \
    SOCKET=$SOCKET \
    DEBUG={{ProjectName}}:* \
    $SUPERVISOR -n exit --exec $NODE --watch configs,server -- server/boot.js
