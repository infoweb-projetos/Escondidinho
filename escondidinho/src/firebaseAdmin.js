const admin = require("firebase-admin");
const path = require("path");

// Caminho absoluto para o arquivo de chave da conta de serviço
const serviceAccountPath = path.resolve(__dirname, "./firebase-service-account.json");

// Inicializa o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
  databaseURL: "https://escondidinho-6b4dd.firebaseio.com",
});

module.exports = admin;
