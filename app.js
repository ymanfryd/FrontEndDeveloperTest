const button = document.querySelector('button')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let mouseX,
mouseY,
radius = 40,
center = 400,
circleX = 400,
circleY = 400,
border = 255,
bonusFlag = false

window.addEventListener('mousemove', (event) => {
    mouseY = event.clientY
    mouseX = event.clientX
    drawCircle()
})

button.addEventListener('click', () =>{
    if (!bonusFlag)
        bonusFlag = true
    else
        bonusFlag = false
})

function newPow(circleX, circleY){
   let newPow = Math.sqrt((( circleX - center) ** 2) + ((circleY - center) ** 2))
    return(newPow)
}

function checkCoords() {
    let factor = border / newPow(mouseX, mouseY)
    if (newPow(mouseX, mouseY) < border) {
        circleX = mouseX;
        circleY = mouseY;
    } else {
        circleX = center + (mouseX - center) * factor
        circleY = center + (mouseY - center) * factor
    }
}

function checkCoordsBonus() {
if (mouseY - circleY < 100 && mouseX - circleX < 100) {
    if (mouseX - circleX > 0 && newPow(circleX - 5, circleY) < border)
        circleX -= 5;
    if (mouseX - circleX < 0 && newPow(circleX + 5, circleY) < border)
        circleX += 5;
    if (mouseY - circleY > 0 && newPow(circleX, circleY - 5) < border)
        circleY -= 5;
    if (mouseY - circleY < 0 && newPow(circleX, circleY + 5) < border)
        circleY += 5;
}
}

function drawCircle () {
    if (!bonusFlag)
        checkCoordsBonus()
    else
        checkCoords()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(circleX , circleY , radius, 0, Math.PI * 2, true)
    ctx.fillStyle = '#3A56ECFF'
    ctx.fill()
    ctx.closePath()
}

