const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext("2d");

const colors = ['#B4CEEE', '#5C7BA1', '#0C233D', '#01050B']

class Ball {
    constructor(posX, posY, color, radius, dx, dy, size) {
        this.posX = posX,
        this.posY = posY,
        this.color = color,
        this.radius = radius,
        this.originalRadius = radius,
        this.dx = dx,
        this.dy = dy,
        this.size = size
    }

    move(byX, byY) {
        this.posX += byX
        this.posY += byY
    }
}

let balls = []

for(let i = 0; i < 2000; i++) {
    let posX = Math.floor(Math.random() * canvas.width)
    let posY = Math.floor(Math.random() * canvas.height)
    let color = colors[Math.floor(Math.random() * colors.length)]
    let radius = 0
    let dx = (Math.random() - 0.5) * 5
    let dy = (Math.random() - 0.5) * 5
    let size = (Math.random() > 0.5) ? 'grow' : 'shrink'

    if(posX - radius < 0) { posX += radius }
    if(posX + radius > canvas.width) { posX -= radius }
    if(posY - radius < 0) { posY += radius }
    if(posY + radius > canvas.height) { posY -= radius }

    let ball = new Ball(posX, posY, color, radius, dx, dy, size)
    balls.push(ball)
}

const checkPos = (ball) => {
    if (ball.posX - ball.radius < 0 || ball.posX + ball.radius > canvas.width) {
        ball.dx = -ball.dx
    }

    if (ball.posY - ball.radius < 0 || ball.posY + ball.radius > canvas.height) {
        ball.dy = -ball.dy
    }
}

const checkSize = (ball) => {
    if (ball.size === 'grow' && ball.radius < 60) { ball.radius += 0.25 }
    if (ball.radius === 60) { ball.size = 'shrink' }
    if (ball.size === 'shrink' && ball.radius > 10 ) { ball.radius -= 0.25 }
    if (ball.radius === 10) { ball.size = 'grow' }
}

let mouseX
let mouseY

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})

const checkMouse = (ball) => {
    if ( mouseX - ball.posX < 50 && mouseX - ball.posX > -50 &&
        mouseY - ball.posY < 50 && mouseY - ball.posY > -50 && ball.radius < 30) {
         if( ball.radius < 28 ) {
             ball.radius += 2
         }
    } else if (ball.radius < ball.originalRadius) {
        ball.radius += 2
    } else if (ball.radius > ball.originalRadius) {
        ball.radius -= 2
    }
}

const animate = () => {
    c.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate)
    for(let i = 0; i < balls.length; i++) {
        c.beginPath()
        c.arc(balls[i].posX, balls[i].posY, balls[i].radius, 0,2*Math.PI)
        c.globalAlpha = 0.8
        c.fillStyle = balls[i].color
        c.fill()
        c.stroke()
        checkPos(balls[i])
        checkMouse(balls[i])

        balls[i].move(balls[i].dx, balls[i].dy)
    }
}

animate()