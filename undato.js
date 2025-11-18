import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyDllEU7AG4Alvu8pPADt-TSlFMR5clNBj8",
    authDomain: "proyectogrupohuerta-9e970.firebaseapp.com",
    projectId: "proyectogrupohuerta-9e970",
    storageBucket: "proyectogrupohuerta-9e970.firebasestorage.app",
    messagingSenderId: "104414144386",
    appId: "1:104414144386:web:da627197af20c48eb7119b"

};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Ruta a los datos
const ruta = ref(db, "Sensores/nodemcu01");

// Elementos HTML
const valorTemp = document.getElementById("valorTemp");
const valorAire = document.getElementById("valorAire");
const valorSuelo = document.getElementById("valorSuelo");

const imgTemp = document.getElementById("imgTemp");
const imgAire = document.getElementById("imgAire");
const imgSuelo = document.getElementById("imgSuelo");

// Imágenes online
const imgFrio = "https://i.imgur.com/UwGJ0OZ.png";
const imgNormal = "https://i.imgur.com/9oQKcSj.png";
const imgCalor = "https://i.imgur.com/6gY3F2V.png";

const imgAireIcon = "https://i.imgur.com/wZ2Z0As.png";
const imgSueloSeco = "https://i.imgur.com/7dmFj0R.png";
const imgSueloMedio = "https://i.imgur.com/BWy3IZ0.png";
const imgSueloMojado = "https://i.imgur.com/3N1M5SV.png";

// Leer Firebase
onValue(ruta, (snapshot) => {
    const datos = snapshot.val();
    if (!datos) return;

    let temp = datos.Temperatura;
    let aire = datos.humedadAire;
    let suelo = datos.humedadSuelo;

    // Mostrar valores
    valorTemp.textContent = temp + "°C";
    valorAire.textContent = aire + "%";
    valorSuelo.textContent = suelo + "%";

    // Imagen según temperatura
    if (temp < 15) imgTemp.src = imgFrio;
    else if (temp <= 30) imgTemp.src = imgNormal;
    else imgTemp.src = imgCalor;

    // Imagen aire
    imgAire.src = imgAireIcon;

    // Imagen suelo
    imgSuelo.src = suelo < 30 ? imgSueloSeco :
                   suelo < 70 ? imgSueloMedio :
                                imgSueloMojado;

    // Notificación si temp > 30
    if (temp > 30) {
        alert("⚠ ALERTA: Temperatura mayor a 30°C");
    }
});
