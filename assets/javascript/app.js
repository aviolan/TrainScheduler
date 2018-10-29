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
  var trainTime = moment($("#input-time").val().trim().format("h:mm a");
  var trainFreq = $("#input-frequency").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: trainTime,
    frequency: trainFreq
  };