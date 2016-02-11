/**
 * Created by amdudda on 2/9/16.
 */
/*
Cadged from http://www.javascriptkit.com/dhtmltutors/ajaxgetpost4.shtml
Comments not in original are prefixed with "AMD:"
*/

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
            var jsondata=eval("("+mygetrequest.responseText+")") //retrieve result as an JavaScript object
/*// AMD: don't need this               var rssentries=jsondata.items;
            var output='<ul>';
            for (var i=0; i<jsondata.length; i++){
                output+='<li>';
// AMD: modified code to read repository data
//                   output+='<a href="'+rssentries[i].link+'">';
                output+=jsondata[i].name // +'</a>';
                output += "link: " + jsondata[i].html_url;
                output+='</li>';
            }
            output+='</ul>';*/
            var output = parseData(jsondata);
            document.getElementById("projects").innerHTML=output;
        }
        else{
            alert("An error has occured making the request")
        }
    }
}

mygetrequest.open("GET", "https://api.github.com/users/amdudda/repos", true);
mygetrequest.send(null);