'use client';

import { useState } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  Gauge,
  Layout,
  Type,
  Palette,
  MousePointer,
  Navigation,
  Accessibility,
  Smartphone,
  Zap,
  FileText,
  Sparkles
} from 'lucide-react';
import type { AnalysisReport as AnalysisReportType, AnalysisCategory } from '@/lib/sampleData';

interface AnalysisReportProps {
  report: AnalysisReportType;
}

const categoryIcons: Record<string, any> = {
  'Layout & Grid': Layout,
  'Spacing & Consistency': Eye,
  'Typography': Type,
  'Color System': Palette,
  'UI Components': MousePointer,
  'Navigation': Navigation,
  'Accessibility': Accessibility,
  'Responsiveness': Smartphone,
  'Performance': Zap,
  'Content Quality': FileText,
  'Motion & Interactions': Sparkles
};

export default function AnalysisReport({ report }: AnalysisReportProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (name: string) => {
    setExpandedCategories((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-400';
    if (score >= 60) return 'from-yellow-500 to-yellow-400';
    return 'from-red-500 to-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <div className="bg-n8n-dark rounded-xl p-6 border border-n8n-gray">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Analysis Complete</h3>
            <p className="text-sm text-gray-400">{report.url}</p>
          </div>
          <div className="score-circle">
            <svg className="w-24 h-24" viewBox="0 0 100 100">
              <circle
                className="stroke-n8n-gray"
                strokeWidth="8"
                fill="none"
                r="42"
                cx="50"
                cy="50"
              />
              <circle
                className={`${report.overallScore >= 80 ? 'stroke-green-500' : report.overallScore >= 60 ? 'stroke-yellow-500' : 'stroke-red-500'}`}
                strokeWidth="8"
                fill="none"
                r="42"
                cx="50"
                cy="50"
                strokeLinecap="round"
                strokeDasharray={`${(report.overallScore / 100) * 264} 264`}
              />
            </svg>
            <span className={`score-value ${getScoreColor(report.overallScore)}`}>
              {report.overallScore}
            </span>
          </div>
        </div>

        {/* Lighthouse Scores */}
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(report.captureData.lighthouse).map(([key, value]) => (
            <div key={key} className="bg-n8n-darker rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 capitalize">{key}</span>
                <span className={`text-sm font-bold ${getScoreColor(value)}`}>{value}</span>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-bar-fill bg-gradient-to-r ${getProgressColor(value)}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        {report.categories.map((category) => {
          const Icon = categoryIcons[category.name] || Eye;
          const isExpanded = expandedCategories.includes(category.name);

          return (
            <div
              key={category.name}
              className="bg-n8n-dark rounded-xl border border-n8n-gray overflow-hidden"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-n8n-gray/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-n8n-gray flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-300" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-medium text-white">{category.name}</h4>
                    <p className="text-xs text-gray-400">
                      {category.findings.length} criteria evaluated
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {getStatusIcon(category.status)}
                  <span className={`text-lg font-bold ${getScoreColor(category.score)}`}>
                    {category.score}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Expanded Findings */}
              {isExpanded && (
                <div className="px-6 pb-4 space-y-3">
                  {category.findings.map((finding, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        finding.status === 'pass'
                          ? 'bg-green-500/5 border-green-500/20'
                          : finding.status === 'warning'
                          ? 'bg-yellow-500/5 border-yellow-500/20'
                          : 'bg-red-500/5 border-red-500/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{getStatusIcon(finding.status)}</div>
                        <div className="flex-1">
                          <h5 className="text-sm font-medium text-white mb-1">
                            {finding.criterion}
                          </h5>
                          <p className="text-xs text-gray-400 mb-2">{finding.reasoning}</p>
                          {finding.recommendation && (
                            <div className="flex items-start gap-2 mt-2 p-2 bg-n8n-darker rounded">
                              <span className="text-xs text-n8n-orange font-medium">Fix:</span>
                              <span className="text-xs text-gray-300">
                                {finding.recommendation}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
