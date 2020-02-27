const destinasi = [
    {
        "id": 1,
        "kota": "semarang",
        "thumbnail": "https://c2.staticflickr.com/6/5703/22493522841_9c9bb67da1_b.jpg",
        "judul": "Lawang Sewu",
        "lokasi": "Jl. Pemuda, Sekayu, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50132",
        "deskripsi": "Lawang Sewu (\"Thousand Doors\") is a landmark in Semarang, Central Java, Indonesia, built as the headquarters of the Dutch East Indies Railway Company.",
        "biaya": 1250000
    },
    {
        "id": 2,
        "kota": "semarang",
        "thumbnail": "https://cdn.idntimes.com/content-images/community/2019/02/img-0657-6397a0f5b6db5b610ce53d44ac85eab4_600x400.JPG",
        "judul": "Sam Poo Kong",
        "lokasi": "Jl. Simongan No.129, Bongsari, Kec. Semarang Bar., Kota Semarang, Jawa Tengah 50148",
        "deskripsi": "This historical site used to be a place to rest for Chinese admiral Zheng He or Ceng Ho. There are four temples that you can observe in this complex namely Dewa Bumi, Juru Mudi, Kyai Jangkar and, the largest one, Sam Poo Tay Djien temple.",
        "biaya": 15000
    },
    {
        "id": 3,
        "kota": "semarang",
        "thumbnail": "https://indonesia.tripcanvas.co/wp-content/uploads/2017/05/7-4-road-via-azizbakhtiar-740x740.jpg",
        "judul": "Brown Canyon",
        "lokasi": "Rowosari, Kec. Tembalang, Kota Semarang, Jawa Tengah 50279",
        "deskripsi": "Instead of protesting against the destruction of landscape, the locals have found beauty in the remnants of quarries just outside the city.",
        "biaya": "Free"
    },
    {
        "id": 4,
        "kota": "bandung",
        "thumbnail": "https://indonesia.tripcanvas.co/wp-content/uploads/2016/07/13-5-tebing-gunung-hawu-via-dhonny_putra-740x741.jpg",
        "judul": "Tebing Gunung Hawu",
        "lokasi": "Padalarang, Kabupaten Bandung Barat, Jawa Barat",
        "deskripsi": "The mountain is also renowned for the massive “hole” that you can see in the middle of the mountain. It’s also the reason why the mountain was christened “Hawu”, which means “fireplace” in Sundanese.",
        "biaya": 150000
    },
    {
        "id": 5,
        "kota": "bandung",
        "thumbnail": "https://indonesia.tripcanvas.co/wp-content/uploads/2017/08/4-1-by-jenn_yoena-740x544.jpg",
        "judul": "Kota Mini",
        "lokasi": "Jl. Grand Hotel No.33, Lembang, Bandung, West Java 40222",
        "deskripsi": "End your day with some play time at Kota Mini Hobbit Playground along with a memorable train tour of the entire little town, before heading over for dinner at the town’s outdoor restaurant. We don’t think a family-fun day can get any better!",
        "biaya": 150000
    },
    {
        "id": 6,
        "kota": "bandung",
        "thumbnail": "https://indonesia.tripcanvas.co/wp-content/uploads/2017/09/23-5-Traditional-clothes-via-benakribo.jpg",
        "judul": "Bandung’s Chinatown",
        "lokasi": "Jl. Kelenteng No.41, Ciroyom, Andir, Kota Bandung, Jawa Barat 40182, Indonesia",
        "deskripsi": "You can even rent traditional Chinese clothes that’s worthy of your social media feed!",
        "biaya": 30000
    }
]

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready()
}

function ready() {
    dropdownList()
    
    let destinationList = document.querySelector(".dropdown")
    destinationList.addEventListener("change", changeDestination)

    let searchBox = document.querySelector(".search-box").children[0]
    searchBox.addEventListener("keyup", handleSearchBox)
}

const dropdownList = () => {
    let allCity = document.querySelector(".dropdown")

    const city = destinasi.map(item => item.kota)
    const filteredCity = city.filter((item, index) => city.indexOf(item) >= index)

    filteredCity.map((kota) => {
        let kotaFirstCapital = kota.charAt(0).toUpperCase() + kota.substring(1)
        allCity.innerHTML += `<option value=${kotaFirstCapital}>${kotaFirstCapital}</option>`
    })
}

const changeDestination = (e) => {
    let card, city = e.target.value;
    // console.log(city)
    const cardDeck = document.querySelector(".card-deck")
    
    if(city){
        cardDeck.innerHTML = ""
        destinasi.filter((item) => item.kota === city.toLowerCase()).map((item) => {
            card = `
            <div class="card destination" id=${item.id}>
                <img src=${item.thumbnail} class="card-img" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.judul}</h5>
                    <h6 class="card-title">${item.lokasi}</h6>
                    <p class="card-text">${item.deskripsi}</p>
                </div>
                <div class="card-footer">
                    <p>Total Expenses: ${item.biaya}</p>
                    <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#des${item.id}" onClick="destinationDetail(${item.id})">See More</button>
                    <button type="button" class="btn btn-primary">Add to Wishlist</button>
                </div>
            </div>
            `

            cardDeck.innerHTML += card
        })
    } else {
        cardDeck.innerHTML = ""
    }

    if (cardDeck !== "") {
        let cardByCity = cardDeck.children
        // console.log(cardDeck)
        // console.log(cardByCity)
        for (let i = 0; i < cardByCity.length; i++) {
            const element = cardByCity[i];
            const buttonDestination = element.querySelector(".card-footer").children[2]
            // console.log(buttonDestination)
            buttonDestination.addEventListener("click", buttonClicked)
        }
    }
}

const destinationDetail = (id) => {
    let modal;
    const modalDeck = document.querySelector(".popup")

    if (id) {
        modalDeck.innerHTML = ""
        modalDeck.setAttribute("id", "des" + id)
        destinasi.filter(item => item.id === id).map(item => {
            modal = `
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn btn-dark">Add to Wishlist</button>
                    </div>
                    <div class="modal-body">
                        <img src=${item.thumbnail} class="card-img" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${item.judul}</h5>
                            <h6 class="card-title">${item.lokasi}</h6>
                            <p class="card-text">${item.deskripsi}</p>
                        </div>
                        <div class="card-footer">
                            <p>Total Expenses: ${item.biaya}</p>
                        </div>
                    </div>
                </div>
            </div>
            `

            modalDeck.innerHTML = modal
        })
    }

    if (modalDeck !== "") {
        let cardByCity = modalDeck.children
        // console.log(modalDeck)
        // console.log(cardByCity)
        for (let i = 0; i < cardByCity.length; i++) {
            const element = cardByCity[i];
            const buttonDestination = element.querySelector(".modal-header").children[0]
            // console.log(buttonDestination)
            buttonDestination.addEventListener("click", buttonClicked)
        }
    }
}

const handleSearchBox = () => {
    let searchBoxValue = document.querySelector(".search-box").children[0].value
    let cardDeck = document.querySelector(".card-deck").children

    for (let i = 0; i < cardDeck.length; i++) {

        const title = cardDeck[i].children[1].children[0];
        let valueTitle = title.innerHTML

        if (valueTitle.toLowerCase().indexOf(searchBoxValue.toLowerCase()) > -1) {
            title.parentElement.parentElement.style.display = ""
        } else {
            title.parentElement.parentElement.style.display = "none"
        }
    }
}

const buttonClicked = (e) => {
    // console.log(e)
    let priceBox = document.querySelector(".search-box").children[1]
    let hiddenNav = document.createElement("nav")

    if (e.target) {
        let costString = e.target.parentElement.children[0]
        // console.log(costString)
        
        if (costString.innerHTML === "Add to Wishlist") {
            costString = costString.parentElement.parentElement.children[1].children[2].children[0]
            // console.log(costString)
        }

        let cost = parseInt(costString.innerHTML.slice(16))
        
        if (!isNaN(cost)) {
            hiddenNav.innerHTML = cost
            priceBox.append(hiddenNav)
        } else {
            alert("It's free by the way...")
        }
    }

    updateWishlistTotal()
}

const updateWishlistTotal = () => {
    let priceBox = document.querySelector(".search-box").children[1]
    let hiddenNav = document.querySelector(".search-box").children[1].children
    let total = 0;

    for (let i = 0; i < hiddenNav.length; i++) {
        
        const cost = hiddenNav[i].innerHTML;
        total = total + parseInt(cost)
    }
    
    priceBox.value = "Total Price: " + total
}