
const data = "/data/memberships.json";

const spaceMemberships = document.querySelector('#details-memberships');
const dialogMembership = document.querySelector('#dialog-membership');

async function getDataMemberships() {
    try {
        const response = await fetch(data);

        if (!response.ok) {
            throw new Error('Error fetching the data');
        } else {
            console.log('Connection Successful');
        }

        const objectData = await response.json();
        console.log(objectData.memberships);
        displayMemberships(objectData.memberships, spaceMemberships);

    } catch (error) {
        console.error('Error with the JSON data:', error);
    }
}

function displayMemberships(memberships, container) {

    memberships.forEach(membership => {
       
        const card = document.createElement('div');
        const imageLogo = document.createElement('img');

        
        imageLogo.setAttribute("src", membership.image);
        imageLogo.setAttribute("alt", "Badge Membership");
        imageLogo.setAttribute("loading", "lazy");
        imageLogo.setAttribute("width", "100");
        imageLogo.setAttribute("height", "100");
        imageLogo.classList.add('badges');

        card.setAttribute('id', "container-img");
        card.appendChild(imageLogo);
        container.appendChild(card);

        imageLogo.addEventListener('click', () => {  
            displayDetailsMemberships(membership);
        });
    });
}

function displayDetailsMemberships(membership) {
    dialogMembership.innerHTML = `
        <button id="closeModal">❌</button>
        <h3>${membership.name}</h3>
        <p>
            <strong>Description</strong>:<br>
            ${membership.description}
        </p>
    `;
    
    dialogMembership.showModal();
    dialogMembership.classList.add('open');

    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener('click', (event) => {
        event.preventDefault();
        dialogMembership.classList.remove('open');
        dialogMembership.close();
    });
}

getDataMemberships();

const form = document.querySelector('form');
const timestampInput = document.querySelector('#timestamp');

form.addEventListener('submit', function(event) {
    const today = new Date().toString();
    timestampInput.value = today;
});
