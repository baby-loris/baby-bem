#!/bin/sh

echo
echo Welcome to baby-bem installer!
echo

printf "Enter Project Name (baby-bem): "
read UserProjectName

ProjectName=${UserProjectName:-baby-bem}

git clone git://github.com/baby-loris/baby-bem.git $ProjectName
cd $ProjectName

# Replace placeholders with real data
find . -type f | xargs perl -pi -e "s/{{ProjectName}}/${ProjectName}/g"

# Remove auxiliary files
rm -rf .git *.sh bem.png

# Init new git repository
git init

# Generate an initial commit
git add -A
git commit -m "Initial commit

Hello, baby-bem!"

echo
echo Congrutilations! You\'re on your way to be a parent. Good luck!
echo
