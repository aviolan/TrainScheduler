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

//Show current time
$("#currentTime").append(moment().format("HH:mm a"));

//Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

  //Grabs user input
  var trainName = $("#input-train").val().trim();
  var trainDest = $("#input-destination").val().trim();
  var trainTime = moment($("#input-time").val().trim(), "h:mm a").format("X");
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

//Creates firebase event for adding trains to the database and to the html
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    //Store everything into a variable
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;

    //Train info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    var tRemainder = moment().diff(moment.unix(trainTime), "minutes") % trainFreq;
    var tMinutes = trainFreq - tRemainder;
    var tArrival = moment().add(tMinutes, "m").format("HH:mm a");

    //Creates new rows
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(tArrival),
        $("<td>").text(tMinutes)
    );

    //Append the new row to the table
    $("#train-table > tbody").append(newRow);
});