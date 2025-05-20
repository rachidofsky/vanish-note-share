
import { Article, Author } from './types';

// Author data
export const authors: Author[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Chief Security Officer",
    avatar: "/assets/authors/alex-morgan.jpg", // Will fallback to initials
    bio: "Alex has over 15 years of experience in cybersecurity and leads our security research team. Specializes in threat detection and prevention.",
    credentials: "CISSP, CEH, OSCP",
    verified: true,
  },
  {
    id: 2,
    name: "Jamie Chen",
    role: "Security Researcher",
    avatar: "/assets/authors/jamie-chen.jpg", // Will fallback to initials
    bio: "Jamie specializes in vulnerability research and has discovered several zero-day vulnerabilities in major software platforms.",
    credentials: "OSCP, OSCE",
    verified: true,
  },
  {
    id: 3,
    name: "Morgan Smith",
    role: "Privacy Expert",
    avatar: "/assets/authors/morgan-smith.jpg", // Will fallback to initials
    bio: "Morgan focuses on data privacy regulations and helps organizations navigate GDPR, CCPA, and other privacy frameworks.",
    credentials: "CIPP/E, CIPM",
    verified: true,
  },
  {
    id: 4,
    name: "Taylor Wilson",
    role: "Network Security Specialist",
    avatar: "/assets/authors/taylor-wilson.jpg", // Will fallback to initials
    bio: "Taylor has built secure networks for Fortune 500 companies and government agencies. Expert in zero-trust architecture.",
    credentials: "CCNP Security, NSA-IAM",
    verified: true,
  }
];

// Blog article data
export const blogArticles: Article[] = [
  {
    id: 1,
    title: "Understanding Zero-Trust Security Models",
    excerpt: "Learn the principles behind zero-trust architectures and why they're becoming essential for modern organizations.",
    content: `
      <h2>The Evolution of Network Security</h2>
      <p>Traditional network security operated on a trust-by-default principle. Once someone gained access to a network, they were largely trusted with access to resources within that perimeter. This castle-and-moat approach worked well when all applications and data were contained within a controlled data center and users accessed them from managed devices within the network perimeter.</p>
      
      <p>With the rise of cloud applications, mobile workforces, and BYOD policies, the network perimeter has dissolved. Data now resides across multiple environments, and users access applications from anywhere, on any device. In this new reality, the traditional security model is insufficient.</p>
      
      <h2>Core Principles of Zero Trust</h2>
      <p>Zero Trust is founded on the principle of "never trust, always verify." This means:</p>
      <ul>
        <li>Verify explicitly: Always authenticate and authorize based on all available data points including user identity, location, device health, service or workload, data classification, and anomalies.</li>
        <li>Use least privilege access: Limit user access with Just-In-Time and Just-Enough-Access (JIT/JEA), risk-based adaptive policies, and data protection to help secure both data and productivity.</li>
        <li>Assume breach: Minimize blast radius and segment access. Verify end-to-end encryption and use analytics to get visibility, drive threat detection, and improve defenses.</li>
      </ul>
      
      <h2>Implementing Zero Trust</h2>
      <p>Transitioning to a Zero Trust security model is a journey that varies for each organization. Here are key steps to consider:</p>
      <ol>
        <li>Identify your sensitive data and classify it appropriately</li>
        <li>Map the flows of sensitive data</li>
        <li>Architect Zero Trust microperimeters</li>
        <li>Continuously monitor and validate your security posture</li>
        <li>Embrace security automation and orchestration</li>
      </ol>
      
      <h2>Benefits Beyond Security</h2>
      <p>While enhanced security is the primary driver for Zero Trust adoption, organizations also report significant operational benefits:</p>
      <ul>
        <li>Improved user experience through consistent access policies</li>
        <li>Reduced complexity by consolidating security tools</li>
        <li>Greater agility and reduced time to market for new initiatives</li>
        <li>Better regulatory compliance posture</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Zero Trust is not just a security model; it's a strategic approach that addresses the realities of modern computing environments. By implementing Zero Trust principles, organizations can significantly enhance their security posture while enabling the flexibility needed for today's dynamic business operations.</p>
    `,
    date: "April 12, 2025",
    author: "Alex Morgan",
    authorId: 1,
    viewCount: 4583,
    tags: ["Zero Trust", "Network Security", "Cybersecurity Strategy"],
    comments: [
      {
        id: 1,
        author: "SecurityPro",
        date: "April 14, 2025",
        content: "This is a great overview of zero trust. I especially appreciate the emphasis on thinking of it as a journey rather than a destination."
      },
      {
        id: 2,
        author: "NetworkAdmin",
        date: "April 15, 2025",
        content: "We've been implementing aspects of zero trust for the past year, and the micro-segmentation has already prevented what could have been a significant lateral movement incident."
      }
    ]
  },
  {
    id: 2,
    title: "Ransomware Protection Strategies for Small Businesses",
    excerpt: "Practical and affordable approaches for small to medium businesses to defend against the rising threat of ransomware attacks.",
    content: `
      <h2>The Growing Ransomware Threat for SMBs</h2>
      <p>Ransomware attacks have increasingly targeted small and medium-sized businesses (SMBs) in recent years. Cybercriminals have recognized that while these organizations may yield smaller individual payouts, they often have weaker security defenses and may be more likely to pay ransom demands to restore operations quickly.</p>
      
      <p>According to recent statistics, over 60% of SMBs that suffer ransomware attacks go out of business within six months. This sobering reality makes it essential for small businesses to develop effective ransomware protection strategies.</p>
      
      <h2>Essential Protection Measures</h2>
      
      <h3>1. Regular, Tested Backups</h3>
      <p>The single most important defense against ransomware is maintaining comprehensive, regular backups that are kept isolated from your main network. Consider:</p>
      <ul>
        <li>The 3-2-1 backup strategy: 3 total copies, on 2 different media types, with 1 copy off-site</li>
        <li>Immutable backups that cannot be altered even by administrators</li>
        <li>Regular testing of restore procedures to ensure they work when needed</li>
      </ul>
      
      <h3>2. Staff Security Training</h3>
      <p>Your employees are both your first line of defense and potentially your greatest vulnerability. Invest in:</p>
      <ul>
        <li>Regular phishing awareness training with simulated attacks</li>
        <li>Clear procedures for reporting suspicious emails or activities</li>
        <li>A security-conscious culture that rewards vigilance</li>
      </ul>
      
      <h3>3. System Hardening</h3>
      <p>Make your systems more resistant to infection:</p>
      <ul>
        <li>Keep all software and operating systems updated with security patches</li>
        <li>Implement application whitelisting where practical</li>
        <li>Disable macros in Office documents or allow only from trusted locations</li>
        <li>Remove unnecessary software and services from endpoints</li>
      </ul>
      
      <h3>4. Access Controls</h3>
      <p>Limiting access rights can contain the impact of a ransomware infection:</p>
      <ul>
        <li>Implement the principle of least privilege for all accounts</li>
        <li>Use separate administrator accounts for administrative tasks only</li>
        <li>Consider read-only access for file shares where write access isn't necessary</li>
      </ul>
      
      <h3>5. Endpoint Protection</h3>
      <p>Modern endpoint protection platforms offer significant protection:</p>
      <ul>
        <li>Deploy next-generation antivirus with behavioral detection capabilities</li>
        <li>Consider endpoint detection and response (EDR) solutions</li>
        <li>Enable automated isolation of suspicious devices</li>
      </ul>
      
      <h2>Creating an Incident Response Plan</h2>
      <p>Despite best efforts, you should be prepared for a potential ransomware incident:</p>
      <ul>
        <li>Develop a written response plan that includes containment procedures</li>
        <li>Establish communications protocols during an incident</li>
        <li>Identify key decision makers for critical choices (e.g., whether to pay a ransom)</li>
        <li>Maintain relationships with security experts who can provide emergency assistance</li>
        <li>Consider cyber insurance that specifically covers ransomware incidents</li>
      </ul>
      
      <h2>Affordable Security Improvements</h2>
      <p>For SMBs with limited budgets, prioritize these high-impact, lower-cost measures:</p>
      <ul>
        <li>Enable multi-factor authentication everywhere possible</li>
        <li>Implement network segmentation to limit lateral movement</li>
        <li>Disable RDP access from the internet or secure it with VPN and MFA</li>
        <li>Use cloud email filtering services to block phishing and malicious attachments</li>
        <li>Take advantage of free resources like those provided by the Cybersecurity and Infrastructure Security Agency (CISA)</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>While no strategy can guarantee complete protection against ransomware, implementing these measures significantly reduces your risk and improves your ability to recover without paying a ransom. For small businesses, this represents not just good security practice but an essential investment in business continuity and survival.</p>
    `,
    date: "March 20, 2025",
    author: "Jamie Chen",
    authorId: 2,
    viewCount: 3245,
    tags: ["Ransomware", "Small Business", "Data Protection"],
    comments: [
      {
        id: 1,
        author: "SmallBizOwner",
        date: "March 23, 2025",
        content: "This is exactly what I needed. We're implementing the 3-2-1 backup strategy this month."
      }
    ]
  },
  {
    id: 3,
    title: "Data Privacy Regulations: A Global Overview",
    excerpt: "Navigate the complex landscape of international data privacy laws and understand your compliance obligations.",
    content: `
      <h2>The Evolving Landscape of Data Privacy</h2>
      <p>As digital transformation accelerates globally, countries and regions worldwide are responding with increasingly comprehensive data privacy regulations. Organizations operating across borders face a complex web of requirements that can vary significantly by jurisdiction. This overview aims to provide clarity on the major frameworks and their key requirements.</p>
      
      <h2>European Union: GDPR</h2>
      <p>The General Data Protection Regulation (GDPR) came into effect in May 2018 and remains the most comprehensive data privacy regulation globally. Key provisions include:</p>
      
      <ul>
        <li>Extraterritorial scope that applies to any organization processing EU residents' data</li>
        <li>Requirement for legal bases for all data processing activities</li>
        <li>Enhanced individual rights (access, erasure, portability, etc.)</li>
        <li>72-hour breach notification requirement</li>
        <li>Data protection impact assessments for high-risk processing</li>
        <li>Potential fines of up to 4% of global annual revenue</li>
      </ul>
      
      <h2>United States: A Patchwork Approach</h2>
      <p>The U.S. lacks a comprehensive federal privacy law, instead relying on sector-specific and state-level legislation:</p>
      
      <h3>California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA)</h3>
      <ul>
        <li>Right to know what personal information is collected and how it's used</li>
        <li>Right to delete personal information</li>
        <li>Right to opt-out of the sale of personal information</li>
        <li>CPRA enhances CCPA with additional rights and a dedicated enforcement agency</li>
      </ul>
      
      <h3>Virginia Consumer Data Protection Act (VCDPA)</h3>
      <ul>
        <li>Right to access, correct, delete, and obtain a copy of personal data</li>
        <li>Right to opt out of targeted advertising and data sales</li>
        <li>Requires data protection assessments for certain activities</li>
      </ul>
      
      <h3>Other State Laws</h3>
      <p>Colorado, Connecticut, Utah, and other states have passed or are considering similar comprehensive privacy legislation, each with unique provisions and applicability thresholds.</p>
      
      <h2>Other Significant Frameworks</h2>
      
      <h3>Brazil: LGPD (Lei Geral de Proteção de Dados)</h3>
      <p>Similar in structure to GDPR but with Brazil-specific provisions and enforcement mechanisms.</p>
      
      <h3>Canada: PIPEDA and Provincial Laws</h3>
      <p>The Personal Information Protection and Electronic Documents Act governs private-sector organizations, with additional provincial legislation in Quebec, Alberta, and British Columbia.</p>
      
      <h3>China: PIPL (Personal Information Protection Law)</h3>
      <p>China's comprehensive data protection law imposes strict requirements on data localization and cross-border transfers.</p>
      
      <h3>Japan: Act on Protection of Personal Information</h3>
      <p>Recently amended to strengthen individual rights and address modern data protection challenges.</p>
      
      <h2>Key Compliance Considerations</h2>
      
      <h3>Data Mapping and Inventory</h3>
      <p>Understanding what data you collect, where it's stored, and how it flows through your organization is fundamental to compliance with any privacy framework.</p>
      
      <h3>Privacy Notices and Policies</h3>
      <p>Transparent communication about your data practices is required by virtually all modern privacy laws.</p>
      
      <h3>Consent Management</h3>
      <p>Different jurisdictions have varying requirements for obtaining valid consent, from opt-in to opt-out models.</p>
      
      <h3>Data Subject/Consumer Rights</h3>
      <p>Implementing processes to handle individual requests within required timeframes is essential.</p>
      
      <h3>International Data Transfers</h3>
      <p>With the invalidation of Privacy Shield and continued scrutiny of Standard Contractual Clauses, organizations must carefully assess their cross-border data flows.</p>
      
      <h2>Practical Approach to Global Compliance</h2>
      
      <h3>Identify Your Regulatory Exposure</h3>
      <p>Determine which laws apply to your organization based on where you operate, where your customers reside, and what data you process.</p>
      
      <h3>Gap Analysis</h3>
      <p>Compare your current practices against applicable requirements to identify compliance gaps.</p>
      
      <h3>Harmonized Approach</h3>
      <p>Consider implementing the highest common denominator of requirements across your operations to simplify compliance.</p>
      
      <h3>Documentation and Accountability</h3>
      <p>Maintain comprehensive records of your privacy program and data processing activities.</p>
      
      <h2>Conclusion</h2>
      <p>While navigating global privacy regulations is complex, taking a systematic, risk-based approach can help organizations build a sustainable compliance program. As regulations continue to evolve, maintaining awareness of changes and regularly reassessing your privacy posture will be essential.</p>
    `,
    date: "April 5, 2025",
    author: "Morgan Smith",
    authorId: 3,
    viewCount: 2879,
    tags: ["GDPR", "CCPA", "Data Privacy", "Compliance"],
    comments: []
  },
  {
    id: 4,
    title: "Securing APIs in Modern Applications",
    excerpt: "Best practices for protecting the APIs that power today's interconnected applications from common security threats.",
    content: `
      <h2>The API Security Challenge</h2>
      <p>APIs (Application Programming Interfaces) have become the foundation of modern software development, enabling the integrations and microservices architectures that power today's digital experiences. However, this increased reliance on APIs has also created a significant attack surface that organizations must protect.</p>
      
      <p>According to industry reports, API attacks increased by over 300% in the past year alone. Unlike traditional web applications, APIs present unique security challenges:</p>
      <ul>
        <li>They're designed for machine-to-machine communication, making attacks less visible</li>
        <li>They often expose underlying data structures more directly</li>
        <li>Traditional security tools may not effectively monitor or protect API traffic</li>
        <li>Documentation and discoverability features can inadvertently help attackers</li>
      </ul>
      
      <h2>OWASP API Security Top 10</h2>
      <p>The Open Web Application Security Project (OWASP) has identified these as the most critical API security risks:</p>
      
      <h3>1. Broken Object Level Authorization</h3>
      <p>APIs often expose endpoints that handle object identifiers, creating a wide attack surface for object level access control issues. Attackers can exploit these flaws to access unauthorized data by manipulating the ID of an object sent within the request.</p>
      <p><strong>Mitigation:</strong> Implement proper authorization checks for each client request to an object. Use random, unpredictable values for IDs rather than sequential numbers.</p>
      
      <h3>2. Broken User Authentication</h3>
      <p>Authentication mechanisms are often implemented incorrectly, allowing attackers to compromise authentication tokens or exploit implementation flaws to assume other users' identities.</p>
      <p><strong>Mitigation:</strong> Implement strong authentication mechanisms, use short-lived access tokens, and implement proper validation of all authentication information.</p>
      
      <h3>3. Excessive Data Exposure</h3>
      <p>Developers tend to expose all object properties without considering their individual sensitivity, relying on clients to filter the data before displaying it to the user.</p>
      <p><strong>Mitigation:</strong> Never rely on the client to filter sensitive data. Ensure the API only returns data that's needed for its intended function.</p>
      
      <h3>4. Lack of Resources & Rate Limiting</h3>
      <p>APIs often don't impose restrictions on the size or number of resources that can be requested by the client, making them vulnerable to denial of service attacks and brute force attempts.</p>
      <p><strong>Mitigation:</strong> Implement rate limiting, throttling, and server-side validation of query parameters to protect resources.</p>
      
      <h3>5. Broken Function Level Authorization</h3>
      <p>Complex access control policies with different hierarchies, groups, and roles are often implemented incorrectly, allowing attackers to access unauthorized functionality.</p>
      <p><strong>Mitigation:</strong> Deny all access by default and implement proper authorization checks for each function.</p>
      
      <h2>Key API Security Best Practices</h2>
      
      <h3>Authentication and Authorization</h3>
      <ul>
        <li>Use OAuth 2.0 or OpenID Connect for authentication and authorization</li>
        <li>Implement multi-factor authentication for sensitive operations</li>
        <li>Use short-lived access tokens with appropriate scopes</li>
        <li>Validate JWTs properly, including signature and claims</li>
      </ul>
      
      <h3>Input Validation and Output Encoding</h3>
      <ul>
        <li>Validate all input parameters (query parameters, headers, request bodies)</li>
        <li>Use schema validation for complex objects (JSON Schema, etc.)</li>
        <li>Implement strict type checking</li>
        <li>Sanitize and validate all data before processing</li>
      </ul>
      
      <h3>Rate Limiting and Throttling</h3>
      <ul>
        <li>Implement rate limiting based on user, IP address, or API key</li>
        <li>Set appropriate quotas for different API consumers</li>
        <li>Add delays or captchas after repeated failed authentication attempts</li>
        <li>Consider implementing more sophisticated anti-automation techniques for critical endpoints</li>
      </ul>
      
      <h3>Encryption and Transport Security</h3>
      <ul>
        <li>Use TLS 1.2 or higher for all API communications</li>
        <li>Implement proper certificate validation</li>
        <li>Consider field-level encryption for highly sensitive data</li>
        <li>Disable insecure cipher suites and protocols</li>
      </ul>
      
      <h3>Logging, Monitoring and Incident Response</h3>
      <ul>
        <li>Log all API access, especially authentication events and high-risk transactions</li>
        <li>Implement real-time monitoring for suspicious activities</li>
        <li>Set up alerts for unusual patterns or volumes of requests</li>
        <li>Establish an incident response plan specific to API security incidents</li>
      </ul>
      
      <h2>API Security Testing</h2>
      <p>Regular security testing is essential for API security:</p>
      <ul>
        <li>Static Application Security Testing (SAST) to identify issues in API code</li>
        <li>Dynamic Application Security Testing (DAST) to find runtime issues</li>
        <li>API-specific security testing tools</li>
        <li>Manual penetration testing by security professionals</li>
        <li>Fuzz testing to identify unexpected input handling issues</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>As APIs continue to proliferate and become more central to business operations, securing them must be a priority. By implementing the security controls and best practices outlined in this article, organizations can significantly reduce their API attack surface while enabling the innovation and integration capabilities that APIs provide.</p>
    `,
    date: "February 18, 2025",
    author: "Taylor Wilson",
    authorId: 4,
    viewCount: 1975,
    tags: ["API Security", "Web Development", "OWASP"],
    comments: [
      {
        id: 1,
        author: "APIdev",
        date: "February 19, 2025",
        content: "Great overview! I'd also add that proper documentation of your API security requirements is essential for developer adoption."
      }
    ]
  }
];
