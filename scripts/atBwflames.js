import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,
    connectAuthEmulator } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getDatabase, set, ref as db,
     connectDatabaseEmulator } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";

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
  const provider = new GoogleAuthProvider();
  auth.languageCode = 'it';
  const analytics = getAnalytics(app);
  connectAuthEmulator(auth, "http://localhost:8000");
  connectDatabaseEmulator(database, "localhost", 9000);
  

        //Load form contents
        const existingUser = document.getElementById("myToggle");
        const email = document.getElementById("primaryEmail").value;
        const ageVerif = document.getElementById("password").value;
        const aboutMe = document.getElementById("bio").value;
        const name = document.getElementById("pulse").value;
        const githubProfile = document.getElementById("githublnk").value;
        const whoLinkedWho = document.getElementById("netlinker").value;
        const mobileNumber = document.getElementById("directCall").value;
        const exper = document.getElementById("interest").value;

        const howDoUWannaHelp = document.getElementById("roles").value;
        /*const checkBxSkillSet = document.getElementById("").value;*/

        const workingHrs = document.getElementById("workSchedule").value;
        const lifePressPlayAttempt = document.getElementById("compensation").value;
        const lifeStart = document.getElementById("hrlyR8").value;
        const brainsOrMud = document.getElementById("school-lvl").files[0];
        const lgTime = new Date();
       
       
        // Submit form
        const devFormSubmitSucess = document.getElementById("telling");
    devFormSubmitSucess.addEventListener("click", (k) => {

        k.preventDefault();
        
    createUserWithEmailAndPassword(auth, email, ageVerif)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log("Phase 1 complete");
    
    //update database path for messages from text fields
    set(db(database, "CityNest_Citizens/" + user), {
        account_creation: lgTime,
        Name: name,
        Bio: aboutMe,
        GitAccount: githubProfile,
        CPhone: mobileNumber,
        TechSavy: exper,
        WorkTime: workingHrs,
        DevAccCreation: lifePressPlayAttempt,
        HourlyRates: lifeStart,
        Representatives: whoLinkedWho,
        Intellect: brainsOrMud,
        LegalAge: ageVerif,
        Role: howDoUWannaHelp,
    })
        .then(() => {
        console.log("Account creation successful");

                    
            //Define cloud storage path for file uploading
            const storageRef = ref(storage, "receipts/" + brainsOrMud.name);
            
            const uploadTask = uploadBytesResumable(storageRef, brainsOrMud);


            // 3. Completion observer, called on successful completion
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                const uploadProgress = document.getElementById("messageProgress");
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
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode);
    // ..
    });
    })

    // Toggle config
    existingUser.addEventListener("change", function() {
    const profileResul = document.getElementById("AcountInit");
    const isChecked = existingUser.checked;
    //const user = auth.currentUser;
    if (isChecked) {
                
        signInWithPopup(auth, provider)
        .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        profileResul.innerHTML = user;
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        alert(email);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
        // ...
        });
    } else {
        // Toggle switch is off
        
        console.log("Sorry you are not logged in😒 or you knew that...");
    }
    })
