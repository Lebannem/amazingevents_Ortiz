import data from './data.js';

console.log([document])

const eventsCards = document.getElementById("cartas");

const checkbox = document.getElementById("chbox");

const $search = document.getElementById("search")

const fragment = document.createDocumentFragment();

async function getData() {
    try {
        let apiUrl = './assets/js/amazingevents.json'
        let response = await fetch(apiUrl);
        let data = await response.json();
        console.log(data);
        eventsarray = data.events;
        categories = createCategories(eventsarray);
        armarCard(eventsarray, container);
        createCheck(categories, $checkboxes);
    }
    catch (error) {
        console.log(error);
    }
}
getData()

function carta(array, container) {
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
}

carta(data.events, eventsCards)

const createCategory = (array) => {
    let categories = array.map(category => category.category)
    categories = categories.reduce((cosa, otraCosa) => {
        if (!cosa.includes(otraCosa)) {
            cosa.push(otraCosa);
        }
        return cosa
    }, [])
    return categories
}

let categories = createCategory(data.events)

const createChbox = (categories, checkbox) => {
    categories.forEach(category => {
        let div = document.createElement('div')
        div.className = `form-check mt-3`
        div.innerHTML = `
        <input type="checkbox" id="${category}" name="categories" class="form-check-input" value="${category}">
        <label for="${category}" class="form-check-label me-1">${category}</label>
        `
        checkbox.appendChild(div)
    });
}

createChbox(categories, checkbox)

const filtSearch = (array, value) => {
    let filtrsearch = array.filter(buscador => buscador.name.toLowerCase().includes(value.toLowerCase().trim()))
    return filtrsearch
}

const filtCheck = (array, value) => {
    const checkedCategories = Array.from(checkbox.querySelectorAll('input[type="checkbox"]:checked')).map((el) => el.value);
    if (checkedCategories.length === 0) {
        return array;
    } else {
        let filtrado = array.filter(check => checkedCategories.includes(check.category));
        return filtrado;
    }
}


$search.addEventListener('keyup', (e) =>{
    let datereando = filtSearch(data.events, e.target.value)
    carta(datereando, eventsCards)
})


checkbox.addEventListener('change', (e) => {
    let nuevofiltrado = filtCheck(data.events, e.target.value)
    carta(nuevofiltrado, eventsCards)
})