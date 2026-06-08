import { useEffect, useMemo, useRef, useState } from "react";

type BlogComputerAsciiProps = {
    className?: string;
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

const MONO_CHARACTER_WIDTH = 4.82;
const MONO_LINE_HEIGHT = 8 * 0.78;
const BLOG_COMPUTER_ASCII_COLOR = "#2df9ff";
const BLOG_COMPUTER_ASCII_FRAME_WIDTH = 188;
const BLOG_COMPUTER_ASCII_FRAME_HEIGHT = 72;
const BLOG_COMPUTER_ASCII_FPS = 30;

export const BlogComputerAscii = ({ className = "" }: BlogComputerAsciiProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLPreElement>(null);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [encodedFrames, setEncodedFrames] = useState<readonly string[]>([]);
    const [scale, setScale] = useState(0.42);
    const [contentSize, setContentSize] = useState({
        width: BLOG_COMPUTER_ASCII_FRAME_WIDTH * MONO_CHARACTER_WIDTH,
        height: BLOG_COMPUTER_ASCII_FRAME_HEIGHT * MONO_LINE_HEIGHT,
    });
    const frames = useMemo(
        () => encodedFrames.map(decodeFrame),
        [encodedFrames],
    );

    useEffect(() => {
        let mounted = true;

        void import("./blogComputerFrames").then((module) => {
            if (!mounted) return;
            setEncodedFrames(module.BLOG_COMPUTER_ASCII_ENCODED_FRAMES);
        });

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if (!frames.length) return;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) return;

        let animationId = 0;
        let lastTime = 0;
        const frameDuration = 1000 / BLOG_COMPUTER_ASCII_FPS;

        const animate = (time: number) => {
            if (!lastTime) lastTime = time;
            const delta = time - lastTime;

            if (delta >= frameDuration) {
                setCurrentFrame((current) => (current + 1) % frames.length);
                lastTime = time - (delta % frameDuration);
            }

            animationId = window.requestAnimationFrame(animate);
        };

        animationId = window.requestAnimationFrame(animate);
        return () => window.cancelAnimationFrame(animationId);
    }, [frames.length]);

    useEffect(() => {
        const measure = () => {
            const container = containerRef.current;
            const content = contentRef.current;
            if (!container || !content) return;

            const availableWidth = container.clientWidth;
            const availableHeight = container.clientHeight;
            const naturalWidth = content.scrollWidth;
            const naturalHeight = content.scrollHeight;

            if (
                availableWidth <= 0 ||
                availableHeight <= 0 ||
                naturalWidth <= 0 ||
                naturalHeight <= 0
            ) {
                return;
            }

            const fitScale = Math.min(
                availableWidth / naturalWidth,
                availableHeight / naturalHeight,
            );

            const scaleBoost = availableWidth >= 560 ? 1.28 : 1.12;

            setContentSize({ width: naturalWidth, height: naturalHeight });
            setScale(Math.min(fitScale * scaleBoost, 1.7));
        };

        measure();

        const observer = new ResizeObserver(measure);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [frames.length]);

    return (
        <div
            ref={containerRef}
            className={`relative grid min-h-[22rem] overflow-visible sm:min-h-[26rem] ${className}`}
            role="img"
            aria-label="Programming computer ASCII Studio animation"
        >
            <style>{`
                .blog-computer-ascii {
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                    font-size: 8px;
                    font-weight: normal;
                    letter-spacing: 0;
                    line-height: 0.78;
                    margin: 0;
                    white-space: pre;
                }
            `}</style>

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,249,255,0.16),transparent_62%)]" />

            <div className="absolute inset-0 grid place-items-center px-2">
                <div
                    className="relative"
                    style={{
                        width: contentSize.width ? contentSize.width * scale : undefined,
                        height: contentSize.height ? contentSize.height * scale : undefined,
                    }}
                >
                    <pre
                        ref={contentRef}
                        aria-hidden="true"
                        className="blog-computer-ascii select-none text-center"
                        style={{
                            color: BLOG_COMPUTER_ASCII_COLOR,
                            textShadow:
                                "0 0 7px rgba(45, 249, 255, 0.72), 0 0 28px rgba(0, 212, 124, 0.35)",
                            transform: `scale(${scale})`,
                            transformOrigin: "left top",
                        }}
                    >
                        {frames[currentFrame] ?? ""}
                    </pre>
                </div>
            </div>

            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent_0_9px,rgba(255,255,255,0.035)_9px_10px)] opacity-50" />
        </div>
    );
};
