const gridSheet = document.getElementById("gridSheet");
const sliderValue = document.getElementById("slider")
const sliderText = document.getElementById("sliderText")
const colorPicker = document.getElementById("colorPicker")

sliderValue.oninput = function () { // inputs slider value into add grid function
    let value = this.value;
    sliderText.innerHTML = `${value} x ${value}`;
    gridSheet.innerHTML = "";
    flag = "IN"
    addGrid(value, value);
}


const addGrid = function (height, width) { /// determines the grid size based on slider value
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

let flag = "IN"
let color = colorPicker.value
let mouseDown = false

gridSheet.addEventListener("mouseenter", () => {       // colors grid when mouse is clicked and held
    const gridCells = document.querySelectorAll(".grid")
    gridSheet.addEventListener("mouseleave", () => {
        flag = "OUT"
    })
    if (flag === "OUT") {
        return;
    }
    gridCells.forEach((cell) => { 
        let val = ""
        cell.addEventListener("mousedown", (e) => {
            mouseDown = true
            if (darkenButton.value === "ON") {
                val = e.target.style.backgroundColor
                if (val === "") {
                    val = "rgb(255,255,255)"
                }
                val = darken(val, -0.2)
                e.target.style.backgroundColor = val
            } else {
                e.target.style.backgroundColor = color 
        }
        })
        cell.addEventListener("mouseup", () => {
            mouseDown = false
        })
        cell.addEventListener("mouseenter", (e) => {
             if (mouseDown && rainbowButton.value === "ON") {
                getRandomColor()
                e.target.style.backgroundColor = color
             } else if (mouseDown && darkenButton.value === "ON") {
                val = e.target.style.backgroundColor
                if (val === "") {
                    val = "rgb(255,255,255)"
                }
                val = darken(val, -0.2)
                e.target.style.backgroundColor = val
             } else if (mouseDown) {
                e.target.style.backgroundColor = color
             }
        });
    }); 
})


const clearSheet = function () { // clears current sheet and replaces with same size sheet
    gridSheet.innerHTML = ""
    flag = "IN"
    addGrid(sliderValue.value, sliderValue.value)
}


const getRandomColor = function () { // generates random colors
    let letters = '0123456789ABCDEF';
    let randomColor = '#';
    for (var i = 0; i < 6; i++) {
      randomColor += letters[Math.floor(Math.random() * 16)];
    }
    color = randomColor
  }

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
const darken = function (hex, lum) {
    hex = rgb2hex(hex)
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}



const updateColorPicker = function () { // update the color value when changing color choice
    color = colorPicker.value
    clearRainbow()
    clearErase()
    clearDarken()
    colorButton.value = "ON"
    colorButton.style.backgroundColor = "#bfb8b3"

}

const eraseButton = document.getElementById("eraseButton") // Erase button to erase things ig
eraseButton.addEventListener("click", () => {
    if (eraseButton.value === "OFF") {
        eraseButton.value = "ON";
        eraseButton.style.backgroundColor = "#bfb8b3";
        color = "rgb(255, 255, 255";
        clearColor()
        clearRainbow()
        clearDarken()
    } else {
        clearErase()
        color = "not a color"
    }
})

const colorButton = document.getElementById("colorButton") // Color button
colorButton.style.backgroundColor = "#bfb8b3"
colorButton.addEventListener("click", () => {
    if (colorButton.value === "OFF") {
        colorButton.value = "ON"
        colorButton.style.backgroundColor = "#bfb8b3"
        color = colorPicker.value
        clearErase()
        clearRainbow()
        clearDarken()
    } else {
        clearColor()
        color = "not a color"
    }
})


const rainbowButton = document.getElementById("rainbowButton")
rainbowButton.addEventListener("click", () => {
        if (rainbowButton.value === "OFF") {
            rainbowButton.value = "ON"
            rainbowButton.style.backgroundColor = "#bfb8b3"
            clearErase()
            clearColor()
            clearDarken()
        } else {
            clearRainbow()
            color = "not a color"
        }
    })


const darkenButton = document.getElementById("darkenButton")
darkenButton.addEventListener("click", () => {
    if (darkenButton.value === "OFF") {
        darkenButton.value = "ON"
        darkenButton.style.backgroundColor = "#bfb8b3"
        clearRainbow()
        clearErase()
        clearColor()
    } else {
        clearDarken()
        color = "not a color"
    }
})



const clearErase = function () {
    eraseButton.value = "OFF"
    eraseButton.style.backgroundColor = "transparent"
}
const clearColor = function () {
    colorButton.value = "OFF"
    colorButton.style.backgroundColor = "transparent";
}
const clearRainbow = function() {
    rainbowButton.value = "OFF"
    rainbowButton.style.backgroundColor = "transparent"
}
const clearDarken = function() {
    darkenButton.value = "OFF"
    darkenButton.style.backgroundColor = "transparent"
}




addGrid(16,16)