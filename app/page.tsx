'use client';

import { useState, useEffect } from 'react';
import {
  Play,
  Globe,
  Workflow,
  FileJson,
  Wrench,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Github
} from 'lucide-react';
import WorkflowDiagram from '@/components/WorkflowDiagram';
import AnalysisReport from '@/components/AnalysisReport';
import JsonViewer from '@/components/JsonViewer';
import CaptureStrategy from '@/components/CaptureStrategy';
import EdgeCaseHandlers from '@/components/EdgeCaseHandlers';
import { sampleReport, jsonOutputSchema } from '@/lib/sampleData';

type Tab = 'workflow' | 'strategy' | 'edge-cases' | 'output';

export default function Home() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [showReport, setShowReport] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('workflow');

  const runAnalysis = () => {
    if (!url) return;

    setIsAnalyzing(true);
    setShowReport(false);
    setActiveStep(0);

    // Simulate workflow progression
    const stepDurations = [500, 300, 800, 800, 1000, 600, 400, 1500, 300, 500];
    let totalDelay = 0;

    stepDurations.forEach((duration, index) => {
      totalDelay += duration;
      setTimeout(() => {
        setActiveStep(index);
      }, totalDelay);
    });

    setTimeout(() => {
      setIsAnalyzing(false);
      setActiveStep(-1);
      setShowReport(true);
    }, totalDelay + 500);
  };

  const tabs = [
    { id: 'workflow', label: 'Workflow', icon: Workflow },
    { id: 'strategy', label: 'Capture Strategy', icon: Layers },
    { id: 'edge-cases', label: 'Edge Cases', icon: Wrench },
    { id: 'output', label: 'JSON Schema', icon: FileJson }
  ];

  return (
    <div className="min-h-screen bg-n8n-darker">
      {/* Header */}
      <header className="border-b border-n8n-gray bg-n8n-dark/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-n8n-orange to-orange-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Website Quality Analyzer</h1>
                <p className="text-xs text-gray-400">n8n + GPT-4 Vision Workflow Demo</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://n8n.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <span>Built for n8n</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Automated Website Quality Analysis
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Enter a URL → Capture screenshots, performance data, and HTML → AI analyzes against
            quality checklist → Get structured JSON report with scores and recommendations
          </p>
        </div>

        {/* URL Input */}
        <div className="bg-n8n-dark rounded-xl p-6 border border-n8n-gray mb-8 glow-orange">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL to analyze..."
                className="w-full pl-12 pr-4 py-4 bg-n8n-darker border border-n8n-light rounded-xl text-white placeholder-gray-500 focus:border-n8n-orange focus:outline-none focus:ring-2 focus:ring-n8n-orange/20 transition-all"
              />
            </div>
            <button
              onClick={runAnalysis}
              disabled={!url || isAnalyzing}
              className={`flex items-center gap-2 px-6 py-4 rounded-xl font-medium transition-all ${
                !url || isAnalyzing
                  ? 'bg-n8n-gray text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-n8n-orange to-orange-600 text-white hover:shadow-lg hover:shadow-n8n-orange/30'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Analyze Website
                </>
              )}
            </button>
          </div>

          {/* Quick Examples */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs text-gray-500">Try:</span>
            {['https://stripe.com', 'https://linear.app', 'https://vercel.com'].map((example) => (
              <button
                key={example}
                onClick={() => setUrl(example)}
                className="text-xs px-3 py-1 bg-n8n-gray hover:bg-n8n-light rounded-full text-gray-300 transition-colors"
              >
                {example.replace('https://', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-n8n-orange text-white'
                    : 'bg-n8n-gray text-gray-400 hover:bg-n8n-light hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'workflow' && (
            <WorkflowDiagram activeStep={activeStep} isRunning={isAnalyzing} />
          )}

          {activeTab === 'strategy' && <CaptureStrategy />}

          {activeTab === 'edge-cases' && <EdgeCaseHandlers />}

          {activeTab === 'output' && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Output Schema</h3>
                <JsonViewer data={jsonOutputSchema} title="JSON Schema Definition" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Sample Output</h3>
                <JsonViewer data={sampleReport} title="Example Report" />
              </div>
            </div>
          )}
        </div>

        {/* Analysis Report */}
        {showReport && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Analysis Complete</h3>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <AnalysisReport report={{ ...sampleReport, url }} />
              </div>
              <div>
                <JsonViewer data={{ ...sampleReport, url }} title="Raw JSON Response" />
              </div>
            </div>
          </div>
        )}

        {/* Technical Approach Summary */}
        <div className="mt-12 bg-n8n-dark rounded-xl border border-n8n-gray overflow-hidden">
          <div className="px-6 py-4 border-b border-n8n-gray">
            <h3 className="text-lg font-semibold text-white">My Technical Approach</h3>
          </div>
          <div className="p-6 grid grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">1. Capture Strategy</h4>
              <p className="text-sm text-gray-400">
                Multi-layered capture: Desktop + Mobile screenshots via ScreenshotOne API,
                Lighthouse audit via PageSpeed Insights, and rendered DOM for structural analysis.
                All executed in parallel to minimize latency.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">2. AI Analysis</h4>
              <p className="text-sm text-gray-400">
                GPT-4 Vision receives screenshots with checklist criteria embedded in prompt.
                Lighthouse data provides objective metrics. AI correlates visual quality with
                performance data for comprehensive evaluation.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                <FileJson className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">3. Structured Output</h4>
              <p className="text-sm text-gray-400">
                JSON schema enforcement via n8n Code node. Each category includes score, status,
                and findings with reasoning. Consistent format enables downstream automation and
                reporting.
              </p>
            </div>
          </div>
        </div>

        {/* Tools Used */}
        <div className="mt-8 flex items-center justify-center gap-6 py-8 border-t border-n8n-gray">
          <span className="text-sm text-gray-500">Built with:</span>
          <div className="flex items-center gap-4">
            {[
              { name: 'n8n', color: 'text-orange-400' },
              { name: 'ScreenshotOne', color: 'text-blue-400' },
              { name: 'PageSpeed API', color: 'text-green-400' },
              { name: 'GPT-4 Vision', color: 'text-purple-400' }
            ].map((tool) => (
              <span
                key={tool.name}
                className={`px-3 py-1.5 bg-n8n-gray rounded-full text-sm ${tool.color}`}
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-n8n-gray py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            Demo by Wilfredo Rosario • Senior n8n Developer
          </p>
        </div>
      </footer>
    </div>
  );
}
