/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Devs/Dev2.0.js":
/*!************************!*\
  !*** ./Devs/Dev2.0.js ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var https_www_gstatic_com_firebasejs_9_19_1_firebase_app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js */ "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js");
/* harmony import */ var https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js */ "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js");
/* harmony import */ var https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js */ "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([https_www_gstatic_com_firebasejs_9_19_1_firebase_app_js__WEBPACK_IMPORTED_MODULE_0__, https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__, https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_2__]);
([https_www_gstatic_com_firebasejs_9_19_1_firebase_app_js__WEBPACK_IMPORTED_MODULE_0__, https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__, https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// Import the functions you need from the SDKs you need






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
const app = (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_app_js__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
const auth = (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);
const database = (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_2__.getDatabase)(app);
(0,https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__.connectAuthEmulator)(auth, "http://localhost:8000");
(0,https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_2__.connectDatabaseEmulator)(database, "localhost", 9000);

// Signup function
submitData.addEventListener("click", (a) => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phoneNumber").value;
  const whoAreYou = document.getElementById("1stName").value;
  const ageCheck = document.getElementById("omang").value;

  (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__.createUserWithEmailAndPassword)(auth, email, password)
    .then((userCredential) => {
      // account created successfully
      const user = userCredential.user;
      (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_2__.set)((0,https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_2__.ref)(database, "users/" + user.uid), {
        Avatar: email,
        First_Name: whoAreYou,
        Phone: phone,
        Govt_ID: ageCheck,
      })
        .then(() => {
          // Data saved successfully!
          (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__.sendEmailVerification)(auth.currentUser).then(() => {
            // Email verification sent!
            (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__.onAuthStateChanged)(auth, (user) => {
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

  (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__.signInWithEmailAndPassword)(auth, avatar, secretKey)
    .then((userCredential) => {
      // logged in
      const user = userCredential.user.uid;
      const databaseOrganiser = "<<==================================>>";
      const lgdate = new Date();

      (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_2__.update)((0,https_www_gstatic_com_firebasejs_9_19_1_firebase_database_js__WEBPACK_IMPORTED_MODULE_2__.ref)(database, "users/" + user.uid), {
        Last_login: lgdate,
        styler: databaseOrganiser,
      })
        .then(() => {
          // Data saved successfully!
          const monitorAuthState = async () => {
            (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__.onAuthStateChanged)(auth, (user) => {
              if (user) {
                alert("You are now logged in as: " + avatar);
                (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__.setPersistence)(auth, https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__.browserSessionPersistence, user)
                  .then(() => {
                    // Existing and future Auth states are now persisted in the current
                    // session only. Closing the window would clear any existing state even
                    // if a user forgets to sign out.
                    // ...
                    // New sign-in will be persisted with session persistence.
                    return (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__.signInWithEmailAndPassword)(auth, avatar, secretKey);
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
          window.location.replace("../star/free/console.html");
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
  (0,https_www_gstatic_com_firebasejs_9_19_1_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__.sendPasswordResetEmail)(auth, recov_email)
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

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js":
false,

/***/ "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js":
false,

/***/ "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js":
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
/******/ 	var __webpack_exports__ = __webpack_require__("./Devs/Dev2.0.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=firebundle.js.map