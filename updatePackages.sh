#!/bin/bash

#in the terminal crontab -e
#and enter 0 0 * * 0 and the file path to this bash


# Update package lists
sudo apt-get update

# Log the date
# This is for logging and what needed to be updated
date >> updatePackagesLog.txt
#NOTE fix the directory for this
apt list --upgradable >> /home/jt/updatePackagesLog.txt

# Upgrade installed packages and removes packages that can no longer be downloaded
sudo apt-get upgrade
sudo apt-get autoclean
