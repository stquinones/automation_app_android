const fs = require('fs');

// =========================
// Entrada / salida
// =========================
//const inputFile = process.argv[2];
//const outputFile = process.argv[3];
const inputFile = 'scripts/log/test-spec-output.txt';
const outputFile = 'scripts/report/reporte.html';

// =========================
// Leer archivo completo
// =========================
const raw = fs.readFileSync(inputFile, 'utf8');

// =========================
// Cortar TODO lo anterior al spec reporter
// =========================
const marker = '"spec" Reporter:';
const start = raw.indexOf(marker);

if (start === -1) {
  console.warn('⚠ No se encontró el inicio del spec reporter.');
  fs.writeFileSync(
    outputFile,
    `<html><body><h2>No se detectaron resultados.</h2></body></html>`
  );
  process.exit(0);
}

// Documento lógico limpio
const relevantSection = raw.substring(start);

// Cortar al final del resumen si existe
const specFilesRegex = /Spec Files:.*$/m;
const match = relevantSection.match(specFilesRegex);

const finalSection = match
  ? relevantSection.substring(0, match.index + match[0].length)
  : relevantSection;
//const end = relevantSection.indexOf('Spec Files:');

//const finalSection =
//  end !== -1
//    ? relevantSection.substring(0, end + 200)
//    : relevantSection;

// =========================
// Sanitizar HTML
// =========================
function sanitize(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// =========================
// Limpiar prefijos de Device Farm
// =========================
const cleanedSection = finalSection.replace(
  /\[app-device-farm-[^\]]+\]\s*/g,
  ''
);

// =========================
// Fecha
// =========================
const fechaHoy = new Date().toLocaleDateString('es-AR');

// =========================
// Extraer métricas
// =========================
const passingMatch = finalSection.match(/(\d+)\s+passing\s+\(([\dms .]+)\)/);
const totalPassed = passingMatch ? parseInt(passingMatch[1]) : 0;

const failedMatch = finalSection.match(/(\d+)\s+failing/);
const totalFailed = failedMatch ? parseInt(failedMatch[1]) : 0;

const specFilesMatch = finalSection.match(/Spec Files:\s+.*?(\d+)\s+total/);
const specFilesCount = specFilesMatch ? parseInt(specFilesMatch[1]) : 'N/A';

const durationMatch = finalSection.match(/in\s+([\d:]+)/);
const totalTime = durationMatch ? durationMatch[1] : 'N/A';

// =========================
// Formateo del log
// =========================
let formattedSection = cleanedSection.replace(
  /"spec"[\s\n\r]*Reporter:[\s\n\r]*/,
  `__REPORTE_PLACEHOLDER__`
);

formattedSection = sanitize(formattedSection)
  .replace(
    /__REPORTE_PLACEHOLDER__/,
    `<strong>Reporte – ${fechaHoy}</strong><br/>`
  )
  .replace(/✓/g, '<span style="color:#28a745; font-weight:bold;">✓</span>')
  .replace(
    /✖|x /g,
    '<span style="color:#dc3545; font-weight:bold;">✖</span>'
  )
  .replace(
    /(\d+\s+failing)/,
    `$1<br/><strong style="color:#121111;">📌 Detalle de los casos FAILED</strong>`
  )
  .replace(/\n/g, '<br/>');

// =========================
// Gráfico de torta
// =========================
const graficoHTML = `
<img src="https://quickchart.io/chart?c=${encodeURIComponent(
  JSON.stringify({
    type: 'pie',
    data: {
      labels: ['PASSED', 'FAILED'],
      datasets: [
        {
          data: [totalPassed, totalFailed],
          backgroundColor: ['#28a745', '#dc3545'],
          borderColor: ['#ffffff', '#ffffff'],
          borderWidth: 2
        }
      ]
    }
  })
)}&width=300&height=300&format=png"
alt="Resultados de Test"
style="
  max-width: 300px;
  display: block;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(0,0,0,0.15);
"
/>
`;

// =========================
// HTML final
// =========================
const htmlReport = `
<html>
<head>
  <meta charset="utf-8"/>
</head>
<body style="font-family: Arial; padding: 20px;">
  <h1>📄 Reporte de Automatización — AWS Device Farm</h1>

  <div style="background:#e8ffe6; padding:15px; border-left:5px solid #28a745;">
    ✔ ${totalPassed} tests PASSED<br/>
    ❌ ${totalFailed} tests FAILED<br/>
    📁 ${specFilesCount} archivo/s — tiempo total ${totalTime}
  </div>

  <h2>📊 Resumen visual</h2>
  ${graficoHTML}

  <h2>📌 Detalle de ejecución</h2>
  <div style="background:white; padding:20px; border:1px solid #ccc;">
    ${formattedSection}
  </div>

  <p style="font-size:12px; color:#777;">
    Reporte generado automáticamente por GitHub Actions.
  </p>
</body>
</html>
`;

// =========================
// Escribir archivo
// =========================
const path = require('path');

const outputDir = path.dirname(outputFile);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
fs.writeFileSync(outputFile, htmlReport);

// =========================
// Exportar valores para Slack / CI
// =========================
const slackText =
  totalFailed > 0
    ? `🚨 Resultados: ${totalPassed} PASSED - ${totalFailed} FAILED`
    : `🎉 Todos los tests PASSED (${totalPassed})`;

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `SLACK_TEXT=${slackText}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `DURATION=${totalTime}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `FILECOUNT=${specFilesCount}\n`);
}

console.log('📄 Reporte generado correctamente');
