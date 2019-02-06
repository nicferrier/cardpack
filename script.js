import init from "./cards.js";

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
    return cardDom;
}

window.addEventListener("load", evt => {
    init();
    const section = document.querySelector("section");
    section.appendChild(makeCard("spades", "ace"));
    section.appendChild(makeCard("spades", "seven"));
    section.appendChild(makeCard("spades", "king"));
    section.appendChild(makeCard("spades", "back"));
});
