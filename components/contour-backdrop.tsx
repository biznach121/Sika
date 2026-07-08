/**
 * Full-page animated vine backdrop (generated — see the Stage-4 notes).
 * Each stem draws itself across the viewport; leaves pop out as the draw
 * passes them and one bloom per vine unfurls. Once grown it stays, swaying.
 * Sits at z -1 inside `main` (isolation: isolate): above the page colour,
 * under all content. Hidden on the home page (it has its own vines).
 */
export function ContourBackdrop() {
  return (
    <svg
      className="contour-backdrop pointer-events-none fixed inset-0 -z-10 h-full w-full text-[#808769]/45"
      viewBox="0 0 1440 900"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <path className="vine-stem" d="M-60 150C-23.3 143.3 85 106.7 160 110C235 113.3 310 170 390 170C470 170 555 111.7 640 110C725 108.3 813.3 160.8 900 160C986.7 159.2 1060 106.7 1160 105C1260 103.3 1443.3 142.5 1500 150" stroke="currentColor" strokeWidth="1.8" pathLength="1" style={{ animationDuration: "7.6s", animationDelay: "0.4s" }} />
      <g transform="translate(160 110) rotate(42.5)">
        <g className="vine-sway" style={{ animationDelay: "2.1s" }}>
          <g className="vine-leaf" style={{ animationDelay: "1.4s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(273.1 141.3) rotate(160.9)">
        <g className="vine-sway" style={{ animationDelay: "2.6s" }}>
          <g className="vine-leaf" style={{ animationDelay: "1.9s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(390 170) rotate(40)">
        <g className="vine-sway" style={{ animationDelay: "3.2s" }}>
          <g className="vine-leaf" style={{ animationDelay: "2.5s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(513.1 140.6) rotate(120.5)">
        <g className="vine-sway" style={{ animationDelay: "3.8s" }}>
          <g className="vine-leaf" style={{ animationDelay: "3.1s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(640 110) rotate(38.9)">
        <g className="vine-sway" style={{ animationDelay: "4.4s" }}>
          <g className="vine-leaf" style={{ animationDelay: "3.7s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(769.4 134.7) rotate(156.4)">
        <g className="vine-sway" style={{ animationDelay: "5.1s" }}>
          <g className="vine-leaf" style={{ animationDelay: "4.4s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(900 160)">
        <g className="vine-sway" style={{ animationDelay: "6.6s" }}>
          <g transform="rotate(0)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "5s" }} /></g>
          <g transform="rotate(60)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "5.1s" }} /></g>
          <g transform="rotate(120)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "5.2s" }} /></g>
          <g transform="rotate(180)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "5.3s" }} /></g>
          <g transform="rotate(240)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "5.4s" }} /></g>
          <g transform="rotate(300)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "5.5s" }} /></g>
          <g transform="rotate(30) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "5.7s" }} /></g>
          <g transform="rotate(90) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "5.8s" }} /></g>
          <g transform="rotate(150) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "5.9s" }} /></g>
          <g transform="rotate(210) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "6s" }} /></g>
          <g transform="rotate(270) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "6.1s" }} /></g>
          <g transform="rotate(330) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "6.2s" }} /></g>
          <circle className="vine-bud" r="4" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "5s" }} />
          <circle className="vine-bud" r="1.4" fill="currentColor" stroke="none" style={{ animationDelay: "6.3s" }} />
        </g>
      </g>
      <g transform="translate(1025 132.8) rotate(22.1)">
        <g className="vine-sway" style={{ animationDelay: "6.3s" }}>
          <g className="vine-leaf" style={{ animationDelay: "5.6s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(1160 105) rotate(139)">
        <g className="vine-sway" style={{ animationDelay: "7s" }}>
          <g className="vine-leaf" style={{ animationDelay: "6.3s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(1346.3 124.1) rotate(49.1)">
        <g className="vine-sway" style={{ animationDelay: "7.8s" }}>
          <g className="vine-leaf" style={{ animationDelay: "7.1s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>

      <path className="vine-stem" d="M-60 470C-16.7 478.3 113.3 525 200 520C286.7 515 373.3 443.3 460 440C546.7 436.7 633.3 501.7 720 500C806.7 498.3 893.3 430 980 430C1066.7 430 1150 498.3 1240 500C1330 501.7 1473.3 450 1520 440" stroke="currentColor" strokeWidth="1.8" pathLength="1" style={{ animationDuration: "7.8s", animationDelay: "3s" }} />
      <g transform="translate(53.8 500) rotate(53.9)">
        <g className="vine-sway" style={{ animationDelay: "4.2s" }}>
          <g className="vine-leaf" style={{ animationDelay: "3.5s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(200 520) rotate(136.7)">
        <g className="vine-sway" style={{ animationDelay: "4.9s" }}>
          <g className="vine-leaf" style={{ animationDelay: "4.2s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(330 479.4) rotate(16.4)">
        <g className="vine-sway" style={{ animationDelay: "5.5s" }}>
          <g className="vine-leaf" style={{ animationDelay: "4.8s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(460 440) rotate(137.8)">
        <g className="vine-sway" style={{ animationDelay: "6.2s" }}>
          <g className="vine-leaf" style={{ animationDelay: "5.5s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(590 469.4) rotate(59.8)">
        <g className="vine-sway" style={{ animationDelay: "6.8s" }}>
          <g className="vine-leaf" style={{ animationDelay: "6.1s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(720 500)">
        <g className="vine-sway" style={{ animationDelay: "8.3s" }}>
          <g transform="rotate(0)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "6.7s" }} /></g>
          <g transform="rotate(60)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "6.8s" }} /></g>
          <g transform="rotate(120)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "6.9s" }} /></g>
          <g transform="rotate(180)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "7s" }} /></g>
          <g transform="rotate(240)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "7.1s" }} /></g>
          <g transform="rotate(300)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "7.2s" }} /></g>
          <g transform="rotate(30) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "7.4s" }} /></g>
          <g transform="rotate(90) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "7.5s" }} /></g>
          <g transform="rotate(150) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "7.6s" }} /></g>
          <g transform="rotate(210) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "7.7s" }} /></g>
          <g transform="rotate(270) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "7.8s" }} /></g>
          <g transform="rotate(330) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "7.9s" }} /></g>
          <circle className="vine-bud" r="4" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "6.7s" }} />
          <circle className="vine-bud" r="1.4" fill="currentColor" stroke="none" style={{ animationDelay: "8s" }} />
        </g>
      </g>
      <g transform="translate(850 464.4) rotate(118.2)">
        <g className="vine-sway" style={{ animationDelay: "8.1s" }}>
          <g className="vine-leaf" style={{ animationDelay: "7.4s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(980 430) rotate(40)">
        <g className="vine-sway" style={{ animationDelay: "8.7s" }}>
          <g className="vine-leaf" style={{ animationDelay: "8s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(1108.8 464.4) rotate(161.9)">
        <g className="vine-sway" style={{ animationDelay: "9.4s" }}>
          <g className="vine-leaf" style={{ animationDelay: "8.7s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(1240 500) rotate(41.1)">
        <g className="vine-sway" style={{ animationDelay: "10s" }}>
          <g className="vine-leaf" style={{ animationDelay: "9.3s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(1396.3 474.4) rotate(125.2)">
        <g className="vine-sway" style={{ animationDelay: "10.7s" }}>
          <g className="vine-leaf" style={{ animationDelay: "10s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>

      <path className="vine-stem" d="M-60 800C-13.3 793.3 130 755 220 760C310 765 390 828.3 480 830C570 831.7 670 769.2 760 770C850 770.8 931.7 834.2 1020 835C1108.3 835.8 1206.7 777.5 1290 775C1373.3 772.5 1481.7 812.5 1520 820" stroke="currentColor" strokeWidth="1.8" pathLength="1" style={{ animationDuration: "7.7s", animationDelay: "5.6s" }} />
      <g transform="translate(63.8 775.6) rotate(29.5)">
        <g className="vine-sway" style={{ animationDelay: "6.9s" }}>
          <g className="vine-leaf" style={{ animationDelay: "6.2s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(220 760) rotate(143.2)">
        <g className="vine-sway" style={{ animationDelay: "7.5s" }}>
          <g className="vine-leaf" style={{ animationDelay: "6.8s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(350 796.3) rotate(61.4)">
        <g className="vine-sway" style={{ animationDelay: "8.2s" }}>
          <g className="vine-leaf" style={{ animationDelay: "7.5s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(480 830) rotate(141.1)">
        <g className="vine-sway" style={{ animationDelay: "8.8s" }}>
          <g className="vine-leaf" style={{ animationDelay: "8.1s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(620 800.3) rotate(22.1)">
        <g className="vine-sway" style={{ animationDelay: "9.5s" }}>
          <g className="vine-leaf" style={{ animationDelay: "8.8s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(760 770) rotate(140.5)">
        <g className="vine-sway" style={{ animationDelay: "10.2s" }}>
          <g className="vine-leaf" style={{ animationDelay: "9.5s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(890.6 802.5) rotate(60.6)">
        <g className="vine-sway" style={{ animationDelay: "10.8s" }}>
          <g className="vine-leaf" style={{ animationDelay: "10.1s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(1020 835)">
        <g className="vine-sway" style={{ animationDelay: "12.4s" }}>
          <g transform="rotate(0)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "10.8s" }} /></g>
          <g transform="rotate(60)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "10.9s" }} /></g>
          <g transform="rotate(120)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "11s" }} /></g>
          <g transform="rotate(180)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "11.1s" }} /></g>
          <g transform="rotate(240)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "11.2s" }} /></g>
          <g transform="rotate(300)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "11.3s" }} /></g>
          <g transform="rotate(30) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "11.5s" }} /></g>
          <g transform="rotate(90) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "11.6s" }} /></g>
          <g transform="rotate(150) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "11.7s" }} /></g>
          <g transform="rotate(210) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "11.8s" }} /></g>
          <g transform="rotate(270) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "11.9s" }} /></g>
          <g transform="rotate(330) scale(0.55)"><path className="vine-petal" d="M0 0C5 -7 5 -18 0 -25C-5 -18 -5 -7 0 0" stroke="currentColor" strokeWidth="1.8" opacity="0.8" style={{ animationDelay: "12s" }} /></g>
          <circle className="vine-bud" r="4" stroke="currentColor" strokeWidth="1.5" style={{ animationDelay: "10.8s" }} />
          <circle className="vine-bud" r="1.4" fill="currentColor" stroke="none" style={{ animationDelay: "12.1s" }} />
        </g>
      </g>
      <g transform="translate(1156.9 806.3) rotate(122.2)">
        <g className="vine-sway" style={{ animationDelay: "12.1s" }}>
          <g className="vine-leaf" style={{ animationDelay: "11.4s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(1290 775) rotate(38.3)">
        <g className="vine-sway" style={{ animationDelay: "12.8s" }}>
          <g className="vine-leaf" style={{ animationDelay: "12.1s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
      <g transform="translate(1421.9 793.8) rotate(154.1)">
        <g className="vine-sway" style={{ animationDelay: "13.3s" }}>
          <g className="vine-leaf" style={{ animationDelay: "12.6s" }}>
            <path d="M0 0C8 -5 16 -18 13 -34C3 -27 -6 -12 0 0" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 -4C4 -12 7 -20 10 -27" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </g>
        </g>
      </g>
    </svg>
  );
}
