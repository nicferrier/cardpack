
function makeSuitDom(suitSymbol) {
    const red = {
        "hearts": true,
        "diamonds": true,
        "spades": false,
        "clubs": false
    }[suitSymbol];
    const suitTemplate = document.querySelector("#suit");
    const suitDom = suitTemplate.content.cloneNode(true);
    const list = Array.from(suitDom.children[0].children);
    list.forEach((card, index) => {
        const symbols = Array.from(card.children);
        symbols.forEach(symbol => symbol.innerHTML = "&" + suitSymbol + ";");
    });
    const colorClass = red ? "red" : "black";
    suitDom.children[0].classList.add(colorClass);
    return suitDom.children[0];
}

window.addEventListener("load", evt => {
    const section = document.querySelector("section");
    section.appendChild(makeSuitDom("spades"));
    section.appendChild(makeSuitDom("hearts"));
    //const classes = list.map(e => e.classList);
    //console.log(classes);
});
