// GetStarted - A simple responsive Homepage
// Author: MrAlpha786 (github.con/MrAlpha786)

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

// Searchbar
const searchField = document.getElementById("search-field");
const clearFieldButton = document.getElementById("clear-field");

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

//TODO Implement multiple search engine
var searchUrl = "https://duckduckgo.com/?q=";

// Search query
function search() {
    if (searchField.value != "") {
        var val = searchField.value;
        window.open(searchUrl + val);
    }
    clearField();
}

//Link Table

//Set tab and corresponding content as active on mouseclick
var tabs = document.querySelectorAll('.tab:not(#bottom-tabs .tab)');
var contents = document.querySelectorAll('.content');

for (let i=0; i<tabs.length; i++){
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

//TODO Implement Custom Links
var links_var = [
    [   // General
        ['google', 'aaa'],
        ['drive', 'aaa'],
        ['maps', 'aaa'],
        ['photos', 'aaa'],
        ['mega', 'aaa'],
    ],
    [   // Teck
        ['github', 'aaa'],
        ['freenode', 'aaa'],
        ['stackoverflow', 'aaa'],
        ['github', 'aaa'],
        ['freenode', 'aaa'],
    ],
    [   // Fun
        ['subreddit', 'aaa'],
        ['youtube ', 'aaa'],
        ['spotify', 'aaa'],
        ['amazon', 'aaa'],
        ['dummysite', 'aaa'],
    ],
    [   // Social
        ['youtube', 'https://www.youtube.com'],
        ['twitter', 'https://twitter.com'],
        ['imgur', 'https://imgur.com/'],
        ['facebook', 'https://www.facebook.com'],
        ['reddit', 'https://www.reddit.com'],
    ],
]

//Populate content with links and add event  listener
var contents = document.querySelectorAll('.content');
for (let i=0; i<contents.length; i++){
    for (let j=0; j<links_var[i].length; j++){

        var a_link = document.createElement('a');
        a_link.setAttribute('data-id', 'i' + i + '_j' + j);
        a_link.innerHTML = links_var[i][j][0];

        if (typeof links_var[i][j][1] == 'string'){

            a_link.href = links_var[i][j][1];
            contents[i].appendChild(a_link);
        }
        else {

            contents[i].appendChild(a_link);
            for (let k=0; k<links_var[i][j][1].length; k++){
                document.querySelector('a[data-id="i' + i + '_j' + j + '"]').setAttribute('data-link_' + k, links_var[i][j][1][k][1]);
            }
            document.querySelector('a[data-id="i' + i + '_j' + j + '"]').addEventListener('click', function(event){
                for (let k=0; k<links_var[i][j][1].length; k++){
                    event.preventDefault();
                    window.open(document.querySelector('a[data-id="i' + i + '_j' + j + '"]').getAttribute('data-link_' + k));
                }
            })
        }
    }
}



