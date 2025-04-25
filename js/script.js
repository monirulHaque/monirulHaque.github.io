// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// Menu functionality
let menu = document.querySelector('#menu-bars');
let header = document.querySelector('header');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');
}

// Cursor effects
let cursor1 = document.querySelector('.cursor-1');
let cursor2 = document.querySelector('.cursor-2');

window.onmousemove = (e) => {
    cursor1.style.top = e.pageY + 'px';
    cursor1.style.left = e.pageX + 'px';
    cursor2.style.top = e.pageY + 'px';
    cursor2.style.left = e.pageX + 'px';
}

document.querySelectorAll('a').forEach(links => {
    links.onmouseenter = () => {
        cursor1.classList.add('active');
        cursor2.classList.add('active');
    }

    links.onmouseleave = () => {
        cursor1.classList.remove('active');
        cursor2.classList.remove('active');
    }
});

// Add an active class to navbar links when scrolling
function navHighlighter() {
    // Get current scroll position
    let scrollY = window.pageYOffset;
    
    // Loop through sections to get height, top and ID values
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100; // offset of 100px
        const sectionId = current.getAttribute("id");
        
        // Check if current scroll position is within this section
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // If true, add active class to corresponding navbar item
            document.querySelector(".navbar a[href*=" + sectionId + "]").classList.add("active-section");
        } else {
            // If false, remove active class
            document.querySelector(".navbar a[href*=" + sectionId + "]").classList.remove("active-section");
        }
    });
}

// Combined scroll event handler
window.onscroll = () => {
    // Reset mobile menu when scrolling
    menu.classList.remove('fa-times');
    header.classList.remove('active');
    
    // Update active section in navbar
    navHighlighter();
}

// Call navHighlighter on page load to set initial active section
document.addEventListener("DOMContentLoaded", navHighlighter);