import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExpertTip, TIP_CATEGORIES } from '@/data/expert-tips';
import { cn } from '@/lib/utils';
import { Quote, Twitter, Linkedin, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExpertTipCardProps {
  tip: ExpertTip;
  onRefresh?: () => void;
  showCategory?: boolean;
  compact?: boolean;
  className?: string;
}

const ExpertTipCard: React.FC<ExpertTipCardProps> = ({
  tip,
  onRefresh,
  showCategory = true,
  compact = false,
  className,
}) => {
  const category = TIP_CATEGORIES.find(c => c.id === tip.category);

  return (
    <Card className={cn(
      'relative overflow-hidden bg-gradient-to-br from-card to-muted/30',
      'border-border/50 hover:border-primary/30 transition-all duration-300',
      className
    )}>
      <CardContent className={cn('relative', compact ? 'p-4' : 'p-6')}>
        {/* Quote Icon */}
        <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
        
        {/* Category Badge */}
        {showCategory && category && (
          <Badge 
            variant="secondary" 
            className="mb-3 text-xs"
          >
            {category.icon} {category.label}
          </Badge>
        )}

        {/* Tip Content */}
        <blockquote className={cn(
          'text-foreground leading-relaxed',
          compact ? 'text-sm' : 'text-base'
        )}>
          "{tip.tip}"
        </blockquote>

        {/* Expert Info */}
        <div className={cn(
          'flex items-center justify-between',
          compact ? 'mt-3' : 'mt-4'
        )}>
          <div>
            <p className="font-medium text-foreground">
              {tip.expert.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {tip.expert.title}
            </p>
          </div>

          {/* Social Links & Refresh */}
          <div className="flex items-center gap-2">
            {tip.expert.twitter && (
              <a
                href={`https://twitter.com/${tip.expert.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={`${tip.expert.name} on Twitter`}
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
            {tip.expert.linkedin && (
              <a
                href={`https://linkedin.com/in/${tip.expert.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={`${tip.expert.name} on LinkedIn`}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {onRefresh && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onRefresh}
                className="h-8 w-8"
                aria-label="Get another tip"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpertTipCard;
