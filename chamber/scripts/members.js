const directoryList = document.querySelector('#member-directory');
const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button'); 
const imgBase = 'images/';
const membersURL = 'data/members.json';

async function getMembers() {
    const dummyData = {
        members: [
            { name: "Member 1", image: "member1.jpg", address: "123 Main St", website: "www.member1.com", phone: "(555) 555-5555", business: "Business Name", memberLevel: "Gold" },
            { name: "Member 2", image: "member2.jpg", address: "456 Elm St", website: "www.member2.com", phone: "(555) 555-5556", business: "Another Business", memberLevel: "Silver" }
        ]
    };
    console.log('Fetched members:', dummyData.members); // Log fetched data
    displayMembers(dummyData.members);
}

function displayMembers(data) {
    directoryList.innerHTML = "";
    if (gridButton.classList.contains('active')) {
        directoryList.classList.remove('list');
        directoryList.classList.add('grid');

        data.forEach((member) => {
            let cards = document.createElement('div');
            cards.classList.add('member-card'); // Add this line
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
                <a href=https://${member.website}>${member.website}</a>
                <p>${member.phone}</p>
                <p>${member.business}</p>
                <p>${member.memberLevel}</p>
            `;
            directoryList.appendChild(company);
        });
    }
}


gridButton.addEventListener('click', ()=> {
    listButton.classList.remove('active');
    gridButton.classList.add('active');
    getMembers();
});

listButton.addEventListener('click', ()=> {
    listButton.classList.add('active');
    gridButton.classList.remove('active');
    getMembers();
});

getMembers();