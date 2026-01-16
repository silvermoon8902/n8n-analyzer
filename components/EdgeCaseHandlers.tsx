'use client';

import { useState } from 'react';
import {
  Cookie,
  ImageOff,
  Loader,
  Lock,
  Code,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { edgeCaseHandlers } from '@/lib/sampleData';

const caseIcons: Record<string, any> = {
  'Cookie Consent Banners': Cookie,
  'Lazy-Loaded Images': ImageOff,
  'Animations & Loading States': Loader,
  'Auth-Protected Pages': Lock
};

export default function EdgeCaseHandlers() {
  const [expandedCase, setExpandedCase] = useState<string | null>('Cookie Consent Banners');

  return (
    <div className="bg-n8n-dark rounded-xl border border-n8n-gray overflow-hidden">
      <div className="px-6 py-4 border-b border-n8n-gray">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">Edge Case Handling</h3>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          Solutions for common website capture challenges
        </p>
      </div>

      <div className="divide-y divide-n8n-gray">
        {edgeCaseHandlers.map((handler) => {
          const Icon = caseIcons[handler.case] || AlertTriangle;
          const isExpanded = expandedCase === handler.case;

          return (
            <div key={handler.case}>
              {/* Header */}
              <button
                onClick={() => setExpandedCase(isExpanded ? null : handler.case)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-n8n-gray/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-medium text-white">{handler.case}</h4>
                    <p className="text-xs text-gray-400">{handler.problem}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-6 pb-6 space-y-4">
                  {/* Solutions */}
                  <div>
                    <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-green-400" />
                      Solutions
                    </h5>
                    <ul className="space-y-2">
                      {handler.solutions.map((solution, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 p-3 bg-n8n-darker rounded-lg"
                        >
                          <span className="w-5 h-5 rounded-full bg-n8n-orange/20 text-n8n-orange text-xs flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-sm text-gray-300">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Code Example */}
                  <div>
                    <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                      <Code className="w-4 h-4 text-blue-400" />
                      n8n HTTP Node Configuration
                    </h5>
                    <div className="code-block bg-n8n-darker rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm">
                        <code className="text-gray-300 whitespace-pre-wrap">{handler.code}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
