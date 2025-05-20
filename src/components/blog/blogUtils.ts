
import { Article, ArticlePreview, Author } from './types';
import { authors } from './blogData';

/**
 * Filter articles based on search query and selected tag
 */
export const filterArticles = (
  articles: Article[], 
  searchQuery: string, 
  selectedTag: string | null
): Article[] => {
  return articles.filter(article => {
    // Filter by search query (title and excerpt)
    const matchesSearch = searchQuery 
      ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
      
    // Filter by tag if selected
    const matchesTag = selectedTag
      ? article.tags.includes(selectedTag)
      : true;
      
    return matchesSearch && matchesTag;
  });
};

/**
 * Get top viewed articles
 */
export const getTopViewedArticles = (articles: Article[]): ArticlePreview[] => {
  return articles
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 3)
    .map(article => ({
      id: article.id,
      title: article.title,
      viewCount: article.viewCount
    }));
};

/**
 * Get related articles for a specific article
 * Currently returns articles with matching tags
 */
export const getRelatedArticles = (articles: Article[], articleId: number) => {
  const currentArticle = articles.find(article => article.id === articleId);
  
  if (!currentArticle) return [];
  
  // Find articles with matching tags, excluding the current article
  return articles
    .filter(article => 
      article.id !== articleId && 
      article.tags.some(tag => currentArticle.tags.includes(tag))
    )
    .slice(0, 3)
    .map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt
    }));
};

/**
 * Get unique authors from articles
 */
export const getAuthors = (articles: Article[]): Author[] => {
  // Get unique author IDs from articles
  const authorIds = [...new Set(articles.map(article => article.authorId))];
  
  // Return author objects for each unique ID
  return authors.filter(author => authorIds.includes(author.id));
};
