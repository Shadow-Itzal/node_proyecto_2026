/*
====================================
PARA QUE SIRVE?
Este archivo configura la conexión entre nuestra
aplicación Node.js y el proyecto Firebase.

También inicializa Firestore, que es la BD
donde almacenaremos nuestros productos.
====================================
*/

// importamos initializeApp para iniciar Firebase
import { initializeApp } from "firebase/app";

// importamos getFirestore para utilizar la BD
import { getFirestore } from "firebase/firestore";

// cargamos las variables de entorno del archivo .env
import "dotenv/config";


// ====================================
//  CONFIGURACIÓN DE FIREBASE
// ====================================

// obtenemos los datos de configuración desde .env
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};


// ====================================
// INICIALIZAMOS DE FIREBASE
// ====================================

// inicializamos Firebase utilizando la configuración anterior
const app = initializeApp(firebaseConfig);


// ====================================
// CONEXIÓN CON FIRESTORE
// ====================================

// obtenemos la instancia de nuestra BD Firestore
export const db = getFirestore(app);


