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
    langPara.innerText = "Filter by language?  Select a language:";
    var insertWhere = document.getElementById("details");
    var langlist = getLanguages(repoData);
    // create a drop-down list to select language to filter on
    var langDropDownList = document.createElement("select");
    langDropDownList.name = "selLanguage";
    langDropDownList.id = "selLanguage";
    for (var k = 0; k< langlist.length; k++) {
        langName = langlist[k];
        langOption = document.createElement("option");
        langOption.value = langName;
        langOption.innerText = langName;
        langDropDownList.appendChild(langOption);
    }
    // create a button that updates the page contents
    var filterLanguageButton = document.createElement("button");
    filterLanguageButton.innerText = "Filter by Language";
    filterLanguageButton.setAttribute("onclick","filterRepos();");
    // append the various elements in the appropriate order
    langPara.appendChild(langDropDownList);
    langPara.appendChild(filterLanguageButton);
    insertWhere.appendChild(langPara);
}

function filterRepos() {
    // this runs through the stored results and replaces contents of web page with only code using the selected language.
    // build our list of affected repos
    var filteredRepoList = [];
    var langToShow = document.getElementById("selLanguage").value;  // this should work, but for some reason it doesn't.
    for (var k=0; k < jsondata.length; k++) {
        if (jsondata[k].language == langToShow) {
            filteredRepoList.push(jsondata[k]);
        }
    }

    // then rebuild the projects list
    //newText = parseData(filteredRepoList);
    document.getElementById("projects").innerHTML = parseData(filteredRepoList);
}