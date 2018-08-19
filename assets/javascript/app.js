// * When adding trains, administrators should be able to submit the following:

// * Train Name

// * Destination 

// * First Train Time -- in military time

// * Frequency -- in minutes

// * Code this app to calculate when the next train will arrive; this should be relative to the current time.

// * Users from many different machines must be able to view same train times.

// * Styling and theme are completely up to you. Get Creative!
$(document).ready(() => {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBiQKBSkKnrY901_90V7V8g6YkRc02WYlo",
        authDomain: "train-schedule-e1574.firebaseapp.com",
        databaseURL: "https://train-schedule-e1574.firebaseio.com",
        projectId: "train-schedule-e1574",
        storageBucket: "train-schedule-e1574.appspot.com",
        messagingSenderId: "247916953129"
    };
    firebase.initializeApp(config);

});