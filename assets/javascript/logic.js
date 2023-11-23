const gridimglist = [
    "assets/img/grid-img1.svg", "assets/img/grid-img2.svg", "assets/img/grid-img3.svg", "assets/img/grid-img4.svg",
    "assets/img/grid-img5.svg", "assets/img/grid-img6.svg", "assets/img/grid-img7.svg", "assets/img/grid-img8.svg",
    "assets/img/grid-img9.svg", "assets/img/grid-img10.svg", "assets/img/grid-img11.svg", "assets/img/grid-img12.svg",
    "assets/img/grid-img13.svg", "assets/img/grid-img14.svg", "assets/img/grid-img15.svg", "assets/img/grid-img16.svg",
];

const gridchild = document.querySelectorAll(".memory-grid > .grid-child");
const imgs = document.querySelectorAll(".memory-grid > .grid-child img.ans-img");
const startbtn = document.getElementById("start-btn");
var placesarr = [];
var timer_flag = true;
newgame();
startbtn.addEventListener("click", function () {
    document.querySelector("div.curtain").classList.add("open");
    document.querySelector("div.timer").classList.remove("won", "lose");
    timerstatus();
    enablecards();
    
});


gridchild.forEach(function (val, index) {
    val.addEventListener("click", function () {
        val.classList.add("grid-child-rotate");
        disablecards();
        const delay = setInterval(function () {
            val.classList.add("grid-child-rotate-style");
            checkcards(index);
            clearInterval(delay);
        }, 500);
    });

});


function newgame() {

     placesarr = random_num_arr_generator(16, 16);
    const imgarr = random_num_arr_generator(16, 8);

    console.log(placesarr);
    console.log(imgarr);
    placesarr.forEach(function (val, index) {
        imgs[val].src = gridimglist[imgarr[index < 8 ? index : index - 8]];
        gridchild[val].classList.remove("grid-child-rotate", "grid-child-rotate-style");
    });
}



const checkcards = (function () {
    const opencards = [];
    return function checking(index) {

        opencards.push(index);
        console.log("length of opencard " + opencards.length);


        if (opencards.length == 1) {
            var delay = setInterval(function () {
                enablecards();
                clearInterval(delay);
            }, 500);
        }

        else if (opencards.length == 2) {

            console.log(opencards);
            if (Math.abs(placesarr.indexOf(opencards[0]) - placesarr.indexOf(opencards[1])) == 8) {
                console.log("match");
                checkforwin();
                opencards.pop();
                opencards.pop();
                var delay = setInterval(function () {
                    enablecards();
                    clearInterval(delay);
                }, 500);

            }
            else {

                const delay = setInterval(function () {
                    closecards(opencards[0], opencards[1]);

                    enablecards();
                    opencards.pop();
                    opencards.pop();
                    clearInterval(delay);
                }, 1100);

            }

        }


    }
})();

function disablecards() {
    gridchild.forEach(function (val) {
        val.classList.add("disable-btn");
    });
}

function enablecards() {
    gridchild.forEach(function (val) {
        val.classList.remove("disable-btn");
    });
}

function closecards(card1, card2) {
    const reqcards = [card1, card2];

    for (var i = 0; i < 2; i++) {
        gridchild[reqcards[i]].classList.remove("grid-child-rotate",);
    }

    const closing = setInterval(function () {
        for (var i = 0; i < 2; i++) {
            gridchild[reqcards[i]].classList.remove("grid-child-rotate-style",);
        }
        clearInterval(closing);
    }, 500);
}

function checkforwin() {
    const opencards = document.querySelectorAll(".memory-grid > .grid-child.grid-child-rotate");
    if (opencards.length == 16) {
        timer_flag = false;
        document.querySelector("div.timer").classList.add("won");
        document.querySelector(".timer.won > p.center").innerHTML = "WON";
        document.getElementById("min-hand").innerHTML = "";
        document.getElementById("sec-hand").innerHTML = "";
        closegame();
    }
}


function random_num_arr_generator(max, len) {
    let result = [];
    let temp;
    while (result.length < len) {
        temp = Math.floor(Math.random() * max);
        if (!result.includes(temp)) {
            result.push(temp);
        }
    }
    return result;
}


function timerstatus() {

    const mmh = document.getElementById("min-hand");
    const ssh = document.getElementById("sec-hand");
    var min = 1;
    var sec = 30;

    document.querySelector(".timer > p.center").innerHTML = ":";
    mmh.innerHTML = "0" + min;
    ssh.innerHTML =  sec;

    var timermm = setInterval(function () {

        

        if (min == 0 && sec == 0) {
            clearInterval(timermm);
            mmh.innerHTML = "";
            ssh.innerHTML = "";
            document.querySelector(".timer.lose > p.center").innerHTML = "LOST";
            closegame();
        }

        else {

            if (timer_flag == false) {
                clearInterval(timermm);
            }

            else {
                if (min == 0 && sec == 30) {
                    document.querySelector("div.timer").classList.add("lose");
                }
                if(sec==0){
                    min--;
                    sec = 59;
                    mmh.innerHTML = "0" + min;
                }
                if (sec > 9) {
                    ssh.innerHTML = sec;
                }

                else {
                    ssh.innerHTML = "0" + sec;
                }

                sec--;
            }
            
        }

    }, 1000);

}

function closegame(){

    disablecards();
    var closing = setInterval(function () {
        
        document.querySelector("div.curtain").classList.remove("open");
        timer_flag = true;
        clearInterval(closing);
    }, 5000);

    var changegame = setInterval(function(){
              newgame();
              clearInterval(changegame);
    },6200);
}