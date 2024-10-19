const spotlights = document.querySelectorAll('.spotlights');
const membersURL = 'data/members.json';

async function getMembers() {
    const response = await fetch(membersURL);
    const data = await response.json();
    displaySpotlights(data);
}

function displaySpotlights (data) {
    const randomMembers = getRandomMembers(data.members);

    spotlights.forEach((spotlight, index) => {
        const randomMember = randomMembers[index];
        const memberName = document.createElement('h3');
        memberName.textContent = randomMember.name;
        memberName.classList.add('top');

        const businessType = document.createElement('p');
        businessType.textContent = randomMember.business;
        businessType.classList.add('top2');

        const businessImage = document.createElement('img');
        businessImage.setAttribute('src', `images/${randomMember.ceoImage}`);
        businessImage.setAttribute('alt', randomMember.name);
        businessImage.setAttribute('width', 100);
        businessImage.setAttribute('height', 100);
        businessImage.setAttribute('loading', 'lazy');
        businessImage.classList.add('ceoIcon');

        const businessPhone = document.createElement('p');
        businessPhone.textContent = `PHONE: ${randomMember.phone}`;
        businessPhone.classList.add('sideInfo');

        const businessWeb = document.createElement('p');
        businessWeb.textContent = `URL: ${randomMember.website}`;
        businessWeb.classList.add('sideInfo');

        spotlight.appendChild(memberName);
        spotlight.appendChild(businessType);
        spotlight.appendChild(businessImage);
        spotlight.appendChild(businessPhone);
        spotlight.appendChild(businessWeb);
    });
}

function getRandomMembers(members) {
    const spotlightMembers = members.filter(member => member.memberLevel === 'Gold' || member.memberLevel === 'Silver');
    const randomMembers = [];

    while (randomMembers.length < 3) {
        const randomIndex = Math.floor(Math.random() * spotlightMembers.length);
        const randomMember = spotlightMembers[randomIndex];

        if (!randomMembers.includes(randomMember)) {
            randomMembers.push(randomMember);
        }
    }
    return randomMembers;
}

getMembers();