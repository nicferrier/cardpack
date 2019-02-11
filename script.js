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

function size(pxString) {
    console.log(pxString);
    const [num] = new RegExp("[0-9]+").exec(pxString);
    return Number(num);
}

window.addEventListener("load", evt => {
    initCardTemplates();
    const dock = document.querySelector(".players .card");
    const section = document.querySelector("section.deck");
    const deal = function (card) {
        const {top: dockTop,
               left: dockLeft,
               bottom: dockBottom,
               right: dockRight,
               width: dockWidth,
               height: dockHeight} = dock.getBoundingClientRect();
        const widthThird = (dockWidth / 3);
        const heightThird = (dockHeight / 3);
        const heightHalf = (dockHeight / 2);
        const [boundTop, boundLeft, boundBottom, boundRight] = [
            dockTop - heightThird,
            dockLeft - widthThird,
            dockBottom + heightHalf,
            dockRight + widthThird
        ];
        const {top: cardTop,
               left: cardLeft,
               bottom: cardBottom,
               right: cardRight} = card.getBoundingClientRect();
        const tooLow = cardTop < boundTop;
        const tooLeft = cardLeft < boundLeft;
        const tooHigh = cardBottom > boundBottom;
        const tooRight = cardRight > boundRight;
        const isIn = tooLow == false
              && tooLeft == false
              && tooHigh == false
              && tooRight == false;
        console.log("is in", isIn, dockWidth, dockHeight);
        console.log(tooLow, tooLeft, tooHigh, tooRight);
        console.log("dock", dockTop, dockLeft, dockBottom, dockRight);
        console.log("card", cardTop, cardLeft, cardBottom, cardRight);
        console.log("bound", boundTop, boundLeft, boundBottom, boundRight);
    };
    const packTop = makeCard("spades", "back", deal);
    const pack = [];
    const demo = makeCard("spades", "king");
    demo.style.float = "right";
    section.appendChild(demo);
    section.appendChild(packTop);
});

// End
