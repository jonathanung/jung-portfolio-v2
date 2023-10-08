let isAnimatingHome = null;
let innerTimeouts = [];
let defaultPages = ["about", "projects", "contact", "experience"];
const code = [
    "person Jonathan = new person(alive = true);",
    "while (Jonathan.alive) {",
    "Jonathan.isProgramming = true;",
    "Jonathan.isGaming = true;",
    "Jonathan.isCooking = true;",
    "Jonathan.isLifting = true;",
    "Jonathan.learn(newThing);",
    "}"
];
let lastBtn = "brief-btn";
let lastSelect = "about-content-brief"
document.getElementById(lastBtn).disabled = true;

$(document).ready(function () {
    if (localStorage.getItem("page") == null) {
        localStorage.setItem("page", "home");
    }
    $('.loader').fadeOut(750, "swing");
    $(`.${localStorage.getItem("page")}-content`).fadeIn(750, "swing").css("display", "grid");
    if (localStorage.getItem("page") === "home") {
        animateHomeCode();
    }
});

function swapPage(oldPage, newPage) {
    $(`.${oldPage}-content`).fadeOut(500, "swing");
    $('.loader').fadeIn(500, "swing");
    localStorage.setItem("page", newPage);
    if (oldPage === "home") {
        setTimeout(function () {
            deleteHomeCode();
        }, 550);
    } else if (oldPage === "about") {
        setTimeout(function () {
            document.getElementById(lastBtn).disabled = false;
            document.getElementById(lastSelect).style.display = "none";
            lastBtn = "brief-btn";
            lastSelect = "about-content-brief";
            document.getElementById(lastBtn).disabled = true;
            document.getElementById(lastSelect).style.display = "block";
        }, 550);
    }
    setTimeout(function () {
        for (page of defaultPages) { 
            let el = document.getElementById(`${page}-nav`);
            if (el.style.display) {
                el.style.display = "";
            }
        }
        $('.loader').fadeOut(500, "swing");
        $(`.${newPage}-content`).fadeIn(500, "swing").css("display", "grid");
        if (newPage === "home") {
            animateHomeCode();
        }
    } , 550);
}

function swapSelect(e, newSelect) {
    document.getElementById(lastBtn).disabled = false;
    document.getElementById(`${newSelect}-btn`).disabled = true;
    document.getElementById(lastSelect).style.display = "none";
    document.getElementById(`about-content-${newSelect}`).style.display = "block";
    lastBtn = `${newSelect}-btn`;
    lastSelect = `about-content-${newSelect}`;
}

function animateHomeCode() {
    isAnimatingHome = setTimeout(function () {
        for (let i = 0; i < code.length-1; i++) {
            innerTimeouts.push(setTimeout(function () {
                let JTriggered = 0;
                if (isAnimatingHome) {
                    for (let j = -1; j < code[i].length; j++) {
                        if (j === -1) {
                            if (isAnimatingHome) {
                                document.getElementById(`home-line-${i}`).innerHTML += "|";
                            }
                        }
                        else {
                            setTimeout(function () {
                                if (isAnimatingHome) {
                                    document.getElementById(`home-line-${i}`).innerHTML = document.getElementById(`home-line-${i}`).innerHTML.slice(0, -1);
                                    if (code[i][j] === "J" || JTriggered) {
                                        document.getElementById(`home-line-${i}`).innerHTML += `<span style='color:#8888FF'>${code[i][j]}</span>`;
                                        if (code[i][j] === "J") {
                                            JTriggered = 7;
                                        } else {
                                            JTriggered--;
                                        }
                                    }
                                    else {
                                        document.getElementById(`home-line-${i}`).innerHTML += code[i][j];
                                    }
                                    document.getElementById(`home-line-${i}`).innerHTML += "|";
                                }
                            }, 45 * j+1);
                        }
                        if (j === code[i].length - 1) {
                            setTimeout(function () {
                                if (isAnimatingHome) {
                                    if (i == 1) {
                                        document.getElementById(`home-line-${code.length-1}`).innerHTML += code[code.length-1];
                                    }
                                    document.getElementById(`home-line-${i}`).innerHTML = document.getElementById(`home-line-${i}`).innerHTML.slice(0, -1);
                                }
                            }, 45 * j+10);
                        }
                    }
                }
            }, getParentTimeout(i)));
        }
    }, 750);
}

function getParentTimeout(i) {
    let timeout = 0;
    for (j = 0; j < code.length; j++) {
        if (j === i) {
            return timeout;
        } else {
            timeout += code[j].length * 45;
            timeout += 200;
        }
    }
}

function deleteHomeCode() {
    clearTimeout(isAnimatingHome);
    for (let i = 0; i < innerTimeouts.length; i++) {
        clearTimeout(innerTimeouts[i]);
    }
    isAnimatingHome = null;
    innerTimeouts = [];
    for (let i = 0; i < code.length; i++) {
        document.getElementById(`home-line-${i}`).innerHTML = "";
        if (i > 1 && i < 7) { //white loop adding whitespace
            document.getElementById(`home-line-${i}`).innerHTML = "&nbsp; &nbsp; ";
        }
    }
}

function toggleNav(nav) {
    let el = document.getElementById(nav);
    if (!el.style.display || el.style.display === "none") {
        $(`#${nav}`).slideDown(500, "swing").css("display", "flex")
    } else {
        $(`#${nav}`).slideUp(500, "swing");
        // el.style.display = "";
    }
}