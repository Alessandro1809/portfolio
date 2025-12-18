import type { ContentBlock, ContentBlocks } from "@/components/react/blog/types";

interface TiptapNode {
    type: string;
    content?: TiptapNode[];
    text?: string;
    attrs?: Record<string, any>;
    marks?: any[];
}

interface TiptapDoc {
    type: 'doc';
    content: TiptapNode[];
}

export const transformTiptapToContentBlocks = (data: any): ContentBlocks => {
    if (!data) return { blocks: [] };

    // Si ya tiene la estructura esperada, devolverlo tal cual
    if (data.blocks && Array.isArray(data.blocks)) {
        return data as ContentBlocks;
    }

    // Si no tiene content (estructura Tiptap), devolver vacío
    if (!data.content || !Array.isArray(data.content)) {
        return { blocks: [] };
    }

    const tiptapDoc = data as TiptapDoc;
    const blocks: ContentBlock[] = [];

    tiptapDoc.content.forEach((node) => {
        switch (node.type) {
            case 'paragraph':
                if (node.content) {
                    const text = node.content
                        .map(n => n.text || '')
                        .join('');
                    if (text.trim()) {
                        blocks.push({
                            type: 'paragraph',
                            content: text
                        });
                    }
                }
                break;

            case 'heading':
                if (node.content) {
                    const text = node.content
                        .map(n => n.text || '')
                        .join('');
                    blocks.push({
                        type: 'heading',
                        content: text,
                        level: node.attrs?.level || 1
                    });
                }
                break;

            case 'image':
                if (node.attrs?.src) {
                    blocks.push({
                        type: 'image',
                        src: node.attrs.src,
                        alt: node.attrs.alt || '',
                        title: node.attrs.title
                    });
                }
                break;

            case 'bulletList':
                if (node.content) {
                    const items = node.content.map(listItem => {
                        // Asumimos que listItem tiene un paragraph adentro
                        if (listItem.content && listItem.content[0] && listItem.content[0].content) {
                            return listItem.content[0].content.map(n => n.text || '').join('');
                        }
                        return '';
                    }).filter(t => t);

                    if (items.length > 0) {
                        blocks.push({
                            type: 'bulletList',
                            items
                        });
                    }
                }
                break;

            case 'orderedList':
                if (node.content) {
                    const items = node.content.map(listItem => {
                        if (listItem.content && listItem.content[0] && listItem.content[0].content) {
                            return listItem.content[0].content.map(n => n.text || '').join('');
                        }
                        return '';
                    }).filter(t => t);

                    if (items.length > 0) {
                        blocks.push({
                            type: 'orderedList',
                            items
                        });
                    }
                }
                break;

            case 'codeBlock':
                if (node.content) {
                    const code = node.content
                        .map(n => n.text || '')
                        .join('');
                    blocks.push({
                        type: 'code',
                        content: code,
                        language: node.attrs?.language
                    });
                }
                break;

            case 'blockquote':
                if (node.content) {
                    // Blockquotes en tiptap suelen tener paragraphs adentro
                    const text = node.content.map(n => {
                        if (n.type === 'paragraph' && n.content) {
                            return n.content.map(inner => inner.text || '').join('');
                        }
                        return n.text || '';
                    }).join('\n');

                    if (text.trim()) {
                        blocks.push({
                            type: 'blockquote',
                            content: text
                        });
                    }
                }
                break;

            case 'horizontalRule':
                blocks.push({ type: 'divider' });
                break;

            case 'youtube':
                if (node.attrs?.src) {
                    blocks.push({
                        type: 'youtube',
                        src: node.attrs.src
                    });
                }
                break;
        }
    });

    return { blocks };
};
