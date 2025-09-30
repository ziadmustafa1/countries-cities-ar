'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Terminal, FileCode } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  isCommand?: boolean;
}

export function CodeBlock({ 
  code, 
  language = 'typescript',
  filename,
  showLineNumbers = false,
  isCommand = false
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Special treatment for commands
  if (isCommand || language === 'bash' || language === 'shell') {
    return (
      <div className="relative group my-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-[1px]">
        <div className="rounded-lg bg-[#0d1117] p-4 flex items-center gap-3">
          <Terminal className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <code className="text-gray-300 font-mono text-sm flex-1">{code}</code>
          <button
            onClick={handleCopy}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-all"
            aria-label="Copy command"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group rounded-lg overflow-hidden bg-[#1e1e1e] border border-gray-800/50 my-4">
      {/* Header */}
      {filename && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-gray-800/50">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-400 font-mono">
              {filename}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 text-gray-500 hover:text-gray-300 hover:bg-gray-800 rounded transition-all"
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Copy button (without filename) */}
      {!filename && (
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-300 bg-gray-900/90 hover:bg-gray-800 backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-all z-10"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      )}

      {/* Code */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            fontSize: '0.875rem',
            lineHeight: '1.7',
            background: '#1e1e1e',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
              textShadow: 'none',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
