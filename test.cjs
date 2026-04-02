const https = require('https');

https.get('https://bang-guseog.com/api/auth/check?email=aimaster1004@gmail.com', (res) => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Body:', data.substring(0, 200)));
}).on('error', err => console.error(err));
