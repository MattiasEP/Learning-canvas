const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Star {

    constructor(posX, posY, radius, dirX, dirY, color) {
        this.posX = posX,
        this.posY = posY,
        this.radius = radius,
        this.dirX = dirX,
        this.dirY = dirY,
        this.color = color
    }

    move() {
        this.posX += this.dirX
        this.posY += this.dirY
    }

    renderTail() {
        for (let i = 0; i < this.tail.length; i++) {
            ctx.beginPath()
            ctx.arc(this.tail[i].posX, this.tail[i].posY, this.radius, 0, 2 * Math.PI)
            ctx.arc()
            ctx.lineWidth = 0
            ctx.strokeStyle = this.color
            ctx.fillStyle = this.color
            ctx.globalAlpha = 1 - (i / 5)
            ctx.fill()
            ctx.stroke()
        }
    }
}

const randomColor = () => {
    const r = Math.floor(Math.random() * 254) + 1
    const g = Math.floor(Math.random() * 254) + 1
    const b = Math.floor(Math.random() * 254) + 1
    const alpha = Math.floor(Math.random() * 10) / 10
    // const alpha = 1
    const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`
    return rgba
}

let stars = []

setInterval( () => {
    let posX = canvas.width / 2
    let posY = canvas.height / 2
    let radius = Math.floor(Math.random() * 2 + 1)
    let dirX = ( Math.random() - 0.5 ) * 10
    let dirY = ( Math.random() - 0.5 ) * 10
    
    if ( posX - radius < 0 ) { posX += radius }
    if ( posX + radius > canvas.width ) { posX -= radius }
    if ( posY - radius < 0 ) { posY += radius }
    if ( posY + radius > canvas.height ) { posY -= radius }
    
    const star = new Star(mouseX, mouseY, radius, dirX, dirY, randomColor())
        
    if ( stars.length >= 100 ) {
        stars.pop()
    }
    stars.unshift(star)
    // console.log( window.performance.now() )
}, 1)

let mouseX
let mouseY

canvas.addEventListener('click', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})


let fps = 60
let interval = 1000/fps
let lastTime = (new Date()).getTime()
let currentTime = 0
let delta = 0

const animate = () => {
    
    requestAnimationFrame(animate)
    
    currentTime = ( new Date() ).getTime()
	delta = (currentTime - lastTime)

    if(delta > interval) {
        
        clearScreen()    
        
        stars.forEach( star => {
            ctx.beginPath()
            ctx.arc(star.posX, star.posY, star.radius, 0, Math.PI * 2)
            ctx.lineWidth = 0
            ctx.strokeStyle = star.color
            ctx.fillStyle = star.color
            ctx.globalAlpha = 1
            ctx.fill()
            ctx.stroke()
            star.move()

        });

        lastTime = currentTime - (delta % interval)
    }
    
}

const clearScreen = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
	// ctx.clearRect(0, 0, canvas.width, canvas.height)
}

animate()