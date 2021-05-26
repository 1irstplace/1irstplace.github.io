var particle = new Particle();
var myDevice = "0000"; // Photon device ID
var myToken = "0000"; // Photon access token

// functions that hide all screens & then show a specific screen
// these functions also update navigation menu to highlight active screen
function showScreen1() {
  $(".screen").hide();
  $("#screen1").show();
  $(".menu").removeClass("active");
  $(".menu").eq(0).addClass("active"); // eq(0) = 1st menu item
}

function showScreen2() {
  $(".screen").hide();
  $("#screen2").show();
  $(".menu").removeClass("active");
  $(".menu").eq(1).addClass("active"); // eq(1) = 2nd menu item
}

function showScreen3() {
  $(".screen").hide();
  $("#screen3").show();
  $(".menu").removeClass("active");
  $(".menu").eq(2).addClass("active"); // eq(2) = 3rd menu item
}

function showScreen4() {
  $(".screen").hide();
  $("#screen4").show();
  $(".menu").removeClass("active");
  $(".menu").eq(3).addClass("active"); // eq(3) = 4th menu item
}

function showNotification() {
  // choose temporary or persistent notification
  // only use one - comment out unused option

  // temporary - closes automatically after delay (can also close manually)
  $("#notification").slideDown("fast").delay(5000).slideUp();

  // persistent - must close manually
  //$("#notification").slideDown("fast");
}

// Add other JS for your smart device web app
var particle = new Particle();
var myDevice = "2f0030000f47343337373737"; // Photon device ID
var myToken = "4766aa9ceec9d1caaf5f1dee488527efce7f1b43"; // Photon access token

// Add JS for your web app
var alertSound = new Audio("notification.wav");

window.setInterval(checkMode, 500);

function checkMode() {
    particle.getVariable({ deviceId: myDevice, name: "deviceMode", auth: myToken }).then(function(data) {
        // add code to do something with value returned as: data.body.result
        $("#yes").html("Connected");
        if (data.body.result == "armed") {
            $("#system-mode").html("Active");
            $("input[name=toggle]").prop("checked", true);
        }
        else if (data.body.result == "disarmed") {
            $("#system-mode").html("Inactive");
            $("input[name=toggle]").prop("checked", false);
        }
    }, function(err) {
            console.log("An error occurred: ", err);
    });
}

function toggleMode() {
    particle.callFunction({ deviceId: myDevice, name: "toggleMode", argument: "data", auth: myToken });
}

particle.getEventStream({ deviceId: myDevice, name: "motion", auth: myToken }).then(function(stream) {
  stream.on('event', function(feed) {
    // add code to do something when event notification received
    // any text data received is stored as: feed.data
    alertSound.play();
    var dateTime = new Date();
    dateTime = dateTime.toLocaleString();
    $("#event-time").html(dateTime);
    $("#motion-alert").show().delay(1500).fadeOut();
  });
});