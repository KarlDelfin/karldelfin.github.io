import gsap from 'gsap/all'
import ScrollTrigger from 'gsap/ScrollTrigger';

export function circleGallery() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const rx = vw * 0.34;
    const rz = 500;
    const tiltY = vw <= 768 ? 80 : 180;

    const entryAngle = Math.PI / 2;
    const offX = vw * 0.85;

    const cgPhrase = document.getElementById("cg_phrase");

    /* ---------- Wrap words automatically ---------- */

    function splitWords(el) {
        const text = el.innerHTML;

        const temp = document.createElement("div");
        temp.innerHTML = text;

        function walk(node) {
            if (node.nodeType === 3) {
            const words = node.textContent.split(/(\s+)/);

            const frag = document.createDocumentFragment();

            words.forEach(word => {
                if (word.trim()) {
                const span = document.createElement("span");
                span.className = "word";
                span.textContent = word;
                frag.appendChild(span);
                } else {
                frag.appendChild(document.createTextNode(word));
                }
            });

            node.parentNode.replaceChild(frag, node);
            } else {
                [...node.childNodes].forEach(walk);
            }
        }

        walk(temp);

        el.innerHTML = temp.innerHTML;
    }

    splitWords(cgPhrase);

    const cgPhraseWords = gsap.utils.toArray("#cg_phrase .word");

    /* ---------- Position Function ---------- */

    function getPos(t) {

        if (t <= 0.12) {

            const p = t / 0.12;

            return {
            x: -offX * (1 - p),
            y: tiltY,
            z: rz * p,
            rotY: 0
            };
        }

        if (t <= 0.88) {

            const p = (t - 0.12) / 0.76;

            const angle = entryAngle - p * Math.PI * 2;

            const x = Math.cos(angle) * rx;
            const z = Math.sin(angle) * rz;

            return {
            x,
            y: (z / rz) * tiltY,
            z,
            rotY: p * Math.PI * 2
            };
        }

        const p = (t - 0.88) / 0.12;

        return {
            x: offX * p,
            y: tiltY,
            z: rz * (1 - p),
            rotY: Math.PI * 2
        };
    }

    /* ---------- Build Curved Images ---------- */

    function buildSlices() {

        const SLICES = 10;

        const imgW = Math.min(Math.max(120, vw * 0.14), 175);
        const imgH = imgW * 2 / 3;

        const orbitR = (rx + rz) / 2;

        const bendRad = imgW / orbitR;
        const cylR = orbitR;

        const sliceW = imgW / SLICES;

        const totalBendDeg = bendRad * 180 / Math.PI;
        const stepDeg = totalBendDeg / SLICES;

        document.querySelectorAll("img.cg_img").forEach(img => {

            const src = img.src;

            const wrapper = document.createElement("div");
            wrapper.className = "cg_img";

            for (let s = 0; s < SLICES; s++) {

                const sl = document.createElement("div");

                sl.className = "cg_slice";

                const displayW = sliceW + 1.5;

                sl.style.width = displayW + "px";
                sl.style.left = "50%";
                sl.style.marginLeft = (-displayW / 2) + "px";

                sl.style.backgroundImage = `url(${src})`;
                sl.style.backgroundSize = `${imgW}px ${imgH}px`;
                sl.style.backgroundPosition = `${-s * sliceW}px 0px`;

                sl.style.transformOrigin = `50% 50% ${-cylR}px`;

                const angle = (s - (SLICES - 1) / 2) * stepDeg;

                sl.style.transform = `rotateY(${angle}deg)`;

                wrapper.appendChild(sl);
            }

            img.parentNode.replaceChild(wrapper, img);
        });
    }

    buildSlices();

    /* IMPORTANT: RESELECT AFTER REPLACEMENT */
    const cgImgs = gsap.utils.toArray(".cg_img");

    cgImgs.forEach(img => {
        img.style.opacity = "0";
    });

    const stagger = 0.09;
    const count = cgImgs.length;
    const totalRange = 1 + stagger * (count - 1);

    /* ---------- Scroll Animation ---------- */

    ScrollTrigger.create({
        trigger: "#circle_gallery",
        start: "top top",
        end: "bottom bottom",
        pin: "#circle_gallery_pin",

        onUpdate(self) {

            const progress = self.progress;

            cgImgs.forEach((img, i) => {

            const imgT =
                progress * totalRange -
                i * stagger;

            if (imgT <= 0 || imgT >= 1) {

                img.style.opacity = "0";
                return;
            }

            let alpha = 1;

            if (imgT < 0.06)
                alpha = imgT / 0.06;
            else if (imgT > 0.94)
                alpha = (1 - imgT) / 0.06;

            const pos = getPos(imgT);

            img.style.transform =
                `translate3d(${pos.x}px,${pos.y}px,${pos.z}px)
                rotateY(${pos.rotY * 180 / Math.PI}deg)`;

            img.style.opacity = alpha;
            img.style.zIndex =
                Math.round(pos.z + 600);
            });

            const phraseStart = 0.25;
            const phraseEnd = 0.75;

            if ( progress < phraseStart || progress > phraseEnd ) {
                cgPhrase.style.opacity = "0";
                return;
            }

            const globalP = (progress - phraseStart) / (phraseEnd - phraseStart);

            const yOffset = 200 * (0.5 - globalP);

            cgPhrase.style.transform = `translateY(${yOffset}px)`;

            const revealEnd = 0.4;

            cgPhraseWords.forEach((word, index) => {

                if (globalP < revealEnd) {

                    const revealP =
                    globalP / revealEnd;

                    const wordT =
                    revealP *
                    (cgPhraseWords.length + 4) -
                    index;

                    const wP =
                    Math.max(
                        0,
                        Math.min(1, wordT / 3)
                    );

                    word.style.opacity = wP;
                    word.style.filter =
                    `blur(${8 * (1 - wP)}px)`;

                } else {

                    word.style.opacity = 1;
                    word.style.filter = "blur(0px)";
                }
            });

            let alpha = 1;

            if (globalP < 0.1)
            alpha = globalP / 0.1;
            else if (globalP > 0.75)
            alpha = (1 - globalP) / 0.25;

            cgPhrase.style.opacity = alpha;
        }
    });
}