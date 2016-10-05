//globals
var frogStartx, frogStarty;

// init()
// Called when page loads, handles positioning of elements
function init(){
    console.log('v2');
    for(var i=0; i < document.getElementsByClassName("background").length; i++) {
        document.getElementsByClassName("background")[i].style.top = i*50;
    }
    for(var i=0; i < document.getElementsByClassName("logs").length; i++) {
        document.getElementsByClassName("logs")[i].style.top = i*50 + 50;
    }
    for(var i=0; i < document.getElementsByClassName("objective").length; i++) {
        document.getElementsByClassName("objective")[i].style.left = 50 * i - 25;
        if (!(i % 2))
            document.getElementsByClassName("objective")[i].style.backgroundColor = "gray";
    }
    randomizeCars();
    randomizeLogs();
    frogStartx = getStyle('frog', "left");
    frogStarty = getStyle('frog', "top");

    // Reset Button
    document.getElementById('resetButton').addEventListener('click', function(){
        fade('menu', true);
    });

    // Menu
    // By: ronald lee
    document.getElementById('playGame').addEventListener('click', function(){
        document.getElementById('resetButton').style.display = 'inline';
        fade('menu');
    });

    for(var i=0; i < document.getElementsByClassName("menuButtons").length; i++) {
        document.getElementsByClassName("menuButtons")[i].addEventListener("mouseover", function(){
            this.style.height = getStyle(this.id, "height") * 1.5;
            this.style.width = getStyle(this.id, "width") * 2;
        });
        document.getElementsByClassName("menuButtons")[i].addEventListener("mouseleave", function(){
            if (this.style.height != "172px")
                this.style.height = getStyle(this.id, "height") / 1.5;
                this.style.width = getStyle(this.id, "width") / 2;
        });
    }

    //Settings
    document.getElementById('settings').addEventListener('click', function(){
        for(var i=0; i < document.getElementsByClassName("menuButtons").length; i++) {
            document.getElementsByClassName("menuButtons")[i].style.display = "none";
        }
        for(var i=0; i < document.getElementsByClassName("settingsButtons").length; i++) {
            document.getElementsByClassName("settingsButtons")[i].style.display = "inline";
        }
        document.getElementById("backButton").style.display = "inline";
    });

    //Hardcore Button
    document.getElementById('hardcoreButton').addEventListener('click', function(){
        if(this.value == "Hardcore Mode Off"){
            this.value = "Hardcore Mode On";
        } else {
            this.value = "Hardcore Mode Off";
            for(var i=0; i < document.getElementsByClassName("objective").length; i++) {
                document.getElementsByClassName("objective")[i].style.left = 0;
                document.getElementsByClassName("objective")[i].style.left = 50 * i - 25;
                if (!(i % 2))
                    document.getElementsByClassName("objective")[i].style.backgroundColor = "gray";
            }
        }
        fullReset('scoreCounter', 'livesCounter', 'frog', 'objective');
    });

    //Credits
    document.getElementById('creditsButton').addEventListener('click', function(){
        for(var i=0; i < document.getElementsByClassName("menuButtons").length; i++) {
            document.getElementsByClassName("menuButtons")[i].style.display = "none";
        }
        document.getElementById("credits").style.display = "inline";
        document.getElementById("backButton").style.display = "inline";
    });

    //Instructions
    document.getElementById('howToPlay').addEventListener('click', function(){
        for(var i=0; i < document.getElementsByClassName("menuButtons").length; i++) {
            document.getElementsByClassName("menuButtons")[i].style.display = "none";
        }
        document.getElementById("instructions").style.display = "inline";
        document.getElementById("backButton").style.display = "inline";
    });

    //Back buttons
    document.getElementById('backButton').addEventListener('click', function(){
        for(var i=0; i < document.getElementsByClassName("settingsButtons").length; i++) {
            document.getElementsByClassName("settingsButtons")[i].style.display = "none";
        }
        for(var i=0; i < document.getElementsByClassName("menuButtons").length; i++) {
            document.getElementsByClassName("menuButtons")[i].style.display = "inline";
        }
        document.getElementById("credits").style.display = "none";
        document.getElementById("instructions").style.display = "none";
        this.style.display = "none";
    });
}

// fade(string element, boolean fade)
// fades in/out the element of choice
// by: ronald lee
function fade(elem, reverseFade){
    elem = document.getElementById(elem);
    var timer, opacity;

    if(reverseFade == true){
        if(elem.style.opacity==0){return;}
        opacity = 0.1;
        elem.style.display = '';
        timer = setInterval(function (){
            if (opacity >= 1){
                if(elem.id == 'menu'){
                    fullReset('scoreCounter', 'livesCounter', 'frog', 'objective');
                    document.getElementById("resetButton").style.display = "none";
                }
                clearInterval(timer);
            }
            elem.style.opacity = opacity;
            opacity += opacity * 0.1;
        }, 10);

    } else {
        if(elem.style.opacity==1){return;}
        opacity = 1;
        timer = setInterval(function () {
            if (opacity <= 0.1){
                clearInterval(timer);
                elem.style.display = 'none';
            }
            elem.style.opacity = opacity;
            opacity -= opacity * 0.1;
        }, 10);
    }
}

// randomizeLogs()
// randomizes velocity of logs
// by: justin lee
function randomizeLogs() {
    for(var i=0; i < document.getElementsByClassName('streams').length; i++) {
        var r = randomInt(1,4);
        for (var j = 0; j < document.getElementsByClassName('stream' + (i + 1)).length; j++) {
            document.getElementsByClassName('stream' + (i + 1))[j].style.top = i * 50 + 50;
            for (var k = 0; k < document.getElementsByClassName('stream' + (i + 1)).length; k++) {
                document.getElementsByClassName('stream' + (i + 1))[k].style.left = 200 * k;
            }
            if((i + 1) % 2){
                document.getElementsByClassName('stream' + (i + 1))[j].speed = -1 * r;
            } else {
                document.getElementsByClassName('stream' + (i + 1))[j].speed = r;
            }
        }
    }
}

// randomizeCars()
// randomizes velocity of cars
// by: justin lee
function randomizeCars() {
    for(var i=0; i < document.getElementsByClassName('lanes').length; i++) {
        var r = randomInt(1,2);
        for (var j = 0; j < document.getElementsByClassName('lane' + (i + 1)).length; j++) {
            document.getElementsByClassName('lane' + (i + 1))[j].style.top = i * 50 + 352.5;
            for (var k = 0; k < document.getElementsByClassName('lane' + (i + 1)).length; k++) {
                document.getElementsByClassName('lane' + (i + 1))[k].style.left = 200 * k;
            }
            if((i + 1) % 2){
                document.getElementsByClassName('lane' + (i + 1))[j].speed = -1 * r;
            } else {
                document.getElementsByClassName('lane' + (i + 1))[j].speed = r;
            }
        }
    }
}

// int randomInt(int min, int max)
// Returns a random number between min and max (inclusive)
// by: jason wong
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// bool checkForCollision(string element1, string element2)
// Returns true if a collision is detected between element1 and element2
// by: everyone
function checkForCollision(e1, e2){
	var e1x = getStyle(e1, "left");
	var e1y = getStyle(e1, "top");
	var e1w = getStyle(e1, "width");
	var e1h = getStyle(e1, "height");
	var e2x = getStyle(e2, "left");
	var e2y = getStyle(e2, "top");
	var e2w = getStyle(e2, "width");
	var e2h = getStyle(e2, "height");
	if (!((e1x + e1w) < e2x || e1x > (e2x + e2w) || (e1y + e1h) < e2y || e1y > (e2y + e2h))){
	    return true;
	} else {
    	return false;
	}
}

// addToPoints(int points, string element)
// Adds a number of points to the score counter
// by: everyone
function addToPoints(amtOfPointsToAdd, pointsElement){
    pointsElement.innerHTML = parseInt(pointsElement.innerHTML, 10) + amtOfPointsToAdd;
}

// int getStyle(string element, string style)
// Shortcut function to return the computed style of an element
// by: everyone
function getStyle(elem, style){
	return parseInt(window.getComputedStyle(document.getElementById(elem),null).getPropertyValue(style), 10);
}

// move(string element, int vspeed, int hspeed)
// Moves a given element a given vertical and horizontal direction
// by: jason wong
function move(div, vspeed, hspeed){
    var elem = document.getElementById(div);

    if ((getStyle(elem.id, "width") + getStyle(elem.id, "left")) >= getStyle('game', "width") + getStyle('game', "left") + getStyle(elem.id, 'width') && vspeed > 0) {
        if (elem.id == "frog")
            elem.style.left = getStyle('game', "left") + getStyle('game', "width") - getStyle(elem.id, "width");
        else
            elem.style.left = getStyle('game', "left") - getStyle(elem.id, 'width');
        return 1;
    }
    else if ((getStyle(elem.id, "left")) + getStyle(elem.id, "width") <= getStyle('game', "left") && vspeed < 0) {
        if (elem.id == "frog")
            elem.style.left = getStyle('game', "left");
        else
            elem.style.left = getStyle('game', "left") + getStyle('game', "width") + vspeed + getStyle(elem.id, "width");
        return 1;
    }

    if ((getStyle(elem.id, "height") + getStyle(elem.id, "top")) >= getStyle('game', "height") + getStyle('game', "top") && hspeed > 0) {
        if (elem.id == 'frog')
            elem.style.top = getStyle('game', "top") + getStyle('game', "height");
        else
            elem.style.top = getStyle('game', "top") + getStyle('game', "height") - getStyle(elem.id, "height");
        return 0;

    } else if ((getStyle(elem.id, "top")) <= getStyle('game', "top") && hspeed < 0) {
        elem.style.top = getStyle('game', "top");
        return 0;
    }

    elem.style.left = getStyle(div,"left") + (vspeed) + "px";
    elem.style.top = getStyle(div,"top") + (hspeed) + "px";
}

// resetFrog(string frogID, string livesCounterID, bool win)
// resets the frog to the starting position and adjusts lives when win is false
// by jason wong
function resetFrog(frogID, livesCounterID, win){
    if (!win)
        document.getElementById(livesCounterID).innerHTML = document.getElementById(livesCounterID).innerHTML - 1;
    document.getElementById(frogID).style.top = frogStarty;
    document.getElementById(frogID).style.left = frogStartx;
    document.getElementById("timer").style.width = 1000;
}

// fullReset(string scoreCounterID, string livesCounterID, string frogID, string objectiveClassID)
// Resets the game to default settings and rerandomizes car and log velocities
// by: ronald lee
function fullReset(scoreCounterID, livesCounterID, frogID, objectiveClassID) {
    document.getElementById(scoreCounterID).innerHTML = 0;
    document.getElementById(livesCounterID).innerHTML = 5;
    resetFrog(frogID,livesCounterID, true);
    for(var i = 0; i < document.getElementsByClassName(objectiveClassID).length; i++){
        if (i%2)
            document.getElementsByClassName(objectiveClassID)[i].style.backgroundColor = "skyblue";
    }
    randomizeCars();
    randomizeLogs();
}

// checkForObjectiveCollision(string frogId, string objectiveClass, string scoreCounterId)
// checks if the frog is touching the objective or not
// by: justin lee
function checkForObjectiveCollision(frogId,objectiveClass,scoreCounterId){
    for(var i = 0; i < document.getElementsByClassName(objectiveClass).length; i++){
        if (checkForCollision(document.getElementsByClassName(objectiveClass)[i].id, 'frog')) {
            if (document.getElementsByClassName(objectiveClass)[i].style.backgroundColor != "gray" && document.getElementsByClassName('objective')[i].style.backgroundColor != "rgb(10, 70, 0)") {
                addToPoints(100, document.getElementById(scoreCounterId));
                document.getElementsByClassName(objectiveClass)[i].style.backgroundColor = "#0A4600";
                resetFrog(frogId, 'livesCounter', true);
            } else {
                resetFrog(frogId, 'livesCounter', false);
            }
        }
    }
}

// checkForRiverCollision(string frogId, string streamsClass, string logsClass)
// checks if the frog is touching logs, or the river, will kill the frog if touching river
// by: jason wong
function checkForRiverCollision(frogId, streamsClass, logsClass){
    var collidingWithRiver = false;
    var logThatTheFrogIsCurrentlyStandingOnTopOf = -1;
    for(var i=0; i < document.getElementsByClassName(streamsClass).length; i++){
        if (checkForCollision(document.getElementsByClassName(streamsClass)[i].id, frogId))
            collidingWithRiver = true;
    }
    for(var i = 0; i < document.getElementsByClassName(logsClass).length; i++){
        if (checkForCollision(document.getElementsByClassName(logsClass)[i].id, frogId))
            logThatTheFrogIsCurrentlyStandingOnTopOf = document.getElementsByClassName(logsClass)[i];
    }
    if (collidingWithRiver) {
        if (logThatTheFrogIsCurrentlyStandingOnTopOf != -1) {
            move(frogId, logThatTheFrogIsCurrentlyStandingOnTopOf.speed, 0);
            logThatTheFrogIsCurrentlyStandingOnTopOf = -1;
        } else {
            resetFrog(frogId,'livesCounter', false);
        }
    }
    collidingWithRiver = false;
}

// winCheck(string objectiveID)
// Checks if all objectives have been met and resets the game
// by: ronald lee
function winCheck(objectiveClassID){
    var check = false;
    for(var i = 0; i < document.getElementsByClassName(objectiveClassID).length; i++){
        if (i%2){
            if (document.getElementsByClassName(objectiveClassID)[i].style.backgroundColor != "rgb(10, 70, 0)"){
                return null;
            } else {
                check = true;
            }
        }
    }
    if(check == true){
        alert('You won the game!');
        fullReset('scoreCounter', 'livesCounter', 'frog', 'objective');
    }
}

// Special functions //

// reverseCars(string streams, string lane)
// Has a 1 in 5 chance of reversing the velocities of the cars
// by: jason wong
function reverseCars(streamsClassId, lane){
    for(var i=0; i < document.getElementsByClassName(streamsClassId).length; i++) {
        var r = randomInt(1, 5);
        for (var k = 0; k < document.getElementsByClassName(lane + (i + 1)).length; k++) {
            if (r == 1)
                document.getElementsByClassName(lane + (i + 1))[k].speed *= -1;
        }
    }
}
// bool checkForHardMode(string buttonID)
// Returns true if hard mode is enabled
// by: jason wong
function checkForHardMode(hardcoreButtonId) {
    return document.getElementById(hardcoreButtonId).value == "Hardcore Mode On";
}

window.addEventListener("load", function(){
    init();
    window.setInterval(function(){
        //moves the cars at their set speed
        for(var i = 0; i < document.getElementsByClassName('cars').length; i++){
            move(document.getElementsByClassName('cars')[i].id, document.getElementsByClassName('cars')[i].speed, 0);
        }

        //moves the logs at their set speed
        for(var i = 0; i < document.getElementsByClassName('logs').length; i++){
            move(document.getElementsByClassName('logs')[i].id, document.getElementsByClassName('logs')[i].speed, 0);
        }

        if (parseInt(document.getElementById("livesCounter").innerHTML, 10) == 0){
            alert('You lost all your lives.');
            fullReset('scoreCounter', 'livesCounter', 'frog', 'objective');
        }

        winCheck('objective');
        checkForRiverCollision('frog','streams', 'logs');
        checkForObjectiveCollision('frog','objective','scoreCounter');

        //kills frog if you run of screen
        if (!checkForCollision('game', 'frog')) {
            resetFrog('frog','livesCounter', false);
        }

        for(var i=0; i < document.getElementsByClassName("cars").length; i++) {
            if (checkForCollision(document.getElementsByClassName("cars")[i].id, "frog")) {
                resetFrog('frog', 'livesCounter', false);
            }
        }

        if(checkForHardMode('hardcoreButton')){
            for(var i=0; i<document.getElementsByClassName('objective').length; i++){
                move(document.getElementsByClassName('objective')[i].id, 4, 0);
            }
        }
    },16);

    window.setInterval(function() {
        if (document.getElementById("menu").style.display == "none") {
            document.getElementById("timer").style.width = getStyle("timer","width") - 1;
            if (getStyle("timer","width") <= 0){
                document.getElementById("timer").style.width = getStyle("timer","width") + 1000;
                resetFrog('frog', 'livesCounter', false);
            }
        }
    }, 30);

    document.addEventListener("keydown", function(e){
        if (document.getElementById("menu").style.display == "none") {
            switch(e.keyCode){
                //W UP
                case 87:
                case 38:
                    move('frog', 0, -50);
                    addToPoints(10, document.getElementById('scoreCounter'));
                    if(checkForHardMode('hardcoreButton')){
                        reverseCars('streams', 'lane');
                    }
                    break;
                //A LEFT
                case 65:
                case 37:
                    move("frog", -50, 0);
                    break;
                //S DOWN
                case 83:
                case 40:
                    move("frog", 0, 50);
                    break;
                //D RIGHT
                case 68:
                case 39:
                    move("frog", 50, 0);
                    break;
                case 27:
                    fade('menu',true);
                    break;
            }
            // prevent page scrolling with arrow keys on smaller monitors
            e.preventDefault();
        }
    });
});
