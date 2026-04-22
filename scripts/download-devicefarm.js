const { execSync, exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const https = require("https");

const PROJECT_ARN = "arn:aws:devicefarm:us-west-2:727454133357:project:5648f1c7-6a51-4cf5-9d08-6aa64bfcc944";

const DOWNLOAD_DIR = path.join(__dirname, "log");
const FILE_NAME = "test-spec-output.txt";
const FILE_PATH = path.join(DOWNLOAD_DIR, FILE_NAME);

// Crear carpeta si no existe
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// Ejecutar AWS CLI y parsear JSON
function runAws(cmd) {
  const result = execSync(cmd).toString();
  return JSON.parse(result);
}

// Descargar archivo
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, response => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log("📥 Archivo descargado en:", filePath);
        resolve();
      });
    }).on("error", err => reject(err));
  });
}

// 👉 Ejecutar auto push
function autoPush() {
  console.log("🚀 Ejecutando auto-push...");

  exec(
    "cmd /c C:\\automation_app_android\\scripts\\auto-push.bat",
    (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Error en auto-push:", error.message);
        return;
      }
      if (stderr) {
        console.error("⚠️ STDERR:", stderr);
      }
      console.log("✅ Push automático OK");
      console.log(stdout);
    }
  );
}

async function main() {
  console.log("🔎 Buscando runs...");

  const runs = runAws(`aws devicefarm list-runs --arn ${PROJECT_ARN}`).runs;

  const completed = runs.find(r => r.status === "COMPLETED");

  if (!completed) {
    console.log("❌ No hay runs completados.");
    return;
  }

  console.log("🎯 Run encontrado:", completed.name);

  const jobs = runAws(`aws devicefarm list-jobs --arn ${completed.arn}`).jobs;

  for (const job of jobs) {
    const artifacts = runAws(
      `aws devicefarm list-artifacts --arn ${job.arn} --type FILE`
    ).artifacts;

    const file = artifacts.find(a => a.name === "Test spec output");

    if (file) {
      console.log("⬇️ Descargando archivo...");

      await downloadFile(file.url, FILE_PATH);

      console.log("✅ Descarga completa");

      // 🔥 ACÁ se dispara el push
      autoPush();

      return;
    }
  }

  console.log("❌ No se encontró Test spec output");
}

main();