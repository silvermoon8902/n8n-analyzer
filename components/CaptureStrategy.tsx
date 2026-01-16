'use client';

import { useState } from 'react';
import {
  Camera,
  Gauge,
  Code2,
  Check,
  X,
  ChevronRight,
  Monitor,
  Smartphone,
  ScrollText
} from 'lucide-react';
import { captureStrategies } from '@/lib/sampleData';

const strategyIcons: Record<string, any> = {
  Screenshots: Camera,
  'Performance Data': Gauge,
  'DOM/HTML Analysis': Code2
};

export default function CaptureStrategy() {
  const [activeStrategy, setActiveStrategy] = useState(0);

  return (
    <div className="bg-n8n-dark rounded-xl border border-n8n-gray overflow-hidden">
      <div className="px-6 py-4 border-b border-n8n-gray">
        <h3 className="text-lg font-semibold text-white">Capture Strategy</h3>
        <p className="text-sm text-gray-400 mt-1">
          Multi-layered approach to feed AI with comprehensive website data
        </p>
      </div>

      <div className="grid grid-cols-3 divide-x divide-n8n-gray">
        {/* Strategy Tabs */}
        <div className="col-span-1 p-4 space-y-2">
          {captureStrategies.map((strategy, index) => {
            const Icon = strategyIcons[strategy.name] || Camera;
            const isActive = activeStrategy === index;

            return (
              <button
                key={strategy.name}
                onClick={() => setActiveStrategy(index)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-n8n-orange/20 border border-n8n-orange'
                    : 'hover:bg-n8n-gray/50 border border-transparent'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-n8n-orange' : 'bg-n8n-gray'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <div className="text-left flex-1">
                  <h4 className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                    {strategy.name}
                  </h4>
                  <p className="text-xs text-gray-500">{strategy.tools[0]}</p>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-n8n-orange" />}
              </button>
            );
          })}
        </div>

        {/* Strategy Details */}
        <div className="col-span-2 p-6">
          {captureStrategies[activeStrategy] && (
            <div className="space-y-6">
              {/* What We Capture */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-n8n-orange" />
                  What We Capture
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {captureStrategies[activeStrategy].captures.map((capture, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-n8n-darker rounded-lg text-sm"
                    >
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{capture}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Recommended Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {captureStrategies[activeStrategy].tools.map((tool, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        index === 0
                          ? 'bg-n8n-orange/20 text-n8n-orange border border-n8n-orange/50'
                          : 'bg-n8n-gray text-gray-300'
                      }`}
                    >
                      {tool}
                      {index === 0 && <span className="ml-1 text-xs">(Primary)</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-2">Pros</h4>
                  <ul className="space-y-2">
                    {captureStrategies[activeStrategy].pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-2">Cons</h4>
                  <ul className="space-y-2">
                    {captureStrategies[activeStrategy].cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                        <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Combined Strategy Note */}
      <div className="px-6 py-4 bg-n8n-darker border-t border-n8n-gray">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <ScrollText className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-1">My Recommended Approach</h4>
            <p className="text-xs text-gray-400">
              Combine all three strategies: Screenshots provide visual context for GPT-4 Vision,
              Lighthouse provides objective performance/accessibility metrics, and DOM analysis helps
              validate structural decisions. The AI can cross-reference visual appearance with
              underlying code quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
