/**
 * Created by amdudda on 2/11/16.
 */

// this code generates the spirograph image
var t=0;
var colors= ["red","orange","yellow","green","blue","purple","black","grey"];
do {
    myCanvas = document.getElementById("spiro");
    var ctx = myCanvas.getContext("2d");
    ctx.beginPath();
    startPt = getXYcoords(t);
    endPt = getXYcoords(t+1);
    ctx.moveTo(startPt.xCoord,startPt.yCoord);
    ctx.lineTo(endPt.xCoord,endPt.yCoord);
    ctx.strokeStyle =  "crimson"; //colors[ t % colors.length];
    ctx.stroke();
    t++;
} while (t < 900);

function getXYcoords(t) {
//        returns xy coordinates based on angle t - see Wikipedia article on "Spirograph" at https://en.wikipedia.org/wiki/Spirograph
    var foo = 0;
    var R = 100; // radius of outer circle
    var r = 10; // radius of inner circle
    var p = 30; // rho; distance of pen from origin of r inside inner circle
    foo++;
    // t = angle between y axis and line from orgin to r.

    var l = p/r
    var k = r/R
    // therefore
    // p/R = l*k

    //(x,y) for angle t is:
    x = R * ( ((1-k)*Math.cos(t)) + l*k*Math.cos( ( (1-k) / k) * t ) ) + 100;
    y = R * ( ((1-k)*Math.sin(t)) + l*k*Math.sin( ( (1-k) / k) * t ) ) + 100;

    return {xCoord: x, yCoord: y};
}