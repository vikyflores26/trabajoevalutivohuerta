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

onValue(refDatos, (snapshot) => {
    let datos = snapshot.val();
    console.log(datos);

    parrafo.textContent = 
      `Temperatura: ${datos.Temperatura} °C | Humedad Aire: ${datos.humedadAire}% | Humedad Suelo: ${datos.humedadSuelo}%`;

    let img = document.getElementById("imgTemp");
    let temp = datos.Temperatura;

    if (temp < 15) {
        img.src = "frio.png";
    } else if (temp >= 15 && temp <= 30) {
        img.src = "normal.png";
    } else {
        img.src = "calor.png";
    }
});
