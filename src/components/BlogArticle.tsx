
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
}

interface RelatedArticle {
  id: number;
  title: string;
  excerpt: string;
}

interface BlogArticleProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
  viewCount: number;
  tags: string[];
  comments?: Comment[];
  relatedArticles?: RelatedArticle[];
}

export const BlogArticle = ({ 
  id,
  title, 
  excerpt, 
  date, 
  author, 
  content,
  viewCount,
  tags,
  comments = [],
  relatedArticles = []
}: BlogArticleProps) => {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentName, setCommentName] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(comments);

  const handleAddComment = () => {
    if (newComment.trim() && commentName.trim()) {
      const comment: Comment = {
        id: localComments.length + 1,
        author: commentName.trim(),
        date: new Date().toLocaleDateString(),
        content: newComment.trim()
      };
      
      setLocalComments([...localComments, comment]);
      setNewComment('');
      setCommentName('');
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>
              Published on {date} by {author} • {viewCount} views
            </CardDescription>
          </div>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {!expanded ? (
          <p className="text-muted-foreground">{excerpt}</p>
        ) : (
          <>
            <div 
              className="prose dark:prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: content }} 
            />
            
            {relatedArticles.length > 0 && (
              <div className="bg-accent/30 p-4 rounded-md mb-6">
                <h4 className="font-medium mb-2">You might also like:</h4>
                <ul className="space-y-2">
                  {relatedArticles.map((article) => (
                    <li key={article.id}>
                      <a href={`/blog/${article.id}`} className="text-primary hover:underline">
                        {article.title}
                      </a>
                      <p className="text-muted-foreground text-sm">{article.excerpt.substring(0, 100)}...</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        
        {expanded && showComments && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Comments ({localComments.length})</h3>
            
            {localComments.length > 0 ? (
              <div className="space-y-4 mb-6">
                {localComments.map((comment) => (
                  <div key={comment.id} className="bg-muted/50 p-4 rounded-md">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-muted-foreground text-sm">{comment.date}</span>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mb-4">No comments yet. Be the first to share your thoughts!</p>
            )}
            
            <div className="space-y-4">
              <Input
                placeholder="Your name"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="max-w-md"
              />
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <Button 
                onClick={handleAddComment}
                disabled={!newComment.trim() || !commentName.trim()}
              >
                Post Comment
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span>Read Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>Read More</span>
            </>
          )}
        </Button>
        
        {expanded && (
          <Button
            variant="ghost"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{showComments ? 'Hide' : 'Show'} Comments ({localComments.length})</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
