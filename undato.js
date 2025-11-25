import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

// ---------------- CONFIG FIREBASE ----------------
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

// ---------------- ELEMENTOS HTML ----------------
let temp = document.querySelector("#temp");
let humAire = document.querySelector("#humAire");
let humSuelo = document.querySelector("#humSuelo");

let cardTemp = document.querySelector("#cardTemp");
let cardHumAire = document.querySelector("#cardHumAire");
let cardHumSuelo = document.querySelector("#cardHumSuelo");

let imagenSuelo = document.querySelector("#Humsuelo");
let imagenSueloDos = document.querySelector("#Humsuelohumedo");
let imagenTempAlta = document.querySelector("#TempAlta");
let imagenTempMedia = document.querySelector("#TempMedia");
let imagenTempBaja = document.querySelector("#TempBaja");
let imagenAirehumedo = document.querySelector("#Airehumedo");
let imagenAireseco = document.querySelector("#Aireseco");

// ---------------- REFERENCIA A FIREBASE ----------------
let refDatos = ref(db, "sensores/nodemcu01");

// ---------------- LECTOR DE DATOS ----------------
onValue(refDatos, (snapshot) => {

    // Evita error si está vacío
    const datos = snapshot.val() ?? {};

    // Lectura segura SIN null
    const temperatura = datos?.Temperatura ?? 0;
    const humedadAire = datos?.humedadAire ?? 0;
    const humedadSuelo = datos?.humedadSuelo ?? 0;

    console.log(datos);

    // Mostrar datos
    temp.textContent = `${temperatura} °C`;
    humAire.textContent = `${humedadAire} %`;
    humSuelo.textContent = `${humedadSuelo} %`;

    // ---------------- TEMPERATURA ----------------
    if (temperatura > 29) {
        cardTemp.style.background = "rgba(255, 0, 0, 0.4)";
        temp.textContent = `${temperatura} °C  Temperatura alta`;
        imagenTempAlta.src = "https://alnuspaisajismoyjardineria.es/wp-content/uploads/2024/07/como-cuidar-jardines-durante-las-olas-de-calor-768x432.jpg";
    }
    else if (temperatura >= 20) {
        cardTemp.style.background = "rgba(0, 200, 0, 0.4)";
        temp.textContent = `${temperatura} °C  Temperatura moderada`;
        imagenTempMedia.src = "https://www.infocampo.com.ar/wp-content/uploads/2024/07/huerta-1.jpg";
    }
    else {
        cardTemp.style.background = "rgba(0, 0, 255, 0.4)";
        temp.textContent = `${temperatura} °C  Temperatura baja`;
        imagenTempBaja.src = "https://www.anahuac.mx/mexico/sites/default/files/styles/webp/public/noticias/Temperatura-mas-baja-lograda-por-el-hombre.jpg.webp?itok=UvnrH0pC";
    }

    // ---------------- HUMEDAD AIRE ----------------
    if (humedadAire > 60) {
        cardHumAire.style.background = "rgba(89, 180, 245, 0.4)";
        humAire.textContent = `${humedadAire}% - Aire muy húmedo, riesgo de hongos`;
        imagenAirehumedo.src = "https://news.agrofystatic.com/607942979-camino-de-tierra-campo-agricultura-alta-baviera-stationary-plate_0.jpg?d=620x375";
    }
    else {
        cardHumAire.style.background = "rgba(255, 255, 255, 0.15)";
        humAire.textContent = `${humedadAire}% - Aire moderado`;
        imagenAireseco.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQONekCOpAme4r-eNSr8w7rsC5oZSohTInS4A&s";
    }

    // ---------------- HUMEDAD SUELO ----------------
    if (humedadSuelo < 30) {
        cardHumSuelo.style.background = "rgba(107, 69, 23, 0.7)";
        humSuelo.textContent = `${humedadSuelo} %  Suelo seco, recomendacion de riego`;
        imagenSuelo.src = "https://media.istockphoto.com/id/614610264/es/foto/planta-de-tomate-withered.jpg?s=612x612&w=0&k=20&c=eZT3gFRMu3B1bN4NeyREFGlXCZeVsNeXMuusk3LxH3c=";
    }
    else {
        cardHumSuelo.style.background = "rgba(255, 255, 255, 0.15)";
        humSuelo.textContent = `${humedadSuelo} % Suelo con humedad moderada`;
        imagenSueloDos.src = "https://www.infocampo.com.ar/wp-content/uploads/2020/"
    }
})puedes cambiarlas)
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
    console.warn("Snapshot vacío en sensores/nodemcu01");
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
