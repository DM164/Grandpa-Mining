document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault()
    login(e.target.elements[0].value, e.target.elements[1].value)
})

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        if (user.photoURL !== null) {
            document.getElementById('accimg').src = user.photoURL;
        }
        document.getElementById('accname').innerText = user.displayName;

        localStorage.setItem('UID: ', user.uid)
        loggedIn()
        // ...
    } else {
        // User is signed out.
        // ...
    }
});

function loggedIn() {
    var user = firebase.auth().currentUser;

    if (user != null) {

        document.getElementsByClassName('info')[0].style.display = 'none'
        document.getElementsByClassName('info')[1].style.display = 'none'

        document.getElementById('account-menu').style.width = '340px'
        document.getElementById('account-menu').style.padding = '22px 22px'

        // profile pic
        if (user.photoURL !== null) {
            document.getElementsByClassName('accimg-container')[0].style.display = 'inline-block'
            document.getElementById('accimg_p').src = user.photoURL;
        }

        // menu on landing page
        document.getElementById('accname').innerText = user.displayName;

        // account preview
        document.getElementById('accname_p').innerText = user.displayName;
        document.getElementById('accmail_p').innerText = user.email;

        // buttons
        document.getElementById('account_p').style.display = 'grid'
        document.getElementById('login-form').style.display = 'none'
        document.getElementById('open-account-manager').style.display = 'block'
        document.getElementById('sign-out').style.display = 'block'
    }
}

let failedLoginAttempt = false
function login(email, password) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .catch(function (error) {
            console.log(error.code)

            if (failedLoginAttempt === false) {
                let failed = document.createElement('h2')
                failed.setAttribute('class', 'failed-login')
                failed.innerText = error.message
                document.getElementById('login-form').prepend(failed)
                failedLoginAttempt = true
            } else {
                document.getElementsByClassName('failed-login')[0].innerText = error.message
            }
        });
}

function signout() {
    firebase.auth().signOut()
}

//log out
document.getElementById('sign-out').addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        location.reload()
    })
})

//account menu
let accMenuOpen = false
document.getElementsByClassName('account-menu')[0].addEventListener('click', () => {
    toggleAccMenu()
})
function toggleAccMenu() {
    if (accMenuOpen) {
        accMenuOpen = false
        document.getElementById('account-menu').style.animationName = "fadeoutMenu"
        setTimeout(() => {
            document.getElementById('account-menu').style.display = "none"
        }, 300);
    } else {
        accMenuOpen = true
        document.getElementById('account-menu').style.display = "inline-block"
        document.getElementById('account-menu').style.animationName = "fadeinMenu"
    }
}