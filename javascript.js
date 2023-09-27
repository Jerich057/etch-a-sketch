const gridSheet = document.getElementById("gridSheet");

// const addGridWidth = function () {
//     const grid = document.createElement("div");
//     grid.classList.add("grid");
//     gridContainer.appendChild(grid);
// }
const addGrid = function (height, width) {
    for(y = 0; y < height; y++) {
        const gridContainer = document.createElement("div")
        gridContainer.classList.add("grid-container")
        gridSheet.appendChild(gridContainer);
        for(x = 0; x < width; x++) {
            const grid = document.createElement("div");
            grid.classList.add("grid");
            gridContainer.appendChild(grid);
        }
    }
}

console.log(addGrid(3,3))