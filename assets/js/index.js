import data from './data.js';

const eventsCards = document.getElementById("cartas");
const checkbox = document.getElementById("checkbox");
const $search = document.getElementById("search")
const fragment = document.createDocumentFragment();


function carta(array, container) {
    container.innerHTML = ""
    for (let nuevaCard of array) {
        let div = document.createElement("div")
        div.className = "card col-4 col-sm-3 m-2" //antes era el cardDiv
        div.innerHTML += `
        <img src="${nuevaCard.image}" class="card-img-top" alt="${nuevaCard.name.toLowerCase()}"><div class="card-body">
            <h5 class="card-title d-flex justify-content-center">${nuevaCard.name}</h5>
            <p class="card-text d-flex justify-content-center">${nuevaCard.category}</p>
            <div class="d-flex justify-content-around">
            <p>${nuevaCard.price}</p>
            <a href="./pages/details.html?id=${nuevaCard._id}" class="btn btn-primary">View More</a>
            </div>
        </div>`
        fragment.appendChild(div);
    }
    container.appendChild(fragment);
}

carta(data.events, eventsCards)

const createCategory = (array) => {
    let categories = array.map(category => category.category)
    categories = categories.reduce((acumulador, elemento) => {
        if (!acumulador.includes(elemento)) {
            acumulador.push(elemento);
        }
        return acumulador
    }, [])
    return categories
}

let categories = createCategory(data.events)

const createCheckbox = (categories, checkbox) => {
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

createCheckbox(categories, checkbox)

const filterSearch = (array, value) => {
    let filtersearch = array.filter(buscador => buscador.name.toLowerCase().includes(value.toLowerCase().trim()))
    return filtersearch
}

const filterCheck = (array, value) => {
    const checkedCategories = Array.from(checkbox.querySelectorAll('input[type="checkbox"]:checked')).map((e) => e.value);
    if (checkedCategories.length === 0) {
        return array;
    } else {
        let filtrado = array.filter(check => checkedCategories.includes(check.category));
        return filtrado;
    }
}

checkbox.addEventListener('change', (e) => {
    let dataFilter = filterCheck(data.events, e.target.value)
    carta(dataFilter, eventsCards)
})
$search.addEventListener('keyup', (e) =>{
    let dataFilter2 = filterSearch(data.events, e.target.value)
    carta(dataFilter2, eventsCards)
})

