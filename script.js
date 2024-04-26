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

            if (element.hidden) { return }

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
        document.getElementsByClassName('calendar-container')[0].style.animationPlayState = "running";

        document.getElementsByClassName('platform-card')[0].style.animationPlayState = "running";
        document.getElementsByClassName('platform-card')[1].style.animationPlayState = "running";
    })

    firebase.database().ref('/beammp/').once('value').then(function (snapshot) {
        let beammp = snapshot.val()

        let loadingElement = document.getElementById('instances')
        while (loadingElement.firstChild) {
            loadingElement.removeChild(loadingElement.firstChild)
        }

        for (let key in beammp) {
            console.log(beammp[key])

            element = beammp[key];

            const item = document.createElement('li')

            const itemIcon = document.createElement('img')
            itemIcon.setAttribute('src', `./files/images/${element.game}.png`)

            item.appendChild(itemIcon)

            const itemTitle = document.createElement('h2')
            const itemDesc = document.createElement('p')

            const itemMap = document.createElement('p')
            itemMap.setAttribute('class', 'map');

            const itemPort = document.createElement('p')
            const itemCopyPort = document.createElement('img')
            const itemIp = document.createElement('p')
            const itemCopyIp = document.createElement('img')
            const itemUpdateTime = document.createElement('p')

            const itemPing = document.createElement('p')

            ping(element.ip, element.port, (ping) => {
                itemPing.innerText = ping + 'ms';
            })

            const itemStatusDot = document.createElement('div')
            itemStatusDot.setAttribute('class', 'service-status-indicator');

            let timestamp = element.updateTimeStamp
            let seconds = (Date.now() - timestamp) / 1000

            itemStatusDot.setAttribute('title', new Date(element.updateTimeStamp))

            if (seconds > 300 && seconds < 360) {
                itemStatusDot.style.background = '#fbd23e'
                itemStatusDot.style.boxShadow = '0px 0px 8px 0px #ffe10b'
            } else if (seconds < 300) {
                itemStatusDot.style.background = '#3efb4d'
                itemStatusDot.style.boxShadow = '0px 0px 8px 0px #31ff0b'
            }

            const itemContent = document.createElement('div')
            itemContent.setAttribute('class', 'content')

            const itemContentLeft = document.createElement('div')
            const itemContentRight = document.createElement('div')
            itemContentRight.setAttribute('class', 'right')

            itemTitle.innerText = element.name
            itemDesc.innerHTML = element.description
            itemMap.innerHTML = element.map
            itemIp.innerHTML = element.ip
            itemPort.innerHTML = element.port

            const ipItemsContainer = document.createElement('div');
            ipItemsContainer.setAttribute('class', 'ip-items')

            itemCopyIp.setAttribute('src', './files/images/clipboard2-fill.svg')
            itemCopyIp.onclick = () => {
                navigator.clipboard.writeText(element.ip);
            }

            ipItemsContainer.appendChild(itemIp)
            ipItemsContainer.appendChild(itemCopyIp)
            
            const portItemsContainer = document.createElement('div');
            portItemsContainer.setAttribute('class', 'port-items')

            itemCopyPort.setAttribute('src', './files/images/clipboard2-fill.svg')
            itemCopyPort.onclick = () => {
                navigator.clipboard.writeText(element.port);
            }

            portItemsContainer.appendChild(itemPort)
            portItemsContainer.appendChild(itemCopyPort)

            itemContentLeft.appendChild(itemTitle)
            itemContentLeft.appendChild(itemDesc)
            itemContentLeft.appendChild(itemMap)
            itemContentRight.appendChild(ipItemsContainer)
            itemContentRight.appendChild(portItemsContainer)
            itemContentRight.appendChild(itemUpdateTime)
            itemContentRight.appendChild(itemPing)

            itemContent.appendChild(itemContentLeft)
            itemContent.appendChild(itemContentRight)

            item.appendChild(itemContent)
            item.appendChild(itemStatusDot)

            document.getElementById('instances').appendChild(item)
        }

        document.getElementsByClassName('left')[0].style.animationPlayState = "running";
    })

    firebase.database().ref('/voiceActivity/').once('value').then(function (snapshot) {
        let users = snapshot.val()
        setcount(users)
    })
}

function ping(host, port, pong) {

    var started = new Date().getTime();

    var http = new XMLHttpRequest();

    http.open("GET", "http://" + host + ":" + port, /*async*/true);
    http.onreadystatechange = function () {
        console.log(http)
        if (http.readyState = 4) {
            var ended = new Date().getTime();

            var milliseconds = ended - started;

            if (pong != null) {
                pong(milliseconds);
            }
        }
    };
    try {
        http.send(null);
    } catch (exception) {
        // this is expected
    }
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

setInterval(() => {
    retrieveData()
}, 60000);

// startup
retrieveData()
colorSchemeDiscord()