const { Album } = require("./Album");

function printInts(label, items) {
    console.log(`The first ${label} is ${items[0]}.`);
    console.log(`The last ${label} is ${items[items.length - 1]}.`);

    for (let item of items) {
        console.log(`${label}: ${item}`);
    }

    for (let i = 0; i < items.length; i += 1) {
        console.log(`${label} ${i}: ${items[i]}`);
    }
}

function printStrings(label, items) {
    console.log(`The first ${label} is ${items[0]}.`);
    console.log(`The last ${label} is ${items[items.length - 1]}.`);

    for (let item of items) {
        console.log(`${label}: ${item}`);
    }

    for (let i = 0; i < items.length; i += 1) {
        console.log(`${label} ${i}: ${items[i]}`);
    }
}

function printListFancy(label, items, getLabel) {
    for (let item of items) {
        console.log(getLabel(item));
    }

    for (let i = 0; i < items.length; i += 1) {
        console.log(`${label} ${i}: ${getLabel(items[i])}`);
    }
}

// Initialization
let aaa = [];
let bbb = [1, 2, 3];
let ccc = [aaa, ["eee", "fff", "ggg"]];

// Members
let fruits = ["apple", "banana", "cherry"];
console.log(`There are ${fruits.length} fruits.`);
console.log(`The first fruit is ${fruits[0]}.`);

// Popping
let colors = ["red", "orange", "yellow", "green"];
colors.pop();
console.log(`The last color is ${colors[colors.length - 1]}.`);

colors.shift();
console.log(`The first color is ${colors[0]}.`);

// Pushing
let pets = ["bird", "cat"];
pets.push("dog");
console.log(`The last pet is ${pets[pets.length - 1]}.`);

// Splicing
pets.splice(0, 0, "aardvark");
printStrings("pets", pets);
pets.splice(2, 0, "canary");
printStrings("pets", pets);
pets.splice(5, 0, "emu");
printStrings("pets", pets);

// Ranges
let all = pets.slice();
printStrings("all pets", pets);
let lastFew = pets.slice(3);
printStrings("last few pets", pets);

// Ranges by index
let indexAll = pets.slice(0, 3);
printStrings("all pets", pets);
let indexLastFew = pets.slice(1, 3);
printStrings("last few pets", pets);

// Ranges by length
let lengthAll = pets.slice(0, 3);
printStrings("all pets", pets);
let lengthLastFew = pets.slice(1, 4);
printStrings("last few pets", pets);

// Sorting strings
let flavors = ["plain", "chocolate", "vanilla", "strawberry"];
flavors.sort();
printStrings("flavor", flavors);

// Sorting ints
let ints = [1, 10, 2, -3, 8, 4, 5];
ints.sort((a, b) => a - b);
printInts("int", ints);

// Sorting members
let albums = [new Album("Thriller", 1982), new Album("Back in Black", 1980), new Album("The Dark Side of the Moon", 1973)];
albums.sort((albumA, albumB) => albumA.name < albumB.name ? -1 : 1);
printListFancy("album by name", albums, (album) => album.name);
albums.sort((albumA, albumB) => albumA.year < albumB.year ? -1 : 1);
printListFancy("album by year", albums, (album) => album.getLabel());
