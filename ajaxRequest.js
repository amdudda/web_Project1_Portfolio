/**
 * Created by amdudda on 2/9/16.
 */
/*
Cadged from http://www.javascriptkit.com/dhtmltutors/ajaxgetpost4.shtml
Comments not in original are prefixed with "AMD:"
*/
var jsondata = [];  // AMD: make this global so code can work with it
var pages_processed = 0;

function ajaxRequest(){
    var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"]; //activeX versions to check for in IE
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

var mygetrequest=new ajaxRequest();
mygetrequest.onreadystatechange=function(){
    if (mygetrequest.readyState==4){
        if (mygetrequest.status==200 || window.location.href.indexOf("http")==-1){
            //jsondata=eval("("+mygetrequest.responseText+")"); //retrieve result as an JavaScript object

            /* AMD: removed a chunk of code and inserted the stuff I need*/
            console.log(mygetrequest.getAllResponseHeaders());
            var linkdata = (mygetrequest.getResponseHeader("Link").split(","));  /* I CAN PARSE THIS INFO TO FIGURE OUT WHETHER NEXT == LAST */
            var num_link_records = linkdata.length -1;
            var total_pages = (linkdata[num_link_records].split("=")[1].split(">")[0]);  // this parses out the total number of pages that make up my repository listing
// and then change the next bit so that it fires off a bunch of async requests that collaboratively build my data object
            // before building my web page
            /*document.getElementById("projects").innerHTML=parseData(jsondata);
            loadLanguages(jsondata);
            loadSortOptions();*/
            for (i=1; i<=total_pages; i++) {
                fetchRepoData(i,total_pages);
            }
            /* AMD: end of replacement code*/
        }
        else{
            alert("An error has occured making the request")
        }
    }
};

// for now, the 100 per page will get all my existing repos.
// DONE: think about how to get all repos as my collection of repos gets larger: https://developer.github.com/v3/
// also consider this info: http://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array
// and this looks useful, if we can parse the headers somehow: https://developer.github.com/guides/traversing-with-pagination/
mygetrequest.open("GET", "https://api.github.com/users/amdudda/repos", true);  // ?per_page=100
mygetrequest.send(null);

function fetchRepoData(pagenum, numrecords) {
    var current_page = new ajaxRequest();
    var page_to_fetch = "https://api.github.com/users/amdudda/repos?page=" + pagenum;
    current_page.open("GET", page_to_fetch, true);
    current_page.send(null);
    // and this actually processes the data once it comes back
    current_page.onreadystatechange=function() {
        if (current_page.readyState == 4) {
            if (current_page.status == 200 || window.location.href.indexOf("http") == -1) {
                var pagedata = eval("(" + current_page.responseText + ")"); //retrieve result as an JavaScript object
                // and add it to the array of JSON objects
                Array.prototype.push.apply(jsondata,pagedata);
                console.log("json data has " + jsondata.length + "elements")
            }
            else {
                alert("An error has occurred processing page " + pagenum);
            }
            //  increment the number of pages processed
            pages_processed++;
            // and if we've processed all the pages, build my site
            if (pages_processed == numrecords) {
                document.getElementById("projects").innerHTML = parseData(jsondata);
                loadLanguages(jsondata);
                loadSortOptions();
            }
        }
    }
}