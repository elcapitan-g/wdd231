const directoryList = document.querySelector('#member-directory');
const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button'); 
const imgBase = 'images/';
const directortList = document.querySelectorAll('.member-directory');
const membersURL = 'data/members.json';

async function getMembers() {
    const response = await fetch(membersURL);
    const data = await response.json();
    displaySpotlights(data);
}


async function getMembers() {
    try {
        const response = await fetch(membersURL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

function displayMembers(data) {
    directoryList.innerHTML = "";
    if (gridButton.classList.contains('active')) {
        directoryList.classList.remove('list');
        directoryList.classList.add('grid');

        data.forEach((member) => {
            let cards = document.createElement('div');
            cards.classList.add('member-card'); 
            let companyCard = document.createElement('img');
            companyCard.setAttribute('src', imgBase + member.image);
            companyCard.setAttribute('alt', `Business card for ${member.name}`);
            companyCard.setAttribute('width', 300);
            companyCard.setAttribute('height', 171);
            companyCard.setAttribute('loading', 'lazy');
            cards.appendChild(companyCard);
            directoryList.appendChild(cards);
        });
    } else {
        directoryList.classList.add('list');
        directoryList.classList.remove('grid');

        data.forEach((member) => {
            const company = document.createElement('section');
            company.classList.add('information');
            company.innerHTML = `
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <a href="https://${member.website}" target="_blank">${member.website}</a>
                <p>${member.phone}</p>
                <p>${member.business}</p>
                <p>${member.memberLevel}</p>
            `;
            directoryList.appendChild(company);
        });
    }
}

gridButton.addEventListener('click', () => {
    listButton.classList.remove('active');
    gridButton.classList.add('active');
    getMembers();
});

listButton.addEventListener('click', () => {
    listButton.classList.add('active');
    gridButton.classList.remove('active');
    getMembers();
});

// Initial fetch
getMembers();
