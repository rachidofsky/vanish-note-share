
import { AdUnit } from '@/components/AdUnit';
import { BlogArticle } from '@/components/BlogArticle';

const BlogPage = () => {
  const articles = [
    {
      id: 1,
      title: "Why Secure Notes Matter in the Digital Age",
      excerpt: "Learn how secure notes can protect your sensitive information in a world of increasing digital vulnerabilities.",
      date: "May 15, 2025",
      author: "Security Expert",
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
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Left sidebar ad */}
      <aside className="hidden lg:block lg:w-64">
        <div className="sticky top-24">
          <AdUnit adSlot="1234567890" adFormat="vertical" className="mb-6" />
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Security Blog</h1>
        <div className="space-y-12">
          {articles.map(article => (
            <BlogArticle 
              key={article.id} 
              title={article.title}
              excerpt={article.excerpt}
              date={article.date}
              author={article.author}
              content={article.content}
            />
          ))}
        </div>
      </main>
      
      {/* Right sidebar ad */}
      <aside className="hidden lg:block lg:w-64">
        <div className="sticky top-24">
          <AdUnit adSlot="0987654321" adFormat="vertical" className="mb-6" />
        </div>
      </aside>
    </div>
  );
};

export default BlogPage;
