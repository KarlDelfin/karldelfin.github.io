<template>
  <!-- LOADER -->
  <div id="loader">
    <div class="loader_content">
      <h1>0%</h1>
      <div class="progress_bar">
        <div class="progress_fill"></div>
      </div>
    </div>
  </div>

  <div id="main_content">
    <!-- HEADER -->
    <div id="header">
      <div class="wrapper">
        <div class="header_con">
          <p>
            Quiet creator, <mark>bringing ideas to life,</mark
            ><span>through motion, detail and softness.</span>
          </p>
        </div>
      </div>
    </div>

    <!-- NAV -->
    <div id="nav">
      <div class="wrapper">
        <div class="nav_con">
          <div class="version">🡺V2.0</div>
          <div class="social_media">
            <a href="https://m.me/dkhrl" target="_blank">Facebook</a>
            <a href="mailto:dkhrl2000@gmail.com" target="_blank">Google</a>
            <a href="https://www.linkedin.com/in/karl-john-delfin-33b3b22a4/" target="_blank" >LinkedIn</a >
          </div>
          <div class="copyright">
            <p>Copyright © Karl John T. Delfin, {{ year }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Banner -->
    <div id="banner">
      <div class="banner_con">
        <h1>
          <span>Karl</span>
          <span>John</span>
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
      </div>
    </div>

    <!-- MAIN -->
    <div id="main">
      <div class="wrapper">
        <div class="main_con">
          <div class="main_info">
            <h2>I specialize in creating <mark>user-friendly interfaces</mark> based in <span class="location">Cebu, Philippines</span></h2>
            <h2>I am committed to continuously learning new technologies to advance my growth as a <span class="position">Web Developer</span></h2>
            <p>
              My name is Karl. A <mark>passionate web developer</mark>, I build memorable digital experiences.
              <span>🡺V2.0</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    
  <!-- BOTTOM -->
  <div id="bottom">
    <div class="bottom_con">
      <div class="bottom_bg">
        <svg id="bottom_svg" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 600 1200">
          <path class="line01 line" d="M 10 200  600 200" ></path>
          <path class="line02 line" d="M 10 400  600 400" ></path>
          <path class="line03 line" d="M 10 600  600 600" ></path>

          <path class="theLine" 
                d="M -5 0 Q 437 -2 483 248 T 252 510 Q 57 503 -1 344"
                fill="none" stroke="white" stroke-width="20px" />

          <circle class="ball ball01" r="20" cx="50" cy="100" fill="#fff"></circle>
        </svg>
      </div>

      <div class="personal_projects_con">
        <div class="bottom_info">
          <div>
            <h2>Personal</h2>
            <h2>Projects •</h2>
            <h2>Personal</h2>
            <h2>Projects •</h2>
            <h2>Personal</h2>
            <h2>Projects •</h2>
          </div>
        </div>
        <ul>
          <li>
              <img src="../assets/images/portfolio-v1.webp" alt="Portfolio v1">
              <a href="https://karldelfin.github.io/" target="_blank">
                  <p>Portfolio v1</p>
              </a>
          </li>
          <li>
              <img src="../assets/images/portfolio1.webp" alt="Portfolio 1">
              <a href="https://karldelfin.github.io/portfolio1/" target="_blank">
                  <p>Portfolio 1</p>
              </a>
          </li>
          <li>
              <img src="../assets/images/portfolio2.webp" alt="Portfolio 2">
              <a href="https://karldelfin.github.io/portfolio2/" target="_blank">
                  <p>Portfolio 2</p>
              </a>
          </li>
          <li>
              <img src="../assets/images/movies.webp" alt="Movie Trailers">
              <a href="https://karldelfin.github.io/movies/" target="_blank">
                  <p>Movie Trailers</p>
              </a>
          </li>
          <li>
              <img src="../assets/images/image-to-text.webp" alt="Image to Text">
              <a href="https://karldelfin.github.io/image-to-text" target="_blank">
                  <p>Image to Text</p>
              </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

    <!-- FOOTER -->
    <div id="footer">
      <div class="timeline">
        <div class="timeline_info">
          <h2>Let's take it back.</h2>
        </div>
        <div class="timeline_con">
          <svg id="svg" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 600 1200">
            <path class="line01 line" d="M 10 200  600 200" ></path>
            <path class="line02 line" d="M 10 400  600 400" ></path>
            <path class="line03 line" d="M 10 600  600 600" ></path>
            <text class="text01" x="30" y="190">2022</text>
            <text class="text02" x="30" y="590">2024</text>
            <text class="text03" x="30" y="990">2025</text>

            <path class="theLine" 
                  d="M -5 0 Q 450 230 300 450 T 130 750 Q 100 850 300 1000 T -49 1198"
                  fill="none" stroke="white" stroke-width="20px" />

            <circle class="ball ball01" r="20" cx="50" cy="100"></circle>
            <circle class="ball ball02" r="20" cx="278" cy="201"></circle>
            <circle class="ball ball03" r="20" cx="203" cy="601"></circle>
            <circle class="ball ball04" r="20" cx="296" cy="1001"></circle>
          </svg>

          <div class="timeline_info">
            <div class="text_2022">
              <p>Started working part-time as a <mark>Truck Helper</mark> during the<br/>pandemic while continuing my studies at <mark>University of Cebu</mark>.</p>
              <div class="img_con">
                <img src="../assets/images/trucking.jpg" alt="trucking">
              </div>
            </div>
            <div class="text_2024">
              <p>Received my <mark>Alliance Jumpstart Program</mark><br/>and <mark>Skanlog ELEV8 Internship</mark> certificates.</p>
            </div>
            <div class="text_2025">
              <p>Graduated from <mark>University of Cebu - Main Campus.</mark></p>
              <p>Started my journey as a <mark>Web Developer</mark><br/>at a company based in Talisay, Cebu.</p>
              <div class="img_con">
                <img src="../assets/images/uc-quadrangle.webp" alt="uc quadrangle">
                <img src="../assets/images/employee-working.webp" alt="employee working">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="contact_con">
        <div class="contact_info">
          <div class="contact_bg"></div>
          <h2>Karl John</h2>
          <div> </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { gsapController  } from '@/utils/gsap'
import { imageTrail  } from '@/utils/imageTrail'
import gsap from 'gsap/all'
export default {
  data() {
    return {
      year: 0
    }
  },
  methods: {
    getYear(){
      this.year = new Date().getFullYear()
    }
  },
  mounted() {
    imageTrail('#banner')
    gsapController()
    this.getYear()
  },
}

    console.log(window.innerWidth)

</script>


<style>
</style>