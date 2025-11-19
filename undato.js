// undato.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDllEU7AG4Alvu8pPADt-TSlFMR5clNBj8",
  authDomain: "proyectogrupohuerta-9e970.firebaseapp.com",
  databaseURL: "https://proyectogrupohuerta-9e970-default-rtdb.firebaseio.com",
  projectId: "proyectogrupohuerta-9e970",
  storageBucket: "proyectogrupohuerta-9e970.firebasestorage.app",
  messagingSenderId: "104414144386",
  appId: "1:104414144386:web:da627197af20c48eb7119b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Ruta a tus datos (ajusta si tu estructura es distinta)
const datosRef = ref(db, "Sensores/nodemcu01");

// elementos del DOM
const cardTemp = document.getElementById("cardTemp");
const cardAire = document.getElementById("cardAire");
const cardSuelo = document.getElementById("cardSuelo");

const valorTemp = document.getElementById("valorTemp");
const valorAire = document.getElementById("valorAire");
const valorSuelo = document.getElementById("valorSuelo");

const imgTemp = document.getElementById("imgTemp");
const imgAire = document.getElementById("imgAire");
const imgSuelo = document.getElementById("imgSuelo");

// imágenes por defecto (puedes cambiarlas)
const imgFrio = "https://i.imgur.com/UwGJ0OZ.png";
const imgNormal = "https://i.imgur.com/9oQKcSj.png";
const imgCalor = "https://i.imgur.com/6gY3F2V.png";

function animateChange(cardElement, valueElement){
  if (!cardElement || !valueElement) return;
  cardElement.classList.add("flash");
  setTimeout(()=> cardElement.classList.remove("flash"), 600);

  valueElement.classList.add("value-change");
  setTimeout(()=> valueElement.classList.remove("value-change"), 1000);
}

// Escuchar cambios en Firebase
onValue(datosRef, (snapshot) => {
  const datos = snapshot.val();

  if (!datos) {
    // No data en la ruta
    console.warn("Snapshot vacío en Sensores/nodemcu01");
    valorTemp.textContent = "--°C";
    valorAire.textContent = "--%";
    valorSuelo.textContent = "--%";
    return;
  }

  const t = datos.Temperatura ?? null;
  const ha = datos.humedadAire ?? null;
  const hs = datos.humedadSuelo ?? null;

  // Actualizar texto (con control por si viene null)
  valorTemp.textContent = (t === null) ? "--°C" : `${t}°C`;
  valorAire.textContent = (ha === null) ? "--%" : `${ha}%`;
  valorSuelo.textContent = (hs === null) ? "--%" : `${hs}%`;

  // Imagen temperatura
  if (t !== null) {
    if (t < 15) imgTemp.src = imgFrio;
    else if (t <= 30) imgTemp.src = imgNormal;
    else imgTemp.src = imgCalor;
  }

  // Imagen aire / suelo (ejemplo)
  if (ha !== null) imgAire.src = "https://i.imgur.com/wZ2Z0As.png";
  if (hs !== null) imgSuelo.src = hs < 30 ? "https://i.imgur.com/7dmFj0R.png" : "https://i.imgur.com/BWy3IZ0.png";

  // Animaciones
  animateChange(cardTemp, valorTemp);
  animateChange(cardAire, valorAire);
  animateChange(cardSuelo, valorSuelo);

  // Notificación si temp > 30
  if (t !== null && t > 30) {
    // evita alert repetido: podemos usar Notification API (pide permiso) o simple alert
    if (!window._tempAlertShown) {
      alert("⚠ ALERTA: Temperatura mayor a 30°C");
      window._tempAlertShown = true;
      // desbloquear la alerta después de 60s para permitir nuevas alertas si sigue subiendo
      setTimeout(()=> window._tempAlertShown = false, 60000);
    }
  }

}, (error) => {
  console.error("Error leyendo Firebase:", error);
});

// 🔥 Alerta cuando temp > 30
if (temp > 30) {
    alerta.style.display = "block";     // mostrar cartel
    cardTemp.classList.add("alerta-temp");  // poner tarjeta roja
} else {
    alerta.style.display = "none";      // ocultar cartel
    cardTemp.classList.remove("alerta-temp");
}