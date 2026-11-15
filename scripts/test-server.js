const { spawn } = require('child_process');
const http = require('http');

console.log('Starting next server...');
const nextProcess = spawn('node', ['node_modules/next/dist/bin/next', 'start', '-p', '3000'], {
  stdio: 'inherit',
});

setTimeout(() => {
  console.log('Sending request to http://localhost:3000 ...');
  http.get('http://localhost:3000', (res) => {
    console.log('Response status:', res.statusCode);
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const titleMatch = data.match(/<title>(.*?)<\/title>/);
      console.log('Page title:', titleMatch ? titleMatch[1] : 'No title');
      console.log('Page content length:', data.length);
      console.log('Includes APIA brand:', data.includes('APIA'));
      console.log('Includes HUILE D\'ARGAN:', data.includes('ARGAN'));
      nextProcess.kill();
      process.exit(0);
    });
  }).on('error', (err) => {
    console.error('Request error:', err.message);
    nextProcess.kill();
    process.exit(1);
  });
}, 3000);

