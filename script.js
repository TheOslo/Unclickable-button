const button = document.querySelector('.js-button');
const alert = document.querySelector('.js-alert');

const padding = 20;

let currentX = window.innerWidth / 2 - 50;
let currentY = window.innerHeight / 2 - 22.5;

let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;

let prevMouseX = mouseX, prevMouseY = mouseY;

let targetX = currentX;
let targetY = currentY;

button.style.left = `${currentX}px`;
button.style.top = `${currentY}px`;

let maxX = window.innerWidth - button.offsetWidth - padding;
let maxY = window.innerHeight  - button.offsetHeight - padding;

let speed = 0;

let velocityX = 0;
let velocityY = 0;
let acceleration = 0.8;

let distance;
let lastJump= 0;
const jumpCoolDown = 500;

let isJumping = false;
let jumpProgress = 0;
let jumpStartX, jumpStartY;
let jumpEndX, jumpEndY;

let isFast = false;
let startMouse = false;

window.addEventListener('mousemove', (e) => {

    if(!startMouse){
        startMouse = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        return;
    }

    prevMouseX = mouseX;
    prevMouseY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    speed = Math.sqrt(Math.pow(mouseX - prevMouseX, 2) + Math.pow(mouseY - prevMouseY, 2));
});

function animate(){
    console.log('speed:', speed, 'isFast:', isFast, 'distance:', distance);

    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const dx = buttonCenterX - mouseX;
    const dy = buttonCenterY - mouseY;

    distance = Math.sqrt(dx * dx + dy * dy);

    if(distance < 150 && !isFast && startMouse){
        let theta = Math.atan2(dy, dx);
        targetX = currentX + Math.cos(theta) * Math.max(20, speed * 10);
        targetY = currentY + Math.sin(theta) * Math.max(20, speed * 10);

    }
        if(isJumping){
            let x = jumpStartX + (jumpEndX - jumpStartX) * jumpProgress;
            let y = jumpStartY + (jumpEndY - jumpStartY) * jumpProgress;

            let arc = Math.sin(jumpProgress * Math.PI) * 200;
            y -= arc;

            currentX = x;
            currentY = y;

            jumpProgress += 0.02;

            if(jumpProgress >= 1){
                isJumping = false;

                targetX = currentX;
                targetY = currentY;
            }
        }
        else if(startMouse){
            let forceX = (targetX - currentX) * acceleration;
            let forceY = (targetY - currentY) * acceleration;

            velocityX += forceX;
            velocityY += forceY;
            //friction
            velocityX *= 0.08;
            velocityY *= 0.08;

            currentX += velocityX;
            currentY += velocityY;

            let compareX = currentX;
            let compareY = currentY;

            currentX = Math.max(padding, Math.min(currentX, maxX));//clamp
            currentY = Math.max(padding, Math.min(currentY, maxY));

            if(speed < 25 && distance < 55){
                if(Date.now() - lastJump > jumpCoolDown){
                    isJumping = true;
                    jumpProgress = 0;
                    jumpStartX = currentX;
                    jumpStartY = currentY;
                    jumpEndX = Math.max(padding, Math.min(Math.random() * window.innerWidth, maxX));
                    jumpEndY = Math.max(padding, Math.min(Math.random() * window.innerHeight, maxY));
                    lastJump = Date.now();
                }
            }

            if((compareX !== currentX && compareY !== currentY) && distance < 100){
                if(Date.now() - lastJump > jumpCoolDown){
                    targetX = currentX + (Math.random() - 0.5) * 200;
                    targetY = currentY + (Math.random() - 0.5) * 200;

                    targetX = Math.max(padding, Math.min(targetX, maxX));
                    targetY = Math.max(padding, Math.min(targetY, maxY));

                    isJumping = true;
                    jumpProgress = 0;
                    jumpStartX = currentX;
                    jumpStartY = currentY;
                    jumpEndX = window.innerWidth - mouseX - 100;
                    jumpEndY = window.innerHeight - mouseY - 100;
                    lastJump = Date.now();
                }
            }
        }

    if(speed > 50 && !isFast && distance < 300){
    isFast = true;
    alert.style.opacity = '1';
    alert.style.pointerEvents = 'auto';

    button.style.transform = 'scale(0.7) rotate(10deg) rotate(-10deg)';
    button.style.transform = 'scale(0.7) rotate(10deg) rotate(-10deg)';

    setTimeout(() => {
                isFast = false;
           alert.style.opacity = '0';
           alert.style.pointerEvents = 'none';
            button.style.transform = 'scale(1)';
            }, 1000);
        }
    
    button.style.left = `${currentX}px`;
    button.style.top = `${currentY}px`;
    
    requestAnimationFrame(animate);   
}
animate();