'use client';

import { useState, useEffect } from 'react';
import {
  Webhook,
  Code,
  Monitor,
  Smartphone,
  Gauge,
  Code2,
  GitMerge,
  Brain,
  Braces,
  Send,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { workflowSteps } from '@/lib/sampleData';

interface WorkflowDiagramProps {
  activeStep: number;
  isRunning: boolean;
}

const iconMap: Record<string, any> = {
  webhook: Webhook,
  code: Code,
  monitor: Monitor,
  smartphone: Smartphone,
  gauge: Gauge,
  'code-2': Code2,
  'git-merge': GitMerge,
  brain: Brain,
  braces: Braces,
  send: Send
};

const typeColors: Record<string, string> = {
  trigger: 'from-green-500 to-green-600',
  code: 'from-purple-500 to-purple-600',
  http: 'from-blue-500 to-blue-600',
  merge: 'from-yellow-500 to-yellow-600',
  ai: 'from-pink-500 to-pink-600',
  respond: 'from-orange-500 to-orange-600'
};

export default function WorkflowDiagram({ activeStep, isRunning }: WorkflowDiagramProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="bg-n8n-dark rounded-xl p-6 border border-n8n-gray">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">n8n Workflow Architecture</h3>
        <div className="flex items-center gap-2">
          {isRunning ? (
            <span className="flex items-center gap-2 text-green-400 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Running
            </span>
          ) : (
            <span className="text-gray-400 text-sm">Idle</span>
          )}
        </div>
      </div>

      {/* Workflow Grid */}
      <div className="grid grid-cols-5 gap-4">
        {workflowSteps.map((step, index) => {
          const Icon = iconMap[step.icon] || Code;
          const isActive = activeStep === index;
          const isPast = activeStep > index;
          const isHovered = hoveredStep === index;

          return (
            <div key={step.id} className="relative">
              {/* Connection Line */}
              {index < workflowSteps.length - 1 && index !== 4 && (
                <div
                  className={`absolute top-1/2 -right-4 w-4 h-0.5 transition-colors duration-300 ${
                    isPast ? 'bg-n8n-orange' : 'bg-n8n-light'
                  }`}
                />
              )}

              {/* Node */}
              <div
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                className={`workflow-node cursor-pointer ${isActive ? 'active' : ''} ${
                  isPast ? 'border-green-500/50 bg-green-500/10' : ''
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${typeColors[step.type]} flex items-center justify-center mb-3`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Name */}
                <h4 className="text-sm font-medium text-white mb-1 truncate">{step.name}</h4>
                <p className="text-xs text-gray-400 truncate">{step.type}</p>

                {/* Status indicator */}
                {isPast && (
                  <div className="absolute top-2 right-2">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                {isActive && (
                  <div className="absolute top-2 right-2">
                    <div className="w-4 h-4 border-2 border-n8n-orange border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* Tooltip */}
              {isHovered && (
                <div className="absolute z-10 top-full mt-2 left-0 right-0 bg-n8n-darker border border-n8n-light rounded-lg p-3 shadow-xl">
                  <p className="text-xs text-gray-300 mb-2">{step.description}</p>
                  <div className="code-block text-xs">
                    <span className="text-gray-500">Output:</span>
                    <pre className="text-green-400 mt-1 whitespace-pre-wrap">{step.output}</pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Parallel Execution Note */}
      <div className="mt-6 p-4 bg-n8n-darker rounded-lg border border-n8n-light">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <GitMerge className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-1">Parallel Execution Strategy</h4>
            <p className="text-xs text-gray-400">
              Steps 3-6 (Screenshots + Lighthouse + HTML) run in parallel using n8n's Split In Batches node,
              then merge results before AI analysis. This reduces total execution time by ~60%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
