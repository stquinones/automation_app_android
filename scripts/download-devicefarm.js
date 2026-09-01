const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const https = require("https");

// ======================================================
// CONFIGURACIÓN
// ======================================================

// Proyecto de AWS Device Farm
const PROJECT_ARN =
  "arn:aws:devicefarm:us-west-2:727454133357:project:5648f1c7-6a51-4cf5-9d08-6aa64bfcc944";

// RUN ESPECÍFICA que queremos utilizar
const RUN_ARN =
  "arn:aws:devicefarm:us-west-2:727454133357:run:5648f1c7-6a51-4cf5-9d08-6aa64bfcc944/26322a3c-2d78-420b-aa0d-6033e4765a0b";

const DOWNLOAD_DIR = path.join(__dirname, "log");
const FILE_NAME = "test-spec-output.txt";
const FILE_PATH = path.join(DOWNLOAD_DIR, FILE_NAME);

const AUTO_PUSH_BAT =
  "C:\\automation_app_android\\scripts\\auto-push.bat";

// ======================================================
// CREAR CARPETA DE LOG
// ======================================================

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// ======================================================
// EJECUTAR AWS CLI
// ======================================================

function runAws(cmd) {
  const result = require("child_process")
    .execSync(cmd)
    .toString();

  return JSON.parse(result);
}

// ======================================================
// DESCARGAR ARCHIVO
// ======================================================

function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {

    const file = fs.createWriteStream(filePath);

    https
      .get(url, response => {

        if (response.statusCode !== 200) {

          file.close();

          fs.unlink(filePath, () => {});

          reject(
            new Error(
              `Error descargando archivo. HTTP ${response.statusCode}`
            )
          );

          return;
        }

        response.pipe(file);

        file.on("finish", () => {

          file.close();

          console.log("\n📥 Archivo descargado en:");
          console.log(filePath);

          resolve();
        });
      })

      .on("error", err => {

        file.close();

        fs.unlink(filePath, () => {});

        reject(err);
      });
  });
}

// ======================================================
// AUTO PUSH
// ======================================================

function autoPush() {

  return new Promise((resolve, reject) => {

    console.log("\n🚀 Ejecutando auto-push...");
    console.log("📄 BAT:", AUTO_PUSH_BAT);

    exec(
      `cmd /c "${AUTO_PUSH_BAT}"`,
      (error, stdout, stderr) => {

        if (stdout) {

          console.log("\n📤 Salida del auto-push:");
          console.log(stdout);
        }

        if (stderr) {

          console.log("\n⚠️ STDERR:");
          console.log(stderr);
        }

        if (error) {

          console.error(
            "\n❌ Error en auto-push:",
            error.message
          );

          reject(error);
          return;
        }

        console.log("\n✅ Push automático OK");

        resolve();
      }
    );
  });
}

// ======================================================
// MAIN
// ======================================================

async function main() {

  try {

    // --------------------------------------------------
    // MOSTRAR RUN QUE VAMOS A UTILIZAR
    // --------------------------------------------------

    console.log("\n========================================");
    console.log("🎯 DEVICE FARM");
    console.log("========================================");

    console.log("\n📁 Proyecto:");
    console.log(PROJECT_ARN);

    console.log("\n🎯 RUN ESPECÍFICA:");
    console.log(RUN_ARN);

    console.log("\n========================================");
    console.log("🔎 Buscando jobs de ESTA RUN...");
    console.log("========================================");

    // --------------------------------------------------
    // BUSCAR JOBS DE LA RUN ESPECÍFICA
    // --------------------------------------------------

    const jobs = runAws(
      `aws devicefarm list-jobs --arn "${RUN_ARN}"`
    ).jobs;

    if (!jobs || jobs.length === 0) {

      console.log(
        "\n❌ No se encontraron jobs en esta RUN."
      );

      return;
    }

    console.log(
      `\n📱 Jobs encontrados: ${jobs.length}`
    );

    // --------------------------------------------------
    // BUSCAR TEST SPEC OUTPUT
    // --------------------------------------------------

    for (const job of jobs) {

      console.log("\n----------------------------------------");
      console.log("📱 JOB");
      console.log("----------------------------------------");

      console.log("Nombre:", job.name);
      console.log("ARN   :", job.arn);

      // ------------------------------------------------
      // BUSCAR ARTIFACTS
      // ------------------------------------------------

      const artifacts = runAws(
        `aws devicefarm list-artifacts --arn "${job.arn}" --type FILE`
      ).artifacts;

      const file = artifacts.find(
        artifact =>
          artifact.name === "Test spec output"
      );

      // ------------------------------------------------
      // SI NO EXISTE EL ARCHIVO
      // ------------------------------------------------

      if (!file) {

        console.log(
          "⚠️ Este job no tiene Test spec output."
        );

        continue;
      }

      // ------------------------------------------------
      // ARCHIVO ENCONTRADO
      // ------------------------------------------------

      console.log(
        "\n========================================"
      );

      console.log(
        "🎯 TEST SPEC OUTPUT ENCONTRADO"
      );

      console.log(
        "========================================"
      );

      console.log("RUN ARN:");
      console.log(RUN_ARN);

      console.log("\nJOB ARN:");
      console.log(job.arn);

      console.log("\nARTIFACT:");
      console.log(file.name);

      console.log("\nURL:");
      console.log(file.url);

      // ------------------------------------------------
      // DESCARGAR
      // ------------------------------------------------

      console.log(
        "\n⬇️ Descargando Test spec output..."
      );

      await downloadFile(
        file.url,
        FILE_PATH
      );

      console.log(
        "\n✅ Descarga completa"
      );

      // ------------------------------------------------
      // AUTO PUSH
      // ------------------------------------------------

      await autoPush();

      console.log(
        "\n========================================"
      );

      console.log(
        "🏁 PROCESO COMPLETO"
      );

      console.log(
        "========================================"
      );

      return;
    }

    // --------------------------------------------------
    // NO ENCONTRADO
    // --------------------------------------------------

    console.log(
      "\n❌ No se encontró Test spec output en ningún job de esta RUN."
    );

  } catch (error) {

    console.error(
      "\n💥 ERROR GENERAL:"
    );

    console.error(error.message);

    process.exit(1);
  }
}

// ======================================================
// EJECUTAR
// ======================================================

main();