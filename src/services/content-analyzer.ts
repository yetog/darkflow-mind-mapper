import { ConversationNode } from '@/types/conversation';

interface AnalyzedSection {
  title: string;
  content: string;
  type: ConversationNode['type'];
  keywords: string[];
}

/**
 * Analyzes pasted text content and extracts structured sections
 * for mind map node generation
 */
export function analyzeContent(text: string): ConversationNode[] {
  const sections = extractSections(text);
  
  if (sections.length === 0) {
    // Fallback: split by paragraphs
    return extractFromParagraphs(text);
  }
  
  return sections.map((section, index) => ({
    id: `analyzed-${Date.now()}-${index}`,
    label: section.title,
    description: section.content.slice(0, 150),
    type: section.type,
    emotionalTone: index === 0 ? 'positive' : index === sections.length - 1 ? 'building' : 'neutral',
  }));
}

/**
 * Extract sections from text based on headers, bullets, or numbered lists
 */
function extractSections(text: string): AnalyzedSection[] {
  const sections: AnalyzedSection[] = [];
  
  // Pattern 1: Markdown-style headers (# Header, ## Header)
  const headerPattern = /^#{1,3}\s+(.+)$/gm;
  let headerMatch;
  const headers: { title: string; index: number }[] = [];
  
  while ((headerMatch = headerPattern.exec(text)) !== null) {
    headers.push({
      title: headerMatch[1].trim(),
      index: headerMatch.index,
    });
  }
  
  if (headers.length > 0) {
    for (let i = 0; i < headers.length; i++) {
      const start = headers[i].index;
      const end = i < headers.length - 1 ? headers[i + 1].index : text.length;
      const content = text.slice(start, end).replace(/^#{1,3}\s+.+\n/, '').trim();
      
      sections.push({
        title: headers[i].title,
        content,
        type: detectNodeType(headers[i].title, content),
        keywords: extractKeywords(content),
      });
    }
    return sections;
  }
  
  // Pattern 2: Numbered lists (1. Item, 2. Item)
  const numberedPattern = /^\d+[.)]\s*(.+)$/gm;
  let numberedMatch;
  const numberedItems: string[] = [];
  
  while ((numberedMatch = numberedPattern.exec(text)) !== null) {
    numberedItems.push(numberedMatch[1].trim());
  }
  
  if (numberedItems.length >= 3) {
    return numberedItems.map((item, index) => ({
      title: item.length > 50 ? item.slice(0, 47) + '...' : item,
      content: item,
      type: detectNodeType(item, item),
      keywords: extractKeywords(item),
    }));
  }
  
  // Pattern 3: Bullet points (- Item, * Item, • Item)
  const bulletPattern = /^[-*•]\s+(.+)$/gm;
  let bulletMatch;
  const bulletItems: string[] = [];
  
  while ((bulletMatch = bulletPattern.exec(text)) !== null) {
    bulletItems.push(bulletMatch[1].trim());
  }
  
  if (bulletItems.length >= 3) {
    return bulletItems.map((item) => ({
      title: item.length > 50 ? item.slice(0, 47) + '...' : item,
      content: item,
      type: detectNodeType(item, item),
      keywords: extractKeywords(item),
    }));
  }
  
  return [];
}

/**
 * Fallback: Extract from paragraphs
 */
function extractFromParagraphs(text: string): ConversationNode[] {
  const paragraphs = text
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 20);
  
  if (paragraphs.length === 0) {
    // Single block of text - create one node
    const trimmed = text.trim();
    if (trimmed.length < 10) return [];
    
    return [{
      id: `analyzed-${Date.now()}-0`,
      label: trimmed.slice(0, 50) + (trimmed.length > 50 ? '...' : ''),
      description: trimmed.slice(0, 200),
      type: 'topic',
    }];
  }
  
  // Take first 6 paragraphs max
  return paragraphs.slice(0, 6).map((para, index) => {
    const firstSentence = para.split(/[.!?]/)[0] || para;
    const title = firstSentence.length > 50 
      ? firstSentence.slice(0, 47) + '...' 
      : firstSentence;
    
    return {
      id: `analyzed-${Date.now()}-${index}`,
      label: title,
      description: para.slice(0, 150),
      type: detectNodeType(title, para),
      emotionalTone: index === 0 ? 'positive' : index === paragraphs.length - 1 ? 'building' : 'neutral',
    };
  });
}

/**
 * Detect the type of node based on content
 */
function detectNodeType(title: string, content: string): ConversationNode['type'] {
  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();
  
  // Question indicators
  if (title.includes('?') || lowerTitle.startsWith('how') || lowerTitle.startsWith('why') || 
      lowerTitle.startsWith('what') || lowerTitle.startsWith('when') || lowerTitle.includes('q&a')) {
    return 'question';
  }
  
  // Transition indicators
  if (lowerTitle.includes('transition') || lowerTitle.includes('moving on') || 
      lowerTitle.includes('next') || lowerTitle.includes('now let')) {
    return 'transition';
  }
  
  // Activity indicators
  if (lowerTitle.includes('exercise') || lowerTitle.includes('activity') || 
      lowerTitle.includes('demo') || lowerTitle.includes('workshop')) {
    return 'activity';
  }
  
  // Milestone indicators
  if (lowerTitle.includes('conclusion') || lowerTitle.includes('summary') || 
      lowerTitle.includes('key takeaway') || lowerTitle.includes('recap')) {
    return 'milestone';
  }
  
  return 'topic';
}

/**
 * Extract keywords from content
 */
function extractKeywords(content: string): string[] {
  // Simple keyword extraction - take capitalized words and common important terms
  const words = content.split(/\s+/);
  const keywords: string[] = [];
  
  const stopWords = new Set([
    'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare',
    'ought', 'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by',
    'from', 'as', 'into', 'through', 'during', 'before', 'after',
    'above', 'below', 'between', 'under', 'again', 'further', 'then',
    'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'each',
    'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not',
    'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'and',
    'but', 'if', 'or', 'because', 'until', 'while', 'this', 'that',
    'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
  ]);
  
  for (const word of words) {
    const cleaned = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
    
    // Skip short words and stop words
    if (cleaned.length < 4 || stopWords.has(cleaned)) continue;
    
    // Check if original word was capitalized (likely important)
    if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
      keywords.push(cleaned);
    }
  }
  
  return [...new Set(keywords)].slice(0, 5);
}

/**
 * Estimate duration based on content length
 */
export function estimateDuration(content: string): number {
  // Average speaking rate: 150 words per minute
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 150);
  return Math.max(1, Math.min(minutes, 10)); // Between 1 and 10 minutes
}
