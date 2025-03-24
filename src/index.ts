import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { executeAwsCommand } from "./aws-cli";
import { listServices, getServiceDetails } from "./aws-services";

// Create an MCP server
const server = new McpServer({
    name: "AWS CLI MCP Server",
    version: "1.0.0"
});

// Add a tool to execute AWS CLI commands
server.tool(
    "execute-aws-command",
    {
        command: z.string().describe("AWS service to use (e.g., s3, ec2, lambda)"),
        subcommand: z.string().optional().describe("Command to execute (e.g., ls, describe-instances)"),
        options: z.record(z.string(), z.string()).optional().describe("Command options as key-value pairs")
    },
    async ({ command, subcommand, options }) => {
        try {
            const result = await executeAwsCommand(command, subcommand, options || {});
            return {
                content: [{ type: "text", text: result }]
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return {
                content: [{ type: "text", text: `Error: ${errorMessage}` }]
            };
        }
    }
);

// Add a tool to get details about a specific AWS service
server.tool(
    "get-service-details",
    {
        service: z.string().describe("AWS service name (e.g., s3, ec2, lambda)")
    },
    async ({ service }) => {
        const details = getServiceDetails(service);

        if (!details) {
            return {
                content: [{ type: "text", text: `No details available for service: ${service}` }]
            };
        }

        const responseText = `${details.description}\n\nCommon commands:\n${details.commands.join('\n')}`;

        return {
            content: [{ type: "text", text: responseText }]
        };
    }
);

// Add a resource to list available AWS services
server.resource(
    "aws-services",
    new ResourceTemplate("aws-services://list", { list: undefined }),
    async (uri) => {
        const services = listServices();
        return {
            contents: [{
                uri: uri.href,
                text: services.join("\n")
            }]
        };
    }
);

// Check if AWS CLI is installed
async function checkAwsCli(): Promise<boolean> {
    try {
        await executeAwsCommand('--version');
        return true;
    } catch (error) {
        return false;
    }
}

// Start receiving messages on stdin and sending messages on stdout
async function startServer() {
    console.log("Starting AWS CLI MCP Server...");

    // Check if AWS CLI is installed
    const awsCliInstalled = await checkAwsCli();
    if (!awsCliInstalled) {
        console.error("AWS CLI is not installed or not in the PATH. Please install it to use this server.");
        process.exit(1);
    }

    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("AWS CLI MCP Server is running.");
}

startServer().catch(error => {
    console.error("Failed to start server:", error);
    process.exit(1);
}); 