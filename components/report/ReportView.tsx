"use client";

import React from 'react';
import { AlertTriangle, BarChart3, Brain, Building2, ChevronRight, LineChart, Target, TrendingUp, Users } from 'lucide-react';
import { ReportData } from '@/types';

export function ReportView() {
  const reportData: ReportData = {
    timePeriod: {
      start: "June 1-30, 2024",
      totalReviews: 142
    },
    criticalInsights: [
      "Enterprise security becoming primary selection factor",
      "API capabilities driving technical evaluation",
      "Integration depth increasingly critical",
      "Compliance feature gap emerging"
    ],
    metrics: {
      totalReviews: {
        value: 142,
        change: "+15% quarter"
      },
      satisfactionScore: {
        value: 4.4,
        change: "+0.2 from Q1"
      }
    },
    industryDistribution: {
      "Technology": 35,
      "Financial Services": 25,
      "Healthcare": 20,
      "Manufacturing": 15,
      "Others": 5
    },
    featureAnalysis: {
      strongest: [
        { name: "Content Quality", score: "4.8/5" },
        { name: "Accuracy", score: "4.7/5" },
        { name: "Brand voice", score: "4.6/5" },
        { name: "Multi-language", score: "4.5/5" }
      ],
      improvements: [
        {
          name: "Role-based Access",
          score: "3.7/5",
          details: [
            "Detailed permissions needed",
            "Department-level controls lacking"
          ]
        },
        {
          name: "Enterprise SSO",
          score: "3.5/5",
          details: [
            "Limited provider options",
            "Complex implementation"
          ]
        }
      ]
    },
    buyerPersonas: {
      technical: {
        concerns: [
          { name: "API capabilities", percentage: 45 },
          { name: "Security features", percentage: 38 },
          { name: "Integration depth", percentage: 35 },
          { name: "Performance metrics", percentage: 28 }
        ],
        requirements: [
          "REST API documentation",
          "Security certifications",
          "Integration scalability",
          "Performance SLAs"
        ]
      },
      operations: {
        concerns: [
          { name: "Team workflows", percentage: 52 },
          { name: "Scale requirements", percentage: 48 },
          { name: "Template management", percentage: 42 },
          { name: "Quality controls", percentage: 35 }
        ],
        requirements: [
          "Team collaboration tools",
          "Bulk operations",
          "Template systems",
          "Quality metrics"
        ]
      }
    }
  };

  return (
    <div className="flex-1 glass-panel overflow-y-auto">
      <div className="p-8 space-y-8">
        {/* Critical Insights Banner */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-medium">Critical Insights</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {reportData.criticalInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                <p className="text-neutral-200">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="glass-panel p-4">
            <div className="flex items-center gap-2 text-neutral-400 mb-2">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm">Total Reviews</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-white">{reportData.metrics.totalReviews.value}</span>
              <span className="text-sm text-green-500">{reportData.metrics.totalReviews.change}</span>
            </div>
          </div>
          <div className="glass-panel p-4">
            <div className="flex items-center gap-2 text-neutral-400 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Satisfaction Score</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-white">{reportData.metrics.satisfactionScore.value}/5</span>
              <span className="text-sm text-green-500">{reportData.metrics.satisfactionScore.change}</span>
            </div>
          </div>
          <div className="glass-panel p-4">
            <div className="flex items-center gap-2 text-neutral-400 mb-2">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">Top Industry</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-white">Technology</span>
              <span className="text-sm text-blue-500">35%</span>
            </div>
          </div>
          <div className="glass-panel p-4">
            <div className="flex items-center gap-2 text-neutral-400 mb-2">
              <Target className="w-4 h-4" />
              <span className="text-sm">Top Concern</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-white">Security</span>
              <span className="text-sm text-amber-500">45%</span>
            </div>
          </div>
        </div>

        {/* Buyer Personas */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Buyer Persona Analysis
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Technical Decision Makers */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-white">Technical Decision Makers</h3>
                <span className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full">
                  Primary Stakeholder
                </span>
              </div>
              <div className="space-y-4">
                {reportData.buyerPersonas.technical.concerns.map((concern, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm text-neutral-300">{concern.name}</span>
                      <span className="text-sm text-neutral-400">{concern.percentage}%</span>
                    </div>
                    <div className="h-2 bg-neutral-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${concern.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Operations Leaders */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-white">Operations Leaders</h3>
                <span className="px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-full">
                  Secondary Stakeholder
                </span>
              </div>
              <div className="space-y-4">
                {reportData.buyerPersonas.operations.concerns.map((concern, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm text-neutral-300">{concern.name}</span>
                      <span className="text-sm text-neutral-400">{concern.percentage}%</span>
                    </div>
                    <div className="h-2 bg-neutral-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${concern.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Analysis */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            Feature Analysis
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Strongest Features */}
            <div>
              <h3 className="text-sm font-medium text-neutral-400 mb-4">Strongest Features</h3>
              <div className="space-y-4">
                {reportData.featureAnalysis.strongest.map((feature, index) => (
                  <div key={index} className="glass-panel p-4">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-medium text-white">{feature.name}</span>
                      <span className="text-green-500">{feature.score}</span>
                    </div>
                    <div className="h-2 bg-neutral-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(parseFloat(feature.score) / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas for Improvement */}
            <div>
              <h3 className="text-sm font-medium text-neutral-400 mb-4">Areas for Improvement</h3>
              <div className="space-y-4">
                {reportData.featureAnalysis.improvements.map((feature, index) => (
                  <div key={index} className="glass-panel p-4">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-medium text-white">{feature.name}</span>
                      <span className="text-red-400">{feature.score}</span>
                    </div>
                    <div className="h-2 bg-neutral-700/50 rounded-full overflow-hidden mb-3">
                      <div 
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${(parseFloat(feature.score) / 5) * 100}%` }}
                      />
                    </div>
                    <ul className="space-y-1">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-neutral-400">
                          <ChevronRight className="w-3 h-3 text-neutral-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}