// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXMGiXiacTg4dOofsdwS3GfgBFRabSTC4",
  authDomain: "pocket-2e422.firebaseapp.com",
  projectId: "pocket-2e422",
  storageBucket: "pocket-2e422.appspot.com",
  messagingSenderId: "16103355811",
  appId: "1:16103355811:web:05e334e6dd4fe326bed616"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };