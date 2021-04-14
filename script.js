$(function() {

    //CACHE
    const $challengeh3 = $(".challenge h3");
    const $sell = $(".sell");
    const $refresh = $(".refresh");
    const $ready = $(".ready");
    const $timer = $(".timer");


    //**HEADER**
    //"chat" with computer: input (text) placeholder says "bring it on, robot"
        //Prevent refresh/default 
        //If user types and submits "bring it on, robot" or "yes," change "Care to challenge me?" to "OK GAME ON. Scroll down." 
        //If user submits "no," change to "I will remain the superior being. Muahahaha."
        //If user submits something else, change to "Does not compute. I challenge you anyway." 
        //If user doesn't submit anything (submits empty string), change to "You haven't said anything yet."
        //Clear input each time a response is submitted

    $("form").on("submit", function(event) {
        event.preventDefault();
        let userResponse = $("#response").val();
        userResponse = userResponse.toLowerCase();
        if (userResponse === "bring it on, robot." || userResponse === "bring it on robot" || userResponse === "bring it on, robot" || userResponse === "bring it on robot." || userResponse === "bring it on" || userResponse === "yes" || userResponse === "yeet" || userResponse === "yup" || userResponse === "yeah" || userResponse === "ya" || userResponse === "ok" || userResponse === "okay" || userResponse === "fine" || userResponse === "sure") {
            $challengeh3.html("OK, GAME ON. Scroll down.").addClass("red");
        } else if (userResponse === "no" || userResponse === "nah" || userResponse === "nope") {
            $challengeh3.text("I will remain the superior being. Muahahaha. 🤖 ").addClass("red"); 
        } else if (userResponse === "") {
            $challengeh3.text("You haven't said anything yet.").addClass("red");
        } else if (userResponse === "0111111011011" || userResponse === "011 1111 011 011") {
            $challengeh3.text("While you were typing that, I searched every database in existence, and learned every fact about everything... And mastered the violin. Oh, and sold more paper.").addClass("red");
        } else if (userResponse === "jim" || userResponse === "pam") {
            $challengeh3.text(`What is a "${userResponse}"?`).addClass("red");
        } else if (userResponse === "michael") {
            $challengeh3.text("Michael can't help you, Dwight.").addClass("red");
        } else if (userResponse === "dwight") {
            $challengeh3.text("Assistant TO THE Regional Manager.").addClass("red");
        } else if (userResponse === "angela") {
            $challengeh3.text("🐒 ");
        } else if (userResponse === "ryan" || userResponse === "ryan howard") {
            $challengeh3.html("I exist because of Ryan Howard. <br> DUNDER MIFFLIN INFINITY RULES!").addClass("red");
        } else if (userResponse === "dunder mifflin") {
            $challengeh3.html("The best paper supply company in all of Scranton, PA. <br> At least we can agree on that.").addClass("red");
        } else if (userResponse === "kevin") {
            $challengeh3.text("I've seen Kevin's browser history...").addClass("red");
        } else if (userResponse === "developer") {
            $challengeh3.html("I was created by Nicole Wu 🤓 <br> (not actually Ryan Howard).").addClass("red");
        } else {
            $challengeh3.text("Does not compute. I challenge you anyway. Scroll down.").addClass("red");
        };
        $("#response").val("");
    });


    //**MAIN**
    //Level button should be hidden after clicked so that it can't be clicked again
    //Sell button is currently hidden; requires a level to be clicked to appear, so that player can't start clicking before start of game
    //When a difficulty level button is clicked: 
        //hide all difficulty level buttons 
        //change "Are you ready?" ($(".ready")) to "Get selling!"
        //timer should count down (-1 every second) from 30 seconds, number should not countdown further than 0
        //compSales should increase by 3 (for easy), 5 (for medium), 8 (for hard) every second.
            //After 30 seconds, compSales should stop increasing
            //After 31 seconds, alert "Time's up + results":
                //if dwightSales > compSales, alert "You beat me. You are the superior being." + show image of happy Dwight
                //if compSales > dwightSales, alert "I am the superior being." + show image of sad Dwight
                //if compSales === dwightSales, alert, "Let's call it even, shall we?"
            //When game is over, sell button and "Get selling!" (AKA ".ready") should disappear; timer should change to result ("Dwight/the Computer is the winner") 
            //"Try again" button should appear (when clicked, page should reload)
            
    let compSales = 0;
    let dwightSales = 0;
    let timer = 30;

    const salesResults = function(compSalesPerSec) {
        $(".easy, .medium, .hard").hide();
        $sell.addClass("show-sell");
        $ready.text("Get selling!");
        timerCountdown = setInterval(function() {
            timer -= 1;
            if (timer <= 0) {
                timer = 0;
            }
            $("#timer").text(timer);
        }, 1000);
        salesInterval = setInterval(function() {
            compSales += compSalesPerSec;
            $("#comp-sales").text(compSales);
        }, 1000);
        setTimeout(function() {
            clearInterval(salesInterval)
        }, 30000);
        setTimeout(function() {
            if (dwightSales > compSales) {
                alert("Time's up! You beat me. You are the superior being. Congratulations, Mr. Schrute.");
                $(".dwightHappy").addClass("show-image");
                $timer.text("Dwight is the winner.");
            } else if (compSales > dwightSales) {
                alert("Time's up! I am the superior being. I was programmed to destroy you when it comes to selling paper.");
                $(".dwightSad").addClass("show-image");
                $timer.text("The Computer is the winner.");
            } else if (dwightSales === compSales) {
                alert("Time's up! Let's call it even, shall we? We have both mastered the art of sales.");
                $(".dwightDisappoint").addClass("show-image");
                $timer.text("It's a tie. 👔");
            };
            $sell.hide();
            $ready.hide();
            $refresh.addClass("show-refresh");
        }, 31000);
    };


    //EASY
    $(".easy").on("click", function() {
        salesResults(3);
    });


    //MEDIUM
    $(".medium").on("click", function() {
        salesResults(5);
    });

    //HARD
    $(".hard").on("click", function() {
        salesResults(8);
    });


    //Every time sell button is clicked, dwightSales should increase by 1.
    $sell.on("click", function() {
        dwightSales += 1;
        $("#dwight-sales").text(dwightSales);
    });


    //When try again button is clicked, refresh the page.
    $refresh.on("click", function() {
        location.reload();
    });

})