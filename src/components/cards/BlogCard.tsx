import { ArrowUpRight } from "lucide-react"
import { formatDate } from "@/lib/date"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  date: string
  categorie: string
  read_time: string
  featured: boolean
}

interface BlogCardLabels {
  featuredBadge: string
  minLabel: string
  readMore: string
}

export function BlogCard({
  post,
  labels,
  locale,
}: {
  post: BlogPost
  labels: BlogCardLabels
  locale: string
}) {
  const formattedDate =
    formatDate(post.date, locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) ?? ""
  const readTime =
    post.read_time && String(post.read_time).trim()
      ? String(post.read_time).trim()
      : "5"

  return (
    <a 
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:cursor-pointer"
    >
      {/* Corner accent */}
      <div className="absolute right-0 top-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:translate-x-5 group-hover:-translate-y-5 group-hover:bg-primary/30" />

      {/* Featured badge */}
      {post.featured && (
        <div className="absolute left-4 top-4 z-10">
          <div className="inline-flex items-center gap-1 rounded-full border border-accent/50 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {labels.featuredBadge}
          </div>
        </div>
      )}

      <div className="relative p-6">
        {/* Category and metadata */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-primary">{post.categorie}</span>
          <span className="text-xs text-muted-foreground">
            {readTime} {labels.minLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-balance mb-3 font-mono text-xl font-bold text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-pretty mb-6 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/50 pt-4">
          <time className="text-xs text-muted-foreground">{formattedDate}</time>

          <div className="flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
            {labels.readMore}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-primary via-accent to-secondary transition-all duration-500 group-hover:w-full" />
      </div>

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0a3a2a08_1px,transparent_1px),linear-gradient(to_bottom,#0a3a2a08_1px,transparent_1px)] bg-size[2rem_2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </a>
  )
}
