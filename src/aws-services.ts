import { ServiceDetails } from './types';

/**
 * Returns a list of commonly used AWS services that can be accessed via the AWS CLI.
 * This is not an exhaustive list, but includes the most widely used services.
 * 
 * @returns Array of AWS service names
 */
export function listServices(): string[] {
    return [
        "s3 - Amazon Simple Storage Service",
        "ec2 - Amazon Elastic Compute Cloud",
        "lambda - AWS Lambda",
        "dynamodb - Amazon DynamoDB",
        "cloudformation - AWS CloudFormation",
        "iam - AWS Identity and Access Management",
        "rds - Amazon Relational Database Service",
        "sns - Amazon Simple Notification Service",
        "sqs - Amazon Simple Queue Service",
        "cloudwatch - Amazon CloudWatch",
        "ecs - Amazon Elastic Container Service",
        "eks - Amazon Elastic Kubernetes Service",
        "apigateway - Amazon API Gateway",
        "route53 - Amazon Route 53",
        "kms - AWS Key Management Service",
        "secretsmanager - AWS Secrets Manager",
        "ssm - AWS Systems Manager",
        "codepipeline - AWS CodePipeline",
        "codebuild - AWS CodeBuild",
        "codecommit - AWS CodeCommit"
    ];
}

/**
 * Gets details about a specific AWS service and its common commands.
 * 
 * @param service The AWS service to get details for
 * @returns Service details and common commands
 */
export function getServiceDetails(service: string): ServiceDetails | null {
    const services: Record<string, ServiceDetails> = {
        's3': {
            description: 'Amazon Simple Storage Service (S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance.',
            commands: [
                'ls - List S3 buckets or objects within a bucket',
                'cp - Copy files to/from S3',
                'mb - Make a new bucket',
                'rb - Remove a bucket',
                'mv - Move files within S3 or between S3 and local',
                'rm - Remove files from S3',
                'sync - Sync directories to/from S3'
            ]
        },
        'ec2': {
            description: 'Amazon Elastic Compute Cloud (EC2) provides scalable computing capacity in the AWS Cloud.',
            commands: [
                'describe-instances - Get details about your instances',
                'start-instances - Start an instance',
                'stop-instances - Stop an instance',
                'run-instances - Launch a new instance',
                'terminate-instances - Terminate an instance',
                'describe-images - List available AMIs',
                'create-tags - Add or overwrite tags for resources'
            ]
        },
        'lambda': {
            description: 'AWS Lambda lets you run code without provisioning or managing servers.',
            commands: [
                'list-functions - List your Lambda functions',
                'create-function - Create a new function',
                'update-function-code - Update function code',
                'invoke - Invoke a function',
                'delete-function - Delete a function',
                'get-function - Get function configuration and details',
                'add-permission - Add permissions to the resource policy'
            ]
        }
    };

    return services[service] || null;
} 