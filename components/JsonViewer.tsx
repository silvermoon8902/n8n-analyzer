'use client';

import { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronRight, Code } from 'lucide-react';

interface JsonViewerProps {
  data: any;
  title?: string;
}

export default function JsonViewer({ data, title = 'JSON Output' }: JsonViewerProps) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleCollapse = (path: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const renderValue = (value: any, path: string = '', indent: number = 0): JSX.Element => {
    const indentPx = indent * 20;

    if (value === null) {
      return <span className="json-null">null</span>;
    }

    if (typeof value === 'boolean') {
      return <span className="json-boolean">{value.toString()}</span>;
    }

    if (typeof value === 'number') {
      return <span className="json-number">{value}</span>;
    }

    if (typeof value === 'string') {
      return <span className="json-string">"{value}"</span>;
    }

    if (Array.isArray(value)) {
      const isCollapsed = collapsed.has(path);
      if (value.length === 0) {
        return <span className="text-gray-400">[]</span>;
      }

      return (
        <span>
          <button
            onClick={() => toggleCollapse(path)}
            className="hover:bg-n8n-gray/50 rounded px-1 -ml-1"
          >
            {isCollapsed ? (
              <ChevronRight className="w-3 h-3 inline text-gray-500" />
            ) : (
              <ChevronDown className="w-3 h-3 inline text-gray-500" />
            )}
          </button>
          <span className="text-gray-400">[</span>
          {isCollapsed ? (
            <span className="text-gray-500 text-xs ml-1">{value.length} items</span>
          ) : (
            <>
              {value.map((item, index) => (
                <div key={index} style={{ paddingLeft: indentPx + 20 }}>
                  {renderValue(item, `${path}[${index}]`, indent + 1)}
                  {index < value.length - 1 && <span className="text-gray-400">,</span>}
                </div>
              ))}
            </>
          )}
          {!isCollapsed && <div style={{ paddingLeft: indentPx }} />}
          <span className="text-gray-400">]</span>
        </span>
      );
    }

    if (typeof value === 'object') {
      const isCollapsed = collapsed.has(path);
      const keys = Object.keys(value);
      if (keys.length === 0) {
        return <span className="text-gray-400">{'{}'}</span>;
      }

      return (
        <span>
          <button
            onClick={() => toggleCollapse(path)}
            className="hover:bg-n8n-gray/50 rounded px-1 -ml-1"
          >
            {isCollapsed ? (
              <ChevronRight className="w-3 h-3 inline text-gray-500" />
            ) : (
              <ChevronDown className="w-3 h-3 inline text-gray-500" />
            )}
          </button>
          <span className="text-gray-400">{'{'}</span>
          {isCollapsed ? (
            <span className="text-gray-500 text-xs ml-1">{keys.length} properties</span>
          ) : (
            <>
              {keys.map((key, index) => (
                <div key={key} style={{ paddingLeft: indentPx + 20 }}>
                  <span className="json-key">"{key}"</span>
                  <span className="text-gray-400">: </span>
                  {renderValue(value[key], `${path}.${key}`, indent + 1)}
                  {index < keys.length - 1 && <span className="text-gray-400">,</span>}
                </div>
              ))}
            </>
          )}
          {!isCollapsed && <div style={{ paddingLeft: indentPx }} />}
          <span className="text-gray-400">{'}'}</span>
        </span>
      );
    }

    return <span>{String(value)}</span>;
  };

  return (
    <div className="bg-n8n-dark rounded-xl border border-n8n-gray overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-n8n-gray">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-n8n-orange" />
          <span className="text-sm font-medium text-white">{title}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1.5 text-xs bg-n8n-gray hover:bg-n8n-light rounded-lg transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-gray-400" />
              <span className="text-gray-400">Copy JSON</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 font-mono text-sm overflow-x-auto max-h-96 overflow-y-auto">
        {renderValue(data, 'root', 0)}
      </div>
    </div>
  );
}
