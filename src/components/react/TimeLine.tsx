"use client";

import { useMemo, useRef } from "react";
import { Award, Briefcase, Code, Rocket } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

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
    const timelineRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 78%", "end 24%"],
    });
    const railScale = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 28,
        mass: 0.55,
    });

    const experiences = useMemo(
        () =>
            timeline.experiences.map((experience, index) => ({
                id: index + 1,
                ...experience,
                icon: icons[index] ?? Code,
            })),
        [timeline.experiences],
    );

    return (
        <div id="experience" className="relative w-full text-white" data-motion-section="timeline">
            <div className="mb-14 max-w-3xl" data-motion-header>
                <h2 data-gsap-heading className="text-3xl font-semibold leading-tight sm:text-5xl lg:text-[clamp(2.25rem,4vw,3rem)]">
                    {timeline.heading}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-400" data-motion-copy>
                    {timeline.subheading}. {timeline.journeyContinues}
                </p>
            </div>

            <div ref={timelineRef} className="relative">
                <div className="absolute left-3 top-0 h-full w-px bg-white/8 lg:left-[12.5rem]" />
                <motion.div
                    className="absolute left-3 top-0 h-full w-px bg-primary-green lg:left-[12.5rem]"
                    style={{
                        scaleY: reduceMotion ? 1 : railScale,
                        transformOrigin: "top",
                    }}
                />

                <div className="grid gap-5">
                    {experiences.map((exp, index) => {
                        const Icon = exp.icon;

                        return (
                            <motion.article
                                key={exp.id}
                                className="group relative grid gap-4 pl-12 lg:grid-cols-[12.5rem_1fr] lg:pl-0"
                                data-timeline-item
                                initial={false}
                            >
                                <div className="hidden pt-5 lg:block">
                                    <p className="font-mono text-[0.68rem] tracking-[0.16em] text-neutral-500">
                                        {exp.year}
                                    </p>
                                </div>

                                <span className="timeline-node absolute left-0 top-5 flex h-7 w-7 items-center justify-center rounded-lg border border-primary-green/35 bg-[#0C0C0E] text-primary-green lg:left-[11.65rem]">
                                    <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                                </span>

                                <div className="timeline-card border border-white/8 bg-black/35 p-5 transition-colors duration-250 group-hover:border-primary-green/35 group-hover:bg-white/[0.035] sm:p-6">
                                    <p className="font-mono text-[0.68rem] tracking-[0.16em] text-primary-green lg:hidden">
                                        {exp.year}
                                    </p>
                                    <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold leading-tight text-white">
                                                {exp.title}
                                            </h3>
                                            <p className="mt-1 text-sm font-medium text-neutral-400">
                                                {exp.company}
                                            </p>
                                        </div>
                                        <span className="hidden rounded-md border border-white/8 px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.12em] text-neutral-500 sm:inline-flex">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <p className="mt-4 max-w-3xl text-sm leading-[1.8] text-neutral-400">
                                        {exp.description}
                                    </p>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WorkTimeline;
