#!/bin/sh

curl -s https://raw.githubusercontent.com/baby-loris/baby-bem/master/get-a-pet.sh > /tmp/baby-bem-install-$$.sh
sh /tmp/baby-bem-install-$$.sh < /dev/tty
rm /tmp/baby-bem-install-$$.sh
