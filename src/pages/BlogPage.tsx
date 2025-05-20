
import { useState, useMemo } from 'react';
import { AdUnit } from '@/components/AdUnit';
import { BlogArticle } from '@/components/BlogArticle';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
  viewCount: number;
  tags: string[];
  comments?: { id: number; author: string; date: string; content: string; }[];
}

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const articles: Article[] = [
    {
      id: 1,
      title: "Why Secure Notes Matter in the Digital Age",
      excerpt: "Learn how secure notes can protect your sensitive information in a world of increasing digital vulnerabilities.",
      date: "May 15, 2025",
      author: "Security Expert",
      viewCount: 2543,
      tags: ["security", "encryption", "data protection"],
      content: `
        <p>In today's digital landscape, protecting sensitive information has never been more critical. With data breaches and cyber attacks becoming more sophisticated, using secure methods to store and share confidential information is essential.</p>
        
        <h3>The Rising Threat of Data Breaches</h3>
        <p>According to recent studies, data breaches exposed 4.1 billion records in the first half of 2024 alone. This staggering number highlights the importance of using encrypted, secure methods to store sensitive information rather than conventional methods like email or text messages.</p>
        
        <h3>Why Traditional Methods Fall Short</h3>
        <p>Emails, text messages, and notes apps on your phone aren't designed with security as the primary concern. Most don't feature end-to-end encryption or self-destructing capabilities, leaving your data vulnerable to interception or unauthorized access.</p>
        
        <h3>Benefits of One-Time Secure Notes</h3>
        <p>Self-destructing secure notes provide an additional layer of protection by ensuring your information doesn't persist indefinitely. Once read, the information disappears, significantly reducing the risk of exposure.</p>
        
        <h3>Best Practices for Secure Information Sharing</h3>
        <p>When sharing sensitive information, consider these guidelines:</p>
        <ul>
          <li>Use secure, end-to-end encrypted platforms</li>
          <li>Set expiration times for sensitive data</li>
          <li>Never share passwords or confidential information via regular email</li>
          <li>Utilize one-time viewing links when possible</li>
          <li>Consider using different channels for sending the secure note link and any access information</li>
        </ul>
        
        <p>By adopting these practices and using secure note services, you can significantly enhance your digital security posture and protect your most sensitive information.</p>
      `
    },
    {
      id: 2,
      title: "Top 5 Use Cases for Self-Destructing Messages",
      excerpt: "Discover the most common and practical applications for temporary secure notes in both personal and professional contexts.",
      date: "May 10, 2025",
      author: "Privacy Advocate",
      viewCount: 1876,
      tags: ["privacy", "security", "self-destructing messages"],
      content: `
        <p>Self-destructing secure notes aren't just for spies and security professionals. They have numerous practical applications in everyday life and business settings. Here are the top five use cases:</p>
        
        <h3>1. Sharing Account Credentials</h3>
        <p>When you need to share login information with a colleague or family member, sending passwords through regular channels poses significant security risks. A self-destructing note ensures the credentials aren't sitting in someone's email inbox indefinitely.</p>
        
        <h3>2. Transmitting Financial Information</h3>
        <p>Whether it's credit card details, banking information, or investment account numbers, financial data requires the utmost security. One-time secure notes provide a safer alternative to email or messaging apps for sharing this sensitive information.</p>
        
        <h3>3. Legal Document Sharing</h3>
        <p>Attorneys and legal professionals often need to share confidential client information. Temporary secure notes can provide a compliant method for transmitting sensitive case details or settlement information without risking unauthorized access.</p>
        
        <h3>4. Medical Information Exchange</h3>
        <p>Healthcare professionals and patients may need to exchange private health information outside of official portals. Self-destructing messages can help maintain HIPAA compliance while ensuring the information doesn't persist longer than necessary.</p>
        
        <h3>5. Business Negotiations</h3>
        <p>When discussing sensitive business deals, merger information, or proprietary details, secure temporary messages allow parties to share confidential information without creating a permanent record that could be compromised later.</p>
        
        <p>By understanding these common use cases, you can begin to identify opportunities in your own life where secure notes could enhance your privacy and security posture. Remember, the most secure information is that which no longer exists after it has served its purpose.</p>
      `
    },
    {
      id: 3,
      title: "The Technology Behind Secure Notes",
      excerpt: "Explore the encryption standards and security measures that make self-destructing notes a reliable option for sensitive communications.",
      date: "May 5, 2025",
      author: "Cryptography Specialist",
      viewCount: 1432,
      tags: ["encryption", "cryptography", "technology"],
      content: `
        <p>Modern secure note platforms utilize several layers of cryptographic technology to protect your information. Understanding these technologies can help you make informed decisions about which services to trust with your sensitive data.</p>
        
        <h3>End-to-End Encryption</h3>
        <p>The gold standard for secure communications is end-to-end encryption (E2EE). This means that only the sender and the intended recipient can decrypt and read the message. Even the service provider cannot access the unencrypted content, providing maximum privacy.</p>
        
        <h3>Zero-Knowledge Architecture</h3>
        <p>Advanced secure note services employ a zero-knowledge approach, where the encryption keys are generated and stored on your device, not on the server. This ensures that the service provider has literally "zero knowledge" of what's contained in your notes.</p>
        
        <h3>Time-Based Destruction Mechanisms</h3>
        <p>Secure notes typically offer either time-based or view-based destruction mechanisms. Time-based systems use server-side timers to remove the encrypted data after a specified period, regardless of whether it's been viewed.</p>
        
        <h3>View-Based Destruction</h3>
        <p>View-based systems track when a note has been accessed and trigger destruction immediately after the first (or a specified number of) viewing(s). This approach ensures information isn't sitting unread but available for extended periods.</p>
        
        <h3>Transport Layer Security</h3>
        <p>Beyond the encryption of the note itself, reputable services also implement TLS (Transport Layer Security) to protect data in transit between your device and the server, preventing man-in-the-middle attacks.</p>
        
        <h3>Data Sanitization</h3>
        <p>When a note self-destructs, proper data sanitization techniques ensure it's truly gone. This might include multiple-pass overwriting of the data storage location rather than simple deletion, making recovery virtually impossible.</p>
        
        <p>By leveraging these advanced security technologies, modern secure note platforms provide a level of protection that far exceeds traditional communication methods. When evaluating a service, look for transparency about which of these technologies they implement to ensure your information receives the protection it deserves.</p>
      `
    },
    {
      id: 4,
      title: "Beginner's Guide to Secure Online Communications",
      excerpt: "Learn the essential steps to protect your digital conversations and secure your sensitive information online.",
      date: "May 1, 2025",
      author: "Digital Privacy Expert",
      viewCount: 3210,
      tags: ["privacy", "beginners", "communication"],
      content: `
        <p>In an age where digital communication is the norm, protecting your online conversations has never been more important. This beginner-friendly guide will walk you through the essential steps to secure your digital communications.</p>
        
        <h3>Understanding the Risks</h3>
        <p>Before diving into solutions, it's important to understand what you're protecting against. Digital communications face several threats:</p>
        <ul>
          <li>Interception during transmission</li>
          <li>Unauthorized access to stored messages</li>
          <li>Data collection by service providers</li>
          <li>Account compromises through weak passwords</li>
          <li>Malware that can monitor communications</li>
        </ul>
        
        <h3>Choose End-to-End Encrypted Messaging Apps</h3>
        <p>The foundation of secure communication is end-to-end encryption. This ensures that only you and your recipient can read the messages – not even the service provider can access the content. Popular options include:</p>
        <ul>
          <li>Signal: Widely regarded as the gold standard for secure messaging</li>
          <li>ProtonMail: For encrypted email communications</li>
          <li>OneTimeNote: For sending self-destructing messages with sensitive information</li>
        </ul>
        
        <h3>Use Strong, Unique Passwords</h3>
        <p>Even the most secure messaging app won't protect you if your account is compromised. Create strong, unique passwords for each service, and consider using a password manager to keep track of them all.</p>
        
        <h3>Enable Two-Factor Authentication</h3>
        <p>Adding a second layer of verification significantly increases your account security. Whenever possible, enable two-factor authentication on your communication platforms.</p>
        
        <h3>Be Mindful of Metadata</h3>
        <p>Even when message content is encrypted, metadata (information about who is communicating with whom, when, and how often) may still be visible. Be aware of this limitation and consider services that minimize metadata collection.</p>
        
        <h3>Regular Security Updates</h3>
        <p>Keep all your devices and apps updated with the latest security patches. Outdated software often contains vulnerabilities that can be exploited.</p>
        
        <p>By following these basic principles, even beginners can significantly enhance their communication security. Remember, perfect security doesn't exist, but making these simple changes will place you far ahead of most internet users in protecting your digital conversations.</p>
      `
    },
    {
      id: 5,
      title: "How to Audit Your Digital Security Practices",
      excerpt: "A step-by-step guide to evaluating and improving your current security measures for better data protection.",
      date: "April 28, 2025",
      author: "Cybersecurity Analyst",
      viewCount: 1843,
      tags: ["security audit", "best practices", "privacy"],
      content: `
        <p>Conducting a personal digital security audit is essential for identifying vulnerabilities and strengthening your overall data protection strategy. This practical guide will help you systematically evaluate your current practices.</p>
        
        <h3>Step 1: Inventory Your Digital Footprint</h3>
        <p>Start by creating a comprehensive list of:</p>
        <ul>
          <li>All online accounts (email, social media, banking, shopping, etc.)</li>
          <li>Devices that access sensitive information</li>
          <li>Apps and software that handle your data</li>
          <li>Services where your payment information is stored</li>
        </ul>
        
        <h3>Step 2: Evaluate Password Practices</h3>
        <p>Review your password hygiene:</p>
        <ul>
          <li>Are you using unique passwords for each account?</li>
          <li>Do your passwords meet current complexity standards?</li>
          <li>Have you implemented a password manager?</li>
          <li>Which accounts have two-factor authentication enabled?</li>
        </ul>
        
        <h3>Step 3: Review Data Sharing Habits</h3>
        <p>Examine how you share sensitive information:</p>
        <ul>
          <li>Do you regularly use secure channels for private communications?</li>
          <li>Have you been sending sensitive information via email or text?</li>
          <li>Are you using self-destructing messages for confidential data?</li>
          <li>Do you verify the recipient before sharing sensitive information?</li>
        </ul>
        
        <h3>Step 4: Check Privacy Settings</h3>
        <p>For each online service you use:</p>
        <ul>
          <li>Review and optimize privacy settings</li>
          <li>Limit data collection where possible</li>
          <li>Control third-party access to your accounts</li>
          <li>Disable features that unnecessarily track your activity</li>
        </ul>
        
        <h3>Step 5: Implement Improvements</h3>
        <p>Based on your findings, create an action plan:</p>
        <ul>
          <li>Update weak or duplicate passwords</li>
          <li>Enable two-factor authentication on critical accounts</li>
          <li>Delete unused accounts that contain personal information</li>
          <li>Adopt more secure communication methods</li>
          <li>Set a reminder to perform this audit quarterly</li>
        </ul>
        
        <p>Regular security audits help you stay ahead of emerging threats and ensure your digital life remains private and secure. By making this practice routine, you'll continuously strengthen your defenses and reduce vulnerabilities over time.</p>
      `
    },
    {
      id: 6,
      title: "Protecting Your Business with Secure Communication Channels",
      excerpt: "Discover how implementing secure note systems can safeguard your business's confidential information and improve client trust.",
      date: "April 25, 2025",
      author: "Business Security Consultant",
      viewCount: 2198,
      tags: ["business security", "client confidentiality", "professional"],
      content: `
        <p>For businesses of all sizes, maintaining secure communication channels isn't just about preventing data breaches—it's about building client trust and protecting your company's reputation. This guide explores how implementing secure communication practices can become a competitive advantage.</p>
        
        <h3>The Business Case for Secure Communications</h3>
        <p>Data breaches and security incidents can cost businesses dearly:</p>
        <ul>
          <li>According to IBM's Cost of a Data Breach Report, the average data breach costs $4.45 million</li>
          <li>60% of small businesses close within six months of a cyber attack</li>
          <li>Customer trust, once broken, is exceptionally difficult to rebuild</li>
          <li>Regulatory fines for data protection failures continue to increase</li>
        </ul>
        
        <h3>Essential Secure Communication Channels for Businesses</h3>
        <p>Every business should implement these secure communication methods:</p>
        <ul>
          <li><strong>Encrypted Email Solutions:</strong> Standard email is inherently insecure for sensitive communications</li>
          <li><strong>Secure Client Portals:</strong> For sharing documents and communications with clients</li>
          <li><strong>Self-Destructing Notes:</strong> For transmitting highly sensitive information like credentials or financial details</li>
          <li><strong>Encrypted Messaging Platforms:</strong> For internal team communications about sensitive matters</li>
        </ul>
        
        <h3>Creating a Security-First Culture</h3>
        <p>Technology alone isn't enough—your team needs to embrace secure practices:</p>
        <ul>
          <li>Implement regular security training for all employees</li>
          <li>Develop clear policies about what information can be shared through which channels</li>
          <li>Create easy-to-follow procedures for securely sharing different types of information</li>
          <li>Lead by example—executives should demonstrate proper security protocols</li>
        </ul>
        
        <h3>Marketing Your Security as a Benefit</h3>
        <p>In today's privacy-conscious environment, strong security practices can be a selling point:</p>
        <ul>
          <li>Highlight your secure communication channels in client onboarding materials</li>
          <li>Explain security measures on your website and marketing materials</li>
          <li>Consider security certifications that demonstrate your commitment</li>
          <li>Share your security philosophy with prospects to differentiate from competitors</li>
        </ul>
        
        <p>By implementing comprehensive secure communication practices, businesses can protect themselves from costly breaches while simultaneously building stronger relationships with security-conscious clients. In an increasingly digital business environment, security isn't just risk management—it's a foundation for sustainable growth and client trust.</p>
      `
    }
  ];
  
  // Get all unique tags from articles
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach(article => {
      article.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [articles]);
  
  // Filter articles based on search query and selected tag
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTag = selectedTag === null || article.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [articles, searchQuery, selectedTag]);
  
  // Get top viewed articles
  const topViewedArticles = useMemo(() => {
    return [...articles].sort((a, b) => b.viewCount - a.viewCount).slice(0, 3);
  }, [articles]);
  
  // Get related articles for each article
  const getRelatedArticles = (currentArticleId: number) => {
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
    
    // Sort by number of matching tags and return top 2
    const sortedArticleIds = [...relatedByTags.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0])
      .slice(0, 2);
    
    return articles
      .filter(article => sortedArticleIds.includes(article.id))
      .map(article => ({
        id: article.id,
        title: article.title,
        excerpt: article.excerpt
      }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left sidebar - Top viewed & filters */}
        <aside className="lg:w-64 space-y-6">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topViewedArticles.map(article => (
                  <div key={article.id} className="group">
                    <h3 className="font-medium group-hover:text-primary transition-colors cursor-pointer">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{article.viewCount} views</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <AdUnit adSlot="1234567890" adFormat="vertical" className="mb-6" />
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 max-w-3xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Security Blog</h1>
          
          {/* Search and filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className="flex items-center gap-1"
              >
                <Filter className="h-3 w-3" />
                All
              </Button>
              
              {allTags.map(tag => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Articles */}
          <div className="space-y-12">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <BlogArticle 
                  key={article.id}
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
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No articles found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
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
