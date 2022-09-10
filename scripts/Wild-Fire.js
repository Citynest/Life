// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

// Your web app's Firebase configuration
// Define firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYGWKw0e1B-jhHmESHyxtjPKguhzQdFPg",
  databaseURL: "https://web3-44ce7-default-rtdb.firebaseio.com",
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

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // account created successfully
      const user = userCredential.user;
      set(ref(database, "users/" + user.uid), {
        Avatar: email,
        First_Name: whoAreYou,
        Phone: phone,
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
                    " (check your email spam folder)"
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
      const databaseOrganiser = "<<==================================>>";
      const lgdate = new Date();

      update(ref(database, "users/" + user.uid), {
        Last_login: lgdate,
        styler: databaseOrganiser,
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
          window.location.replace("../star/free/hub.html");
        })
        .catch((error) => {
          // The write failed...
          alert(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
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
