import { gsap } from 'gsap/all'

export function imageTrail(containerId) {
    const images = [
        "https://fastly.picsum.photos/id/886/300/200.jpg?hmac=QWN8rQrk-CdWQB6n58j8s4YqfFk1BNWc0VZRGDnjDCc",
        "https://fastly.picsum.photos/id/339/600/400.jpg?hmac=M3Ae5yOiOCpvtIXr-EyOH1L_dB1se1D96J7KqzKvJew"
    ]

    const container = document.querySelector(containerId)

    let currentImageIndex = 0;
    let lastX = 0;
    let lastY = 0;
    let distanceThreshold = window.innerWidth < 900 ? 100 : 180;

    window.addEventListener("resize", () => {
        distanceThreshold = window.innerWidth < 900 ? 100 : 180;
    })


    window.addEventListener("mousemove", (e) => {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY; // fixed

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > distanceThreshold) {
            createTrail(e.clientX, e.clientY);

            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    function createTrail(x, y) {
        const img = document.createElement("img");
        img.classList.add("image-trail");
        img.src = images[currentImageIndex];

        container.appendChild(img);

        currentImageIndex = (currentImageIndex + 1) % images.length;

        gsap.set(img, {
            x: x - 120,
            y: y - 90,
            scale: 1,
            opacity: 1,
            rotation: 'random(-20, 20)',
        });

        gsap.to(img, {
            scale: 0.2,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: 'elastic.inOut',
            rotation: 'random(-20, 20)',
            onComplete: () => img.remove()
            
        });
    }
}