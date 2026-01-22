import React from 'react';
import type { ContentBlocks } from '@/components/react/blog/types';

interface BlogContentProps {
  content: ContentBlocks;
  noContentLabel: string;
}

const getYoutubeEmbedUrl = (url: string): string => {
  if (!url) return '';
  
  // Si ya es una URL de embed, devolverla tal cual
  if (url.includes('/embed/')) {
    return url;
  }
  
  // Extraer el ID del video de diferentes formatos de URL
  let videoId = '';
  
  // Formato: https://www.youtube.com/watch?v=VIDEO_ID
  const watchRegex = /[?&]v=([^&]+)/;
  const watchMatch = url.match(watchRegex);
  if (watchMatch) {
    videoId = watchMatch[1];
  }
  
  // Formato: https://youtu.be/VIDEO_ID
  const shortRegex = /youtu\.be\/([^?&]+)/;
  const shortMatch = url.match(shortRegex);
  if (shortMatch) {
    videoId = shortMatch[1];
  }
  
  // Si encontramos un ID, devolver la URL de embed
  if (videoId) {
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  }
  
  // Si no se pudo extraer el ID, devolver la URL original
  return url;
};

const getAlignClass = (align?: string): string => {
  switch (align) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    case 'justify':
      return 'text-justify';
    case 'left':
      return 'text-left';
    default:
      return '';
  }
};

export const BlogContent: React.FC<BlogContentProps> = React.memo(({ content, noContentLabel }) => {
  if (!content || !content.blocks || content.blocks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{noContentLabel}</p>
      </div>
    );
  }


  return (
    <article className="prose prose-lg prose-invert blog-content">
      {content.blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph': {
            const paragraphAlignClass = getAlignClass(block.align);
            const paragraphClassName = paragraphAlignClass
              ? `mb-4 text-gray-300 leading-relaxed ${paragraphAlignClass}`
              : 'mb-4 text-gray-300 leading-relaxed';
            return (
              block.isHtml ? (
                <p
                  key={index}
                  className={paragraphClassName}
                  dangerouslySetInnerHTML={{ __html: block.content || '' }}
                />
              ) : (
                <p key={index} className={paragraphClassName}>
                  {block.content}
                </p>
              )
            );
          }

          case 'heading': {
            const level = block.level || 1;
            const headingClasses = {
              1: 'text-4xl font-bold text-primary mb-6 mt-8',
              2: 'text-3xl font-bold text-primary mb-4 mt-6',
              3: 'text-2xl font-semibold text-primary mb-3 mt-5',
            }[level] || 'text-xl font-semibold text-primary mb-2 mt-4';
            const headingAlignClass = getAlignClass(block.align);
            const headingClassName = headingAlignClass
              ? `${headingClasses} ${headingAlignClass}`
              : headingClasses;

            const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
            if (block.isHtml) {
              return React.createElement(Tag, {
                key: index,
                className: headingClassName,
                dangerouslySetInnerHTML: { __html: block.content || '' },
              });
            }
            return React.createElement(Tag, { key: index, className: headingClassName }, block.content);
          }

          case 'code':
            return (
              <pre key={index} className="bg-dark-green text-gray-200 rounded-lg p-4 overflow-x-auto my-6 border border-white/10">
                <code className={`language-${block.language || 'javascript'} text-sm`}>
                  {block.content}
                </code>
              </pre>
            );

          case 'bulletList':
            return (
              <ul key={index} className="list-disc list-inside mb-6 space-y-2 ml-4 text-gray-300">
                {block.items?.map((item, i) => (
                  block.isHtml ? (
                    <li
                      key={i}
                      className="leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item || '' }}
                    />
                  ) : (
                    <li key={i} className="leading-relaxed">
                      {item}
                    </li>
                  )
                ))}
              </ul>
            );

          case 'orderedList':
            return (
              <ol key={index} className="list-decimal list-inside mb-6 space-y-2 ml-4 text-gray-300">
                {block.items?.map((item, i) => (
                  block.isHtml ? (
                    <li
                      key={i}
                      className="leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item || '' }}
                    />
                  ) : (
                    <li key={i} className="leading-relaxed">
                      {item}
                    </li>
                  )
                ))}
              </ol>
            );

          case 'blockquote': {
            const blockquoteAlignClass = getAlignClass(block.align);
            const blockquoteClassName = blockquoteAlignClass
              ? `border-l-4 border-primary pl-6 py-3 my-6 italic text-gray-400 bg-white/5 rounded-r-lg ${blockquoteAlignClass}`
              : 'border-l-4 border-primary pl-6 py-3 my-6 italic text-gray-400 bg-white/5 rounded-r-lg';
            return (
              <blockquote
                key={index}
                className={blockquoteClassName}
                {...(block.isHtml ? { dangerouslySetInnerHTML: { __html: block.content || '' } } : {})}
              >
                {!block.isHtml ? block.content : null}
              </blockquote>
            );
          }

          case 'image':
            return (
              <figure key={index} className="my-8">
                <img
                  src={block.src}
                  alt={block.alt || ''}
                  title={block.title}
                  className="rounded-xl w-4xl mx-auto h-auto shadow-md border border-white/10"
                  loading="lazy"
                  decoding="async"
                />
                {block.alt && (
                  <figcaption className="text-center text-sm text-gray-500 mt-3">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );

          case 'divider':
            return <hr key={index} className="my-8 border-white/10" />;

          case 'youtube':
            return (
              <div key={index} className="my-8">
                <div className="relative w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-md border border-white/10">
                  <iframe
                    src={getYoutubeEmbedUrl(block.src || '')}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
            );

          case 'html':
            return (
              <div
                key={index}
                className="blog-html mb-6"
                dangerouslySetInnerHTML={{ __html: block.content || '' }}
              />
            );

          default:
            return null;
        }
      })}
    </article>
  );
});

BlogContent.displayName = 'BlogContent';
