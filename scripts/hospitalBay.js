// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";

import {
  getDatabase,
  onValue,
  query,
  orderByChild,
  connectDatabaseEmulator,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

import {
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  connectAuthEmulator,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  connectStorageEmulator,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBYGWKw0e1B-jhHmESHyxtjPKguhzQdFPg",
  databaseURL: "https://web3-44ce7-default-rtdb.firebaseio.com",
  storageBucket: "web3-44ce7.appspot.com",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);
connectAuthEmulator(auth, "http://localhost:4000");
connectDatabaseEmulator(database, "localhost", 9100);
connectStorageEmulator(storage, "localhost", 9199);

//Logout function
const endSession = document.getElementById("killSwitch");
endSession.addEventListener("click", (f) => {
  f.preventDefault();
  auth.signOut().then(() => {
    window.location.replace("../../Home.html");
  });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    function getOriginFromUrl(url) {
      // https://stackoverflow.com/questions/1420881/how-to-extract-base-url-from-a-string-in-javascript
      const pathArray = url.split("/");
      const protocol = pathArray[0];
      const host = pathArray[2];
      return protocol + "//" + host;
    }

    // Get underlying body if available. Works for text and json bodies.
    const getBodyContent = (req) => {
      return Promise.resolve()
        .then(() => {
          if (req.method !== "GET") {
            if (req.headers.get("Content-Type").indexOf("json") !== -1) {
              return req.json().then((json) => {
                return JSON.stringify(json);
              });
            } else {
              return req.text();
            }
          }
        })
        .catch((error) => {
          // Ignore error.
        });
    };

    self.addEventListener("fetch", (event) => {
      /* @type {FetchEvent} ===========================>>>>>>>>>>>>here */
      const evt = event;

      const requestProcessor = (idToken) => {
        let req = evt.request;
        let processRequestPromise = Promise.resolve();
        // For same origin https requests, append idToken to header.
        if (
          self.location.origin == getOriginFromUrl(evt.request.url) &&
          (self.location.protocol == "https:" ||
            self.location.hostname == "localhost") &&
          idToken
        ) {
          // Clone headers as request headers are immutable.
          const headers = new Headers();
          req.headers.forEach((val, key) => {
            headers.append(key, val);
          });
          // Add ID token to header.
          headers.append("Authorization", "Bearer " + idToken);
          processRequestPromise = getBodyContent(req).then((body) => {
            try {
              req = new Request(req.url, {
                method: req.method,
                headers: headers,
                mode: "same-origin",
                credentials: req.credentials,
                cache: req.cache,
                redirect: req.redirect,
                referrer: req.referrer,
                body,
                bodyUsed: req.bodyUsed,
                context: req.context,
              });
            } catch (e) {
              // This will fail for CORS requests. We just continue with the
              // fetch caching logic below and do not pass the ID token.
            }
          });
        }
        return processRequestPromise.then(() => {
          return fetch(req);
        });
      };
      // Fetch the resource after checking for the ID token.
      // This can also be integrated with existing logic to serve cached files
      // in offline mode.
      evt.respondWith(
        getIdTokenPromise().then(requestProcessor, requestProcessor)
      );
    });
    let header = document.getElementById("userDisplay");
    header.innerHTML = user.email;
    //console.log(user.email + " is logged in");
  } else {
    // User is signed out
    alert("You are logged out, please sign in/ register first");
    window.location.replace("../../offline_VS_Online/auth.html");
  }
});

// ADD CLICK LISTENER TO THE BUTTON WE SELECTED
updateCloud.addEventListener("click", (g) => {
  g.preventDefault();
  // GET FILE FROM THE  FILE INPUT
  const file = document.getElementById("profileView").files[0];
  const storageRef = ref(storage, "images/" + file.name);
  const Thisuser = auth.currentUser;
  const uploadedByDate = new Date();
  const metadata = {
    contentType: "image/jpeg",
    Auther: uploadedByDate,
    user: Thisuser,
  };
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

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
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      alert(
        "??? Slow network is detected,  please check your internet connection & try again"
      );
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        alert("??? Your media is safely stored in your vault");
        //console.log("File available at", downloadURL); <---------------This is a paid service
      });
    }
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});
