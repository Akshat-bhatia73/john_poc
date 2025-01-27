"use client";

import React, { useState } from 'react';
import { Check, Edit2, MessageSquare, Save, Tag, Trash2, X } from 'lucide-react';
import { Node } from '@/types';

interface NodeEditorProps {
  node: Node;
  editingTagId: string | null;
  isGeneratingTags: boolean;
  onClose: () => void;
  onEditTag: (tagId: string) => void;
  onPromptSubmit: (prompt: string) => void;
}

export function NodeEditor({
  node,
  editingTagId,
  isGeneratingTags,
  onClose,
  onEditTag,
  onPromptSubmit
}: NodeEditorProps) {
  const [nodeName, setNodeName] = useState(node.name);
  const [nodePrompt, setNodePrompt] = useState(node.prompt || '');
  const [tagDescriptions, setTagDescriptions] = useState<Record<string, string>>(
    Object.fromEntries(node.tags.map(tag => [tag.id, tag.description]))
  );

  const handleTagDescriptionChange = (tagId: string, description: string) => {
    setTagDescriptions(prev => ({
      ...prev,
      [tagId]: description
    }));
  };

  return (
    <div className="w-96 shrink-0">
      <div className="sticky top-6">
        <div className="glass-panel">
          <div className="p-4 border-b border-neutral-700/50 flex justify-between items-center">
            <h2 className="font-semibold text-white">Node Details</h2>
            <button 
              onClick={onClose}
              className="icon-button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5">Name</label>
              <input
                type="text"
                className="input-field"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Describe what this node should do
              </label>
              <div className="relative">
                <textarea
                  className="input-field"
                  rows={3}
                  placeholder="Example: I need to fetch customer reviews from G2 and validate the data structure"
                  value={nodePrompt}
                  onChange={(e) => setNodePrompt(e.target.value)}
                />
                <button 
                  className="absolute bottom-2 right-2 btn-primary text-xs"
                  onClick={() => onPromptSubmit(nodePrompt)}
                >
                  {isGeneratingTags ? 'Generating...' : 'Generate Tags'}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-neutral-400">
                Describe the task in plain English. Our AI will help configure the node.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Generated Tags
              </label>
              <div className="space-y-2">
                {node.tags.map(tag => (
                  <div
                    key={tag.id}
                    className="tag-card"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-neutral-200">{tag.name}</span>
                      <button
                        onClick={() => onEditTag(tag.id)}
                        className="icon-button"
                      >
                        {editingTagId === tag.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Edit2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {editingTagId === tag.id ? (
                      <textarea
                        className="input-field text-sm"
                        value={tagDescriptions[tag.id]}
                        onChange={(e) => handleTagDescriptionChange(tag.id, e.target.value)}
                        rows={2}
                      />
                    ) : (
                      <p className="text-sm text-neutral-400">{tagDescriptions[tag.id]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-neutral-700/50 flex items-center justify-between gap-3">
            <button className="btn btn-secondary">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
            <button className="btn btn-primary">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}