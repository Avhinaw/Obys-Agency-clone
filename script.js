let timeLine = gsap.timeline();
const playContainer = document.querySelector('#video-container');
const video = document.querySelector('#video-container video');
const imgs = document.querySelector('#video-container img');
const playCrsr = document.querySelector('#play-crsr');
const textHover = document.querySelector('.hodd');
const flotingImg = document.querySelector('.image-div');
const threeCircle = document.querySelector('.threecircle');
const textTransform = document.querySelector('#footer-head h2');
const textTransformSpan = document.querySelector('#svg-span');
function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);


// --- SETUP START ---
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, {duration: 0, disableLerp: true}) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.defaults({ scroller: "#main" });
ScrollTrigger.refresh();
};
function loader(){
    timeLine.from('.line h1, .line h2', {
        y:150,
        stagger: .2,
        duration: .5,
        delay: .4
    });
    
    let timer = document.querySelector('#start');
    let grow = 0;
    setInterval(function(){
        if(grow < 100){
            grow++;
            timer.textContent = grow;
        }else{
            grow = 100;
        }
    },37);
    
    timeLine.to('#loader', {
        opacity: 0,
        duration: .2,
        delay: 4.5
    });
    timeLine.to('#line-part1, .line h2', {
        opacity: 0
    });
    
    timeLine.from('#page1', {
        y: 500,
        opacity: 0,
        delay: .2,
    });
    timeLine.to('#loader', {
        display: "none"   
    });
    timeLine.from('nav, .page1-section-part1', {
        opacity: 0
    });
    timeLine.from('.page1-section-part2 h1', {
        y:440,
        stagger: .1,
        duration: .2
    });
};
function cursor() {
    const cursorElement = document.querySelector("#crsr");
    document.addEventListener('mousemove', function (event) {
        const x = event.clientX;
        const y = event.clientY;
        cursorElement.style.transform = `translate(${x}px, ${y}px)`; //edited by GPT
    });
};
function sheryAnimation(){
    Shery.imageEffect('.image-div', {
        style: 5,
        config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7017990482571328},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.18,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.43,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
        gooey: true
});
};
function playCursor(){
    playContainer.addEventListener('mouseenter', function(){
        playContainer.addEventListener('mousemove', function(e){
            gsap.to('#crsr', {
                opacity: 0
            })
            gsap.to('#play-crsr', {
                left: e.x - 600,
                top: e.y - 350
            });
        });
    });
    playContainer.addEventListener('mouseleave', function(){
        gsap.to('#crsr', {
                opacity: 1
        })
        gsap.to('#play-crsr', {
            left: "80%",
            top: "-12%"
        });
    });
};
function playVideo(){
    let flag = 0;
        playContainer.addEventListener('click', function(){
            if(flag === 0){
            video.play();
            video.style.opacity = 1;
            imgs.style.opacity = 0;
            playCrsr.innerHTML = `<i class="ri-pause-large-fill"></i>`;
            gsap.to('#play-crsr', {
                scale: .6
            })
            flag = 1;
            }
            else{
                    video.pause();
                    video.style.opacity = 0;
                    imgs.style.opacity = 1;
                    playCrsr.innerHTML = `<i class="ri-play-large-fill"></i>`;
                    playCrsr.style.scale = 1;
                    gsap.to('#play-crsr', {
                        scale: 1
                    })
                    flag = 0;
            }
        })      
};
function flagHover(){
    textHover.addEventListener('mouseenter', function(){
        textHover.addEventListener('mousemove', function(e){
            gsap.to('#flag-img',{
                left: e.x,
                top: e.y,
                opacity: 1
            })
        })
    })
    textHover.addEventListener('mouseleave', function(){
        gsap.to('#flag-img',{
            opacity: 0
        })
    })
};
function circleScale(){
    threeCircle.addEventListener('mouseenter', function(){
        gsap.to('.threecircle', {
            scale: .9
        });
    })
    threeCircle.addEventListener('mouseleave', function(){
        gsap.to('.threecircle', {
            scale: 1
        });
    });
}
function textDesign(){
    textTransform.addEventListener('mouseenter', function(){  
        gsap.to('#footer-head h2', {
            onStart:function(){
                $('#footer-head h2').textillate({ in: { effect: 'fadeIn' } });
            }
        })
    })
}
cursor();
locomotiveAnimation();
loader();
sheryAnimation();
flagHover();
playCursor();
playVideo();
circleScale();
textDesign();