function fetchApplications(path) {
    fetch(path)
    .then(response => response.json())
    .then(json => {
        for (i = 0; i < json.length; i++) {
            var item = document.createElement('a');
            item.href = json[i].url
            item.target = '_blank'

            if (json[i].hidden) {
                item.setAttribute('class', 'grid-item hidden');
            } else {
                item.setAttribute('class', 'grid-item');
            }

            // Add icon
            var icon = document.createElement('img');
            icon.src = 'data/icons/' + json[i].icon
            item.appendChild(icon);

            // Add text
            var text = document.createTextNode(json[i].name);
            item.appendChild(text);

            document.getElementById('applications-list').appendChild(item);
        }
    });
}

function fetchBookmarks(path) {
    fetch(path)
    .then(response => response.json())
    .then(json => {
        for (i = 0; i < json.length; i++) {
            var grid_list = document.createElement('div');
            grid_list.setAttribute('class', 'grid-list');

            // Add list title
            var title = document.createElement("h2");
            var category_name = document.createTextNode(json[i].category);
            title.appendChild(category_name);
            grid_list.appendChild(title);

            // Create list
            var list = document.createElement('ul');

            for (j = 0; j < Object.keys(json[i].links).length; j++) {
                var li = document.createElement('li');
                li.innerHTML += '<a href="' + json[i].links[j].url + '" target="_blank">' + json[i].links[j].name + '</a>';
                list.appendChild(li);
            }

            grid_list.appendChild(list);
            document.getElementById('bookmarks-list').appendChild(grid_list);
        }
    });
}

function toggleHidden() {
    var hidden_items = document.getElementsByClassName('hidden');
    var display = window.getComputedStyle(hidden_items[0], null).getPropertyValue('display');
    if (display === 'none') {
        for (i = 0; i < hidden_items.length; i++) {
            hidden_items[i].style.display = 'flex';
        }
        toggle_button.style.backgroundImage = 'url("images/hide.svg")';
    } else {
        for (i = 0; i < hidden_items.length; i++) {
            hidden_items[i].style.display = 'none';
        }
        toggle_button.style.backgroundImage = 'url("images/show.svg")';
    }
}

async function toggleButtonVisibility() {
    var current_position = window.pageYOffset;
    if (current_position > previous_position + scroll_offset) {
        toggle_button.style.bottom = button_shown_position;
    } else if (current_position < previous_position - scroll_offset // Second conditional is to prevent hiding the button
               && previous_position - current_position < 200) {     // when items are shown and the whole page is shifted
        toggle_button.style.bottom = button_hidden_position;
    }
    await new Promise(r => setTimeout(r, 250));
    previous_position = current_position;
}

//// MAIN ////
const scroll_offset = 50; // Max distance that can be scrolled without toggling button visibility
const toggle_button = document.getElementById('toggle-button');
const button_shown_position = window.getComputedStyle(toggle_button).getPropertyValue('right');
const button_hidden_position = window.getComputedStyle(toggle_button).getPropertyValue('bottom');

// Render apps and bookmarks
// NOTE: This has to be called before anything else
fetchApplications('./data/applications.json');
fetchBookmarks('./data/bookmarks.json');

// Toggle hidden entries on key press
document.addEventListener('keyup', function(event) {
    if (event.key === 'h') {
        toggleHidden();
    }
});

// Show/hide filter button on scroll
var previous_position = window.pageYOffset;
window.addEventListener('scroll', toggleButtonVisibility);

// Pre-load filter image, so it won't flicker
var img=new Image();
img.src='images/hide.svg';
