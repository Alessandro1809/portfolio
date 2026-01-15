export interface ContentBlock {
    type: 'paragraph' | 'heading' | 'code' | 'bulletList' | 'orderedList' | 'blockquote' | 'image' | 'divider' | 'youtube' | 'html';
    content?: string;
    isHtml?: boolean;
    level?: number;
    language?: string;
    items?: string[];
    src?: string;
    alt?: string;
    title?: string;
    width?: number;
    height?: number;
    align?: 'left' | 'center' | 'right' | 'justify';
}

export interface ContentBlocks {
    blocks: ContentBlock[];
}

export interface Author {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
}

export interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: ContentBlocks;
    categorie: string;
    tags: string[];
    featuredImage?: string;
    status: 'DRAFT' | 'PUBLISHED';
    authorId: string;
    author?: Author;
    createdAt: string;
    updatedAt: string;
    views: number;
}

export interface PostsResponse {
    posts: Post[];
    total: number;
    limit: number;
    offset: number;
}
