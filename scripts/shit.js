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
  alert("Choose a room to choose your own lifestyle");
}

function buildTrust() {
  alert("Please upgrade your tier first");
}

function importantMessage() {
  alert(
    "As you know Ukrain is in trouble and parts of this website relies on their technology, so please upgrade your tier to support Ukrain or carry seeds in your pocket"
  );
}
