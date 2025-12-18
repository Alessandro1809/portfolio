import React from 'react';
import type { ContentBlocks } from '@/components/react/blog/types';

interface BlogContentProps {
  content: ContentBlocks;
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

export const BlogContent: React.FC<BlogContentProps> = React.memo(({ content }) => {
  if (!content || !content.blocks || content.blocks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay contenido disponible</p>
      </div>
    );
  }


  return (
    <article className="prose prose-lg prose-invert">
      {content.blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={index} className="mb-4 text-gray-300 leading-relaxed">
                {block.content}
              </p>
            );

          case 'heading':
            const level = block.level || 1;
            const headingClasses = {
              1: 'text-4xl font-bold text-primary mb-6 mt-8',
              2: 'text-3xl font-bold text-primary mb-4 mt-6',
              3: 'text-2xl font-semibold text-primary mb-3 mt-5',
            }[level] || 'text-xl font-semibold text-primary mb-2 mt-4';

            const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
            return React.createElement(
              Tag,
              { key: index, className: headingClasses },
              block.content
            );

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
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            );

          case 'orderedList':
            return (
              <ol key={index} className="list-decimal list-inside mb-6 space-y-2 ml-4 text-gray-300">
                {block.items?.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ol>
            );

          case 'blockquote':
            return (
              <blockquote
                key={index}
                className="border-l-4 border-primary pl-6 py-3 my-6 italic text-gray-400 bg-white/5 rounded-r-lg"
              >
                {block.content}
              </blockquote>
            );

          case 'image':
            return (
              <figure key={index} className="my-8">
                <img
                  src={block.src}
                  alt={block.alt || ''}
                  title={block.title}
                  className="rounded-xl w-4xl mx-auto h-auto shadow-md border border-white/10"
                  loading="lazy"
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
                    allowFullScreen
                  />
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </article>
  );
});

BlogContent.displayName = 'BlogContent';
