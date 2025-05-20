import { Article, RelatedArticle } from './types';

// Extract all unique tags from articles
export const extractAllTags = (articles: Article[]): string[] => {
  const tags = new Set<string>();
  articles.forEach(article => {
    article.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
};

// Filter articles based on search query only
export const filterArticles = (
  articles: Article[],
  searchQuery: string,
  selectedTag: string | null
): Article[] => {
  if (searchQuery === '') {
    return articles;
  }
  
  return articles.filter(article => {
    return article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  });
};

// Get top viewed articles
export const getTopViewedArticles = (articles: Article[], count = 3): Article[] => {
  return [...articles].sort((a, b) => b.viewCount - a.viewCount).slice(0, count);
};

// Get related articles for a specific article
export const getRelatedArticles = (
  articles: Article[],
  currentArticleId: number,
  maxRelated = 2
): RelatedArticle[] => {
  const relatedByTags = new Map<number, number>();
  
  // Get current article's tags
  const currentArticle = articles.find(a => a.id === currentArticleId);
  if (!currentArticle) return [];
  
  // Count tag matches for each other article
  articles.forEach(article => {
    if (article.id !== currentArticleId) {
      const matchCount = article.tags.filter(tag => 
        currentArticle.tags.includes(tag)
      ).length;
      
      if (matchCount > 0) {
        relatedByTags.set(article.id, matchCount);
      }
    }
  });
  
  // Sort by number of matching tags and return top n
  const sortedArticleIds = [...relatedByTags.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0])
    .slice(0, maxRelated);
  
  return articles
    .filter(article => sortedArticleIds.includes(article.id))
    .map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt
    }));
};
