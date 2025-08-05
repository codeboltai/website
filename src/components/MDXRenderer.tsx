'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface MDXRendererProps {
  content: string;
  className?: string;
}

export default function MDXRenderer({ content, className = '' }: MDXRendererProps) {
  if (!content || content.trim() === '') {
    return (
      <p className="text-muted-foreground italic">No content available</p>
    );
  }

  // Debug: Log the original content to see what we're working with
  console.log('Original content:', JSON.stringify(content.substring(0, 200)));

  // Process the content to ensure proper line breaks and formatting
  let processedContent = content
    .replace(/\r\n/g, '\n') // Normalize line endings
    .replace(/\r/g, '\n')   // Handle old Mac line endings
    .replace(/\\n/g, '\n')  // Convert escaped newlines to actual newlines
    .trim();

  // Handle specific markdown patterns that might be malformed
  processedContent = processedContent
    // Fix headers
    .replace(/###\s+Components\s+###\s+Tools/g, '\n\n### Components\n\n### Tools')
    .replace(/###\s+Resources\s+/g, '\n\n### Resources\n\n')
    .replace(/###\s+Usage\s+/g, '\n\n### Usage\n\n')
    .replace(/###\s+Docker\s+\*/g, '\n\n### Docker\n\n*')
    .replace(/###\s+NPX\s+/g, '\n\n### NPX\n\n')
    .replace(/##\s+([A-Z])/g, '\n\n## $1') // Add spacing before ## headers
    .replace(/###\s+([A-Z])/g, '\n\n### $1') // Add spacing before ### headers
    
    // Fix bullet points and lists
    .replace(/\*\s+([a-zA-Z])/g, '\n\n* $1') // Add proper spacing before bullet points
    .replace(/(-\s+[A-Z])/g, '\n$1') // Add line breaks before dash bullet points
    
    // Fix inline code
    .replace(/(\w+)\s*\(\s*([^)]+)\s*\):/g, '`$1($2)`:') // Convert function calls to code
    .replace(/(\w+):\s*([A-Z])/g, '**$1**: $2') // Make labels bold
    
    // Fix sentences and paragraphs
    .replace(/(\w+:)\s*(\w)/g, '$1 $2') // Fix spacing after colons
    .replace(/(\)\s*)([A-Z])/g, '$1\n\n$2') // Add breaks after parentheses followed by capital letters
    .replace(/(\w+)\s+-\s+([A-Z])/g, '$1\n\n- $2') // Fix bullet points after words
    
    // Fix code blocks
    .replace(/`([^`]+)`/g, '`$1`') // Ensure code spans are preserved
    .replace(/(\w+)\s*\{\s*"([^"]+)"\s*\}/g, '```json\n$1 {\n  "$2"\n}\n```') // Convert JSON-like patterns to code blocks

  console.log('Processed content:', JSON.stringify(processedContent.substring(0, 200)));

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        skipHtml={false}
        urlTransform={(uri) => uri}
        components={{
          // Custom components for better styling
          h1: ({ children, ...props }) => (
            <h1 className="text-3xl font-bold text-foreground mb-6 border-b border-border pb-3" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="text-lg font-semibold text-foreground mb-2 mt-4" {...props}>
              {children}
            </h4>
          ),
          h5: ({ children, ...props }) => (
            <h5 className="text-base font-semibold text-foreground mb-2 mt-3" {...props}>
              {children}
            </h5>
          ),
          h6: ({ children, ...props }) => (
            <h6 className="text-sm font-semibold text-foreground mb-2 mt-3" {...props}>
              {children}
            </h6>
          ),
          p: ({ children, ...props }) => (
            <p className="text-foreground mb-4 leading-relaxed" {...props}>
              {children}
            </p>
          ),
          code: (props: React.ComponentProps<'code'>) => {
            const { className, children } = props;
            const isInline = !className?.includes('language-');
            return isInline ? (
              <code className="bg-muted text-foreground px-1.5 py-0.5 rounded text-sm font-mono border" {...props}>
                {children}
              </code>
            ) : (
              <code className={`${className} text-sm block`} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }) => (
            <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto mb-4 text-sm" {...props}>
              {children}
            </pre>
          ),
          a: ({ href, children, ...props }) => (
            <a 
              href={href} 
              className="text-primary hover:underline font-medium" 
              target="_blank" 
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc pl-6 text-foreground mb-4 space-y-2" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-6 text-foreground mb-4 space-y-2" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-foreground leading-relaxed" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-primary bg-muted/50 pl-4 py-3 my-4 italic rounded-r" {...props}>
              {children}
            </blockquote>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-border rounded-lg" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-muted" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody {...props}>
              {children}
            </tbody>
          ),
          tr: ({ children, ...props }) => (
            <tr className="border-b border-border" {...props}>
              {children}
            </tr>
          ),
          th: ({ children, ...props }) => (
            <th className="border border-border px-4 py-3 text-left font-semibold text-foreground bg-muted/50" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-border px-4 py-3 text-foreground" {...props}>
              {children}
            </td>
          ),
          hr: ({ ...props }) => (
            <hr className="border-border my-6" {...props} />
          ),
          strong: ({ children, ...props }) => (
            <strong className="font-semibold text-foreground" {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className="italic text-foreground" {...props}>
              {children}
            </em>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}