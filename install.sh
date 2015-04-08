#!/bin/sh

curl -s https://github.yandex-team.ru/hevil/baby-bem/raw/master/get-a-pet.sh > /tmp/baby-bem-install-$$.sh
sh /tmp/baby-bem-install-$$.sh < /dev/tty
rm /tmp/baby-bem-install-$$.sh
