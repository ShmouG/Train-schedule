// * When adding trains, administrators should be able to submit the following:

// * Train Name

// * Destination 

// * First Train Time -- in military time

// * Frequency -- in minutes

// * Code this app to calculate when the next train will arrive; this should be relative to the current time.

// * Users from many different machines must be able to view same train times.

$(document).ready(() => {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAWzEzmJgBSpgIhRUAZqmQee6y7FHaBI-k",
        authDomain: "train-schedule-48b46.firebaseapp.com",
        databaseURL: "https://train-schedule-48b46.firebaseio.com",
        projectId: "train-schedule-48b46",
        storageBucket: "train-schedule-48b46.appspot.com",
        messagingSenderId: "386278332596"
    };
    firebase.initializeApp(config);

    const database = firebase.database();

    // 2. Button for adding trains 
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#dest-input").val().trim();
        var firstTrain = moment($("#start-input").val().trim(), "HH:mm").format("HH:mm");
        var frqRate = $("#freq-input").val().trim();

        var newTrain = {
            name: trainName,
            place: destination,
            ftrain: firstTrain,
            freq: frqRate
        };
        database.ref().push(newTrain);
        console.log(newTrain.name);
        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#dest-input").val("");
        $("#start-input").val("");
        $("#freq-input").val("");
        return false;
    });

    // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().place;
        var firstTrain = childSnapshot.val().ftrain;
        var frequency = childSnapshot.val().freq;

        var firstTime = "03:30";

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrain, "HH:mm")
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment().format("HH:mm")
        console.log("CURRENT TIME: " + currentTime);

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log(firstTime);
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var timeRemainder = diffTime % frequency;
        console.log(timeRemainder);

        // Minute Until Train
        var minToTrain = frequency - timeRemainder;
        console.log("MINUTES TILL TRAIN: " + timeRemainder);

        var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");

        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
    });

});


// Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

// Prettify the employee start
// var StartPretty = moment.unix(firstTrain).format("HH:mm");



// Create the new row
// var newRow = $("<tr>").append(
//     $("<td>").text(trainName),
//     $("<td>").text(destination),
//     $("<td>").text(StartPretty),
//     $("<td>").text(frqRate),
// );

// Append the new row to the table
// $("#train-table  <tbody>").append(newRow);
// var tFrequency = 3;

// Time is 3:30 AM