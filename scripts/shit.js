function thenewcallout() {
  document.querySelector(".container").style.display = "block";
  document.querySelector(".div2").style.display = "none";
  document.querySelector(".fixAcc").style.display = "none";
}

function thenewcallout2() {
  document.querySelector(".container").style.display = "none";
  document.querySelector(".div2").style.display = "block";
  document.querySelector(".fixAcc").style.display = "none";
}

function thenewcallout3() {
  document.querySelector(".container").style.display = "none";
  document.querySelector(".div2").style.display = "none";
  document.querySelector(".fixAcc").style.display = "block";
}

// Avatar raw functions
function accFunc1() {
  document.querySelector(".KYC").style.display = "none";
  document.querySelector(".otherAccounts").style.display = "block";
  document.querySelector(".bankInfo").style.display = "none";
}

function accFunc2() {
  document.querySelector(".KYC").style.display = "none";
  document.querySelector(".otherAccounts").style.display = "none";
  document.querySelector(".cardInfo").style.display = "block";
}

function accFunc3() {
  document.querySelector(".KYC").style.display = "block";
  document.querySelector(".otherAccounts").style.display = "none";
  document.querySelector(".cardInfo").style.display = "none";
}

function navOff() {
  document.querySelector(".menu").style.display = "none";
}

function baller() {
  alert(
    "You dont belong in here, you have to be a paying customer/ patreon to proceed!"
  );
}

function pageStatus() {
  alert("Page/ process isnt ready for use, sorry for the inconvinience!");
}

function alwaysDown() {
  alert(
    "Sorry, something went wrong please try again. If the error persists try again later!"
  );
}

/*function thenewcallout5(){
    alert("Your request to signout failed TIP: clear your browser history & cookies");
    window.location.replace("../../welcome.html");
  } */

function homeBase() {
  document.querySelector(".landing-pg").style.display = "block";
  document.querySelector(".selfCare").style.display = "none";
  document.querySelector(".entertainment").style.display = "none";
}

function where2() {
  document.querySelector(".landing-pg").style.display = "none";
  document.querySelector(".selfCare").style.display = "block";
  document.querySelector(".entertainment").style.display = "none";
}

function funTime() {
  document.querySelector(".entertainment").style.display = "block";
  document.querySelector(".landing-pg").style.display = "none";
  document.querySelector(".selfCare").style.display = "none";
}

function spazaDisplay() {
  document.querySelector(".entertainment").style.display = "none";
}

function entertainment() {
  document.querySelector(".entertainment").style.display = "block";
  document.querySelector("#screen1").style.display = "none";
}

function screenRestore() {
  document.querySelector("#screen1").style.display = "block";
  document.querySelector(".entertainment").style.display = "none";
}

function question() {
  alert("What would you like to do here first?");
}

function act() {
  alert("Choose a payment method");
}

function buildTrust() {
  alert("Please upgrade your tier first");
}

function importantMessage() {
  alert(
    "As you know Ukrain is in trouble and parts of this website relies on their technology, so please upgrade your tier to support Ukrain or carry seeds in your pocket"
  );
}

function orangeM() {
  alert("Dial *145# on your phone and call, choose option 2 and enter your orange money secret code. enter 72293757 as the beneficiary. add the amount to send and finish the transaction, grab a screenshot of the transaction and upload it.");
}

function smega() {
  alert("Dial *173# on your phone and call, follow the prompts & enter 73069096 as the beneficiary. add the amount right amount to send and finish the transaction, grab a screenshot of the transaction and upload it.");
}

function crypto() {
  document.getElementById("dogecoinlg").style.display = "none";
  document.getElementById("dogecoinAdrr").style.display = "block";
}

function hideDoge() {
  document.getElementById("dogecoinAdrr").style.display = "none";
  document.getElementById("dogecoinlg").style.display = "block";
}


const vanish = document.getElementById("submitData");
vanish.style.display = "none";
function recapture() {
const checkBox = document.getElementById("recap");
  if (checkBox.checked == false){
    return false;
  } else {
    vanish.style.display = "block";
    return true;
  }; 
};

function showWidgets() {
  document.querySelector(".console-section").style.display = "none";
  document.getElementById("search").style.display = "block";

  
  let console = document.getElementById("consoleTitle");
  console.innerHTML = "Other apps (beta)";

  document.getElementById("widgets").style.display = "block";
}

function featureDelay() {
  alert("Coming soon...");
}

function hideWidgets() {
  document.querySelector(".console-section").style.display = "block";
  document.getElementById("search").style.display = "none";

  
  let console = document.getElementById("consoleTitle");
  console.innerHTML = "Console";

  document.getElementById("widgets").style.display = "none";
}

function updateAlert() {
  alert("The console just got updated! More apps from our partners are being developed😋, click console");
}