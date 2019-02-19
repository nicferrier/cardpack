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

// take a touch event target card and a "dock" (a place to send the
// card) and detect when it sits over it
function makeDeal() {
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
        const debug = false;
        if (debug) {
            console.log("is in", isIn, dockWidth, dockHeight);
            console.log(tooLow, tooLeft, tooHigh, tooRight);
            console.log("dock", dockTop, dockLeft, dockBottom, dockRight);
            console.log("card", cardTop, cardLeft, cardBottom, cardRight);
            console.log("bound", boundTop, boundLeft, boundBottom, boundRight);
        }
        if (isIn) {
            dock.classList.add("facedown");
            const countAttr = dock.getAttribute("data-packcount");
            const count = countAttr === undefined ? 0 : Number(countAttr) + 1;
            dock.setAttribute("data-packcount", count);
            console.log("dock's pack count", count);
        }
    };
};

// Make a shuffled deck of cards
function makeDeck() {
    const suits = ["spades", "clubs", "hearts", "diamonds"];
    const suitCards = [...Array(13).keys()];
    const cardHands = suits.map(suit => suitCards.map(card => `${suit}-${card}`));
    const sortedPack =Array.concat.apply(undefined, cardHands);
    const pack = [...Array(52).keys()];
    const deck = pack.map(_ => {
        const pick = Math.floor(Math.random() * Math.floor(sortedPack.length));
        const card = sortedPack[pick];
        sortedPack.splice(pick, 1);
        return card;
    });
    return deck;
}

window.addEventListener("load", evt => {
    initCardTemplates();
    const dock = document.querySelector(".players .card");
    const section = document.querySelector("section.deck");
    const deck = makeDeck();
    const packTop = makeCard("spades", "back");
    const pack = [];
    packTop.setAttribute("data-packcount", 52);
    const demo = makeCard("spades", "king");
    demo.style.float = "right";
    section.appendChild(demo);
    section.appendChild(packTop);
});

// End
