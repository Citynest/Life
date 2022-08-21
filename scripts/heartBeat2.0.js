// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";

import {
  getDatabase,
  onValue,
  ref,
  query,
  orderByChild,
  connectDatabaseEmulator,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

import {
  getAuth,
  onAuthStateChanged,
  connectAuthEmulator,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

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
connectAuthEmulator(auth, "http://localhost:9000");
connectDatabaseEmulator(database, "localhost", 9100);

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

    const getOriginFromUrl = (url) => {
      // https://stackoverflow.com/questions/1420881/how-to-extract-base-url-from-a-string-in-javascript
      const pathArray = url.split("/");
      const protocol = pathArray[0];
      const host = pathArray[2];
      return protocol + "//" + host;
    };

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
      /** @type {FetchEvent} */
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
                // bodyUsed: req.bodyUsed,
                // context: req.context
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
    console.log(myUserId);

    //Organsing code
  } else {
    // User is signed out
    alert("Come back again soon");
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

const endSession = document.getElementById("killSwitch");
endSession.addEventListener("click", (f) => {
  f.preventDefault();
  auth.signOut().then(() => {
    window.location.replace("../../Home.html");
  });
});
