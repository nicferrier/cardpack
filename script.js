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
    const cardElement = cardDom.firstElementChild;
    const symbols = Array.from(cardElement.children);
    symbols.forEach(symbol => symbol.innerHTML = "&" + suitSymbol + ";");
    const colorClass = red ? "red" : "black";
    cardElement.classList.add(colorClass);
    cardElement.addEventListener("touchmove", evt => {
        var touch = evt.targetTouches[0];
        cardElement.style.position = "absolute";
        const offsetWidth = touch.target.offsetWidth / 2;
        const offsetHeight = touch.target.offsetHeight / 2;
        cardElement.style.left = (touch.pageX - offsetWidth) + 'px';
        cardElement.style.top = (touch.pageY - offsetHeight) + 'px';
        evt.preventDefault();
    });
    return cardElement;
}

window.addEventListener("load", evt => {
    initCardTemplates();
    const section = document.querySelector("section.deck");
    const packTop = makeCard("spades", "back");
    const pack = [];
    section.appendChild(packTop);
});

// End
