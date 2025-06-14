import { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image,
  Quote,
  Code,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

export const RichTextEditor = ({ 
  value = "", 
  onChange = () => {}, 
  placeholder = "Start typing...",
  className = "",
  minHeight = "200px" 
}) => {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // Handle content changes
  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  };

  // Execute formatting commands
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  // Handle key commands
  const handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          break;
        default:
          break;
      }
    }
  };

  // Set initial content
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const toolbarButtons = [
    {
      icon: Bold,
      command: 'bold',
      title: 'Bold (Ctrl+B)',
    },
    {
      icon: Italic,
      command: 'italic',
      title: 'Italic (Ctrl+I)',
    },
    {
      icon: Underline,
      command: 'underline',
      title: 'Underline (Ctrl+U)',
    },
    { divider: true },
    {
      icon: List,
      command: 'insertUnorderedList',
      title: 'Bullet List',
    },
    {
      icon: ListOrdered,
      command: 'insertOrderedList',
      title: 'Numbered List',
    },
    { divider: true },
    {
      icon: AlignLeft,
      command: 'justifyLeft',
      title: 'Align Left',
    },
    {
      icon: AlignCenter,
      command: 'justifyCenter',
      title: 'Align Center',
    },
    {
      icon: AlignRight,
      command: 'justifyRight',
      title: 'Align Right',
    },
    { divider: true },
    {
      icon: Quote,
      command: 'formatBlock',
      value: 'blockquote',
      title: 'Quote',
    },
    {
      icon: Code,
      command: 'formatBlock',
      value: 'pre',
      title: 'Code Block',
    },
  ];

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${isFocused ? 'ring-2 ring-blue-500 border-blue-500' : ''} ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center space-x-1">
        {toolbarButtons.map((button, index) => {
          if (button.divider) {
            return (
              <div key={index} className="w-px h-6 bg-gray-300 mx-1" />
            );
          }

          const Icon = button.icon;
          return (
            <button
              key={index}
              type="button"
              onClick={() => execCommand(button.command, button.value)}
              className="p-1.5 rounded hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
              title={button.title}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="p-4 outline-none prose prose-sm max-w-none"
        style={{ minHeight }}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          cursor: text;
        }
        
        [contenteditable] {
          line-height: 1.6;
        }
        
        [contenteditable] h1 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        
        [contenteditable] h2 {
          font-size: 1.3em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        
        [contenteditable] h3 {
          font-size: 1.1em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        
        [contenteditable] p {
          margin: 0.5em 0;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          margin: 0.5em 0;
          padding-left: 1.5em;
        }
        
        [contenteditable] blockquote {
          margin: 1em 0;
          padding-left: 1em;
          border-left: 4px solid #e5e7eb;
          color: #6b7280;
        }
        
        [contenteditable] pre {
          background-color: #f3f4f6;
          padding: 0.5em;
          border-radius: 0.25rem;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
        }
      `}</style>
    </div>
  );
};