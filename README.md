# AWS CLI MCP Server

An MCP (Model Context Protocol) server that lets you generate and execute AWS CLI commands directly from Claude.

## Features

- Execute AWS CLI commands through the MCP protocol
- Get detailed information about AWS services
- List available AWS services
- Full access to AWS CLI capabilities

## Tools

- **execute-aws-command**: Execute AWS CLI commands
  - Parameters:
    - `command`: AWS service (e.g., s3, ec2, lambda)
    - `subcommand` (optional): Command to execute (e.g., ls, describe-instances)
    - `options` (optional): Command options as key-value pairs

- **get-service-details**: Get details about a specific AWS service
  - Parameters:
    - `service`: AWS service name (e.g., s3, ec2, lambda)

## Resources

- **aws-services://list**: List available AWS services

## Setup and Installation

### Prerequisites

- Node.js (v20 or later recommended)
- npm or yarn
- AWS CLI installed and configured with credentials
- TypeScript

### Local Installation

1. Clone this repository:
```bash
git clone https://github.com/IcyKallen/aws-cli-mcp-server
cd aws-cli-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Ensure AWS CLI is configured:
```bash
aws configure
```

5. Start the MCP server:
```bash
npm start
```

### Integration with Claude Desktop

Add this to your `claude_desktop_config.json`:

After building the project, you can use:

```json
{
  "mcpServers": {
    "aws-cli": {
      "command": "node",
      "args": [
        "/path/to/aws-cli-mcp-server/dist/index.js"
      ]
    }
  }
}
```

## Example Usage in Claude

### List S3 Buckets
```
I need to list my S3 buckets.
```

### Create an S3 Bucket
```
Create a new S3 bucket named "my-test-bucket" in the us-west-2 region.
```

### Get EC2 Service Details
```
What EC2 commands are available?
```

## Security Notes

- This server executes AWS CLI commands with the same permissions as your configured AWS credentials
- Be careful about who can access this server
- Consider implementing additional authentication for production use

## License

MIT License
