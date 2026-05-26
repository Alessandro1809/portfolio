"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Award, Briefcase, Code, Rocket } from "lucide-react";

type TimelineExperience = {
    year: string;
    title: string;
    company: string;
    description: string;
};

type TimelineCopy = {
    heading: string;
    subheading: string;
    journeyContinues: string;
    experiences: TimelineExperience[];
};

type WorkTimelineProps = {
    timeline: TimelineCopy;
};

const icons = [Code, Briefcase, Rocket, Award];

const WorkTimeline = ({ timeline }: WorkTimelineProps) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const timelineRef = useRef<HTMLDivElement>(null);

    const experiences = useMemo(
        () =>
            timeline.experiences.map((experience, index) => ({
                id: index + 1,
                ...experience,
                icon: icons[index] ?? Code,
            })),
        [timeline.experiences],
    );

    useEffect(() => {
        let rafId: number | null = null;

        const calculateProgress = () => {
            if (!timelineRef.current) return;

            const rect = timelineRef.current.getBoundingClientRect();
            const visibleRange = window.innerHeight + rect.height;
            const scrolled = window.innerHeight - rect.top;
            setScrollProgress(Math.max(0, Math.min(1, scrolled / visibleRange)));
        };

        const handleScroll = () => {
            if (rafId !== null) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = null;
                calculateProgress();
            });
        };

        calculateProgress();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", calculateProgress);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", calculateProgress);
            if (rafId !== null) window.cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div id="experience" className="relative w-full text-white">
            <div className="mb-12 grid gap-5 lg:grid-cols-[0.8fr_1fr] lg:items-end">
                <div>
                    <p className="section-kicker">{timeline.subheading}</p>
                    <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
                        {timeline.heading}
                    </h2>
                </div>
                <p className="max-w-xl text-sm leading-7 text-neutral-400 lg:justify-self-end lg:text-right">
                    {timeline.journeyContinues}
                </p>
            </div>

            <div ref={timelineRef} className="relative">
                <div className="absolute left-4 top-0 h-full w-px bg-white/10 lg:left-1/2" />
                <div
                    className="absolute left-4 top-0 w-px bg-primary-green shadow-[0_0_24px_rgba(0,212,124,0.55)] lg:left-1/2"
                    style={{ height: `${scrollProgress * 100}%` }}
                />

                <div className="space-y-6">
                    {experiences.map((exp, index) => {
                        const Icon = exp.icon;
                        const alignRight = index % 2 === 1;
                        const cardPosition = alignRight
                            ? "lg:col-start-2 lg:ml-10"
                            : "lg:mr-10";

                        return (
                            <article
                                key={exp.id}
                                className="relative grid gap-4 pl-12 lg:grid-cols-2 lg:pl-0"
                            >
                                <span className="absolute left-0 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-primary-green/50 bg-black text-primary-green shadow-[0_0_22px_rgba(0,212,124,0.25)] lg:left-1/2 lg:-translate-x-1/2">
                                    <Icon className="h-4 w-4" strokeWidth={2} />
                                </span>

                                <div className={`rounded-lg border border-white/10 bg-black/55 p-5 backdrop-blur-xl transition duration-300 hover:border-primary-green/40 hover:bg-white/[0.045] ${cardPosition}`}>
                                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary-green">
                                        {exp.year}
                                    </p>
                                    <h3 className="mt-3 text-2xl font-semibold text-white">
                                        {exp.title}
                                    </h3>
                                    <p className="mt-1 text-sm font-medium text-neutral-300">
                                        {exp.company}
                                    </p>
                                    <p className="mt-4 text-sm leading-7 text-neutral-400">
                                        {exp.description}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WorkTimeline;
