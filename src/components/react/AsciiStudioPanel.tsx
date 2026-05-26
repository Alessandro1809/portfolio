import { useEffect, useMemo, useRef, useState } from "react";
import {
    PROGRAMMING_WEBSITE_ENCODED_FRAMES,
    PROGRAMMING_WEBSITE_FRAME_HEIGHT,
    PROGRAMMING_WEBSITE_FRAME_WIDTH,
    PROGRAMMING_WEBSITE_FPS,
} from "./programmingWebsiteFrames";

type AsciiStudioPanelProps = {
    name: string;
    title: string;
    subtitle: string;
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

export const AsciiStudioPanel = ({ className = "" }: AsciiStudioPanelProps) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [scale, setScale] = useState(0.4);
    const [contentSize, setContentSize] = useState({
        width: PROGRAMMING_WEBSITE_FRAME_WIDTH * MONO_CHARACTER_WIDTH,
        height: PROGRAMMING_WEBSITE_FRAME_HEIGHT * MONO_LINE_HEIGHT,
    });
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLPreElement>(null);
    const frames = useMemo(
        () => PROGRAMMING_WEBSITE_ENCODED_FRAMES.map(decodeFrame),
        [],
    );

    useEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) return;

        let animationId = 0;
        let lastTime = 0;
        const frameDuration = 1000 / PROGRAMMING_WEBSITE_FPS;

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

            const scaleBoost = availableWidth >= 560 ? 2.178 : 1.45;
            const nextScale = Math.min(availableWidth / naturalWidth, availableHeight / naturalHeight, 1) * scaleBoost;

            setContentSize({ width: naturalWidth, height: naturalHeight });
            setScale(nextScale);
        };

        measure();

        const observer = new ResizeObserver(measure);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative grid min-h-[25rem] min-w-0 w-full place-items-center overflow-visible sm:min-h-[29rem] lg:min-h-[32rem] ${className}`}
            role="img"
            aria-label="Programming and website ASCII Studio animation"
        >
            <style>{`
                .programming-ascii-art {
                    color: #37c878;
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                    font-size: 8px;
                    font-weight: normal;
                    letter-spacing: 0;
                    line-height: 0.78;
                    margin: 0;
                    text-shadow:
                        0 0 5px rgba(0, 212, 124, 0.5),
                        0 0 18px rgba(0, 212, 124, 0.2);
                    white-space: pre;
                }
            `}</style>

            <div
                className="relative"
                style={{
                    height: contentSize.height ? contentSize.height * scale : undefined,
                    width: contentSize.width ? contentSize.width * scale : undefined,
                }}
            >
                <pre
                    ref={contentRef}
                    aria-hidden="true"
                    className="programming-ascii-art select-none"
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: "left top",
                    }}
                >
                    {frames[currentFrame]}
                </pre>
            </div>
        </div>
    );
};
