
import React from 'react';
import { BlogArticle } from '@/components/BlogArticle';
import { Article } from '@/components/blog/types';

interface ArticleListProps {
  articles: Article[];
  getRelatedArticles: (articleId: number) => { id: number; title: string; excerpt: string; }[];
}

export const ArticleList = ({ articles, getRelatedArticles }: ArticleListProps) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No articles found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-12">
      {articles.map(article => (
        <div id={`article-${article.id}`} key={article.id}>
          <BlogArticle 
            id={article.id}
            title={article.title}
            excerpt={article.excerpt}
            date={article.date}
            author={article.author}
            content={article.content}
            viewCount={article.viewCount}
            tags={article.tags}
            comments={article.comments || []}
            relatedArticles={getRelatedArticles(article.id)}
          />
        </div>
      ))}
    </div>
  );
};
