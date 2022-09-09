// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";

import {
  getDatabase,
  onValue,
  query,
  orderByChild,
  connectDatabaseEmulator,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

import {
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  connectAuthEmulator,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js";

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
connectAuthEmulator(auth, "http://localhost:9000");
connectDatabaseEmulator(database, "localhost", 9100);

// Code below retrieves everything from the database (it's a useful vulnerability)
/*
const activeUserRef = ref(database, "users");
onValue(activeUserRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  //document.querySelector("#activeMe").innerHTML = "<div>${element.val()}</div>";
});

*/
//const metadata = {
//  contentType: "image/jpeg",
//};

// ADD CLICK LISTENER TO THE BUTTON WE SELECTED
updateCloud.addEventListener("click", (f) => {
  // GET FILE FROM THE  FILE INPUT
  const file = document.getElementById("profileView").files[0];
  // MAKE A REFERNCE TO FIREBASE .
  const storageRef = ref(storage, "images/profile.jpg");
  // MAKE A CHILD REFERENCE . WE ARE MAKING A FOLDER  NAMED IMAGES AND ADDING THE FILE THE USER PICKED TO FIREBASE
  //const final = storageRef.child(`images/${file}`);
  // THIS UPLOAD THE FILE.. WE STORE IT IN A CONST TO DOWNLOAD THE THE FILE AND E.C.T

  const uploadTask = uploadBytesResumable(storageRef, file); //, metadata

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
      alert("Something went wrong, please check your internet connection");
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      alert("Your upload is successful!");
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available to download at: ", downloadURL);
      });
    }
  );
});

/*
updateCloud.addEventListener("click", (f) => {
  const selfie = document.getElementById("profileView").files[0];
  console.log(selfie);





  // Create a reference to 'selfie.jpg'
  const selfieRef = ref(storage, "/images/selfie.jpeg" + selfie.name, metadata);
  const task = storage.put(selfieRef);

  //uploadBytesResumable(selfieRef, file).then((snapshot) => {
  //  alert("Uploaded a blob or file!");
  //});

  task.on(
    "state_change",
    function progress(snap) {
      console.log((snap.bytesTransferred / snap.totalBytes) * 100);
    },
    function error(err) {
      console.log(err.message);
    },
    function completed() {
      storage.getDownloadURL().then((url) => {
        let imgDisplay = document.querySelector("bucket");
        imgDisplay.innerHTML += '<img src=${url} alt="">';
      });
    }
  );
});
*/
// While the file names are the same, the references point to different files
// mountainsRef.name === mountainImagesRef.name; // true
// mountainsRef.fullPath === mountainImagesRef.fullPath; // false

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

    //console.log(myUserId);
    console.log(user.email + " is logged in");
  } else {
    // User is signed out
    alert("You are logged out, please sign in/ register first");
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

/*input.addEventListener("change", (f) => {
	let storageRef = app.storage().ref("images/" + file.name);
	
	let task = storageRef.put(file);
	task.on(
		"state_changed", function progress(snap) {
		let percentage = (snap.bytesTransferred/ snap.totalBytes)})}) */

const endSession = document.getElementById("killSwitch");
endSession.addEventListener("click", (f) => {
  f.preventDefault();
  auth.signOut().then(() => {
    window.location.replace("../../Home.html");
  });
});
