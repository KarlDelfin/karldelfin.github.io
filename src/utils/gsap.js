import { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, MotionPathPlugin } from 'gsap/all'
import Lenis from 'lenis'
import { horizontalLoop } from './horizontalLoop'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, MotionPathPlugin)

export function gsapController() {
  /* LENIS SCROLL */
  let lenis = new Lenis()
  gsap.ticker.add((time) => {
    lenis.raf(time * 500)
  })
  gsap.ticker.lagSmoothing(0)
  
  /* LOADER */
  let progress = 0;
  let pageLoaded = false;

  window.addEventListener("load", () => {
    pageLoaded = true;
  });

  const counter = {
    value: 0
  };

  const loaderInterval = setInterval(() => {

    if (!pageLoaded) {
      if (progress < 90) {
        progress += Math.random() * 5;
      }
    } else {
      progress += 10;
    }

    progress = Math.min(progress, 100);

    gsap.to(counter, {
      value: progress,
      duration: 0.3,
      ease: "power1.out",
      onUpdate: () => {
        document.querySelector(".loader_content h1").textContent =
          Math.floor(counter.value) + "%";

        gsap.set(".progress_fill", {
          width: counter.value + "%"
        });
      }
    });

    if (progress >= 100) {
      clearInterval(loaderInterval);

      const tl = gsap.timeline();

      tl.to("#loader", {
          duration: 1,
          y: '-100%',
          delay: 1
        })
        .set("#loader", {
        })
        .set(['html', 'body'], {
          overflowY: 'auto'
        })
        .to("#main_content", {
          opacity: 1,
          duration: 1
        });
    }

  }, 100);

  window.addEventListener('load', () => {
    /* HEADER / NAV */
    let headerNavTl = gsap.timeline()
    headerNavTl.from('#nav', {
      y: 20,
      delay: 3,
      opacity: 0
    })

    let headerConP = new SplitText(['.header_con p', '.version', '.social_media a', '.copyright'], {type: 'lines, lines', linesClass: 'line'})
    headerNavTl.from(headerConP.lines, {
      y: 20,
      opacity: 0,
      stagger: {
        each: 0.2,
      }
    }),

    headerNavTl.to(['.header_con', '.nav_con'], {
      opacity: 0,
      scrollTrigger: {
        trigger: '#header',
        scrub: true,
        start: 'top top',
        end: 'bottom top',
        markers: true,
      },
    })

    /* Banner */
    let bannerConH1SpanST = new SplitText(['.banner_con h1 span:first-child', '.banner_con h1 span:last-child'], {type: 'chars'})
    gsap.from(bannerConH1SpanST.chars, {
      ease: 'bounce.inOut',
      x: 'random(-10 , 10)',
      y: 'random(-10 , 10)',
      repeat: -1,
      yoyo: true,
      duration: 5
    }, 0)
    
    let bannerConTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.banner_con',
        scrub: true,
        start: 'top top',
        end: '+=1000',
        pin: true,
      },
    })

    document.querySelectorAll('.banner_con h1 span').forEach((span, i) => {
      bannerConTl.to(span, {
        x: i % 2 === 0 ? '-250%' : '250%',
      }, 0);
    });

    let bannerConPTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.banner_con p',
        scrub: true,
        start: 'top 30%',
      },
    })
    
    let bannerConP = new SplitText('.banner_con p', { type: 'chars' })
    bannerConPTl.from(bannerConP.chars, {
      filter: 'blur(10px)',
      y: 20,
      opacity: 0,
      stagger: 0.2,
    })

    /* MAIN */
    let mainConTexts = new SplitText(['.main_info h2', '.main_info p'], {type: 'lines'})
    let mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.main_con',
        scrub: true,
        start: 'top center',
        end: 'bottom bottom',
      }
    })

    mainTl.from([mainConTexts.lines], {
      filter: 'blur(10px)',
      opacity: 0,
      y: 20,
      stagger: 0.2
    })

    gsap.to('.main_image figure img', {
      filter: 'blur(0px)',
      objectPosition: '0% 50%',
      scrollTrigger: {
        trigger: '.main_image figure img',
        scrub: true,
        start: 'top center',
        end: 'bottom 80%',
      }
    })

    let mainInfoH2SpanTl = gsap.timeline({
       scrollTrigger: {
        trigger: '.main_info',
        start: 'top 30%',
        end: 'bottom bottom',
      }
    })
    mainInfoH2SpanTl.to('.location', {
      rotate: 3,
      clipPath: 'inset(0% 0% 0% 0%)'
    })
    mainInfoH2SpanTl.to('.position', {
      rotate: -2,
      clipPath: 'inset(0% 0% 0% 0%)'
    })

    /* BOTTOM */
    let bottomConTl = gsap.timeline({
       scrollTrigger: {
          trigger: '.bottom_con',
          scrub: true,
          start: 'top bottom',
          end: 'bottom bottom',
        }
      }
    )

    bottomConTl.from('.bottom_con ul li p', {
      filter: 'blur(10px)',
      opacity: 0,
      y: 50,
      stagger: 0.2
    })

    const bottomPulse = gsap.timeline({
      defaults: {
        scale: 2,
        autoAlpha:1,
        transformOrigin: 'center', 
        ease: "elastic(1.5, 1)"
      }})
      .to(".bottom_bg .ball02", {}, 0.84) 
      .to(".bottom_bg .ball03", {}, 1.36)
      .to(".bottom_bg .ball04", {}, 1.92)

      gsap.timeline({
        scrollTrigger: {
          trigger: "#bottom_svg",
          scrub: true,
          start: "top bottom",
        }
      })
      .to(".bottom_bg .ball01", {autoAlpha:1, duration:0.05})
      .from(".bottom_bg .theLine", {drawSVG:0, duration:4}, 0)
      .to(".bottom_bg .ball01", {motionPath:{
        path:".bottom_bg .theLine",
        align:".bottom_bg .theLine",
        alignOrigin:[0.5, 0.5],
      }, duration:4}, 0)
      .add(bottomPulse, 0)

    /* SHOWCASE */
    gsap.set(".bottom_con ul li img", { yPercent: -50, xPercent: -50 });

    let firstEnter;
    gsap.utils.toArray(".bottom_con ul li").forEach((el) => {
      const image = el.querySelector(".bottom_con ul li img"),
        setX = gsap.quickTo(image, "x", { duration: 0.4, ease: "power3" }),
        setY = gsap.quickTo(image, "y", { duration: 0.4, ease: "power3" }),
        align = (e) => {
          if (firstEnter) {
            setX(e.clientX, e.clientX);
            setY(e.clientY, e.clientY);
            firstEnter = false;
          } else {
            setX(e.clientX);
            setY(e.clientY);
          }
        },
        
        startFollow = () => document.addEventListener("mousemove", align),
        stopFollow = () => document.removeEventListener("mousemove", align),
        fade = gsap.to(image, {
          autoAlpha: 1,
          ease: "none",
          paused: true,
          duration: 0.1,
          onReverseComplete: stopFollow
        });

      el.addEventListener("mouseenter", (e) => {
        firstEnter = true;
        fade.play();
        startFollow();
        align(e);
      });

      el.addEventListener("mouseleave", () => fade.reverse());
    });

    /* PERSONAL PROECTS */
  const marquees = [];

gsap.utils.toArray('.personal_projects_con .bottom_info').forEach((line, i) => {

  const links = line.querySelectorAll("h2");

  const marquee = horizontalLoop(links, {
    repeat: -1,
    speed: 1 + i * 0.5,
    reversed: i % 2 !== 0,
    paddingRight: parseFloat(
      gsap.getProperty(links[0], "marginRight", "px")
    ) || 30
  });

  marquees.push({
    tl: marquee,
    direction: i % 2 !== 0 ? -1 : 1,
    hovered: false
  });

  links.forEach(link => {

    link.addEventListener("mouseenter", () => {
      const item = marquees[i];
      item.hovered = true;

      gsap.to(item.tl, {
        timeScale: item.direction * 0.2,
        duration: 0.3,
        overwrite: true
      });
    });

    link.addEventListener("mouseleave", () => {
      const item = marquees[i];
      item.hovered = false;

      gsap.to(item.tl, {
        timeScale: item.direction,
        duration: 0.3,
        overwrite: true
      });
    });

  });

});


let speedTween;

ScrollTrigger.create({
  trigger: "body",
  start: "top top",
  end: "bottom bottom",

  onUpdate: (self) => {

    speedTween?.kill();

    speedTween = gsap.timeline();

    marquees.forEach((item) => {

      if (item.hovered) return;

      speedTween
        .to(item.tl, {
          timeScale: item.direction * (self.direction > 0 ? 2 : -2),
          duration: 0.25,
          overwrite: true
        }, 0)

        .to(item.tl, {
          timeScale: item.direction,
          duration: 1,
          overwrite: true
        }, 0.25);

    });

  }
});


    /* FOOTER */
    gsap.to(".timeline_info h2", {
      duration: 1,
      scrambleText: {
        text: "Let's take it back.",
        chars: "lowerCase",
      },
      scrollTrigger: {
        trigger: '.timeline_info h2',
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
      .to(".timeline_con .ball02, .text01, .text_2022", {}, 0.84) 
      .to(".timeline_con .ball03, .text02, .text_2024", {}, 1.36)
      .to(".timeline_con .ball04, .text03, .text_2025", {}, 1.92)

      const main = gsap.timeline({
        scrollTrigger: {
          trigger: "#svg",
          scrub: true,
          start: "top center",
        }
      })
      .to(".timeline_con .ball01", {autoAlpha:1, duration:0.05})
      .from(".timeline_con .theLine", {drawSVG:0, duration:4}, 0)
      .to(".timeline_con .ball01", {motionPath:{
        path:".timeline_con .theLine",
        align:".timeline_con .theLine",
        alignOrigin:[0.5, 0.5],
      }, duration:4}, 0)
      .add(pulses, 0)

      /* CONTACT */
      gsap.to('.contact_bg', {
        scale: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: ".contact_bg",
          scrub: true,
          start: "top 150%",
          pinSpacing: false,
        }
      })

      let contactInfoH2 = new SplitText('.contact_info h2', {type: 'chars'})
      gsap.from(contactInfoH2.chars, {
        y: 1000,
        opacity: 0,
        stagger: {
          each: 0.2,
          from: 'edges'
        },
        scrollTrigger: {
          trigger: ".contact_bg",
          scrub: true,
          start: "top center",
          end: 'bottom 10%',
          onEnter: () => {
            gsap.to(['#header', '#nav'], {
              opacity: 1,
              color: 'var(--thiColor)',
            })
          },
          onLeaveBack: () => {
            gsap.to(['#header', '#nav'], {
              opacity: 0,
              color: 'var(--secColor)',
            })
          }
        }
      })
  })
}