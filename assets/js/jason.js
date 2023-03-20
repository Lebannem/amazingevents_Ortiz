let apiUrl = './amazing.json'
async function getData() {
    try {
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        const cardDetail = data.events.find( cardDetail => cardDetail._id == cardId )
        createDetail(cardDetail, detailContainer)
    }
    catch (error) {
        console.log(error);
    }
}
getData()


let detailContainer = document.querySelector("#eventDetail")

const queryString = location.search

const params = new URLSearchParams(queryString)

const cardId = params.get("id")

function createDetail (cardDetail, container){
    let div = document.createElement('div')
    let estimateOrAssistance = ""
    div.classList = 'card-big d-flex'
    if ( "estimate" in cardDetail){
        estimateOrAssistance = "Estimate: " + cardDetail.estimate
    } else {
        estimateOrAssistance = "Assistance: " + cardDetail.assistance
    }
    div.innerHTML = 
    `
    <div class="container detailRow">
        <div class="row">
            <div class="col-lg-8 detailCol">
                <div>
                    <img class ="detailIMG" src="${cardDetail.image}" alt="event image">
                </div>
            </div>
            <div class="col-lg-4 detailCol">
                <div>
                    <h4>Event Name: ${cardDetail.name}</h4>
                </div>
                <div>
                    <h5>Date: ${cardDetail.date}</h5>
                </div>
                <div>
                    <h6 style="margin-top:1rem; margin-bottom:1rem;"><strong>Description:</strong> ${cardDetail.description}</h6>
                </div>
                <div>
                    <h6>Category: ${cardDetail.category}</h6>  
                </div>
                <div>
                <h6>Place: ${cardDetail.place}</h6>
                </div>
                <div>
                <h6>Capacity: ${cardDetail.capacity}</h6>
                </div>
                <div>
                <h6>${estimateOrAssistance}</h6>
                </div>
                <div>
                <h6>Price: $${cardDetail.price}</h6>
                </div>
            </div>
        </div>
    </div>
    `                
    container.appendChild(div)
}

