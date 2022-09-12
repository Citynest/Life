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
connectAuthEmulator(auth, "http://localhost:9000");
connectDatabaseEmulator(database, "localhost", 9100);

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
    console.log(user.email + " is logged in");
  } else {
    // User is signed out
    alert("You are logged out, please sign in/ register first");
    window.location.replace("../../offline_VS_Online/auth.html");
  }
});

const yearsAlive = document.getElementById("age").value;

const above18 = document.getElementById("SSN").value;

const doesWhat4Fun = document.getElementById("hobbies").value;
/**/ //<--- comments for disabling knowMyUser btn function
knowYourCustomer.addEventListener("click", (h) => {
  alert("The button still works, check console for captured data!");
  const aReal1 = document.getElementById("profilePic").file;
  const birthday = document.getElementById("dob").value;
  const doesWhat4ALvn = document.getElementById("occupation").value;
  const privacyMode = document.getElementById("terms&conditions").value;
  const connectGoogle = document.getElementById("googleToken").value;
  const connectMicrosoft = document.getElementById("MicrosoftToken").value;
  const connectTwitter = document.getElementById("TwitterToken").value;
  const connectFb = document.getElementById("facebookToken").value;
  const connectInstagram = document.getElementById("InstaToken").value;
  const connectWhatsapp = document.getElementById("whatsappToken").value;
  const connectFNB = document.getElementById("firstNBToken").value;
  const connectBarclays = document.getElementById("barclaysToken").value;
  const myNetwork = document.getElementById("networkProvider");
  const nameOfBank = document.getElementById("bankName").value;
  const typeOfBankCard = document.getElementById("cardType").value;
  const kingOfDebtNo = document.getElementById("debtLordNumber").value;
  const cExpD = document.getElementById("cardExpD").value;
  const verifyCard = document.getElementById("vcv").value;

  console.log(yearsAlive, above18, doesWhat4Fun);
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});
