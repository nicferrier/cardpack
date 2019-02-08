import initCardTemplates from "./cards.js";

function makeCard(suitSymbol, card, areaDetect) {
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
        if (typeof(areaDetect) == "function") {
            areaDetect(cardElement);
        }
        evt.preventDefault();
    });
    return cardElement;
}

window.addEventListener("load", evt => {
    initCardTemplates();
    const dock = document.querySelector(".players .card");
    const section = document.querySelector("section.deck");
    const deal = function (card) {
        const [dockTop, dockLeft, dockBottom, dockRight] = [
            dock.offsetTop,
            dock.offsetLeft,
            dock.offsetTop + dock.offsetHeight,
            dock.offsetLeft + dock.offsetWidth
        ];
        const [cardTop, cardLeft, cardBottom, cardRight] = [
            card.offsetTop,
            card.offsetLeft,
            card.offsetTop + card.offsetHeight,
            card.offsetLeft + card.offsetWidth
        ];
        const isIn = cardTop > dockTop
              && cardLeft > dockLeft
              && cardRight > dockRight - (dock.offsetWidth / 2)
              && cardBottom > dockBottom - (dock.offsetHeight / 2);
        console.log("is in",
                    isIn,
                    cardTop > dockTop,
                    cardTop, dockTop,
                    cardLeft > dockLeft,
                    cardRight > dockRight - (dock.offsetWidth / 2),
                    cardBottom > dockBottom - (dock.offsetHeight / 2));
    };
    const packTop = makeCard("spades", "back", deal);
    const pack = [];
    const demo = makeCard("spades", "king");
    demo.style.float = "right";
    section.appendChild(demo);
    section.appendChild(packTop);
});

// End
