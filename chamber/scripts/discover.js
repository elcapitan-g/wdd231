const messageAlert = document.querySelector('#welcome p');

class VisitInfo {
    constructor() {
        this.currentDay = new Date();
        this.counterKey = "counter";
        this.lastDatKey = "lastDay";
        this.counter = this.getCounter();
        this.lastVisitDate = this.getLastVisitDate();
        this.differenceDays = this.calculateDays();
    }

    getCounter() {
        return Number(window.localStorage.getItem(this.counterKey)) || 0;
    }

    getLastVisitDate() {
        const storedDate = window.localStorage.getItem(this.lastDatKey);
        return storedDate ? new Date(storedDate) : new Date();
    }

    calculateDays() {
        const difference = this.currentDay.getTime() - this.lastVisitDate.getTime();
        return Math.floor(difference / (1000 * 60 * 60 * 24));
    }

    updateLocalStorage() {
        window.localStorage.setItem(this.counterKey, this.counter);
        window.localStorage.setItem(this.lastDatKey, this.currentDay.toISOString());
    }

    updateCounter() {
        this.counter++;
        this.updateLocalStorage();
    }

    updateMessage() {
        if (this.counter === 1) {
            messageAlert.textContent = `E como mai! Please let us know if you have any questions!`;
        } else {
            messageAlert.textContent = this.differenceDays < 1
                ? `Aloha! Great to see you so soon!!`
                : `You last visited us ${this.differenceDays} day${this.differenceDays > 1 ? 's' : ''} ago.`;
        }
    }

    handleVisit() {
        this.updateCounter();
        this.updateMessage();
    }
}

const visitation = new VisitInfo();
visitation.handleVisit();

async function getDataForCollage() {
    try {
        const response = await fetch(dataUrl);
        if (!response.ok) throw new Error('Error fetching data: ' + response.statusText);
        const objectData = await response.json();
        displayCollage(objectData.collage, spaceForCollage);
    } catch (error) {
        spaceForCollage.innerHTML = `<p class="error">Sorry, there was a problem loading the collage. Please try again later.</p>`;
        console.error('Error with the data JSON', error);
    }
}

function displayCollage(images, space) {
    if (!images || images.length === 0) {
        space.innerHTML = `<p>No images found for the collage.</p>`;
        return;
    }

    images.forEach(element => {
        const card = document.createElement('figure');
        const image = document.createElement('img');
        const caption = document.createElement('figcaption');

        image.src = element.link;
        image.alt = element.name || 'Image';
        image.loading = "lazy";
        image.width = 300;
        image.height = 300;
        image.className = "moving style-image";

        caption.textContent = element.description;

        card.className = "fig-images";
        card.append(image, caption);
        space.appendChild(card);
    });
}

getDataForCollage();

const container = document.getElementById('container');
container.style.display = 'grid';
container.style.gridTemplateColumns = '1fr 3fr';
container.style.gap = '20px';

const sidebarContent = document.getElementById('sidebar-content');
sidebarContent.style.padding = '20px';
sidebarContent.style.backgroundColor = '#f4f4f4';
sidebarContent.style.borderRadius = '5px';

const gallery = document.getElementById('gallery');
gallery.style.display = 'grid';
gallery.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
gallery.style.gap = '10px';

const lazyImages = document.querySelectorAll('img.lazy');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(image => {
    imageObserver.observe(image);
});

const mediaQuery = window.matchMedia('(max-width: 768px)');
function handleMediaQuery(e) {
    container.style.gridTemplateColumns = e.matches ? '1fr' : '1fr 3fr';
}
mediaQuery.addEventListener('change', handleMediaQuery);
handleMediaQuery(mediaQuery);
