#!/bin/bash

# Check if AWS CLI is installed
echo "Checking if AWS CLI is installed..."
if command -v aws &> /dev/null; then
    echo "AWS CLI is installed."
    
    # Check AWS CLI version
    aws_version=$(aws --version)
    echo "AWS CLI version: $aws_version"
    
    # Check if AWS credentials are configured
    echo "Checking AWS credentials..."
    aws sts get-caller-identity &> /dev/null
    if [ $? -eq 0 ]; then
        echo "AWS credentials are properly configured."
        identity=$(aws sts get-caller-identity)
        echo "You are authenticated as:"
        echo "$identity"
    else
        echo "AWS credentials are not configured or are invalid."
        echo "Please run 'aws configure' to set up your AWS credentials."
        exit 1
    fi
else
    echo "AWS CLI is not installed."
    echo "Please install AWS CLI first. You can find installation instructions at:"
    echo "https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

echo "Setup complete! You can now run the server with 'npm start' or 'npm run dev'" 