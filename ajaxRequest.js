/**
 * Created by amdudda on 2/9/16.
 */
/*
Cadged from http://www.javascriptkit.com/dhtmltutors/ajaxgetpost4.shtml
Comments not in original are prefixed with "AMD:"
*/
var jsondata;  // AMD: make this global so code can work with it

function ajaxRequest(){
    var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"] //activeX versions to check for in IE
    if (window.ActiveXObject){ //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
        for (var i=0; i<activexmodes.length; i++){
            try{
                return new ActiveXObject(activexmodes[i]);
            }
            catch(e){
                //suppress error
            }
        }
    }
    else if (window.XMLHttpRequest) // if Mozilla, Safari etc
        return new XMLHttpRequest();
    else
        return false;
}

var mygetrequest=new ajaxRequest()
mygetrequest.onreadystatechange=function(){
    if (mygetrequest.readyState==4){
        if (mygetrequest.status==200 || window.location.href.indexOf("http")==-1){
            jsondata=eval("("+mygetrequest.responseText+")"); //retrieve result as an JavaScript object

            /* AMD: removed a chunk of code and inserted the stuff I need*/
            var output = parseData(jsondata);
            document.getElementById("projects").innerHTML=output;
            loadLanguages(jsondata);

            /* AMD: end of replacement code*/
        }
        else{
            alert("An error has occured making the request")
        }
    }
}

mygetrequest.open("GET", "https://api.github.com/users/amdudda/repos", true);
mygetrequest.send(null);