/**
 * Created by amdudda on 2/11/16.
 */

// this code generates the spirograph image
var t=0;
var msec = 5; // time between drawing each line of the spirograph image

// let's use timers to make the drawing of the spirograph lines visible, instead of more-or-less instantly being completed.
// See http://www.w3schools.com/js/js_timing.asp for details on how this works.
var draw = setInterval(drawSpirograph,msec);
var stop = setTimeout(function() { clearInterval(draw); },msec*366);  // 365 degrees in a full circle; adding 1 just to ensure it goes all the way around

function getXYcoords(t) {
//        returns xy coordinates based on angle t - see Wikipedia article on "Spirograph" at https://en.wikipedia.org/wiki/Spirograph

    var R = 100; // radius of outer circle
    var r = 10; // radius of inner circle
    var p = 30; // rho; distance of pen from origin of r inside inner circle

    // t = angle between y axis and line from orgin to r.

    var l = p/r;
    var k = r/R;
    // therefore
    // p/R = l*k

    //(x,y) for angle t is:
    x = R * ( ((1-k)*Math.cos(t)) + l*k*Math.cos( ( (1-k) / k) * t ) ) + 100;
    y = R * ( ((1-k)*Math.sin(t)) + l*k*Math.sin( ( (1-k) / k) * t ) ) + 100;

    return {xCoord: x, yCoord: y};
}

// this function draws the spirograph image

function drawSpirograph() {
    myCanvas = document.getElementById("spiro");
    var ctx = myCanvas.getContext("2d");
    ctx.beginPath();
    startPt = getXYcoords(t);
    endPt = getXYcoords(t + 1);
    ctx.moveTo(startPt.xCoord, startPt.yCoord);
    ctx.lineTo(endPt.xCoord, endPt.yCoord);
/*  TODO: why is this not working?
    var drawingColor = document.querySelector(".jumbotron").style.color;
    console.log(drawingColor);  */
    ctx.strokeStyle = "#00072B";  // drawingColor;
    ctx.stroke();
    t++;
    return ctx;
}