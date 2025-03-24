import { exec } from 'child_process';
import { promisify } from 'util';
import { AwsCommandOptions, AwsCommandError } from './types';

const execPromise = promisify(exec);

/**
 * Execute an AWS CLI command with optional subcommand and options.
 * 
 * @param command - The AWS service command (e.g., 's3', 'ec2', 'lambda')
 * @param subcommand - The subcommand to run (e.g., 'ls', 'describe-instances')
 * @param options - Key-value pairs of command options
 * @returns Promise with the command output
 */
export async function executeAwsCommand(
    command: string,
    subcommand?: string,
    options: AwsCommandOptions = {}
): Promise<string> {
    // Build the AWS CLI command
    let awsCommand = `aws ${command}`;

    if (subcommand) {
        awsCommand += ` ${subcommand}`;
    }

    // Add options to the command
    for (const [key, value] of Object.entries(options)) {
        // Handle options with values vs flags
        if (value === '') {
            awsCommand += ` --${key}`;
        } else {
            // Properly quote option values
            awsCommand += ` --${key} "${value}"`;
        }
    }

    try {
        // Execute the AWS CLI command
        console.log(`Executing: ${awsCommand}`);
        const { stdout, stderr } = await execPromise(awsCommand);

        if (stderr) {
            console.warn(`AWS CLI warning: ${stderr}`);
        }

        return stdout.trim();
    } catch (error) {
        const execError = error as { stderr?: string; message: string };
        console.error(`AWS CLI error: ${execError.message}`);

        // Include stderr in the error message if available
        if (execError.stderr) {
            throw new Error(`AWS CLI error: ${execError.stderr.trim()}`);
        }

        throw error;
    }
} 