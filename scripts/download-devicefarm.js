const { execSync, exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const https = require("https");

// ======================================================
// CONFIGURACIÓN
// ======================================================

const PROJECT_ARN =
  "arn:aws:devicefarm:us-west-2:727454133357:project:5648f1c7-6a51-4cf5-9d08-6aa64bfcc944";

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
  const result = execSync(cmd).toString();
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

          console.log("📥 Archivo descargado en:");
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
    // BUSCAR RUNS
    // --------------------------------------------------

    console.log("🔎 Buscando runs...");
    console.log("📁 Proyecto:");
    console.log(PROJECT_ARN);

    const runs = runAws(
      `aws devicefarm list-runs --arn "${PROJECT_ARN}"`
    ).runs;

    if (!runs || runs.length === 0) {
      console.log("❌ No se encontraron runs.");
      return;
    }

    // --------------------------------------------------
    // ORDENAR RUNS POR FECHA
    // MÁS NUEVO → MÁS VIEJO
    // --------------------------------------------------

    runs.sort(
      (a, b) =>
        new Date(b.created) - new Date(a.created)
    );

    // --------------------------------------------------
    // MOSTRAR ÚLTIMOS RUNS
    // --------------------------------------------------

    console.log("\n📋 Últimos runs encontrados:");

    runs.slice(0, 5).forEach((run, index) => {

      console.log(
        `\n${index + 1}. ${run.created}`
      );

      console.log(
        `   Estado: ${run.status}`
      );

      console.log(
        `   Nombre: ${run.name}`
      );

      console.log(
        `   ARN: ${run.arn}`
      );
    });

    // --------------------------------------------------
    // BUSCAR ÚLTIMO RUN COMPLETED
    // --------------------------------------------------

    const completed = runs.find(
      run => run.status === "COMPLETED"
    );

    if (!completed) {
      console.log(
        "\n❌ No hay runs COMPLETED."
      );

      return;
    }

    // --------------------------------------------------
    // MOSTRAR RUN SELECCIONADO
    // --------------------------------------------------

    console.log("\n");
    console.log("========================================");
    console.log("🎯 RUN SELECCIONADO");
    console.log("========================================");

    console.log("Nombre :", completed.name);
    console.log("Fecha  :", completed.created);
    console.log("Estado :", completed.status);
    console.log("ARN    :", completed.arn);

    console.log("========================================");
    console.log("\n");

    // --------------------------------------------------
    // BUSCAR JOBS
    // --------------------------------------------------

    console.log("🔎 Buscando jobs...");

    const jobs = runAws(
      `aws devicefarm list-jobs --arn "${completed.arn}"`
    ).jobs;

    if (!jobs || jobs.length === 0) {
      console.log("❌ No se encontraron jobs.");
      return;
    }

    console.log(
      `📱 Jobs encontrados: ${jobs.length}`
    );

    // --------------------------------------------------
    // BUSCAR TEST SPEC OUTPUT
    // --------------------------------------------------

    for (const job of jobs) {

      console.log("\n----------------------------------------");
      console.log("📱 Job:", job.name);
      console.log("🔗 ARN:", job.arn);
      console.log("----------------------------------------");

      const artifacts = runAws(
        `aws devicefarm list-artifacts --arn "${job.arn}" --type FILE`
      ).artifacts;

      const file = artifacts.find(
        artifact =>
          artifact.name === "Test spec output"
      );

      if (!file) {
        console.log(
          "⚠️ Este job no tiene Test spec output."
        );

        continue;
      }

      // ------------------------------------------------
      // DESCARGAR
      // ------------------------------------------------

      console.log(
        "\n⬇️ Encontrado: Test spec output"
      );

      console.log("⬇️ Descargando...");

      await downloadFile(
        file.url,
        FILE_PATH
      );

      console.log(
        "✅ Descarga completa"
      );

      // ------------------------------------------------
      // AUTO PUSH
      // ------------------------------------------------

      await autoPush();

      console.log(
        "\n🏁 Proceso completo."
      );

      return;
    }

    // --------------------------------------------------
    // NO ENCONTRADO
    // --------------------------------------------------

    console.log(
      "\n❌ No se encontró Test spec output en ningún job."
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