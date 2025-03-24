/**
 * Service details interface
 */
export interface ServiceDetails {
    description: string;
    commands: string[];
}

/**
 * AWS Command Options interface
 */
export interface AwsCommandOptions {
    [key: string]: string;
}

/**
 * AWS Command Result interface
 */
export interface AwsCommandResult {
    stdout: string;
    stderr?: string;
}

/**
 * AWS Command Error interface
 */
export interface AwsCommandError extends Error {
    stderr?: string;
    code?: number;
} 