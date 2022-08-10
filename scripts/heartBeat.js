// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBYGWKw0e1B-jhHmESHyxtjPKguhzQdFPg",
  authDomain: "web3-44ce7.firebaseapp.com",
  databaseURL: "https://web3-44ce7-default-rtdb.firebaseio.com",
  projectId: "web3-44ce7",
  storageBucket: "web3-44ce7.appspot.com",
  messagingSenderId: "162620951739",
  appId: "1:162620951739:web:634d6f375b357004eced9e",
  measurementId: "G-ZGQ0H1X7YW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Code below retrieves everything from the database (it's a useful vulnerability)

/*const activeUserRef = ref(database, "users");
onValue(activeUserRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  //document.querySelector("#activeMe").innerHTML = "<div>${element.val()}</div>";
});*/

/**/

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const myUserId = auth.currentUser.uid;
    console.log(myUserId);
  } else {
    // User is signed out
    window.location.replace("../../offline_VS_Online/auth.html");
  }
});

const endSession = document.getElementById("killSwitch");
endSession.addEventListener("click", (f) => {
  f.preventDefault();
  auth.signOut().then(() => {
    alert("Come back again soon!");
  });
});
