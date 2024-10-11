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
            if (this.differenceDays < 1) {
                messageAlert.textContent = `Aloha! Great to see you!!`;
            } else {
                messageAlert.textContent = `You last visited us ${this.differenceDays} day${this.differenceDays > 1 ? 's' : ''} ago.`;
            }
        }
    }

    handleVisit() {
        this.updateCounter();   
        this.updateMessage();
        console.log(this.lastVisitDate);
        console.log(this.counter);
    }
}

const visitation = new VisitInfo();
visitation.handleVisit();


const dataUrl = "https://raw.githubusercontent.com/elcapitan-g/wdd231/main/chamber/data/collage.json";
const spaceForCollage = document.querySelector('.collage');

async function getDataForCollage() {
    try {
        const response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error('Error fetching data: ' + response.statusText);
        }
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

        image.setAttribute("src", element.link);
        image.setAttribute("alt", element.name || 'Image');
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "300");
        image.setAttribute("height", "300");
        image.setAttribute("class", "moving style-image");

        caption.textContent = element.description;

        card.setAttribute("class", "fig-images");
        card.appendChild(image);
        card.appendChild(caption);
        space.appendChild(card);
    });
}

getDataForCollage();
