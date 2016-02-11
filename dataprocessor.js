/**
 * Created by amdudda on 2/9/16.
 */
var repository;

function parseData(repoData) {
    var numcols = 3;
    var output = "";
    for (var i=0; i<repoData.length; i++){
        if (i%numcols == 0) output += "<div class='row'>"; // start a new row
        output +='<div class="col-sm-4">';  // each project gets its only happy div container
        // also add a pushpin to starred projects.
        if (repoData[i].stargazers_count > 0 ) output += "<span class='glyphicon glyphicon-pushpin'></span> "
        output += "<a href='" + repoData[i].html_url + "'>";
        output+=repoData[i].name;
        output += "</a>";
        output += "<p class='summary'>" + repoData[i].description + "</p>";
        output+='</div>';
        if (i%numcols == numcols-1) output += "</div>";  // end a row
    }
    //document.write(output);
    repository = repoData;  // also turn over the retrieved data to local storage so filtering doesn't constantly call new AJAX requests.
    return output;
}

function getLanguages() {
    // this retrieves all the different coding languages used
    var langs = [];
    for (var j = 0; j < repository.length; j++) {
        curRepo = repository[j];
        if (!(curRepo.language in langs)) {
            langs.push(curRepo.language);
        }
    }
    return langs;
}

// can we add the list of languages to the web page?
alert(repository.length);
var langPara = document.createElement("p");
langPara.innerText = "Filter by language?  The list is: * "
var insertWhere = document.getElementById("details");
var langlist = getLanguages();
for (var k = 0; k< langlist.length; k++) {
    langPara.innerText += langlist[k] + " * ";
}
insertWhere.appendChild(langPara);