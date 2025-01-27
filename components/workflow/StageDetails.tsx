"use client";

import React from 'react';
import { Bot, ChevronRight, Plus, Settings } from 'lucide-react';
import { Stage, Step } from '@/types';

interface StageDetailsProps {
  stage: Stage;
  onStepSelect: (stepId: string) => void;
}

export function StageDetails({ stage, onStepSelect }: StageDetailsProps) {
  return (
    <div className="glass-panel">
      {/* Stage Header */}
      <div className="p-6 border-b border-neutral-700/50">
        <div className="flex items-center gap-3 mb-4">
          <span className="stage-number">{stage.stageNumber}</span>
          <h2 className="text-2xl font-semibold text-white">{stage.name}</h2>
        </div>
        <p className="text-neutral-400">{stage.description}</p>
      </div>

      {/* Agent Configuration */}
      <div className="p-6 border-b border-neutral-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-green-500" />
            Agent Configuration
          </h3>
          <button className="btn btn-secondary">
            <Settings className="w-4 h-4 mr-2" />
            Configure Agent
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Agent Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., Data Collection Agent"
              defaultValue="G2 Reviews Analysis Agent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Prompt Template</label>
            <textarea
              className="input-field"
              rows={4}
              placeholder="Enter the base prompt template for this stage..."
              defaultValue="You are an expert in analyzing G2 enterprise software reviews. Your task is to process and validate review data, ensuring it meets our quality standards and contains all required fields."
            />
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Processing Steps</h3>
          <button className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Step
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stage.steps.map((step) => (
            <button
              key={step.id}
              onClick={() => onStepSelect(step.id)}
              className="group p-4 text-left rounded-xl border border-neutral-700/50 hover:border-neutral-600 hover:shadow-lg hover:shadow-neutral-900/50 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-400">Step {step.stepNumber}</span>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-green-500 transition-colors" />
              </div>
              <h4 className="font-medium text-white group-hover:text-green-500 transition-colors">
                {step.name}
              </h4>
              <p className="text-sm text-neutral-400 mt-1">
                {step.description}
              </p>
              <div className="mt-3 text-xs text-neutral-500">
                {step.nodes.length} node{step.nodes.length !== 1 ? 's' : ''}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}