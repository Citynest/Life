// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

import {
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBYGWKw0e1B-jhHmESHyxtjPKguhzQdFPg",
  databaseURL: "https://web3-44ce7-default-rtdb.firebaseio.com",
  storageBucket: "web3-44ce7.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// Code below retrieves everything from the database (it's a useful vulnerability)
/*
const activeUserRef = ref(database, "users");
onValue(activeUserRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  //document.querySelector("#activeMe").innerHTML = "<div>${element.val()}</div>";
});

*/

// Create a reference to 'mountains.jpg'
// const mountainsRef = ref(storage, "mountains.jpg");

// While the file names are the same, the references point to different files
// mountainsRef.name === mountainImagesRef.name; // true
// mountainsRef.fullPath === mountainImagesRef.fullPath; // false

updateCloud.addEventListener("click", (f) => {
  //get your select image
  const selfie = document.getElementById("profileView").value;
  const capturedSelfie = ref(storage, "Profile/");
  const metadata = {
    contentType: "image/jpeg",
  };

  uploadBytes(capturedSelfie, selfie, metadata).then((snapshot) => {
    alert("Well done!");
  });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User

    //const myUserId = auth.currentUser.uid;

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
      /* @type {FetchEvent} */
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

    //console.log(myUserId);
    console.log(user.email + " is logged in");
  } else {
    // User is signed out
    alert("Come back again soon");
    window.location.replace("../../offline_VS_Online/auth.html");
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

/*
const bytes = new Uint8Array([
  0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21,
]);
uploadBytes(sparkyRef, bytes).then((snapshot) => {
  console.log("uploaded an Array!");
});

//Raw string is the default if no formated is provided
const rawString = "This is my message.";
uploadString(sparkyRef, raw_string).then((snapshot) => {
  console.log("uploaded raw string");
});

// Base64url formatted string
const base64String = "5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB";
uploadString(musicRef, base64_string, "base64").then((snapshot) => {
  console.log("Uploaded a base64 string!");
});

const base64UrlString = "5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB";
uploadString(musicRef, base64_string, "base64url").then((snapshot) => {
  console.log("uploaded a base64url string");
});

// Data URL string
const dataUrlString =
  "data:text/plain;based64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB";
uploadString(musicRef, data_url_string, "data_url").then((snapshot) => {
  console.log("Uploaded data url string!");
});

uploadBytes();
uploadString();


*/

const endSession = document.getElementById("killSwitch");
endSession.addEventListener("click", (f) => {
  f.preventDefault();
  auth.signOut().then(() => {
    alert("Come back again soon!");
  });
});
