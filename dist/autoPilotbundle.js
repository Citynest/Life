/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/hospitalBay.js":
/*!********************************!*\
  !*** ./scripts/hospitalBay.js ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var https_www_gstatic_com_firebasejs_9_19_1_firebase_app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js */ "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js");
/* harmony import */ var https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js */ "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js");
/* harmony import */ var https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js */ "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js");
/* harmony import */ var https_www_gstatic_com_firebasejs_9_19_1_firebase_storage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js */ "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([https_www_gstatic_com_firebasejs_9_19_1_firebase_app_js__WEBPACK_IMPORTED_MODULE_0__, https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_1__, https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_2__, https_www_gstatic_com_firebasejs_9_19_1_firebase_storage_js__WEBPACK_IMPORTED_MODULE_3__]);
([https_www_gstatic_com_firebasejs_9_19_1_firebase_app_js__WEBPACK_IMPORTED_MODULE_0__, https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_1__, https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_2__, https_www_gstatic_com_firebasejs_9_19_1_firebase_storage_js__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// Import the functions you need from the SDKs you need







// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBYGWKw0e1B-jhHmESHyxtjPKguhzQdFPg",
  authDomain: "web3-44ce7.firebaseapp.com",
  databaseURL: "https://web3-44ce7-default-rtdb.firebaseio.com",
  storageBucket: "web3-44ce7.appspot.com",
};
// Initialize Firebase

const app = (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_app_js__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
const database = (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_1__.getDatabase)(app);
const auth = (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_2__.getAuth)(app);
const storage = (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_storage_js__WEBPACK_IMPORTED_MODULE_3__.getStorage)(app);
(0,https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_2__.connectAuthEmulator)(auth, "http://localhost:8000");
(0,https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_1__.connectDatabaseEmulator)(database, "localhost", 9000);
(0,https_www_gstatic_com_firebasejs_9_19_1_firebase_storage_js__WEBPACK_IMPORTED_MODULE_3__.connectStorageEmulator)(storage, "localhost", 9199);

//Logout function
const endSession = document.getElementById("killSwitch");
endSession.addEventListener("click", (f) => {
  f.preventDefault();
  auth.signOut().then(() => {
    window.location.replace("../../Index.html");
  });
});

(0,https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_2__.onAuthStateChanged)(auth, (user) => {
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
    // console.log(user.displayName + " is logged in");
  } else {
    // User is signed out
    alert("You are logged out, please sign in/ register first");
    window.location.replace("../../offline_VS_Online/auth.html");
  }
});

// ADD CLICK LISTENER TO THE BUTTON WE SELECTED
updateCloud.addEventListener("click", (g) => {
  g.preventDefault();
  // GET FILE FROM THE FILE INPUT
  const file = document.getElementById("profileView").files[0];

  //Define cloud storage path for file
  const storageRef = (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_storage_js__WEBPACK_IMPORTED_MODULE_3__.ref)(storage, "images/" + file.name);
  
  //Define User
  const currentMe = auth.currentUser;
  const uploadedByDate = new Date();
  const metadata = {
    contentType: "image/jpeg",
    Auther: uploadedByDate,
    user: currentMe
  };
  const uploadTask = (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_storage_js__WEBPACK_IMPORTED_MODULE_3__.uploadBytesResumable)(storageRef, file, metadata);

  const msg = document.getElementById("broadcast").value;
//update database path for messages from text field
(0,https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_1__.set)((0,https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_1__.ref)(database, "users/"), {
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
        "⚠ Slow network is detected,  please check your internet connection & try again"
      );
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_storage_js__WEBPACK_IMPORTED_MODULE_3__.getDownloadURL)(uploadTask.snapshot.ref).then((downloadURL) => {
        alert("✔ Message sent");
        //console.log("File available at", downloadURL); <---------------This is a paid service 
        document.getElementById("broadcast").value = "";
        const fileInput = document.getElementById("profileView");
        fileInput.value = "";
      });
    }
  );
});



// Function to upload message to Realtime Dat
self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js":
false,

/***/ "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js":
false,

/***/ "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js":
false,

/***/ "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js":
false

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/hospitalBay.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=autoPilotbundle.js.map