"use client"

import { useState } from "react"
import { Share2, Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react"

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
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
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  return (
    <div className="flex items-center gap-3 animate-fade-in">
      <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mr-2 flex items-center gap-2">
        <Share2 className="w-3.5 h-3.5" /> Share
      </span>
      
      <div className="flex items-center gap-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-primary-green hover:border-primary-green/30 hover:bg-primary-green/5 transition-all duration-300"
          title="Share on X (Twitter)"
        >
          <Twitter className="w-4 h-4" />
        </a>
        
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-primary-green hover:border-primary-green/30 hover:bg-primary-green/5 transition-all duration-300"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        
        <button
          onClick={copyToClipboard}
          className={`p-2 rounded-full border transition-all duration-300 relative ${
            copied 
              ? "bg-primary-green/20 border-primary-green text-primary-green" 
              : "bg-white/5 border-white/10 text-neutral-400 hover:text-primary-green hover:border-primary-green/30 hover:bg-primary-green/5"
          }`}
          title="Copy Link"
        >
          {copied ? (
            <Check className="w-4 h-4 animate-in zoom-in duration-300" />
          ) : (
            <LinkIcon className="w-4 h-4" />
          )}
          
          {copied && (
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary-green text-black text-[10px] font-bold rounded shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
              COPIED!
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
