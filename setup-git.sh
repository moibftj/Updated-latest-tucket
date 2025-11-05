#!/bin/bash
# Git Configuration Setup Script for Tucker Trips
# Run this script to configure Git properly for this project

echo "Setting up Git configuration for Tucker Trips..."

# Set user details
git config --local user.name "Aqeel Jamil"
git config --local user.email "186092537+aqeelwebbing@users.noreply.github.com"

# Disable GPG signing to avoid Codespaces issues
git config --local commit.gpgsign false

# Set core settings
git config --local core.autocrlf input
git config --local core.filemode true

echo "Git configuration complete!"
echo "Current local configuration:"
git config --local --list | grep -E "(user\.|commit\.|core\.)"

echo ""
echo "If you encounter Git authentication issues:"
echo "1. Make sure you're using the correct GitHub email"
echo "2. Verify GPG signing is disabled: git config --local commit.gpgsign false"
echo "3. Check your GitHub token: gh auth status"