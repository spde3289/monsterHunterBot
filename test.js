const itemList = require("./commands/Items/itemList.json");
const Hangul = require("hangul-js")

const command = "흑룡";

// 용감한 뒤틀린 뿔
//[ 용감한 비틀린뿔 ]
let searcher = new Hangul.Searcher("용감한 비틀린뿔");

const a = "용감한 뒤틀린 뿔";
const b = "";

console.log(Hangul.rangeSearch(a, b));

const current = itemList.filter((el) => el.name.includes(command));

console.log(current.length)
console.log("용감한 비틀린 뿔".includes("용감한"));