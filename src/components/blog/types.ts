
export interface ArticlePreview {
  id: number;
  title: string;
  viewCount: number;
}

export interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
}

export interface RelatedArticle {
  id: number;
  title: string;
  excerpt: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  authorId: number;
  viewCount: number;
  tags: string[];
  comments?: Comment[];
}

export interface Author {
  id: number;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  credentials?: string;
  verified?: boolean;
}
