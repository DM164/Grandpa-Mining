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
    firebase.database().ref('/websiteStatus/database').once('value').then(function (snapshot) {
        if (snapshot.val() === 'maintenance') {
            console.log('Website is in maintenance mode')
            document.getElementsByClassName('maintenance')[0].style.display = 'inline-block'
            document.getElementsByClassName('body2')[0].style.display = 'none'
        }
    })

    firebase.database().ref('/payments-month/').once('value').then(function (snapshot) {
        document.getElementsByClassName('monthTAG')[0].innerText = snapshot.val()
    })

    firebase.database().ref('/payments/').once('value').then(function (snapshot) {
        let paymentsArray = snapshot.val()

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
            if (faggotSaysYes === true) {
                element.PPmonths.forEach(element => {
                    let PPmonthDiv = document.createElement('div')
                    PPmonthDiv.setAttribute('class', 'PPmonths')
                    PPmonthDiv.innerText = element
                    document.getElementById(im).appendChild(PPmonthDiv)
                });
                faggotSaysYes = false
            }
            im++
        })

        firebase.database().ref('/credentials/data').once('value').then(function (snapshot) {
            document.getElementsByClassName('monthTAG')[1].innerText = snapshot.val().timestamp
            document.getElementById('credentials-username').innerText = snapshot.val().username
            document.getElementById('credentials-password').innerText = snapshot.val().password
        })
    })
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

setInterval(() => {
    retrieveData()
}, 60000);

// startup
retrieveData()

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        getUserData()
    } else {
        // User is signed out.
        // ...
        location.replace('../index.html')
    }
});

function getUserData() {
    // User is signed in.
    let user = firebase.auth().currentUser;

    if (user.photoURL !== null) {
        document.getElementById('accimg_p').src = user.photoURL;
    }
    document.getElementById('accname').innerText = user.displayName;
    document.getElementById('accname-ui').innerText = user.displayName;

    // profile pic
    if (user.photoURL !== null) {
        document.getElementsByClassName('accimg-ui-container')[0].style.display = 'inline-block'
        document.getElementById('accimg-ui').src = user.photoURL;
    }

    // account preview
    document.getElementById('accname-ui').innerText = user.displayName;
    document.getElementById('accmail-ui').innerText = user.email;

    document.getElementById('account-ui').style.display = 'grid'
    // ...
}

function renderTabs(arg) {
    document.getElementById('payment').style.display = 'none'
    document.getElementById('credentials').style.display = 'none'
    document.getElementById('settings').style.display = 'none'

    if (arg === undefined || arg === null) {
        document.getElementById('payment-switch').style.filter = 'brightness(1.3)'
        document.getElementById('payment').style.display = 'block'
        localStorage.setItem('lastTab', 'payment')
    } else {
        document.getElementById(localStorage.getItem('lastTab')).style.filter = ''
        document.getElementById(arg.slice(0, -7)).style.display = 'block'
        document.getElementById(arg).style.filter = 'brightness(1.3)'
        localStorage.setItem('lastTab', arg)
    }
}

document.getElementById('sidebar').addEventListener('click', (e) => {
    if (e.target.nodeName.toLowerCase() === 'li') {
        renderTabs(e.target.id)
    }
})

renderTabs(localStorage.getItem('lastTab'))

document.getElementById('credentials-password').addEventListener('click', () => {
    document.getElementById('credentials-password').style.background = 'transparent'
    document.getElementById('credentials-password').style.color = '#888888'
    document.getElementById('credentials-password').style.padding = 'initial'
})

document.getElementById('change-username-form').addEventListener('submit', (e) => {

    e.preventDefault()
    let user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: e.target.elements[0].value,
    }).then(function () {
        getUserData()
        e.target.elements[0].value = ''
        document.getElementById('change-username-form').style.background = '#ffff340f'
        setTimeout(() => {
            document.getElementById('change-username-form').style.background = ''
        }, 1000);
    }).catch(function (error) {
        console.log('Couldn\'t change username')
    })

})

document.getElementById('change-password-form').addEventListener('submit', (e) => {
    e.preventDefault()
    let newPassword = '';
    let user = firebase.auth().currentUser;
    if (e.target.elements[0].value === e.target.elements[1].value) {
        newPassword = e.target.elements[0].value
    } else {
        changePasswordDenied()
        return
    }

    user.updatePassword(newPassword).then(function () {
        e.target.elements[0].value = ''
        e.target.elements[1].value = ''
        document.getElementById('change-password-form').style.background = '#ffff340f'
        setTimeout(() => {
            document.getElementById('change-password-form').style.background = ''
        }, 1000);
    }).catch(function (error) {
        document.getElementById('change-password-form').style.background = '#b52c2c29'
        setTimeout(() => {
            document.getElementById('change-password-form').style.background = ''
        }, 3000);
    });
})
function changePasswordDenied() {
    document.getElementById('change-password-form').style.background = '#b52c2c29'
    setTimeout(() => {
        document.getElementById('change-password-form').style.background = ''
    }, 2000);
}