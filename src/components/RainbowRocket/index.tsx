import React, { useEffect, useRef } from "react";
import { gsap, TimelineMax, TweenMax, Linear, Power2 } from "gsap";
import rocket from "./rocket.svg";
export default function RainBowRocket() {
  const boxRef = useRef();

  useEffect(() => {
    var b = document.getElementsByClassName("jetBubble"),
      h = document.querySelector(".rocketManSVG");
    a = document.querySelector(".shakeGroup");
    var e = document.querySelector(".star"),
      a = document.querySelector(".satellite"),
      c = document.querySelector(".astronaut"),
      k = document.querySelector(".starContainer");
    document.querySelector("#badgeLink");
    TweenMax.to(c, 0.05, { y: "+=4", repeat: -1, yoyo: !0 });
    var d = new TimelineMax({ repeat: -1 });
    c = new TimelineMax({ repeat: -1, paused: !1 });
    d.timeScale(6).seek(100);
    new TimelineMax({ repeat: -1 }).to(a, 46, {
      rotation: 360,
      transformOrigin: "50% 50%",
      ease: Linear.easeNone,
    });
    TweenMax.staggerTo(
      ".pulse",
      0.8,
      { alpha: 0, repeat: -1, ease: Power2.easeInOut, yoyo: !1 },
      0.1
    );
    TweenMax.staggerTo(
      ".satellitePulse",
      0.8,
      { alpha: 0, repeat: -1, ease: Power2.easeInOut, yoyo: !1 },
      0.1
    );
    MorphSVGPlugin.convertToPath("#bubbble");
    TweenMax.set(b, { attr: { r: "-=5" } });
    for (a = 0; a < b.length; a++) {
      var f = b[a],
        g = new TimelineMax({ repeat: -1 });
      g.to(f, 1, { attr: { r: "+=15" }, ease: Linear.easeNone }).to(f, 1, {
        attr: { r: "-=15" },
        ease: Linear.easeNone,
      });
      d.add(g, a / 4);
    }
    for (a = 0; 7 > a; a++)
      (b = document.querySelector("#speedLine" + a)),
        (d = new TimelineMax({ repeat: -1, repeatDelay: Math.random() })),
        d
          .set(b, { drawSVG: !1 })
          .to(b, 0.05, { drawSVG: "0% 30%", ease: Linear.easeNone })
          .to(b, 0.2, { drawSVG: "70% 100%", ease: Linear.easeNone })
          .to(b, 0.05, { drawSVG: "100% 100%", ease: Linear.easeNone })
          .set(b, { drawSVG: "-1% -1%" }),
        c.add(d, a / 23);
    for (a = 0; 7 > a; a++)
      (c = e.cloneNode(!0)),
        k.appendChild(c),
        (b = (a + 1) / 2),
        TweenMax.fromTo(
          c,
          b,
          { x: 600 * Math.random(), y: -30, scale: 3 - b },
          {
            y: 100 * Math.random() + 600,
            repeat: -1,
            repeatDelay: 1,
            ease: Linear.easeNone,
          }
        );
    h.removeChild(e);
  }, []);
  return <img alt="rainbowRocket" ref={boxRef} src={rocket}></img>;
}
