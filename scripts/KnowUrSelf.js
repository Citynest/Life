function checkEmail() {
  const general = document.getElementById("about");
  const registration = document.querySelector('.effect1');
  registration.style.display = ("block");
  general.style.display = ("none");
}


// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var resume = document.getElementById("trigger");

var tutorial = document.getElementById("demo");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

tutorial.onclick = function() {
  modal2.style.display = "block";
}

resume.onclick = function() {
  modal.style.display = "block";
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const initialsDeny = document.getElementById("credentials");
const toggleSwitch = document.getElementById('myToggle');
toggleSwitch.addEventListener('change', function() {
  if (this.checked) {
    // Toggle is ON
    initialsDeny.style.display = "none";
  } else {
    // Toggle is OFF
    // Perform any other action if needed
    const initialsDeny = document.getElementById("credentials");
    initialsDeny.style.display = "block";
  }
});