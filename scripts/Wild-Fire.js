// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence, signInAnonymously,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js';

import {
  getDatabase,
  set,
  ref,
  update
} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js';

// Your web app's Firebase configuration
// Define firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYGWKw0e1B-jhHmESHyxtjPKguhzQdFPg",
  authDomain: "web3-44ce7.firebaseapp.com",
  databaseURL: "https://web3-44ce7-default-rtdb.firebaseio.com",
  projectId: "web3-44ce7",
  storageBucket: "web3-44ce7.appspot.com",
  messagingSenderId: "162620951739",
  appId: "1:162620951739:web:634d6f375b357004eced9e",
  measurementId: "G-ZGQ0H1X7YW"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Signup function
submitData.addEventListener("click", (a) => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phoneNumber").value;
  const whoAreYou = document.getElementById("1stName").value;
  const ageCheck = document.getElementById("omang").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // account created successfully
      const user = userCredential.user;
      set(ref(database, "users/" + user.uid), {
        Avatar: email,
        First_Name: whoAreYou,
        Phone: phone,
        Govt_ID: ageCheck,
      })
        .then(() => {
          // Data saved successfully!
          sendEmailVerification(auth.currentUser).then(() => {
            // Email verification sent!
            onAuthStateChanged(auth, (user) => {
              if (user) {
                alert(
                  "Verify your email address: " +
                  email +
                  " (check your email junk/spam folder)"
                );
                console.log(user);
              }
            });
          });
        })
        .catch((error) => {
          // The write failed...
          alert(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      // ..
      alert(errorCode);
    });
});

// login function
submitLogin.addEventListener("click", (b) => {
  const avatar = document.getElementById("avatar").value;
  const secretKey = document.getElementById("secretKey").value;

  signInWithEmailAndPassword(auth, avatar, secretKey)
    .then((userCredential) => {
      // logged in
      const user = userCredential.user.uid;
      const lgdate = new Date();

      update(ref(database, "users/" + user), {
        Last_login: lgdate,
      })
        .then(() => {
          // Data saved successfully!
          const monitorAuthState = async () => {
            onAuthStateChanged(auth, (user) => {
              if (user) {
                alert("You are now logged in as: " + avatar);
                setPersistence(auth, browserSessionPersistence, user)
                  .then(() => {
                    // Existing and future Auth states are now persisted in the current
                    // session only. Closing the window would clear any existing state even
                    // if a user forgets to sign out.
                    // ...
                    // New sign-in will be persisted with session persistence.
                    return signInWithEmailAndPassword(auth, avatar, secretKey);
                  })
                  .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    alert(errorCode);
                  });
              }
            });
          };
          monitorAuthState();
          window.location.replace("../star/free/Lobby.html");
        })
        .catch((error) => {
          // The write failed...
          alert(error);
        });
    })
    .catch((error) => {
      const errorCode = error.message;
      alert(errorCode);
    });
});

// Password reset
submitReset.addEventListener("click", (c) => {
  const recov_email = document.getElementById("recov_email").value;
  sendPasswordResetEmail(auth, recov_email)
    .then(() => {
      // Password reset email sent!
      // ..
      c.preventDefault();
      alert("Check your email for a link to your account recovery");
    })
    .catch((error) => {
      const errorCode = error.code;
      alert(errorCode);
      // ..
    });
});

ghost.addEventListener("click", (boo) => {
signInAnonymously(auth)
.then(() => {
  // Signed in..
  alert("You are loggin in anonymously, Ghosts get no love from me")
  window.location.replace("../star/free/Lobby.html");
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage);
  // ...
});
})

