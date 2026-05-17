gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, MotionPathPlugin, GSDevTools, Draggable, InertiaPlugin);

/* LENIS SCROLL */
let lenis = new Lenis()
gsap.ticker.add((time)=>{ lenis.raf(time * 300) })
gsap.ticker.lagSmoothing(0)


/* PROGRESS BAR */
ScrollTrigger.create({
  start: 0,
  end: "max",
  ease: 'none',
  onUpdate: (self) => {
    const percentage = (self.progress * 100);
    document.querySelector('.progress_bar span').style.width = `${percentage}%`
  }
});

/* HEADER */
ScrollTrigger.create({
  onUpdate: (self) => {
    if (self.direction !== self.prevDirection) {
      if (self.direction === 1) {
        gsap.to('.main_logo_con', { yPercent: -200, duration: 0.3 });
      } else {
        gsap.to('.main_logo_con', { yPercent: 0, duration: 0.3 });
      }
      self.prevDirection = self.direction;
    }
  }
});

gsap.to('.pin_wheel_con img', {
  rotate: 3600,
  ease: 'none',
  scrollTrigger: {
    scrub: true,
    end: '+=10000'
  }
})

/* HERO */
gsap.to('.hero_con', {
  y: -800,
  scale: 0.5,
  skewX: 10,
  skewY: 10,
  scrollTrigger: {
    trigger: '.hero_con',
    start: 'top top',
    end: '+=3000',
    pin: true,
    scrub: true,
    pinSpacing: false
  }
})

let heroInfoH1 = new SplitText('.hero_info h1', {type: 'lines, chars', linesClass: 'line'})

gsap.from(heroInfoH1.chars, {
  y: 200,
  opacity: 0,
  stagger: {
    each: 0.1,
  },
  scrollTrigger: {
    trigger: '.hero_info h1',
    start: 'top center',
    end: 'bottom center',
  }
})

let rocketTl = gsap.timeline()

rocketTl.from('.hero_con .rocket', {
  y: 600,
  x: 400,
  duration: 3,
  ease: 'power4.inOut'
})

rocketTl.to('.hero_con .rocket', {
  repeat: -1,
  x: 'random(0, 50)',
  y: 'random(0, 50)',
  ease: 'none',
  duration: 5,
  yoyo: true
})

let wormTl = gsap.timeline()
wormTl.from('.hero_con .worm', {
  y: -500,
  x: 1000,
  duration: 2,
  ease: 'bounce.out'
})

wormTl.to('.hero_con .worm', {
  x: 'random(0, 50)',
  y: 'random(0, 50)',
  duration: 5,
  ease: 'bounce.inOut',
  repeat: -1,
  yoyo: true
})

let heroCtaP = new SplitText('.hero_cta p', {type: 'lines words', linesClass: 'line'})
gsap.from(heroCtaP.words, {
  y: 100,
  x: 100,
  stagger: {
    each: 0.2,
  },
  // scrollTrigger: {
  //   trigger: '.hero_cta p',
  //   start: 'top 80%',
  //   end: 'bottom 80%',
  // }
})

/* MAIN */
gsap.to('.main_info', {
  y: -100,
  rotate: -3,
  scale: 0.5,
  scrollTrigger: {
    trigger: '.main_info',
    start: 'top bottom',
    scrub: true,
  }
})

let mainInfoH2 = new SplitText('.main_info h2', {type: 'words'})
gsap.from(mainInfoH2.words, {
  backgroundPositionX: '100%',
  x: 5,
  stagger: {
    each: 0.5,
  },
  scrollTrigger: {
    trigger: '.main_info',
    start: 'top 60%',
    end: 'bottom 80%',
    scrub: true,
  }
})

gsap.from('.main_info .location', {
  clipPath: 'inset(0 100% 0 0)',
  rotate: -10,
  duration: 1,
  ease: 'power4.inOut',
  scrollTrigger: {
    trigger: '.main_info .location',
    start: 'top center',
    end: 'bottom center',
  }
})

gsap.from('.main_info .skill', {
  clipPath: 'inset(0 100% 0 100%)',
  rotate: -3,
  ease: 'power1.inOut',
  duration: 1,
  scrollTrigger: {
    trigger: '.main_info .location',
    start: 'top center',
    end: 'bottom center',
  }
})

/* BOTTOM 1 */
gsap.fromTo('.bottom1_info', {filter: 'blur(10px)'}, {
  filter: 'blur(0px)',
  scale: 0.2,
  scrollTrigger: {
    trigger: '.bottom1_info',
    scrub: true,
    start: 'top 80%',
    end: 'bottom 70%',
  }
})

/* BOTTOM 2 */
let mm = gsap.matchMedia();
let horizontalScroll;
mm.add("(min-width: 1011px)", () => {
  const bottomCon2 = gsap.utils.toArray(".bottom2_con .bottom2_panel");
  horizontalScroll = gsap.to(bottomCon2, {
    xPercent: -100 * (bottomCon2.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".bottom2_con",
      pin: true,
      start: 'top top',
      scrub: 1,
      end: () => "+=" + document.querySelector(".bottom2_con").offsetWidth,
    }
  });


});

// Maintained Websites
let maintainedWebsiteTl = gsap.timeline(
   {
    scrollTrigger: {
    trigger: '.maintained_websites_con',
    start: 'top center',
  }}
);

maintainedWebsiteTl.fromTo('.maintained_websites_con h2', {
  clipPath: 'inset(0% 100% 0% 0%)',
}, {
  clipPath: 'inset(0% 0% 0% 0%)',
})

let maintainedWebsiteConH2 = new SplitText('.maintained_websites_con h2', {type: 'lines, words', linesClass: 'line'})
maintainedWebsiteTl.from(maintainedWebsiteConH2.words, {
  x: 100,
  y: 100,
  stagger: {
    each: 0.1,
  },
})

maintainedWebsiteTl.fromTo('.maintained_websites_con ul', {
  clipPath: 'inset(0% 0% 100% 0%)',
}, {
  clipPath: 'inset(0% 0% 0% 0%)',
})

let terminalIcon = gsap.timeline() 
terminalIcon.fromTo('.maintained_websites_con .terminal_icon',{opacity: 0,  left: 'unset', right: '100%'}, {
  opacity: 1,
  left: 'unset',
  right: '-100%',
  scrollTrigger: {
    trigger: '.maintained_websites_con',
    start: 'top top',
    end: 'bottom -100%',
    scrub: true,
    markers: true
  }
})

terminalIcon.to('.terminal_icon i', {
  x: 'random(0, 20)',
  y: 'random(0, 20)',
  opacity: 0,
  repeat: -1,
  ease: 'none',
  duration: 1,
  yoyo: true,
  
})

// Personal Project
let personalProjectTl = gsap.timeline({
   scrollTrigger: {
    trigger: '.personal_project_con h2',
    start: "left 70%",
    end: "left 20%",
    containerAnimation: horizontalScroll,
  }
})

personalProjectTl.fromTo('.personal_project_con h2', {
  clipPath: 'inset(0% 100% 0% 0%)',
}, {
  clipPath: 'inset(0% 0% 0% 0%)',
})

const personalProjectH2 = new SplitText('.personal_project_con h2', {type: 'lines, words', linesClass: 'line'});
personalProjectTl.from(personalProjectH2.words, {
  x: -100,
  y: -100,
  opacity: 0,
  stagger: {
    each: 0.1,
  },
  scrollTrigger: {
    trigger: '.personal_project_con h2',
    start: "left 70%",
    end: "left 20%",
    containerAnimation: horizontalScroll,
  }
});

personalProjectTl.fromTo('.personal_project_con ul', {
  clipPath: 'inset(0% 0% 100% 0%)',
}, {
  clipPath: 'inset(0% 0% 0% 0%)',
})


gsap.fromTo('.technology_stack_con ul', {clipPath: 'inset(0% 100% 0% 0%)'}, {
  clipPath: 'inset(0% 0% 0% 0%)',
  scrollTrigger: {
    trigger: '.technology_stack_con ul',
    start: 'top center',
    end: 'bottom 80%',
    containerAnimation: horizontalScroll,
    scrub: true,
  }
})

let arrowDownTl = gsap.timeline()
arrowDownTl.fromTo('.technology_stack_con .arrow_down',{opacity: 0}, {
  opacity: 1,
  scrollTrigger: {
    trigger: '.technology_stack_con',
    start: 'top center',
    end: 'bottom 80%',
    scrub: true,
    containerAnimation: horizontalScroll,
  }
})
arrowDownTl.to('.technology_stack_con .arrow_down i', {
  y: 20,
  repeat: -1,
  ease: 'none',
  duration: 1,
  yoyo: true,
})

/* BOTTOM 3 */
gsap.to(".bottom3_info h2", {
  duration: 2,
  scrambleText: {
    text: "Let's take it back.",
    chars: "lowerCase",
  },
  scrollTrigger: {
    trigger: '.bottom3_info h2',
    start: 'top 90%',
  }
})

const pulses = gsap.timeline({
  defaults: {
    scale: 2,
    autoAlpha:1,
    transformOrigin: 'center', 
    ease: "elastic(1.5, 1)"
  }})
  .to(".ball02, .text01, .text_2022", {}, 0.84) 
  .to(".ball03, .text02, .text_2024", {}, 1.36)
  .to(".ball04, .text03, .text_2025", {}, 1.92)

  const main = gsap.timeline({
    scrollTrigger: {
      trigger: "#svg",
      scrub: true,
      start: "top center",
    }
  })
  .to(".ball01", {autoAlpha:1, duration:0.05})
  .from(".theLine", {drawSVG:0, duration:4}, 0)
  .to(".ball01", {motionPath:{
    path:".theLine",
    align:".theLine",
    alignOrigin:[0.5, 0.5],
  }, duration:4}, 0)
  .add(pulses, 0)


/* FOOTER */
Draggable.create('.social_media_con a', {
  bounds: '.contact_info_con',
})



/* MATCH MEDIA */

mm.add("(max-width: 1800px)", () => {
  
});

mm.add("(max-width: 1400px)", () => {
  
});

mm.add("(max-width: 1010px)", () => {
  gsap.set('.technology_stack_con .arrow_down, .technology_stack_con ul', { clearProps: 'all' });
  ScrollTrigger.getAll().forEach(st => {
    if (st.trigger && st.trigger.matches('.technology_stack_con .arrow_down, .technology_stack_con ul')) st.kill();
  });

  if (horizontalScroll) {
    horizontalScroll.kill();
    horizontalScroll = null;
  }
});

mm.add("(max-width: 800px)", () => {

});

mm.add("(max-width: 600px)", () => {

});