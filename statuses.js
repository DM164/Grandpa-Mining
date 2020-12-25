function retrieveServiceData() {

    firebase.database().ref('/alicebotStatus/').once('value').then(function (snapshot) {
        let allModules = 0
        let offlineModules = 5
        let maintenance = false
        let modules = [
            { name: 'main', value: snapshot.val().main_timestamp },
            { name: 'vc', value: snapshot.val().vc_timestamp },
            { name: 'welcome', value: snapshot.val().welcome_timestamp },
            { name: 'autorole', value: snapshot.val().welcome_timestamp },
            { name: 'anime', value: snapshot.val().anime_timestamp }
        ]


        modules.forEach(element => {
            if (element.value == 'maintenance') {
                document.getElementById(`${element.name}-module-status`).style.background = '#3079ff'
                document.getElementById(`${element.name}-module-status`).style.boxShadow = '0px 0px 8px 1px #649bff'
                maintenance = true
                return
            }
            let timestamp = element.value
            let seconds = (Date.now() - timestamp) / 1000

            if (seconds > 60 && seconds < 120) {
                document.getElementById(`${element.name}-module-status`).style.background = '#fbd23e'
                document.getElementById(`${element.name}-module-status`).style.boxShadow = '0px 0px 8px 1px #ffe10b'
                offlineModules--

                // Overall status update
                document.getElementById('alice-status').style.background = '#fbd23e'
                document.getElementById('alice-status').style.boxShadow = '0px 0px 8px 1px #ffe10b'
                document.getElementById('alice-text-status').innerText = 'Long response times'
            } else if (seconds < 60) {
                document.getElementById(`${element.name}-module-status`).style.background = '#3efb4d'
                document.getElementById(`${element.name}-module-status`).style.boxShadow = '0px 0px 8px 1px #31ff0b'
                allModules++
                offlineModules--
            }
        });
        // Overall status update
        if (maintenance == true) {
            // Overall status update
            document.getElementById('alice-status').style.background = '#3079ff'
            document.getElementById('alice-status').style.boxShadow = '0px 0px 8px 1px #649bff'
            document.getElementById('alice-text-status').innerText = 'Maintenance'
        } else if (allModules == 5 && offlineModules == 0) {
            document.getElementById('alice-text-status').innerText = 'All systems online'
            document.getElementById('alice-status').style.background = '#3efb4d'
            document.getElementById('alice-status').style.boxShadow = '0px 0px 8px 1px #31ff0b'
        } else if (offlineModules >= 1 && offlineModules != 5) {
            document.getElementById('alice-status').style.background = '#fbd23e'
            document.getElementById('alice-status').style.boxShadow = '0px 0px 8px 1px #ffe10b'
            document.getElementById('alice-text-status').innerText = 'Partially online'
        }
    })

    firebase.database().ref('/otherbotStatus/').once('value').then(function (snapshot) {
        let allModules = 0
        let offlineModules = 3
        let maintenance = false
        let modules = [
            { name: 'fleischi', value: snapshot.val().fleischi.timestamp },
            { name: 'pipeline', value: snapshot.val().pipeline.timestamp },
            { name: 'superbus', value: snapshot.val().superbus.timestamp }
        ]

        modules.forEach(element => {
            if (element.value == 'maintenance') {
                document.getElementById(`${element.name}-status`).style.background = '#3079ff'
                document.getElementById(`${element.name}-status`).style.boxShadow = '0px 0px 8px 1px #649bff'
                maintenance = true
                return
            }
            let timestamp = element.value
            let seconds = (Date.now() - timestamp) / 1000

            if (seconds > 60 && seconds < 120) {
                document.getElementById(`${element.name}-status`).style.background = '#fbd23e'
                document.getElementById(`${element.name}-status`).style.boxShadow = '0px 0px 8px 1px #ffe10b'
                offlineModules--

                // Overall status update
                document.getElementById('bot-status').style.background = '#fbd23e'
                document.getElementById('bot-status').style.boxShadow = '0px 0px 8px 1px #ffe10b'
                document.getElementById('bot-text-status').innerText = 'Long response times'
            } else if (seconds < 60) {
                document.getElementById(`${element.name}-status`).style.background = '#3efb4d'
                document.getElementById(`${element.name}-status`).style.boxShadow = '0px 0px 8px 1px #31ff0b'
                allModules++
                offlineModules--
            }
        });
        // Overall status update
        if (maintenance == true) {
            // Overall status update
            document.getElementById('bot-status').style.background = '#3079ff'
            document.getElementById('bot-status').style.boxShadow = '0px 0px 8px 1px #649bff'
            document.getElementById('bot-text-status').innerText = 'Maintenance'
        } else if (allModules == 3 && offlineModules == 0) {
            document.getElementById('bot-text-status').innerText = 'All systems online'
            document.getElementById('bot-status').style.background = '#3efb4d'
            document.getElementById('bot-status').style.boxShadow = '0px 0px 8px 1px #31ff0b'
        } else if (offlineModules >= 1 && offlineModules != 3) {
            document.getElementById('bot-status').style.background = '#fbd23e'
            document.getElementById('bot-status').style.boxShadow = '0px 0px 8px 1px #ffe10b'
            document.getElementById('bot-text-status').innerText = 'Partially online'
        }
    })
    firebase.database().ref('/websiteStatus/').once('value').then(function (snapshot) {
        let maintenance = false
        let modules = [
            { name: 'homepage', value: snapshot.val().homepage },
            { name: 'warnings', value: snapshot.val().warnings },
            { name: 'database', value: snapshot.val().database }
        ]

        modules.forEach(element => {
            let status = element.value

            if (status == 'offline') {
                document.getElementById(`${element.name}-status`).style.background = '#fb3e3e'
                document.getElementById(`${element.name}-status`).style.boxShadow = '0px 0px 8px 1px #ff0b0b'

                // Overall status update
                document.getElementById('website-status').style.background = '#fbd23e'
                document.getElementById('website-status').style.boxShadow = '0px 0px 8px 1px #ffe10b'
                document.getElementById('website-text-status').innerText = 'Partially online'
            } else if (status == 'maintenance') {
                document.getElementById(`${element.name}-status`).style.background = '#3079ff'
                document.getElementById(`${element.name}-status`).style.boxShadow = '0px 0px 8px 1px #649bff'
                maintenance = true
            } else {
                document.getElementById(`${element.name}-status`).style.background = '#3efb4d'
                document.getElementById(`${element.name}-status`).style.boxShadow = '0px 0px 8px 1px #31ff0b'

                // Overall status update
                document.getElementById('website-text-status').innerText = 'All systems online'
                document.getElementById('website-status').style.background = '#3efb4d'
                document.getElementById('website-status').style.boxShadow = '0px 0px 8px 1px #31ff0b'
            }
        });
        // Overall status update
        if (maintenance == true) {
            // Overall status update
            document.getElementById('website-status').style.background = '#3079ff'
            document.getElementById('website-status').style.boxShadow = '0px 0px 8px 1px #649bff'
            document.getElementById('website-text-status').innerText = 'Maintenance'
        }
    })
    firebase.database().ref('/websiteStatus/statusMessage').once('value').then(function (snapshot) {
        if (snapshot.val() != 'placeholder') {
            document.getElementById('service-message').innerHTML = snapshot.val()
            document.getElementById('service-message').style.display = 'block'
        }
    })
}
retrieveServiceData()
setTimeout(() => {
    retrieveServiceData()
}, 60000);