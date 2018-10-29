//Connects Javascript to my Firebase
var config = {
    apiKey: "AIzaSyD3846RzsIKbFJ7nu-pNG8zm9KfyJAtPIQ",
    authDomain: "train-scheduler-d0a15.firebaseapp.com",
    databaseURL: "https://train-scheduler-d0a15.firebaseio.com",
    projectId: "train-scheduler-d0a15",
    storageBucket: "train-scheduler-d0a15.appspot.com",
    messagingSenderId: "325584575650"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

  //Grabs user input
  var trainName = $("#input-train").val().trim();
  var trainDest = $("#input-destination").val().trim();
  var trainTime = moment($("#input-time").val().trim(), "h:mm a").format('LT');
  var trainFreq = $("#input-frequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: trainTime,
    frequency: trainFreq
  };

  //Uploads train data to database
  database.ref().push(newTrain);

  //Console logs
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  //Clears all of the text-boxes
  $("input-train").val("");
  $("input-destination").val("");
  $("input-time").val("");
  $("input-frequency").val("");
});