/**
 * Created by amdudda on 2/9/16.
 */


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

    return output;
}

function getLanguages(repository) {
    // this retrieves all the different coding languages used
    var langs = [];
    for (var j = 0; j < repository.length; j++) {
        curRepo = repository[j];
        if (langs.indexOf(curRepo.language) == -1) {  // http://www.w3schools.com/jsref/jsref_indexof_array.asp
            langs.push(curRepo.language);
        }
    }
    return langs;
}

function loadLanguages(repoData) {
// can we add the list of languages to the web page?
    var langPara = document.createElement("p");
    langPara.innerText = "Filter by language?  The list is: * "
    var insertWhere = document.getElementById("details");
    var langlist = getLanguages(repoData);
    for (var k = 0; k< langlist.length; k++) {
        langPara.innerText += langlist[k] + " * ";
    }
    insertWhere.appendChild(langPara);
}