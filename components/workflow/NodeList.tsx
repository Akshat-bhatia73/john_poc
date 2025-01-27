"use client";

import React from 'react';
import { Node } from '@/types';

interface NodeListProps {
  nodes: Node[];
  selectedNode: string | null;
  onNodeSelect: (nodeId: string) => void;
}

export function NodeList({ nodes, selectedNode, onNodeSelect }: NodeListProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {nodes.map(node => (
        <div
          key={node.id}
          className={`node-card ${
            selectedNode === node.id
              ? 'node-card-selected'
              : 'node-card-default'
          }`}
          onClick={() => onNodeSelect(node.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-white group-hover:text-green-500 transition-colors">
                {node.name}
              </h3>
              <p className="text-sm text-neutral-400 mt-1">{node.description}</p>
            </div>
            <span className={`tag ${
              node.type === 'analysis' 
                ? 'tag-blue' 
                : node.type === 'validation'
                ? 'tag-amber'
                : 'tag-emerald'
            }`}>
              {node.type}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {node.tags.map(tag => (
              <span
                key={tag.id}
                className="tag bg-neutral-700/50 text-neutral-300"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}