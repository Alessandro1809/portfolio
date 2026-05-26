import { useEffect, useMemo, useRef, useState } from "react";
import { animate } from "animejs";

const FPS = 10;
const HOLD_FRAMES = 16;
const GLITCH_FRAMES = 6;

const logoFrames = [
    [
        "             .:------:.             ",
        "        .-=+*+=-::::-=+*+=-.        ",
        "     .-++-.      .::.      .-++-.   ",
        "    -+=.       .-++++-.       .=+-  ",
        "   :+-        :++:  :++:        -+: ",
        "   ++         ++  ::  ++         ++ ",
        "   :+-        :++:  :++:        -+: ",
        "    -+=.       .-++++-.       .=+-  ",
        "     .-++-.      .::.      .-++-.   ",
        "        .-=+*+=-::::-=+*+=-.        ",
        "             .:------:.             ",
    ],
    [
        "                 /\\                 ",
        "                /++\\                ",
        "               /++++\\               ",
        "              /++++++\\              ",
        "             /++/\\++++\\             ",
        "            /++/  \\++++\\            ",
        "           /++/____\\++++\\           ",
        "          /++++++++++++++\\          ",
        "         /++++/------\\++++\\         ",
        "        /____/        \\____\\        ",
        "             \\/\\____/\\/             ",
    ],
    [
        "        ####################        ",
        "        ####################        ",
        "        ####              ##        ",
        "        ####              ##        ",
        "        ####   ########   ##        ",
        "        ####      ##      ##        ",
        "        ####      ##      ##        ",
        "        ####      ##   ## ##        ",
        "        ####   ######  ## ##        ",
        "        ####################        ",
        "        ####################        ",
    ],
    [
        "             __________             ",
        "          .-'          '-.          ",
        "        .'   .------.     '.        ",
        "       /    /  ____  \\      \\       ",
        "      |    |  / __ \\  |      |      ",
        "      |    | | |  | | |      |      ",
        "      |    | | |__| | |      |      ",
        "       \\    \\______ /      /        ",
        "        '.    .------.    .'        ",
        "          '-.__________.-'          ",
        "             ----------             ",
    ],
    [
        "              .------.              ",
        "          .--'        '--.          ",
        "        .'   .--------.   '.        ",
        "       /   .'  .----.  '.   \\       ",
        "      |   /   /      \\   \\   |      ",
        "      |   |  |      |  |   |        ",
        "      |   \\   \\______/   /   |      ",
        "       \\   '.          .'   /       ",
        "        '.   '--____--'   .'        ",
        "          '--.________.--'          ",
        "              '------'              ",
    ],
    [
        "                                      ",
        "         .::::.       .::::.         ",
        "      .::::::::::. .::::::::::.      ",
        "    .::::::'  '::::::::'  '::::::.   ",
        "   ::::::'      '::::'      '::::::  ",
        "     '::::::. .::::::::. .::::::'    ",
        "        '::::::::::::::::::::'       ",
        "    .::::::'  '::::::::'  '::::::.   ",
        "   ::::::'      '::::'      '::::::  ",
        "      '::::::.        .::::::'       ",
        "          '::::::::::::::'           ",
    ],
];

const noise = ["░", "▒", "▓", "█", "·", ":", "+", "*", "#", "/", "\\", "|", "_", "-"];

const morphFrame = (from: string[], to: string[], progress: number) =>
    from
        .map((line, lineIndex) =>
            line
                .split("")
                .map((char, charIndex) => {
                    const target = to[lineIndex]?.[charIndex] ?? " ";
                    const threshold = (lineIndex * 7 + charIndex * 3) % 100;
                    const current = progress * 100;

                    if (current > threshold + 18) return target;
                    if (current > threshold) return noise[(lineIndex + charIndex) % noise.length];
                    return char;
                })
                .join(""),
        )
        .join("\n");

const buildTimeline = () => {
    const frames: string[] = [];

    logoFrames.forEach((frame, index) => {
        const nextFrame = logoFrames[(index + 1) % logoFrames.length];
        for (let i = 0; i < HOLD_FRAMES; i += 1) {
            frames.push(frame.join("\n"));
        }
        for (let i = 1; i <= GLITCH_FRAMES; i += 1) {
            frames.push(morphFrame(frame, nextFrame, i / GLITCH_FRAMES));
        }
    });

    return frames;
};

export const TechGlyphPanel = () => {
    const panelRef = useRef<HTMLDivElement>(null);
    const frames = useMemo(buildTimeline, []);
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) return;

        let animationId = 0;
        let lastTime = 0;
        const frameDuration = 1000 / FPS;

        const tick = (time: number) => {
            if (!lastTime) lastTime = time;
            const delta = time - lastTime;

            if (delta >= frameDuration) {
                setFrame((current) => (current + 1) % frames.length);
                lastTime = time - (delta % frameDuration);
            }

            animationId = requestAnimationFrame(tick);
        };

        animationId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animationId);
    }, [frames.length]);

    useEffect(() => {
        if (!panelRef.current) return;

        animate(panelRef.current.querySelector("[data-ascii-orb]"), {
            opacity: [0.32, 0.85],
            scale: [0.88, 1.08],
            duration: 1800,
            alternate: true,
            loop: true,
            ease: "inOutSine",
        });
    }, []);

    return (
        <div
            ref={panelRef}
            className="relative min-h-56 overflow-hidden rounded-md border border-primary-green/25 bg-black/70"
            aria-label="Tech stack ASCII animation"
        >
            <div data-ascii-orb className="absolute inset-x-12 top-8 h-28 rounded-full bg-primary-green/20 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(transparent_94%,rgba(0,212,124,0.14)_95%)] bg-size-[100%_10px] opacity-35" />
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2">
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400/75" />
                    <span className="h-2 w-2 rounded-full bg-yellow-300/75" />
                    <span className="h-2 w-2 rounded-full bg-primary-green" />
                </div>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-neutral-500">
                    ASCII Studio
                </span>
            </div>
            <div className="relative z-10 grid min-h-48 place-items-center p-4">
                <pre className="ascii-glitch max-w-full overflow-hidden whitespace-pre text-center font-mono text-[0.52rem] leading-[1.05] text-primary-green sm:text-[0.64rem]">
                    {frames[frame]}
                </pre>
            </div>
        </div>
    );
};
