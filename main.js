// GetStarted - A simple responsive Startpage
// Author: MrAlpha786 (github.con/MrAlpha786)

// Username
document.getElementById("username").innerHTML = userName;

// Searchbar
const searchEngines = {
    Google: "https://www.google.com/search?q=",
    DuckDuckGo: "https://duckduckgo.com/?q=",
    Bing: "https://www.bing.com/search?q=",
    Yahoo: "https://search.yahoo.com/search?p="
};
const searchField = document.getElementById("search-field");
const clearFieldButton = document.getElementById("clear-field");


if (!Object.keys(searchEngines).includes(searchEngine)) {
    searchEngine = "Google"
}

var searchUrl = searchEngines[searchEngine];

searchField.placeholder = "Search " + searchEngine + "...";

// Check searchbar for keystrokes
searchField.addEventListener("keyup", function(event) {

    // If there is some text in searchbar, display clear-field button
    if (searchField.value != "") {
        clearFieldButton.style.visibility = "visible";
    } else {
        clearFieldButton.style.visibility = "hidden";
    }

    // If last keystroke was "Enter" treat it as search-button is clicked
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search-button").click();

    }
});

// Clear text and keep searchbar in focus
function clearField() {
    searchField.value = "";
    clearFieldButton.style.visibility = "hidden";
    searchField.focus()
}

// Search query
function search() {
    if (searchField.value != "") {
        var val = searchField.value;
        window.open(searchUrl + val, "_self");
    }
    clearField();
}


// Show Scrollbar on scrolling
window.addEventListener('scroll', function showScrollbar(e) {
    if (e.target.classList.contains("visible-scrollbar") === false) {
        e.target.classList.add("visible-scrollbar");

        // Hide Scrollbar after 1.5s
        setTimeout(hideScrollbar, 1500, e);
    }
}, true);

// Hide Scrollbar
function hideScrollbar(e) {
    e.target.classList.remove("visible-scrollbar");
}

// Check if dark-mode is enabled
if(localStorage.getItem('darkMode') == 'enabled'){
    document.body.classList.toggle("dark-mode");
}

// Toggle dark-mode of body
function toggleMode() {
    document.body.classList.toggle("dark-mode");

    // Save mode preference to local storage
    // It will keep dark-mode persistant across browser  sessions
    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem('darkMode', 'enabled');
    }else{
        localStorage.setItem('darkMode', 'disabled');
    }
}

//Bookmark Table
var tabs = document.querySelectorAll('.tab');
var contents = document.querySelectorAll('.content');

for (let i=0; i<tabs.length; i++){

    tabs[i].innerHTML = cards[i].name;

    var sites = Object.keys(cards[i].bookmarks);
    //Populate content with bookmarks
    for (let j=0; j<sites.length; j++){

        var a_link = document.createElement('a');
        a_link.innerHTML = sites[j];
        a_link.href = cards[i].bookmarks[sites[j]];

        contents[i].appendChild(a_link);
    }

    // Make tab active on mouse click
    tabs[i].addEventListener('mouseenter', function(){
        for (let j=0; j<tabs.length; j++){
            tabs[j].classList.remove('active');
        }
        tabs[i].classList.add('active');

        for (let j=0; j<contents.length; j++){
            contents[j].classList.remove('active');
        }
        contents[i].classList.add('active');
    })
}






