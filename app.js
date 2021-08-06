
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let mouseX,
mouseY,
radius = 40,
center = 400,
    circleX = 400,
    circleY = 400,
    border = 255

window.addEventListener('mousemove', (event) => {
    mouseY = event.clientY
    mouseX = event.clientX
    drawCircle()
})

function newPow(circleX, circleY){
   let newPow = Math.sqrt((( circleX - center) ** 2) + ((circleY - center) ** 2))
    return(newPow)
}

function checkCoords() {
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
    checkCoords()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(circleX , circleY , radius, 0, Math.PI * 2, true)
    ctx.strokeStyle = '#586be8'
    ctx.fillStyle = '#3a56ec'
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
}

