// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";

import {
  getDatabase,
  set,
  ref as db,
  update,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYGWKw0e1B-jhHmESHyxtjPKguhzQdFPg",
  authDomain: "web3-44ce7.firebaseapp.com",
  databaseURL: "https://web3-44ce7-default-rtdb.firebaseio.com",
  storageBucket: "web3-44ce7.appspot.com",
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

//Logout function
const endSession = document.getElementById("killSwitch");
endSession.addEventListener("click", (f) => {
  f.preventDefault();
  auth.signOut().then(() => {
    window.location.replace("../../index.html");
  });
});

// No unauthorized user allowed state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    let header = document.getElementById("userDisplay");
    header.innerHTML = user.email;
    let shirts = document.querySelector("#true-Price");
    let trousers = document.getElementById("true-Price2");
    let helpimg = document.querySelectorAll(".help-image");
    let perfumes = document.querySelectorAll("#true-Price3, #true-Price4, #true-Price5");
    let gloves = document.getElementById("true-Price6");
    shirts.innerHTML = "P220.00 <strong>(22.22% OFF)</strong>";
    trousers.innerHTML = "P500.00 <strong>(14.53% OFF)</strong>";
    helpimg.forEach(element => {
      element.style.display = "none";
    });
    perfumes.forEach(element => {
      element.innerHTML = "P120 <strong>(62.5% OFF)</strong>";
    });
    gloves.innerHTML = "P100 <strong><strong>(60% OFF)</strong></strong>";
    // console.log(user.displayName + " is logged in");
  } else {
    // User is signed out
    let header = document.querySelector("userDisplay");
    const userNull = document.getElementById("killSwitch");
    userNull.style.display = "none";
    alert("You are anonymous, Login to receive discounts & more!");
  }
});

// Submit button on main page
updateCloud.addEventListener("click", (g) => {
  g.preventDefault();
  // GET FILE FROM THE FILE INPUT
  const file = document.getElementById("profileView").files[0];

  //Define cloud storage path for file
  const storageRef = ref(storage, "images/" + file.name);
  
  //Define User
  const currentMe = auth.currentUser;
  const uploadedByDate = new Date();
  const metadata = {
    contentType: "image/jpeg",
    Auther: uploadedByDate,
    user: currentMe
  };
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  const lgTime = new Date();
  const msg = document.getElementById("broadcast").value;
//update database path for messages from text field
set(db(database, "supporters/" + lgTime), {
  message: msg,
})
  .then(() => {
    console.log("message sent");
  });

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  
  
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      const uploadProgress = document.getElementById("uploads");
      uploadProgress.innerHTML = "⏳Analysing image";
      switch (snapshot.state) {
        case "paused":
          uploadProgress.innerHTML = "Uploading: "+ progress + "% done " + "<button>Resume</button>";
          break;
        case "running":
          uploadProgress.innerHTML = "Uploading: "+ progress + "% done " + "<button>Pause</button>";
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      alert(
        "⚠ Slow network is detected,  please check your internet connection & try again"
      );
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        alert("✔ Message sent");
        //console.log("File available at", downloadURL); <---------------This is a paid service 
        document.getElementById("broadcast").value = "";
        const fileInput = document.getElementById("profileView");
        fileInput.value = "";
      });
    }
  );
});


self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

