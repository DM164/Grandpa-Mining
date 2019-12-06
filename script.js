// Open Navigation Menu on Mobile devices
let navOpen = false;
document.getElementById('navIcon').addEventListener('click', function(){
    if(navOpen == false){
        document.querySelector('.navElements').style.display = 'inline-block';
        navOpen = true
    } else {
        document.querySelector('.navElements').style.display = 'none';
        navOpen = false
    }
});

// Expand prepayed months
let preOpen = false
document.getElementsByClassName('statusPP')[0].addEventListener('click', (e) => {
    if (preOpen === false){
        document.getElementById('PPmonthsContainer').style.display='inline-block'
        document.getElementById('PPmonthsContainer').style.webkitAnimationPlayState = "running";
        preOpen = true
    } else {
        document.getElementById('PPmonthsContainer').style.display='none'
        document.getElementById('PPmonthsContainer').style.webkitAnimationPlayState = "paused";
        preOpen = false
    }
})