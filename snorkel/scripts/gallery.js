function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Lazy loading images
document.addEventListener("DOMContentLoaded", function() {
    const lazyloadImages = document.querySelectorAll("img.lazyload");
    
    const lazyload = function() {
        lazyloadImages.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight && img.getBoundingClientRect().bottom >= 0 && getComputedStyle(img).display !== "none") {
                img.src = img.dataset.src;
                img.classList.remove("lazyload");
            }
        });
        if (lazyloadImages.length === 0) {
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationchange", lazyload);
        }
    };

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationchange", lazyload);
    lazyload(); // Run lazyload on initial load
});
