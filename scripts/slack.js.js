/*const https = require('https');

const webhook = process.env.SLACK_WEBHOOK_URL;

console.log("WEBHOOK:", webhook ? "OK" : "NO");
console.log("SLACK_TEXT:", process.env.SLACK_TEXT);

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
req.end();*/
const https = require('https');

const webhook = process.env.SLACK_WEBHOOK_URL;
const messageText = process.env.SLACK_TEXT || "🚀 Reporte generado";

console.log("WEBHOOK:", webhook ? "OK" : "NO");
console.log("SLACK_TEXT:", messageText);

const data = JSON.stringify({
  text: messageText
});

// 🔥 clave: usar la URL completa directo
const req = https.request(webhook, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  console.log(`Slack response: ${res.statusCode}`);
});

req.on('error', error => {
  console.error('Error enviando a Slack:', error);
});

req.write(data);
req.end();