const button = document.querySelector('button')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let bonusFlag = false,
mouseX,
mouseY,
radius = 40,
center = 400,
circleX = 400,
circleY = 400,
border = 255,
runDistance = 5

window.addEventListener('mousemove', (event) => {
    mouseY = event.clientY
    mouseX = event.clientX
    drawCircle()
})

button.addEventListener('click', () =>{
    bonusFlag = !bonusFlag;
})

function getDist(x1, y1, x2, y2){
	let dist = Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2))
	return(dist)
}

function checkCoords() {
    let factor = border / getDist(mouseX, mouseY, center, center)
    if (getDist(mouseX, mouseY, center, center) < border) {
        circleX = mouseX;
        circleY = mouseY;
    } else {
        circleX = center + (mouseX - center) * factor
        circleY = center + (mouseY - center) * factor
    }
}

function checkCoordsBonus() {
    let vectorX = mouseX - circleX,
    vectorY = mouseY - circleY
    let dist = getDist(circleX, circleY, mouseX, mouseY)
    if (dist < 150 && dist > 0)
        runDistance = 5 * 150 / Math.max(dist, 15)
	if (dist < 150) {
		if (vectorX > 0 && getDist(circleX - runDistance, circleY, center, center) < border)
			circleX -= runDistance;
		if (vectorX < 0 && getDist(circleX + runDistance, circleY ,center, center) < border)
			circleX += runDistance;
		if (vectorY > 0 && getDist(circleX, circleY - runDistance,center, center) < border)
			circleY -= runDistance;
		if (vectorY < 0 && getDist(circleX, circleY + runDistance,center, center) < border)
			circleY += runDistance;
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

