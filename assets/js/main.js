/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 


var dots_count              = 140,
    dots_speed              = 1,
    max_opacity             = 0.7,
    max_line_length         = 120,
    full_opacity_length     = 1,
    outer_margin            = 50,
    line_width              = 2,
    dots_radious            = 3,
    outer_margin            = 50,
    color_dots              = { r: 173, g: 173, b: 173, a: 1 },
    color_line              = { r: 173, g: 173, b: 173, a: 1 };

window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
};

var canvas,
    ctx,
    mouse = {
        x: 0,
        y: 0
    },
    dots_array = new Array();

var Dot = function(position, direction) {
    this.pos = position;
    this.dir = direction;
}

Dot.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, dots_radious, 0, 2*Math.PI, false);
    ctx.fill();
}

Dot.prototype.update = function() {
    if(this.pos.x < -outer_margin || this.pos.x > canvas.width + outer_margin) {
        this.dir.x = -this.dir.x;
    }
    if(this.pos.y < -outer_margin || this.pos.y > canvas.height + outer_margin) {
        this.dir.y = -this.dir.y;
    }
    this.pos.x += this.dir.x*dots_speed;
    this.pos.y += this.dir.y*dots_speed;
}

var updateNet = function() {
    for(let i = 0; i < dots_count; i++) {
        let firstDotPos = dots_array[i].pos;
        for(let j = i; j < dots_count; j++) {
            let secondDotPos = dots_array[j].pos;
            let dist = Math.sqrt(
                Math.pow(firstDotPos.x - secondDotPos.x, 2) +
                Math.pow(firstDotPos.y - secondDotPos.y, 2));
            if(dist < max_line_length) {
                let opacity = 1 - (dist/max_line_length);
                opacity *= max_opacity;
                //opacity = Math.sqrt(opacity, 1.2);
                ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity+')';
                ctx.beginPath();
                ctx.moveTo(firstDotPos.x, firstDotPos.y);
                ctx.lineTo(secondDotPos.x, secondDotPos.y);
                ctx.stroke();
            }
        }
    }
}

function start() {
    canvas.onmousemove = function(e) {
        mouse.x = e.x;
        mouse.y = e.y;
    }

    ctx.lineWidth = line_width;
    ctx.fillStyle = 'rgba('+color_dots.r+','+color_dots.g+','+color_dots.b+','+color_dots.a+')';

    for(let i = 0; i < dots_count; i++) {
        let position = {
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height
        };

        let angle = Math.random() * Math.PI * 2;
        let direction = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };

        dots_array[i] = new Dot(position, direction);
    }
    
    update();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots_array.forEach((el, i, arr) => {
        el.update();
        el.draw();
    })
    updateNet();
    requestAnimationFrame(update);
}

window.onload = function() {
    canvas = document.getElementById('animation');
    if(canvas.getContext) {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        ctx = canvas.getContext('2d');
        start();
    } else {
        console.log('[ERROR] Could not get canvas context');
    }
    canvas.parentElement.addEventListener('resize', () => {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
    })
}



Resources