import initCardTemplates from "./cards.js";

function makeCard(suitSymbol, card) {
    const red = {
        "hearts": true,
        "diamonds": true,
        "spades": false,
        "clubs": false
    }[suitSymbol];
    const cardTemplate = document.querySelector("#" + card);
    const cardDom = cardTemplate.content.cloneNode(true);
    const symbols = Array.from(cardDom.firstElementChild.children);
    symbols.forEach(symbol => symbol.innerHTML = "&" + suitSymbol + ";");
    const colorClass = red ? "red" : "black";
    cardDom.firstElementChild.classList.add(colorClass);
    return cardDom.firstElementChild;
}

window.addEventListener("load", evt => {
    initCardTemplates();
    const section = document.querySelector("section.deck");
    const packTop = makeCard("spades", "back");
    packTop.setAttribute("draggable", "true");

    // not sure if I should drag things
    packTop.addEventListener("dragstart", evt => {
        var touch = evt.target;
        packTop.style.position = "absolute";
        packTop.style.left = touch.pageX - 50 + 'px';
        packTop.style.top = touch.pageY - 50 + 'px';
        evt.preventDefault();
    });

    packTop.addEventListener("touchmove", evt => {
        var touch = evt.targetTouches[0];
        packTop.style.position = "absolute";
        const offsetWidth = touch.target.offsetWidth / 2;
        const offsetHeight = touch.target.offsetHeight / 2;
        packTop.style.left = (touch.pageX - offsetWidth) + 'px';
        packTop.style.top = (touch.pageY - offsetHeight) + 'px';
        evt.preventDefault();
    });
    section.appendChild(packTop);
});

// End
