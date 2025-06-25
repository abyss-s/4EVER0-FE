import React from 'react';
import type { Components } from 'react-markdown';

export const useMarkdownComponents = (): Components => {
  return React.useMemo(
    () => ({
      h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-gray-800">{children}</h1>,
      h2: ({ children }) => <h2 className="text-base font-bold mb-2 text-gray-800">{children}</h2>,
      h3: ({ children }) => <h3 className="text-sm font-bold mb-1 text-gray-800">{children}</h3>,
      ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
      ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
      li: ({ children }) => <li className="text-sm">{children}</li>,
      strong: ({ children }) => <strong className="font-bold text-pink-600">{children}</strong>,
      em: ({ children }) => <em className="italic text-gray-600">{children}</em>,
      p: ({ children }) => (
        <p className="mb-2 last:mb-0 whitespace-pre-wrap leading-relaxed">{children}</p>
      ),
      br: () => <br />,
      code: ({ children, className, ...props }) => {
        const isInline = !className?.includes('language-');
        return (
          <code
            className={`${
              isInline
                ? 'bg-gray-100 px-1 py-0.5 rounded text-xs font-mono text-gray-700'
                : 'block bg-gray-100 p-2 rounded text-sm font-mono text-gray-700 overflow-x-auto'
            }`}
            {...props}
          >
            {children}
          </code>
        );
      },
      a: ({ href, children }) => (
        <a
          href={href}
          className="text-blue-600 underline hover:text-blue-800 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-pink-300 pl-4 py-2 bg-pink-50 rounded-r-lg mb-2 italic">
          {children}
        </blockquote>
      ),
      hr: () => <hr className="border-t-2 border-orange-200 my-4" />,
      table: ({ children }) => (
        <table className="w-full border-collapse border border-pink-200 rounded-lg overflow-hidden mb-4">
          {children}
        </table>
      ),
      thead: ({ children }) => <thead className="bg-pink-100">{children}</thead>,
      tbody: ({ children }) => <tbody className="bg-white">{children}</tbody>,
      tr: ({ children }) => <tr className="border-b border-pink-200">{children}</tr>,
      th: ({ children }) => (
        <th className="px-4 py-2 text-left font-semibold text-pink-800">{children}</th>
      ),
      td: ({ children }) => <td className="px-4 py-2 text-gray-700">{children}</td>,
    }),
    [],
  );
};
