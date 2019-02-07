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
    return cardDom.firstElementChild;
}

window.addEventListener("load", evt => {
    init();
    const section = document.querySelector("section.deck");
    const packTop = makeCard("spades", "back");
    packTop.setAttribute("draggable", "true");
    packTop.addEventListener("dragstart", evt => {
        console.log("WHEEE!");
    });
    packTop.addEventListener("touchmove", evt => {
        var touch = evt.targetTouches[0];
        // console.log("touch x,y", touch.pageX, touch.pageY);
        packTop.style.position = "absolute";
        packTop.style.left = touch.pageX - 50 + 'px';
        packTop.style.top = touch.pageY - 50 + 'px';
        evt.preventDefault();
    });
    section.appendChild(packTop);
});

// End
