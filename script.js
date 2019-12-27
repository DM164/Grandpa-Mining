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