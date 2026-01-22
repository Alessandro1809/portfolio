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

const escapeHtml = (value: string): string =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

const escapeAttr = (value: string): string =>
    escapeHtml(value).replace(/"/g, "&quot;");

const sanitizeUrl = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return "#";
    if (/^(https?:|mailto:|tel:|#|\/)/i.test(trimmed)) {
        return escapeAttr(trimmed);
    }
    return "#";
};

const applyMarks = (html: string, marks?: any[]): string => {
    if (!marks || marks.length === 0) return html;

    return marks.reduce((acc, mark) => {
        switch (mark.type) {
            case "bold":
                return `<strong>${acc}</strong>`;
            case "italic":
                return `<em>${acc}</em>`;
            case "underline":
                return `<u>${acc}</u>`;
            case "strike":
                return `<s>${acc}</s>`;
            case "code":
                return `<code>${acc}</code>`;
            case "link": {
                const href = sanitizeUrl(mark.attrs?.href || "");
                const target = mark.attrs?.target
                    ? ` target="${escapeAttr(mark.attrs.target)}"`
                    : "";
                const rel = target ? ' rel="noopener noreferrer"' : "";
                return `<a href="${href}"${target}${rel}>${acc}</a>`;
            }
            default:
                return acc;
        }
    }, html);
};

const serializeInlineNodes = (nodes?: TiptapNode[]): string => {
    if (!nodes) return "";

    return nodes
        .map((node) => {
            if (node.type === "text") {
                const base = escapeHtml(node.text || "");
                return applyMarks(base, node.marks);
            }
            if (node.type === "hardBreak") {
                return "<br />";
            }
            if (node.content) {
                return serializeInlineNodes(node.content);
            }
            return "";
        })
        .join("");
};

const getAlign = (value?: string): "left" | "center" | "right" | "justify" | undefined => {
    if (value === "left" || value === "center" || value === "right" || value === "justify") {
        return value;
    }
    return undefined;
};

export const transformTiptapToContentBlocks = (data: any): ContentBlocks => {
    if (!data) return { blocks: [] };

    if (typeof data === "string") {
        return { blocks: [{ type: "html", content: data }] };
    }

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
                    const html = serializeInlineNodes(node.content);
                    if (html.trim()) {
                        blocks.push({
                            type: 'paragraph',
                            content: html,
                            isHtml: true,
                            align: getAlign(node.attrs?.textAlign)
                        });
                    }
                }
                break;

            case 'heading':
                if (node.content) {
                    const text = serializeInlineNodes(node.content);
                    blocks.push({
                        type: 'heading',
                        content: text,
                        isHtml: true,
                        level: node.attrs?.level || 1,
                        align: getAlign(node.attrs?.textAlign)
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
                        if (!listItem.content) return "";
                        const itemHtml = listItem.content
                            .map((child) => {
                                if (child.type === "paragraph") {
                                    return serializeInlineNodes(child.content);
                                }
                                return serializeInlineNodes(child.content);
                            })
                            .filter((value) => value)
                            .join("<br />");
                        return itemHtml;
                    }).filter(t => t);

                    if (items.length > 0) {
                        blocks.push({
                            type: 'bulletList',
                            items,
                            isHtml: true
                        });
                    }
                }
                break;

            case 'orderedList':
                if (node.content) {
                    const items = node.content.map(listItem => {
                        if (!listItem.content) return "";
                        const itemHtml = listItem.content
                            .map((child) => {
                                if (child.type === "paragraph") {
                                    return serializeInlineNodes(child.content);
                                }
                                return serializeInlineNodes(child.content);
                            })
                            .filter((value) => value)
                            .join("<br />");
                        return itemHtml;
                    }).filter(t => t);

                    if (items.length > 0) {
                        blocks.push({
                            type: 'orderedList',
                            items,
                            isHtml: true
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
                            return serializeInlineNodes(n.content);
                        }
                        return n.text ? escapeHtml(n.text) : '';
                    }).join('<br />');

                    if (text.trim()) {
                        blocks.push({
                            type: 'blockquote',
                            content: text,
                            isHtml: true,
                            align: getAlign(node.attrs?.textAlign)
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
