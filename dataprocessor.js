/**
 * Created by amdudda on 2/9/16.
 */


function parseData(repoData) {
    var numcols = 3;
    var output = "";
    for (var i = 0; i < repoData.length; i++) {
        if (i % numcols == 0) output += "<div class='row'>"; // start a new row
        output += '<div class="col-sm-4">';  // each project gets its only happy div container
        // also add a pushpin to starred projects.
        if (repoData[i].stargazers_count > 0) output += "<span class='glyphicon glyphicon-pushpin'></span> "
        output += "<a href='" + repoData[i].html_url + "' target='new'>";
        output += repoData[i].name;
        output += "</a>";
        output += "<p class='sommaire'>" + repoData[i].description + "</p>";
        output += "<p class='jour'>Last push: " + repoData[i].pushed_at.substring(0,10) + "</p>";
        output += '</div>';
        if (i % numcols == numcols - 1) output += "</div>";  // end a row
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
    langPara.innerText = "Looking for a specific language?  Select a language:";
    var insertWhere = document.getElementById("details");
    var langlist = getLanguages(repoData);

    // create a drop-down list to select language to filter on
    var langDropDownList = document.createElement("select");
    langDropDownList.name = "selLanguage";
    langDropDownList.id = "selLanguage";
    // put "all languages" option at the top
    var allOpt = document.createElement("option");
    allOpt.value = "All";
    allOpt.innerText = "All";
    langDropDownList.appendChild(allOpt);
    // then add the rest of them
    for (var k = 0; k < langlist.length; k++) {
        var langName = langlist[k];
        var langOption = document.createElement("option");
        langOption.value = langName;
        langOption.innerText = langName;
        langDropDownList.appendChild(langOption);
    }
    // create a button that updates the page contents
    var filterLanguageButton = document.createElement("button");
    filterLanguageButton.innerText = "Filter by Language";
    filterLanguageButton.setAttribute("onclick", "filterRepos();");

    // append the various elements in the appropriate order
    langPara.appendChild(langDropDownList);
    langPara.appendChild(filterLanguageButton);
    insertWhere.appendChild(langPara);
}

function loadSortOptions() {
    var insertWhere = document.getElementById("details");
    var sortDropDownList = document.createElement("select");
    sortDropDownList.id = "sortBy";
    sortDropDownList.name = "sortBy";
    var sortOptions = {"name":"Name", "pushed_at": "Last Push", "stargazers_count": "Starred" };
    // create the options for the drop-down list
    for (key in sortOptions) {
        var sortOption = document.createElement("option");
        console.log(key);
        sortOption.value = key;
        sortOption.innerText = sortOptions[key];
        sortDropDownList.appendChild(sortOption);
    }
    // create a button that updates the page contents
    var sortByButton = document.createElement("button");
    sortByButton.innerText = "Sort the Repositories";
    sortByButton.setAttribute("onclick", "sortRepos();");

    // and insert the dropdown list & button.
    insertWhere.appendChild(sortDropDownList);
    insertWhere.appendChild(sortByButton);
}

var filteredRepoList = [];  // stores the filter results for later sorting.
function filterRepos() {
    // this runs through the stored results and replaces contents of web page with only code using the selected language.
    // build our list of affected repos
    filteredRepoList = [] // reset repolist to be empty or things get weird.
    var langToShow = document.getElementById("selLanguage").value;
    if (langToShow == "All") {
        for (var k = 0; k < jsondata.length; k++) {
            filteredRepoList.push(jsondata[k]);
        }
    } else {
        for (var k = 0; k < jsondata.length; k++) {
            if (jsondata[k].language == langToShow) {
                filteredRepoList.push(jsondata[k]);
            }
        }
    }
    // then rebuild the projects list
    document.getElementById("projects").innerHTML = parseData(filteredRepoList);
}

// TODO: add ability to change sort order.  By name, by date, or by starred.
// I'll need to be able to distinguish whether to use jasondata JSON data or filteredRepoList.  (May need to make fRL global?)

function sortRepos() {
    // if we don't have an existing filter in place, use jsondata as our list of elements
    if (filteredRepoList.length == 0) {
        for (var m = 0; m < jsondata.length; m++) {
            filteredRepoList[m] = jsondata[m];
        }
    }

    // we'll need to do different things based on which sort has been selected.
    var sortBy = document.getElementById("sortBy").value;
    alert(sortBy);
    /*
    I think the code from here might do the trick: http://www.levihackwith.com/code-snippet-how-to-sort-an-array-of-json-objects-by-property/
    The three elements all are conveniently sortable by their naive data type.
    I kept the function name, so see below for the appropriated code.
    */
    if (sortBy == "name") {
        filteredRepoList.sort(sortAscByProperty(sortBy));
    } else {
        filteredRepoList.sort(sortDescByProperty(sortBy));
    }
    // then rebuild the projects list
    document.getElementById("projects").innerHTML = parseData(filteredRepoList);
}

function sortAscByProperty(property) {
    'use strict';
    return function (a, b) {
        var sortStatus = 0;
        if (a[property] < b[property]) {
            sortStatus = -1;
        } else if (a[property] > b[property]) {
            sortStatus = 1;
        }

        return sortStatus;
    };
}


function sortDescByProperty(property) {
    // same code as above, but returns results in descending order.
    'use strict';
    return function (a, b) {
        var sortStatus = 0;
        if (a[property] > b[property]) {
            sortStatus = -1;
        } else if (a[property] < b[property]) {
            sortStatus = 1;
        }

        return sortStatus;
    };
}