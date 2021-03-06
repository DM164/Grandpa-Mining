// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhPz-IG85lj7AIPvrPvxV0-RnLNaU888A",
    authDomain: "grandpa-mining-website.firebaseapp.com",
    databaseURL: "https://grandpa-mining-website.firebaseio.com",
    projectId: "grandpa-mining-website",
    storageBucket: "grandpa-mining-website.appspot.com",
    messagingSenderId: "201425292407",
    appId: "1:201425292407:web:54a6b7d8a8f3d777e04a72",
    measurementId: "G-SMDH0B47FM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function retrieveData() {
    firebase.database().ref('/websiteStatus/homepage').once('value').then(function (snapshot) {
        if (snapshot.val() === 'maintenance') {
            console.log('Website is in maintenance mode')
            document.getElementsByClassName('maintenance')[0].style.display = 'inline-block'
            document.getElementsByClassName('body2')[0].style.display = 'none'
        }
    })

    firebase.database().ref('/news/').once('value').then(function (snapshot) {
        let newsArray = snapshot.val()

        let loadingElement = document.getElementById('newsA')
        while (loadingElement.firstChild) {
            loadingElement.removeChild(loadingElement.firstChild)
        }

        let ni = 0
        newsArray.reverse().forEach(element => {
            if (ni > 5) { return }
            const listElement = document.createElement('div')
            const listText = document.createElement('p')
            const listDate = document.createElement('h6')

            listText.innerHTML = element.title
            listDate.innerText = element.date
            listElement.appendChild(listDate)
            listElement.appendChild(listText)
            listElement.setAttribute('class', 'container')
            listDate.setAttribute('class', 'postdate')
            document.getElementById('newsA').appendChild(listElement)
            ni++
        });

        const listDate = document.createElement('h2')
        listDate.innerText = 'News'
        document.getElementById('newsA').prepend(listDate)
    })

    firebase.database().ref('/events/').once('value').then(function (snapshot) {
        let events = snapshot.val()

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
            listDesc.innerHTML = element.description
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

        document.getElementsByClassName('newscontainer')[0].style.animationPlayState = "running";
        document.getElementsByClassName('platform-container')[0].style.animationPlayState = "running";
    })

    firebase.database().ref('/voiceActivity/').once('value').then(function (snapshot) {
        let users = snapshot.val()
        setcount(users)
    })

    firebase.database().ref('/anime/').once('value').then(function (snapshot) {
        let animeArray = snapshot.val()

        let loadingElement = document.getElementById('weekT')
        while (loadingElement.firstChild) {
            loadingElement.removeChild(loadingElement.firstChild)
        }

        // get weekday
        let d = new Date

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
                    listDesc.setAttribute('id', 'no-data')

                    listDescContainer.appendChild(listDesc)
                } else {
                    const listDesc = document.createElement('li')
                    listDesc.innerText = element.title
                    listDesc.setAttribute('id', element.link)

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
        listDate.innerText = 'Simulcasts'
        listDate.setAttribute('class', 'title')
        document.getElementById('weekT').prepend(listDate)

        let dateIndex = d.getDay()
        if (dateIndex === 0) { dateIndex = 7 }
        document.getElementsByClassName('c' + dateIndex)[0].style.borderLeft = '3px solid #e0c53e'
        document.getElementsByClassName('c' + dateIndex)[0].style.padding = '0px 0px 0px 6px'

        document.getElementsByClassName('week-table')[0].style.animationPlayState = "running";
    })
}

// Open anime
document.getElementById('weekT').addEventListener('click', e => {
    if (e.target.nodeName.toLowerCase() === 'li') {
        if (e.target.id === 'no-data') { return }
        window.open(e.target.id)
    }
})

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
        document.getElementsByClassName('discordVC-count')[0].style.animationPlayState = "paused";
    } else {
        document.getElementsByClassName('discordVC-count')[0].style.display = 'block'
        document.getElementsByClassName('discordVC-count')[0].style.animationPlayState = "running";
        document.getElementById('VC-count').innerText = number
    }
}

// Expand prepayed months
let preOpen = false
document.addEventListener('click', (e) => {
    if (e.target.classList[0] === 'statusPP') {
        if (preOpen === false) {
            document.getElementById(e.target.classList[1]).style.display = 'block'
            document.getElementById(e.target.classList[1]).style.animationPlayState = "running";
            preOpen = true
        } else {
            document.getElementById(e.target.classList[1]).style.display = 'none'
            document.getElementById(e.target.classList[1]).style.animationPlayState = "paused";
            preOpen = false
        }
    }
})

// Open services
let servicesOpen = false
document.getElementsByClassName('open-services')[0].addEventListener('click', () => {
    firebase.analytics().logEvent('opened_service_statuses');
    toggleServices()
})
function toggleServices() {
    if (servicesOpen === false) {
        document.getElementsByClassName('service')[0].style.display = 'inline-block'
        document.getElementsByClassName('service')[0].style.animation = ''
        servicesOpen = true
    } else {
        document.getElementsByClassName('service')[0].style.animation = 'fadeoutPayments 0.2s forwards'
        setTimeout(() => {
            document.getElementsByClassName('service')[0].style.display = 'none'
            servicesOpen = false
        }, 200);
    }
}

// Open Discord Widget
let widgetOpen = false
document.getElementsByClassName('join-discord')[0].addEventListener('click', () => {
    firebase.analytics().logEvent('opened_widget');
    if (widgetOpen === false) {
        document.getElementById('discord-widget').style.display = 'inline-block'
        document.getElementById('discord-widget').style.animation = 'widget 0.5s forwards'
        widgetOpen = true
    } else {
        document.getElementById('discord-widget').style.animation = 'widget-out reverse 0.5s forwards'
        setTimeout(() => {
            document.getElementById('discord-widget').style.display = 'none'
            widgetOpen = false
        }, 500);
    }
})

//load widget with the right color
function colorSchemeDiscord() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // dark mode
        document.getElementById('discord-widget').src = "https://discordapp.com/widget?id=401404642468036608&theme=dark"
    } else {
        // light mode
        document.getElementById('discord-widget').src = "https://discordapp.com/widget?id=401404642468036608&theme=light"
    }
}
window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', e => e.matches && colorSchemeDiscord());
window.matchMedia("(prefers-color-scheme: light)").addEventListener('change', e => e.matches && colorSchemeDiscord());

// Analytics
document.getElementsByClassName('open-lb')[0].addEventListener('click', () => {
    firebase.analytics().logEvent('navTo_leaderboard');
})
document.getElementsByClassName('join-w2g')[0].addEventListener('click', () => {
    firebase.analytics().logEvent('navTo_w2g');
})
document.getElementsByClassName('open-insta')[0].addEventListener('click', () => {
    firebase.analytics().logEvent('navTo_instagram');
})
document.getElementsByClassName('open-reddit')[0].addEventListener('click', () => {
    firebase.analytics().logEvent('navTo_reddit');
})

setInterval(() => {
    retrieveData()
}, 60000);

// startup
retrieveData()
colorSchemeDiscord()