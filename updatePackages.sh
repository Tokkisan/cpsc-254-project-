#!/bin/bash

#in the terminal crontab -e
#and enter @weekly and the file path to this bash


# Update package lists
sudo apt-get update

# Log the date
# This is for logging and what needed to be updated
date >> /home/<user and project file path>/updatePackagesLog.txt
#NOTE fix the directory for this
apt list --upgradable >> /home/<user and project file path>/updatePackagesLog.txt
echo "------------------------------------------------------------" >> /home/<user and project file path>/updatePackagesLog.txt


# Upgrade installed packages and removes packages that can no longer be downloaded
sudo apt-get upgrade
sudo apt-get autoclean
