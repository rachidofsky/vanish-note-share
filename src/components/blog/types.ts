
export interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
  viewCount: number;
  tags: string[];
  comments?: Comment[];
}

export interface ArticlePreview {
  id: number;
  title: string;
  excerpt: string;
  viewCount: number;
}

export interface RelatedArticle {
  id: number;
  title: string;
  excerpt: string;
}
