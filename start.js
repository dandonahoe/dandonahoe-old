import { exec } from 'child_process';

// Function to run a command and log output
const runCommand = (command) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
    });
};

// Check if Bundler is installed
exec('bundle -v', async (error, stdout, stderr) => {
    if (error) {
        console.error("Bundler could not be found, please install Bundler first.");
        return;
    }

    // Import 'open' dynamically
    const { default: open } = await import('open');

    // Run Jekyll serve command
    const jekyllProcess = exec('jekyll serve --livereload');

    // Output Jekyll logs to console
    jekyllProcess.stdout.on('data', (data) => {
        console.log(data.toString());

        // Check for Jekyll server start message and open the browser
        if (data.includes('Server address: http://127.0.0.1:4000')) {
            open('http://localhost:4000');
            console.log('Opening http://localhost:4000 in your default browser...');
        }
    });

    jekyllProcess.stderr.on('data', (data) => {
        console.error(`Jekyll Error: ${data.toString()}`);
    });
});
