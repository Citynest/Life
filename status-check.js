(function () {
  var ss = "no";
  if (getStatus(ss)) {
    alert("Something went wrong");
  } else {
    console.log("System health is: fantanstic");
  }

  function getStatus(ask) {
    if (ask == "yes") {
      return true;
    } else {
      return false;
    }
  }
})();

const Parse = require("parse/node");
//signed by Starlink
