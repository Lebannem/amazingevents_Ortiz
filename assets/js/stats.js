let apiURL = '../assets/js/amazing.json';

const $statistics = document.getElementById('tabla');
const $uStatistics = document.getElementById('upcomingEventsTabla');
const $pStatistics = document.getElementById('pastEventsTabla');

let array = []
let pastArray = []
let upcomingArray = []
let highestPercentage = []
let lowestPercentage = []
let largerCapacity = []

function createRows(array, container) {
    let text = ""
    array.forEach(e =>
        text += `
        <tr>
        <td>${e[0]}</td>
        <td>$${(e[1]).toLocaleString('en-US')}.00</td>
        <td>${(e[2])}%</td>
        </tr>
        `,
    )
    container.innerHTML += text
}

function Category(array){
    let groupedArray = [];
    let obj = {};

    for (let i = 0; i < array.length; i++) {
    let key = array[i][0];
    let value1 = array[i][1];
    let value2 = array[i][2];

    if (obj[key]) {
        obj[key][0] += value1;
        obj[key][1] = ((obj[key][1]+ value2)/2);
    } else {
        obj[key] = [value1, value2];
    }
    }

    for (let key in obj) {
    let tempArr = [key];
    tempArr.push(obj[key][0]);
    tempArr.push((obj[key][1]).toFixed(2));
    groupedArray.push(tempArr);
    }

    return groupedArray
}

async function fetchData() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        array = data.events;
        pastArray = data.events.filter(c => c.date < data.currentDate);
        upcomingArray = data.events.filter(c => c.date >= data.currentDate);
        let percentageOfAttendance = array.map(c => {
            if (c.estimate) {
                return Number(c.estimate / c.capacity)
            }
            else {
                return Number(c.assistance / c.capacity)
            }
        })


        let highestAttendance = Math.max(...percentageOfAttendance);
        let lowestAttendance = Math.min(...percentageOfAttendance);
        highestPercentage = array.filter(c => {
            if (c.estimate) {
                if ((c.estimate / c.capacity) == highestAttendance) {
                    return c.name
                }
            }
            else {
                if ((c.assistance / c.capacity) == highestAttendance) {
                    return c.name
                }
            }
        })

            .map(c => [c.name, (highestAttendance * 100).toFixed(2) + "%"].join(' '))
        lowestPercentage = array.filter(c => {
            if (c.estimate) {
                if ((c.estimate / c.capacity) === lowestAttendance) {
                    return c.name
                }
            }
            else {
                if ((c.assistance / c.capacity) === lowestAttendance) {
                    return c.name
                }
            }
        }).map(c => [c.name, (lowestAttendance * 100).toFixed(2) + "%"].join(' '))
        let arrayOfCapacities = array.map(c => c.capacity)
        let largerCapacity = Math.max(...arrayOfCapacities)
        largerCapacity = array.filter(c => c.capacity === largerCapacity).map(c => [c.name, largerCapacity.toLocaleString('en-US')].join(' '))
        $statistics.innerHTML += `
        <tr>
            <td>${highestPercentage[0]}, ${highestPercentage[1]}</td>
            <td>${lowestPercentage[0]}, ${lowestPercentage[1]}</td>
            <td>${largerCapacity[0]}, ${largerCapacity[1]}</td>
        </tr>
        `

        let upCategory = Category(upcomingArray.map(c =>
            [c.category, (c.price * c.estimate), (100 * c.estimate / c.capacity)]
        ))
        let psCategory = Category(pastArray.map(c =>
            [c.category, (c.price * c.assistance), (100 * c.assistance / c.capacity)]
        ))

        createRows(psCategory, $pStatistics)
        createRows(upCategory, $uStatistics)
    }
    catch (error) {
        console.log(error);
    }
}

fetchData();