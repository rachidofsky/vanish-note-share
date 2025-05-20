
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, MessageSquare, Shield, Calendar, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

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
      
      toast({
        title: "Comment added",
        description: "Your comment has been posted successfully.",
      });
    }
  };

  // Get author initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="blog-card overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl blog-title">{title}</CardTitle>
            <CardDescription className="mt-2 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1">
                <Avatar className="h-6 w-6 mr-1">
                  <AvatarFallback className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-xs">
                    {getInitials(author)}
                  </AvatarFallback>
                </Avatar>
                {author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {date}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4 text-muted-foreground" />
                {viewCount} views
              </span>
            </CardDescription>
          </div>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-accent/50 hover:bg-accent">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {!expanded ? (
          <p className="blog-excerpt">{excerpt}</p>
        ) : (
          <>
            <div 
              className="prose dark:prose-invert max-w-none mb-8 blog-content"
              dangerouslySetInnerHTML={{ __html: content }} 
            />
            
            {relatedArticles.length > 0 && (
              <div className="bg-accent/30 p-4 rounded-md mb-6">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="blue-green-text">Related Security Articles</span>
                </h4>
                <ul className="space-y-3">
                  {relatedArticles.map((article) => (
                    <li key={article.id} className="border-l-2 border-primary/20 pl-3 hover:border-primary transition-colors">
                      <a href={`#article-${article.id}`} className="text-primary hover:underline font-medium">
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
            <h3 className="text-lg font-medium mb-4 blue-green-text">Comments ({localComments.length})</h3>
            
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
                className="blue-green-gradient"
              >
                Post Comment
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 border-primary/30 hover:bg-primary/10"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4 text-primary" />
              <span>Read Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 text-primary" />
              <span>Read More</span>
            </>
          )}
        </Button>
        
        {expanded && (
          <Button
            variant="outline"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 border-primary/30 hover:bg-primary/10"
          >
            <MessageSquare className="w-4 h-4 text-primary" />
            <span>{showComments ? 'Hide' : 'Show'} Comments ({localComments.length})</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
