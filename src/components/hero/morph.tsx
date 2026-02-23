"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

type Tick = { value: number; baseAlpha: number };
type Mouse = { x: number; y: number };

const LEFT_TICKS: Tick[] = [
    { value: 0, baseAlpha: 0.15 },
    { value: 50, baseAlpha: 0.2 },
    { value: 100, baseAlpha: 0.3 },
    { value: 150, baseAlpha: 0.3 },
    { value: 200, baseAlpha: 0.3 },
    { value: 250, baseAlpha: 0.3 },
    { value: 300, baseAlpha: 0.3 },
    { value: 550, baseAlpha: 0.2 },
    { value: 600, baseAlpha: 0.15 },
    { value: 650, baseAlpha: 0.1 },
    { value: 700, baseAlpha: 0.05 },
    { value: 750, baseAlpha: 0.02 },
];

const RIGHT_TICKS: Tick[] = [
    { value: 0, baseAlpha: 0.15 },
    { value: 50, baseAlpha: 0.2 },
    { value: 100, baseAlpha: 0.3 },
    { value: 150, baseAlpha: 0.3 },
    { value: 200, baseAlpha: 0.3 },
    { value: 250, baseAlpha: 0.3 },
    { value: 300, baseAlpha: 0.3 },
    { value: 600, baseAlpha: 0.15 },
    { value: 650, baseAlpha: 0.1 },
    { value: 700, baseAlpha: 0.05 },
    { value: 750, baseAlpha: 0.02 },
];

function clamp01(n: number) {
    return Math.min(1, Math.max(0, n));
}

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

function rgbaWhite(alpha: number) {
    const a = Math.min(1, Math.max(0, alpha));
    return `rgba(255,255,255,${a})`;
}

function RulerSide({
    side,
    factor,
    ticks,
}: {
    side: "left" | "right";
    factor: number;
    ticks: Tick[];
}) {
    const isLeft = side === "left";

    return (
        <div
            className={`ruler-ticks ${isLeft ? "" : "ruler-ticks-right"} absolute ${isLeft ? "left-2 -translate-x-[calc(100%-1px)] pr-0 items-end origin-right" : "right-2 translate-x-[calc(100%-1px)] pl-0 items-start origin-left"} top-[40px] flex flex-col gap-10 text-xs font-mono`}
        >
            {ticks.map((t) => {
                const alpha = Math.min(0.7, t.baseAlpha * factor);
                const color = rgbaWhite(alpha);

                const tickStyle: CSSProperties = {
                    backgroundColor: color,
                    transform: `scaleX(${factor})`,
                    transformOrigin: isLeft ? "100% 50%" : "0% 50%",
                };

                const labelStyle: CSSProperties = { color };

                return isLeft ? (
                    <div key={t.value} className="flex w-fit items-center gap-2">
                        <span style={labelStyle} className="-rotate-90">
                            {t.value}
                        </span>
                        <span style={tickStyle} className="w-1 h-px" />
                    </div>
                ) : (
                    <div key={t.value} className="flex w-fit items-center gap-2">
                        <span style={tickStyle} className="w-1 h-px" />
                        <span style={labelStyle} className="rotate-90">
                            {t.value}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

export default function RulerTicks() {
    const rafRef = useRef<number | null>(null);
    const latestRef = useRef<Mouse>({ x: 0.5, y: 0.5 });
    const [mouse, setMouse] = useState<Mouse>({ x: 0.5, y: 0.5 });

    useEffect(() => {
        const onPointerMove = (e: PointerEvent) => {
            latestRef.current = {
                x: clamp01(e.clientX / Math.max(1, window.innerWidth)),
                y: clamp01(e.clientY / Math.max(1, window.innerHeight)),
            };

            if (rafRef.current !== null) return;
            rafRef.current = window.requestAnimationFrame(() => {
                rafRef.current = null;
                setMouse(latestRef.current);
            });
        };

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        return () => {
            window.removeEventListener("pointermove", onPointerMove);
            if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const leftFactor = useMemo(() => lerp(0.75, 2.1, mouse.y), [mouse.y]);
    const rightFactor = useMemo(() => lerp(0.75, 2.1, mouse.x), [mouse.x]);

    return (
        <div
            className="absolute inset-0 w-[80%] mx-auto pointer-events-none hidden lg:block z-10"
            aria-hidden="true"
        >
            <RulerSide side="left" factor={leftFactor} ticks={LEFT_TICKS} />
            <RulerSide side="right" factor={rightFactor} ticks={RIGHT_TICKS} />
        </div>
    );
}