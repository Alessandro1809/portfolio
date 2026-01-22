
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/react/Terminal"

type TechStackProps = {
  title: string
  closing: string
}

export const TechStack = ({ title, closing }: TechStackProps) => {
  return (
   
<Terminal>
  <TypingAnimation>{title}</TypingAnimation>
  <AnimatedSpan>✔ Typescript</AnimatedSpan>
  <AnimatedSpan>✔ React.</AnimatedSpan>
  <AnimatedSpan>✔ Astro.</AnimatedSpan>
  <AnimatedSpan>✔ Tailwind CSS.</AnimatedSpan>
  <AnimatedSpan>✔ Next.js.</AnimatedSpan>
  <AnimatedSpan>✔ Node.js.</AnimatedSpan>
  <AnimatedSpan>✔ MongoDB.</AnimatedSpan>
  <AnimatedSpan>✔ PostgreSQL.</AnimatedSpan>
  <AnimatedSpan>✔ SQLite.</AnimatedSpan>
  <TypingAnimation>{closing}</TypingAnimation>
</Terminal>
  )
}
