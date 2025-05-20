
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface BlogArticleProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
}

export const BlogArticle = ({ title, excerpt, date, author, content }: BlogArticleProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>
          Published on {date} by {author}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!expanded ? (
          <p className="text-muted-foreground">{excerpt}</p>
        ) : (
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        )}
      </CardContent>
      
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
};
