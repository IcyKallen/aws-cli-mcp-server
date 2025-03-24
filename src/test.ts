import { executeAwsCommand } from './aws-cli';
import { listServices, getServiceDetails } from './aws-services';

async function testAwsCli() {
    console.log('Testing AWS CLI functionality...');

    try {
        // Test AWS CLI version
        console.log('\nChecking AWS CLI version:');
        const versionResult = await executeAwsCommand('--version');
        console.log(versionResult);

        // Test listing services
        console.log('\nListing available AWS services:');
        const services = listServices();
        console.log(services.slice(0, 5).join('\n')); // Show first 5 services
        console.log(`... and ${services.length - 5} more services`);

        // Test getting service details
        console.log('\nGetting details for S3 service:');
        const s3Details = getServiceDetails('s3');
        if (s3Details) {
            console.log(`Description: ${s3Details.description}`);
            console.log('Commands:');
            console.log(s3Details.commands.join('\n'));
        } else {
            console.log('No details found for S3 service');
        }

        // Test executing a simple AWS CLI command (list S3 buckets)
        console.log('\nListing S3 buckets:');
        try {
            const s3Result = await executeAwsCommand('s3', 'ls');
            console.log(s3Result || 'No S3 buckets found');
        } catch (error) {
            console.error('Error listing S3 buckets:', error);
        }

        console.log('\nTests completed successfully!');
    } catch (error) {
        console.error('Test failed:', error);
    }
}

testAwsCli(); 