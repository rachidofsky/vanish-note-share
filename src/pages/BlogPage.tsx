
import { useState } from 'react';
import { AdUnit } from '@/components/AdUnit';
import { TopViewedArticles } from '@/components/blog/TopViewedArticles';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { ArticleList } from '@/components/blog/ArticleList';
import { blogArticles } from '@/components/blog/blogData';
import { AuthorInfo } from '@/components/blog/AuthorInfo';
import { 
  filterArticles, 
  getTopViewedArticles, 
  getRelatedArticles,
  getAuthors
} from '@/components/blog/blogUtils';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter articles based on search query only (no tags)
  const filteredArticles = filterArticles(blogArticles, searchQuery, null);
  
  // Get top viewed articles
  const topViewedArticles = getTopViewedArticles(blogArticles);
  
  // Get unique authors
  const authors = getAuthors(blogArticles);
  
  // Function to get related articles for a specific article
  const getRelatedArticlesForId = (articleId: number) => {
    return getRelatedArticles(blogArticles, articleId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left sidebar - Top viewed & Authors */}
        <aside className="lg:w-64 space-y-6">
          <div className="sticky top-24">
            <TopViewedArticles topArticles={topViewedArticles} />
            
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold blue-green-text">Our Security Experts</h3>
              <div className="space-y-4">
                {authors.map((author) => (
                  <AuthorInfo key={author.id} author={author} />
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <AdUnit adSlot="1234567890" adFormat="vertical" className="mb-6" />
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 max-w-3xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            <span className="blue-green-text">Security Blog</span>
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Expert insights and guidance to protect your digital assets
          </p>
          
          {/* Search only */}
          <BlogSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          {/* Articles */}
          <ArticleList 
            articles={filteredArticles}
            getRelatedArticles={getRelatedArticlesForId}
          />
        </main>
        
        {/* Right sidebar ad */}
        <aside className="hidden lg:block lg:w-64">
          <div className="sticky top-24">
            <AdUnit adSlot="0987654321" adFormat="vertical" className="mb-6" />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPage;
