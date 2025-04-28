// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar a");

// Menu functionality
let menu = document.querySelector('#menu-bars');
let header = document.querySelector('header');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideHeader = header.contains(e.target);
    const isClickOnMenuButton = menu.contains(e.target);
    
    if (!isClickInsideHeader && !isClickOnMenuButton && header.classList.contains('active')) {
        menu.classList.remove('fa-times');
        header.classList.remove('active');
    }
});

// Close menu when a nav link is clicked (mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 991) {
            menu.classList.remove('fa-times');
            header.classList.remove('active');
        }
    });
});

// Cursor effects (only on desktop)
if (window.innerWidth > 991) {
    let cursor1 = document.querySelector('.cursor-1');
    let cursor2 = document.querySelector('.cursor-2');

    if (cursor1 && cursor2) {
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
    }
}

// Improved scrolling handler with debounce for better performance
let isScrolling;
function debouncedScroll() {
    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function() {
        navHighlighter();
    }, 50);
}

// Add an active class to navbar links when scrolling
function navHighlighter() {
    // Get current scroll position
    let scrollY = window.pageYOffset;
    
    // Loop through sections to get height, top and ID values
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100; // offset of 100px
        const sectionId = current.getAttribute("id");
        
        const navLink = document.querySelector(".navbar a[href*=" + sectionId + "]");
        
        // Make sure the selector exists to prevent errors
        if (navLink) {
            // Check if current scroll position is within this section
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // If true, add active class to corresponding navbar item
                navLink.classList.add("active-section");
            } else {
                // If false, remove active class
                navLink.classList.remove("active-section");
            }
        }
    });
}

// Combined scroll event handler
window.addEventListener('scroll', () => {
    // Reset mobile menu when scrolling (only if scrolled significantly)
    if (window.scrollY > 50 && header.classList.contains('active')) {
        menu.classList.remove('fa-times');
        header.classList.remove('active');
    }
    
    // Update active section in navbar (debounced)
    debouncedScroll();
});

// Handle window resize events
window.addEventListener('resize', () => {
    if (window.innerWidth > 991 && header.classList.contains('active')) {
        menu.classList.remove('fa-times');
        header.classList.remove('active');
    }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate offset based on header presence
            const offset = window.innerWidth <= 991 ? 20 : 0;
            
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// Lazy load images for better performance
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll("img[data-src]");
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute("data-src");
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
        });
    }

    // Call navHighlighter on page load to set initial active section
    navHighlighter();
});