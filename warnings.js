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

firebase.database().ref('/websiteStatus/warnings').once('value').then(function (snapshot) {
    if (snapshot.val() === 'maintenance') {
        console.log('Website is in maintenance mode')
        document.getElementsByClassName('maintenance')[0].style.display = 'inline-block'
        document.getElementsByClassName('body2')[0].style.display = 'none'
    }
})

// Warnings
firebase.database().ref('/warnings/').once('value').then(function (snapshot) {
    let warningsArray = snapshot.val()

    let loadingElement = document.getElementById('warnings')
    while (loadingElement.firstChild) {
        loadingElement.removeChild(loadingElement.firstChild)
    }

    let i = 0
    warningsArray.forEach(element => {
        const listElement = document.createElement('ul')
        listElement.innerHTML = `
        <p class="wName">${element.name}</p>
        <p class="wType">${element.type}</p>
        <p class="wDate">${element.date}</p>
        <p class="wMore">${element.more}</p>`
        document.getElementById('warnings').append(listElement)
    });

    const listDate = document.createElement('h2')
    listDate.innerText = 'Warnings'
    listDate.setAttribute('class', 'title')
    document.getElementById('warnings').prepend(listDate)

    // document.getElementsByClassName('warnings-table')[0].style.webkitAnimationPlayState = "running";
})