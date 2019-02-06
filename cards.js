function init() {
    const templates = [`<template id="ace">
  <div class="ace card">
    <div></div>
  </div>
</template>`,
`<template id="two">
  <div class="two card">
    <div></div>
    <div></div>
  </div>
</template>`,
`<template id="three">
  <div class="three card">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>`,
`<template id="four">
  <div class="four card">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>`,
`<template id="five">
  <div class="five card">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>`,
`<template id="six">
  <div class="six card">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>`,
`<template id="seven">
  <div class="seven card">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>`,
`<template id="eight">
  <div class="eight card">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>`,
`<template id="nine">
  <div class="nine card">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>`,
`<template id="ten">
  <div class="ten card">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>`,
`<template id="jack">
  <div class="jack card">
    <div></div>
  </div>
</template>`,
`<template id="queen">
  <div class="queen card">
    <div></div>
  </div>
</template>`,
`<template id="king">
  <div class="king card">
    <div></div>
  </div>
</template>`,
`<template id="back">
  <div class="back card">
  </div>
</template>`];
    templates.forEach(t => {
        const node = document.createElement("div");
        node.innerHTML = t;
        document.body.appendChild(node.children[0]);
    });
}
    
export default init;
