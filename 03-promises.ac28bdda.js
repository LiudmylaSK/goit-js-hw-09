function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},t.parcelRequired7c6=r);var i=r("7Y9D8");function a(e,t){return new Promise(((n,o)=>{setTimeout((()=>{Math.random()>.3?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}function l({position:t,delay:n}){e(i).Notify.success(`✅ Fulfilled promise ${t} in ${n}ms`)}function s({position:t,delay:n}){e(i).Notify.failure(`❌ Rejected promise ${t} in ${n}ms`)}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();const t=new FormData(e.target);let n=parseInt(t.get("delay"));const o=parseInt(t.get("step")),r=parseInt(t.get("amount")),i=[];for(let e=0;e<r;e++)i.push(a(e+1,n)),n+=o;i.forEach((e=>{e.then(l).catch(s)}))}));
//# sourceMappingURL=03-promises.ac28bdda.js.map
