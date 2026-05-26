import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import {
    ABOUT_ASCII_FPS,
    PROGRAMMINGCODE_ENCODED_FRAMES,
    PROGRAMMINGCODE_ENCODED_FRAMES_COLOR,
    REACTLOGO_ENCODED_FRAMES,
    REACTLOGO_ENCODED_FRAMES_COLOR,
} from "./aboutAsciiFrames";

type Sequence = {
    label: string;
    color: string;
    frames: readonly string[];
};

const SEGMENT_FRAMES = ABOUT_ASCII_FPS * 6;
const TRANSITION_FRAMES = ABOUT_ASCII_FPS;
const SIGNAL_CHARS = [".", ":", "-", "+", "*", "#", "/", "\\", "|"];

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

const easeInOutCubic = (value: number) => {
    const progress = clamp01(value);

    return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - (-2 * progress + 2) ** 3 / 2;
};

const decodeFrame = (encodedFrame: string) =>
    encodedFrame
        .split("\n")
        .map((line) => {
            let decoded = "";

            for (let index = 0; index < line.length;) {
                const separator = line.indexOf(":", index);
                const count = Number.parseInt(line.slice(index, separator), 36);
                const character = line[separator + 1] ?? " ";

                decoded += character.repeat(count);
                index = separator + 2;
            }

            return decoded;
        })
        .join("\n");

const buildSignalFrame = (progress: number, tick: number) => {
    const width = 46;
    const height = 9;
    const cursor = Math.round(clamp01(progress) * (width - 1));

    return Array.from({ length: height }, (_, row) =>
        Array.from({ length: width }, (_, column) => {
            const distance = Math.abs(column - cursor);
            const wave = Math.sin((row * 9 + column * 5 + tick * 1.7) * 0.28);
            const ripple = Math.cos((row * 6 - column * 3 + tick) * 0.21);

            if (distance <= 1) return "#";
            if (distance <= 4 && wave > -0.35) return SIGNAL_CHARS[(row + column + tick) % SIGNAL_CHARS.length];
            if (distance <= 11 && wave > 0.62) return SIGNAL_CHARS[(row * 3 + column + tick) % SIGNAL_CHARS.length];
            if (distance <= 18 && ripple > 0.82) return ".";

            return " ";
        }).join(""),
    ).join("\n");
};

export const AboutAsciiTransition = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRefs = useRef<Array<HTMLPreElement | null>>([]);
    const [tick, setTick] = useState(0);
    const [scales, setScales] = useState([1, 1]);
    const [contentSizes, setContentSizes] = useState([
        { width: 0, height: 0 },
        { width: 0, height: 0 },
    ]);

    const sequences = useMemo<Sequence[]>(
        () => [
            {
                label: "Programming code ASCII animation",
                color: PROGRAMMINGCODE_ENCODED_FRAMES_COLOR,
                frames: PROGRAMMINGCODE_ENCODED_FRAMES.map(decodeFrame),
            },
            {
                label: "React logo ASCII animation",
                color: REACTLOGO_ENCODED_FRAMES_COLOR,
                frames: REACTLOGO_ENCODED_FRAMES.map(decodeFrame),
            },
        ],
        [],
    );

    useEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) return;

        let animationId = 0;
        let lastTime = 0;
        const frameDuration = 1000 / ABOUT_ASCII_FPS;

        const animate = (time: number) => {
            if (!lastTime) lastTime = time;

            const delta = time - lastTime;

            if (delta >= frameDuration) {
                setTick((current) => current + 1);
                lastTime = time - (delta % frameDuration);
            }

            animationId = window.requestAnimationFrame(animate);
        };

        animationId = window.requestAnimationFrame(animate);
        return () => window.cancelAnimationFrame(animationId);
    }, []);

    useEffect(() => {
        const measure = () => {
            const container = containerRef.current;
            if (!container) return;

            const availableWidth = container.clientWidth;
            const availableHeight = container.clientHeight;
            if (availableWidth <= 0 || availableHeight <= 0) return;

            const nextSizes: Array<{ width: number; height: number }> = [];
            const nextScales = contentRefs.current.map((content, index) => {
                if (!content) return 1;

                const naturalWidth = content.scrollWidth;
                const naturalHeight = content.scrollHeight;
                if (naturalWidth <= 0 || naturalHeight <= 0) return 1;

                nextSizes[index] = { width: naturalWidth, height: naturalHeight };

                const fitScale = Math.min(
                    (availableWidth - 24) / naturalWidth,
                    (availableHeight - 24) / naturalHeight,
                );

                return Math.min(fitScale * 1.08, 1.25);
            });

            if (nextSizes.length) setContentSizes(nextSizes);
            setScales(nextScales.length ? nextScales : [1, 1]);
        };

        measure();

        const observer = new ResizeObserver(measure);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    const segmentPosition = tick % SEGMENT_FRAMES;
    const activeIndex = Math.floor(tick / SEGMENT_FRAMES) % sequences.length;
    const nextIndex = (activeIndex + 1) % sequences.length;
    const transitionStart = SEGMENT_FRAMES - TRANSITION_FRAMES;
    const transitionProgress =
        segmentPosition >= transitionStart
            ? (segmentPosition - transitionStart) / TRANSITION_FRAMES
            : 0;
    const transitionEase = easeInOutCubic(transitionProgress);
    const transitionPulse = Math.sin(Math.PI * transitionProgress);
    const signalFrame = buildSignalFrame(transitionEase, tick);
    const signalBars = Array.from({ length: 7 }, (_, index) => index);

    return (
        <div
            ref={containerRef}
            className="relative grid min-h-[20rem] overflow-hidden rounded-md border border-primary-green/20 bg-black/35 p-3 sm:min-h-[22rem]"
            role="img"
            aria-label="Programming and React ASCII Studio animations"
        >
            <style>{`
                .about-ascii-transition {
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                    font-size: 8px;
                    font-weight: normal;
                    letter-spacing: 0;
                    line-height: 0.78;
                    margin: 0;
                    white-space: pre;
                }
            `}</style>

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(0,212,124,0.13),transparent_58%)]" />
            <div className="pointer-events-none absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-primary-green/30 blur-sm" />

            {sequences.map((sequence, index) => {
                const isActive = index === activeIndex;
                const isNext = index === nextIndex && transitionProgress > 0;
                const opacity = isActive || isNext ? 1 : 0;
                const scale = scales[index] ?? 1;
                const size = contentSizes[index] ?? { width: 0, height: 0 };
                const frameProgress = isNext ? transitionEase : segmentPosition / SEGMENT_FRAMES;
                const frameIndex = Math.min(
                    Math.floor(frameProgress * sequence.frames.length),
                    sequence.frames.length - 1,
                );
                const frame = sequence.frames[frameIndex];
                const isTransitioning = transitionProgress > 0 && (isActive || isNext);
                const layerClip = isActive && transitionProgress > 0
                    ? `inset(0 ${transitionEase * 100}% 0 0)`
                    : isNext
                        ? `inset(0 0 0 ${(1 - transitionEase) * 100}%)`
                        : "inset(0)";
                const maskSize = `${8 + Math.round(transitionPulse * 10)}px`;
                const layerMask = isTransitioning
                    ? `repeating-linear-gradient(180deg, #000 0 ${maskSize}, transparent ${maskSize} calc(${maskSize} + 4px))`
                    : undefined;
                const layerStyle = {
                    opacity,
                    clipPath: layerClip,
                    WebkitMaskImage: layerMask,
                    maskImage: layerMask,
                    transform: isNext
                        ? `translateX(${(1 - transitionEase) * 18}px)`
                        : isActive && transitionProgress > 0
                            ? `translateX(${-transitionEase * 18}px)`
                            : "translateX(0)",
                    filter: isTransitioning
                        ? `brightness(${1 + transitionPulse * 0.2}) contrast(${1 + transitionPulse * 0.22})`
                        : "none",
                    transition: "opacity 120ms linear",
                } satisfies CSSProperties;

                return (
                    <div
                        key={sequence.label}
                        className="absolute inset-0 grid place-items-center px-2"
                        style={layerStyle}
                    >
                        <div
                            className="relative"
                            style={{
                                width: size.width ? size.width * scale : undefined,
                                height: size.height ? size.height * scale : undefined,
                            }}
                        >
                            <pre
                                ref={(node) => {
                                    contentRefs.current[index] = node;
                                }}
                                aria-hidden="true"
                                className="about-ascii-transition select-none text-center"
                                style={{
                                    color: sequence.color,
                                    textShadow: `0 0 6px ${sequence.color}88, 0 0 24px ${sequence.color}40`,
                                    transform: `scale(${scale})`,
                                    transformOrigin: "left top",
                                }}
                            >
                                {frame}
                            </pre>
                        </div>
                    </div>
                );
            })}

            {transitionProgress > 0 && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 mix-blend-screen">
                    <div
                        className="absolute inset-0"
                        style={{
                            opacity: transitionPulse * 0.16,
                            background:
                                "repeating-linear-gradient(180deg, transparent 0 8px, rgba(45, 249, 255, 0.45) 8px 9px, transparent 9px 14px)",
                        }}
                    />

                    {signalBars.map((bar) => (
                        <div
                            key={bar}
                            className="absolute h-px bg-gradient-to-r from-transparent via-primary-green to-transparent"
                            style={{
                                top: `${15 + bar * 11}%`,
                                left: `${12 + ((tick * 5 + bar * 17) % 28)}%`,
                                width: `${22 + ((tick + bar * 13) % 18)}%`,
                                opacity: transitionPulse * (0.18 + bar * 0.025),
                                transform: `translateX(${(bar % 2 === 0 ? 1 : -1) * transitionPulse * 18}px)`,
                            }}
                        />
                    ))}

                    <div
                        className="absolute inset-y-3 w-28 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#2df9ff]/45 to-transparent blur-sm"
                        style={{
                            left: `${transitionEase * 100}%`,
                            opacity: transitionPulse * 0.9,
                        }}
                    />
                    <div
                        className="absolute inset-y-6 w-px bg-white"
                        style={{
                            left: `${transitionEase * 100}%`,
                            boxShadow: "0 0 18px rgba(45, 249, 255, 0.95), 0 0 48px rgba(0, 212, 124, 0.55)",
                            opacity: transitionPulse,
                        }}
                    />
                    <pre
                        className="about-ascii-transition absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-center"
                        style={{
                            color: transitionProgress < 0.5 ? PROGRAMMINGCODE_ENCODED_FRAMES_COLOR : REACTLOGO_ENCODED_FRAMES_COLOR,
                            opacity: transitionPulse * 0.62,
                            textShadow: "0 0 8px rgba(45, 249, 255, 0.9), 0 0 28px rgba(0, 212, 124, 0.45)",
                            transform: `translate(-50%, -50%) scale(${1 + transitionPulse * 0.18})`,
                        }}
                    >
                        {signalFrame}
                    </pre>
                </div>
            )}
        </div>
    );
};
