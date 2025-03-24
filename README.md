# AWS CLI MCP Server

An MCP (Model Context Protocol) server that can generate and execute AWS CLI commands to interact with AWS cloud resources.

## Prerequisites

- Node.js (v20 or later recommended)
- npm or yarn
- AWS CLI installed and configured with your credentials
- TypeScript

## Installation

1. Clone this repository or download the source code
2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Usage

1. Make sure AWS CLI is installed and configured with your AWS credentials:

```bash
aws configure
```

2. Start the MCP server:

```bash
npm start
```

Alternatively, you can run it in development mode:

```bash
npm run dev
```

## Features

The AWS CLI MCP Server exposes:

### Tools

- `execute-aws-command`: Execute AWS CLI commands
  - Parameters:
    - `command`: AWS service to use (e.g., s3, ec2, lambda)
    - `subcommand` (optional): Command to execute (e.g., ls, describe-instances)
    - `options` (optional): Command options as key-value pairs

- `get-service-details`: Get details about a specific AWS service
  - Parameters:
    - `service`: AWS service name (e.g., s3, ec2, lambda)

### Resources

- `aws-services://list`: List available AWS services

## Example Usage

The following examples demonstrate how to interact with the MCP server.

### List S3 Buckets

```javascript
// Sample code to call the MCP server to list S3 buckets
await mcpClient.callTool("execute-aws-command", {
  command: "s3",
  subcommand: "ls"
});
```

### Create an S3 Bucket

```javascript
// Sample code to call the MCP server to create an S3 bucket
await mcpClient.callTool("execute-aws-command", {
  command: "s3",
  subcommand: "mb",
  options: {
    "region": "us-west-2",
    "bucket": "s3://my-new-bucket"
  }
});
```

### Get EC2 Service Details

```javascript
// Sample code to call the MCP server to get EC2 service details
await mcpClient.callTool("get-service-details", {
  service: "ec2"
});
```

## Security Notes

- This server executes AWS CLI commands directly, so it has the same permissions as the AWS credentials configured on your system.
- Be careful about who can access this server, as they could potentially perform actions in your AWS account.
- Consider implementing additional authentication and authorization mechanisms for production use.
