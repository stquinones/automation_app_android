const https = require('https');

const webhook = process.env.SLACK_WEBHOOK_URL;

if (!webhook) {
  console.error('❌ No se encontró SLACK_WEBHOOK_URL');
  process.exit(1);
}

// Mensaje seguro
const message = {
  text: "🚀 Reporte generado correctamente desde GitHub Actions"
};

const data = JSON.stringify(message);

const url = new URL(webhook);

const options = {
  hostname: url.hostname,
  path: url.pathname + url.search,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
  console.log(`Slack response: ${res.statusCode}`);
});

req.on('error', error => {
  console.error('Error enviando a Slack:', error);
});

req.write(data);
req.end();