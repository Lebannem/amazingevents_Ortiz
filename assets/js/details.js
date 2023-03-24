

let eventcard = document.getElementById("cardContainer");
const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")

let data;

try {
    let apiUrl = '../assets/js/amazing.json'
    let response = await fetch(apiUrl);
    data = await response.json();
    const selectedEvent = data.events.find(event => event._id == id)
    armarCard(selectedEvent, eventcard);
} catch (error) {
    console.log(error);
}
console.log(data);

function armarCard(card, container) {
    container.innerHTML = "";
    let div = document.createElement("div")
    div.className = "flex-wrap d-inline-flex"
    div.innerHTML += `
    <img src="${card.image}" class="img-fluid rounded-start rounded-3" alt="${card.name}" width="100%">
    <div class="card-body">
    <h5 class="card-title d-flex justify-content-center">${card.name}</h5>
    <p class="card-text d-flex justify-content-center">${card.category}</p>
        <p class="card-text"></p><h4>Event location: </h4>${card.place}
        <p class="card-text"></p><h4>Estimated date: </h4>${card.date}
        <p class="card-text"><h4>About event: </h4>${card.description}</p>
        <p class="card-text"><h4>Attendance crowd average: </h4>${card.capacity}</p>
        <p class="d-flex justify-content-around"><p>${card.price}</p>
    </div>
    `
    container.appendChild(div);
}

armarCard(selectedEvent, eventcard);

/* 
function card(array, container) {
    container.innerHTML = ""
    for (let newcard of array) {
        let div = document.createElement("div")
        div.className = "card col-4 col-sm-3 m-2" //cardDiv
        div.innerHTML += `
        <img src="${newcard.image}" class="card-img-top" alt="${newcard.name.toLowerCase()}">
        <div class="card-body">
            <h5 class="card-title d-flex justify-content-center">${newcard.name}</h5>
            <p class="card-text d-flex justify-content-center">${newcard.category}</p>
            <div class="d-flex justify-content-around">
            <p>${newcard.price}</p>
            <a href="./pages/details.html?id=${newcard._id}" class="btn btn-primary">View More</a>
            </div>
        </div>`
        fragment.appendChild(div);
    }
    container.appendChild(fragment);
} */