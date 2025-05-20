
import { useState } from 'react';
import { AdUnit } from '@/components/AdUnit';
import { TopViewedArticles } from '@/components/blog/TopViewedArticles';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { ArticleList } from '@/components/blog/ArticleList';
import { blogArticles } from '@/components/blog/blogData';
import { 
  filterArticles, 
  getTopViewedArticles, 
  getRelatedArticles 
} from '@/components/blog/blogUtils';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter articles based on search query only (no tags)
  const filteredArticles = filterArticles(blogArticles, searchQuery, null);
  
  // Get top viewed articles
  const topViewedArticles = getTopViewedArticles(blogArticles);
  
  // Function to get related articles for a specific article
  const getRelatedArticlesForId = (articleId: number) => {
    return getRelatedArticles(blogArticles, articleId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left sidebar - Top viewed & filters */}
        <aside className="lg:w-64 space-y-6">
          <div className="sticky top-24">
            <TopViewedArticles topArticles={topViewedArticles} />
            
            <div className="mt-6">
              <AdUnit adSlot="1234567890" adFormat="vertical" className="mb-6" />
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 max-w-3xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Security Blog</h1>
          
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
