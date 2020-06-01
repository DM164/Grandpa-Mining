// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyAhPz-IG85lj7AIPvrPvxV0-RnLNaU888A",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://grandpa-mining-website.firebaseio.com/",
    projectId: "project-id",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "sender-id",
    appId: "app-id",
    measurementId: "G-measurement-id",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

retrieveData()
function retrieveData() {
    firebase.database().ref('/status/').once('value').then(function (snapshot) {
        if (snapshot.val() === 'maintenance') {
            console.log('Website is in maintenance mode')
            document.getElementsByClassName('maintenance')[0].style.display = 'inline-block'
            document.getElementsByClassName('body2')[0].style.display = 'none'
        }
    })

    firebase.database().ref('/news/').once('value').then(function (snapshot) {
        let newsArray = snapshot.val()
        console.log(newsArray)

        let loadingElement = document.getElementById('newsA')
        while (loadingElement.firstChild) {
            loadingElement.removeChild(loadingElement.firstChild)
        }

        newsArray.forEach(element => {
            const listElement = document.createElement('div')
            const listText = document.createElement('p')
            const listDate = document.createElement('h6')

            listText.innerHTML = element.title
            listDate.innerText = element.date
            listElement.appendChild(listText)
            listElement.appendChild(listDate)
            listElement.setAttribute('class', 'container')
            listDate.setAttribute('class', 'postdate')
            document.getElementById('newsA').prepend(listElement)
        });

        const listDate = document.createElement('h2')
        listDate.innerText = 'News'
        document.getElementById('newsA').prepend(listDate)
    })

    firebase.database().ref('/events/').once('value').then(function (snapshot) {
        let events = snapshot.val()
        console.log(events)

        let loadingElement = document.getElementById('eventsA')
        while (loadingElement.firstChild) {
            loadingElement.removeChild(loadingElement.firstChild)
        }

        events.forEach(element => {
            if (element.description === 'placeholder') { return }
            const listElement = document.createElement('div')
            const listDescContainer = document.createElement('ul')
            const listDesc = document.createElement('li')
            const listDiv = document.createElement('div')
            const listDate = document.createElement('h3')

            listDate.innerText = element.date
            listDesc.innerText = element.description
            listElement.appendChild(listDate)
            listDiv.appendChild(listDescContainer)
            listDescContainer.appendChild(listDesc)
            listElement.appendChild(listDiv)
            listDate.setAttribute('class', 'date')
            listDiv.setAttribute('class', 'calendarContainer')
            document.getElementById('eventsA').appendChild(listElement)
        });

        const listDate = document.createElement('h2')
        listDate.innerText = 'Events'
        listDate.setAttribute('class', 'title')
        document.getElementById('eventsA').prepend(listDate)

        document.getElementsByClassName('newscontainer')[0].style.webkitAnimationPlayState = "running";
        document.getElementsByClassName('platform-container')[0].style.webkitAnimationPlayState = "running";
    })

    firebase.database().ref('/voiceActivity/').once('value').then(function (snapshot) {
        let users = snapshot.val()
        console.log(users)
        setcount(users)
    })
    firebase.database().ref('/payments-month/').once('value').then(function (snapshot) {
        document.getElementsByClassName('monthTAG')[0].innerText = snapshot.val()
    })

    firebase.database().ref('/payments/').once('value').then(function (snapshot) {
        let paymentsArray = snapshot.val()
        console.log(paymentsArray)

        let loadingElement = document.getElementById('payments')
        while (loadingElement.firstChild) {
            loadingElement.removeChild(loadingElement.firstChild)
        }
        let im = 0
        let PPmonthsElements = ''
        let faggotSaysYes = false
        paymentsArray.forEach(element => {
            let statusClass = 'status'
            const statusLi = document.createElement('li')

            if (element.status === 'Not payed') {
                statusClass = 'statusNP'
            } else if (element.status === 'Pre-payed') {
                statusClass = 'statusPP ' + im
                faggotSaysYes = true
            }
            statusLi.innerHTML = `${element.name} <span class="price">${element.price}€</span><br><span class="${statusClass}">${element.status}</span><div id="${im}" class="PPmonthsContainer">${PPmonthsElements}</div>`
            document.getElementById('payments').appendChild(statusLi)
            if (faggotSaysYes === true){
                console.log(element.PPmonths)
                element.PPmonths.forEach(element => {
                    let PPmonthDiv = document.createElement('div')
                    PPmonthDiv.setAttribute('class', 'PPmonths')
                    PPmonthDiv.innerText=element
                    document.getElementById(im).appendChild(PPmonthDiv)
                });
                faggotSaysYes = false
            }
            im++
        })
    })

    firebase.database().ref('/anime/').once('value').then(function (snapshot) {
        let animeArray = snapshot.val()
        console.log(animeArray)

        let loadingElement = document.getElementById('weekT')
        while (loadingElement.firstChild) {
            loadingElement.removeChild(loadingElement.firstChild)
        }

        let i = 0
        animeArray.forEach(element => {
            const listElement = document.createElement('div')
            const listDescContainer = document.createElement('ul')
            const listDiv = document.createElement('div')
            const listDate = document.createElement('h3')

            listDate.innerText = element.day
            element.anime.forEach(element => {
                if (element.title === 'No anime scheduled for this day') {
                    let listDesc = document.createElement('li')
                    listDesc.innerText = element.title

                    listDescContainer.appendChild(listDesc)
                } else {
                    const listDesc = document.createElement('li')
                    listDesc.innerText = element.title

                    const newLine = document.createElement('br')

                    const listTime = document.createElement('h6')
                    listTime.innerText = element.time
                    listTime.setAttribute('class', 'time')

                    const listPlatform = document.createElement('h6')
                    listPlatform.innerText = element.platform
                    listPlatform.setAttribute('class', 'platform')

                    listDesc.appendChild(document.createElement('br'))
                    listDesc.appendChild(listTime)
                    listDesc.appendChild(listPlatform)
                    listDescContainer.appendChild(listDesc)
                }
            })
            listDiv.appendChild(listDescContainer)
            listElement.append(listDate)
            listElement.appendChild(listDiv)
            listDate.setAttribute('class', 'date')
            i++
            listElement.setAttribute('class', `week-table-container c${i}`)
            document.getElementById('weekT').append(listElement)
        });

        const listDate = document.createElement('h2')
        listDate.innerText = 'Simulcasts on our database'
        listDate.setAttribute('class', 'title')
        document.getElementById('weekT').prepend(listDate)

        document.getElementsByClassName('week-table')[0].style.webkitAnimationPlayState = "running";
    })
}

function addEvent(id, desc, date) {
    firebase.database().ref('events/' + id).set({
        description: desc,
        date: date
    });
}
function addNews(id, title, date) {
    firebase.database().ref('news/' + id).set({
        title: title,
        date: date
    });
}

function setcount(number) {
    if (number === 0) {
        document.getElementsByClassName('discordVC-count')[0].style.display = 'none'
        document.getElementsByClassName('discordVC-count')[0].style.webkitAnimationPlayState = "paused";
    } else {
        document.getElementsByClassName('discordVC-count')[0].style.display = 'block'
        document.getElementsByClassName('discordVC-count')[0].style.webkitAnimationPlayState = "running";
        document.getElementById('VC-count').innerText = number
    }
}

// Expand prepayed months
let preOpen = false
document.addEventListener('click', (e) => {
    console.log(e)
    if (e.target.classList[0] === 'statusPP') {
        if (preOpen === false) {
            document.getElementById(e.target.classList[1]).style.display = 'block'
            document.getElementById(e.target.classList[1]).style.webkitAnimationPlayState = "running";
            preOpen = true
        } else {
            document.getElementById(e.target.classList[1]).style.display = 'none'
            document.getElementById(e.target.classList[1]).style.webkitAnimationPlayState = "paused";
            preOpen = false
        }
    }
})

// Open payments
let paymentsOpen = false
document.getElementsByClassName('open-payments')[0].addEventListener('click', () => {
    if (paymentsOpen === false) {
        document.getElementsByClassName('payment')[0].style.display = 'inline-block'
        paymentsOpen = true
    } else {
        document.getElementsByClassName('payment')[0].style.display = 'none'
        paymentsOpen = false
    }
})

// Open Navigation Menu on Mobile devices
let navOpen = false;
document.getElementById('navIcon').addEventListener('click', function () {
    if (navOpen == false) {
        document.querySelector('.navElements').style.display = 'inline-block';
        navOpen = true
    } else {
        document.querySelector('.navElements').style.display = 'none';
        navOpen = false
    }
});

setInterval(() => {
    retrieveData()
}, 60000);