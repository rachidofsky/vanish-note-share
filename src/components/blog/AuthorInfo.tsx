
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Author } from '@/components/blog/types';
import { Shield, ShieldCheck } from 'lucide-react';

interface AuthorInfoProps {
  author: Author;
}

export const AuthorInfo = ({ author }: AuthorInfoProps) => {
  const initials = author.name
    .split(' ')
    .map(name => name[0])
    .join('');
    
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-3 group cursor-pointer">
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="author-name group-hover:text-primary transition-colors">
            {author.name}
          </span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <h4 className="text-lg font-semibold">{author.name}</h4>
                {author.verified && (
                  <div className="ml-2 text-primary" title="Verified Security Expert">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{author.role}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{author.bio}</p>
          {author.credentials && (
            <div className="flex items-center gap-1 mt-2">
              <Shield className="h-4 w-4 text-secondary" />
              <span className="text-xs text-muted-foreground">{author.credentials}</span>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
