
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArticlePreview } from '@/components/blog/types';

interface TopViewedArticlesProps {
  topArticles: ArticlePreview[];
}

export const TopViewedArticles = ({ topArticles }: TopViewedArticlesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Top Articles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topArticles.map(article => (
          <div key={article.id} className="group">
            <h3 
              className="font-medium group-hover:text-primary transition-colors cursor-pointer"
              onClick={() => {
                const element = document.getElementById(`article-${article.id}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {article.title}
            </h3>
            <p className="text-xs text-muted-foreground">{article.viewCount} views</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
