"use client"

import { useState } from "react"
import { Share2, Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react"

type ShareLabels = {
  label: string
  shareOnX: string
  shareOnLinkedIn: string
  copyLink: string
  copied: string
}

interface ShareButtonsProps {
  title: string
  url: string
  labels: ShareLabels
}

export function ShareButtons({ title, url, labels }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard API unavailable — silent fail */
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest mr-2 flex items-center gap-2">
        <Share2 className="w-3.5 h-3.5" aria-hidden="true" /> {labels.label}
      </span>

      <div className="flex items-center gap-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${labels.shareOnX}, opens in new tab`}
          className="p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-primary-green hover:border-primary-green/30 hover:bg-primary-green/5 transition-all duration-300"
        >
          <Twitter className="w-4 h-4" aria-hidden="true" />
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${labels.shareOnLinkedIn}, opens in new tab`}
          className="p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-primary-green hover:border-primary-green/30 hover:bg-primary-green/5 transition-all duration-300"
        >
          <Linkedin className="w-4 h-4" aria-hidden="true" />
        </a>

        <button
          type="button"
          onClick={copyToClipboard}
          aria-label={copied ? labels.copied : labels.copyLink}
          aria-pressed={copied}
          className={`p-2 rounded-full border transition-all duration-300 relative ${
            copied
              ? "bg-primary-green/20 border-primary-green text-primary-green"
              : "bg-white/5 border-white/10 text-neutral-400 hover:text-primary-green hover:border-primary-green/30 hover:bg-primary-green/5"
          }`}
        >
          {copied ? (
            <Check className="w-4 h-4" aria-hidden="true" />
          ) : (
            <LinkIcon className="w-4 h-4" aria-hidden="true" />
          )}

          {/* Tooltip — only shown when copied */}
          {copied && (
            <span
              role="status"
              className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary-green text-black text-[10px] font-bold rounded shadow-lg"
              aria-live="polite"
            >
              {labels.copied}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
