"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Plus } from 'lucide-react';
import { Header } from '@/components/Header';
import { ReportAssistant } from '@/components/report/ReportAssistant';
import { ReportView } from '@/components/report/ReportView';
import { WorkflowStages } from '@/components/workflow/WorkflowStages';
import { NodeList } from '@/components/workflow/NodeList';
import { NodeEditor } from '@/components/workflow/NodeEditor';
import { Stage, Step, Message, Node } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { StageDetails } from '@/components/workflow/StageDetails';

export default function Home() {
  const [selectedStage, setSelectedStage] = useState<string | null>('input-processing');
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [nodes, setNodes] = useState<Record<string, Node>>({});

  // Clear node selection when step changes
  useEffect(() => {
    setSelectedNode(null);
  }, [selectedStep]);

  // Clear step selection when stage changes
  useEffect(() => {
    setSelectedStep(null);
  }, [selectedStage]);

  const stages: Stage[] = [
    {
      id: 'input-processing',
      name: 'Data Collection & Validation',
      description: 'Gather and validate enterprise review data from multiple sources',
      stageNumber: 1,
      steps: [
        {
          id: 'data-collection',
          name: 'Data Collection',
          description: 'Collect raw data from various sources',
          stepNumber: 1,
          nodes: [
            {
              id: 'g2-api',
              name: 'G2 API Integration',
              type: 'analysis',
              description: 'Connect to G2 Enterprise API endpoint',
              prompt: 'I need to fetch customer reviews from G2 and validate the data structure',
              tags: [
                {
                  id: 'api-1',
                  name: 'API Integration',
                  description: 'Connects to G2 Enterprise API to fetch review data securely'
                },
                {
                  id: 'input-1',
                  name: 'Data Input',
                  description: 'Handles incoming review data from G2 platform'
                }
              ]
            }
          ]
        },
        {
          id: 'data-validation',
          name: 'Data Validation',
          description: 'Validate and clean collected data',
          stepNumber: 2,
          nodes: [
            {
              id: 'validator',
              name: 'Data Validator',
              type: 'validation',
              description: 'Validate incoming data structure',
              prompt: 'Check if the incoming data matches our required schema and clean it',
              tags: [
                {
                  id: 'validation-1',
                  name: 'Data Validation',
                  description: 'Ensures data quality and consistency'
                },
                {
                  id: 'quality-1',
                  name: 'Quality Check',
                  description: 'Performs automated quality assurance on review data'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'enrichment',
      name: 'Enrichment Group',
      description: 'Enhance data with additional information',
      stageNumber: 2,
      steps: [
        {
          id: 'metadata-enrichment',
          name: 'Metadata Enhancement',
          description: 'Add metadata to reviews',
          stepNumber: 1,
          nodes: [
            {
              id: 'metadata',
              name: 'Metadata Enrichment',
              type: 'enrichment',
              description: 'Add company size and industry data',
              prompt: 'Add additional company information like size and industry to each review',
              tags: [
                {
                  id: 'enrichment-1',
                  name: 'Data Enrichment',
                  description: 'Adds valuable context to review data'
                },
                {
                  id: 'metadata-1',
                  name: 'Metadata',
                  description: 'Manages additional data attributes for each review'
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  const handlePromptSubmit = async (prompt: string) => {
    if (!prompt.trim() || isGeneratingTags) return;
    
    setIsGeneratingTags(true);
    
    // Simulate AI generating tags
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newTags = [
      {
        id: uuidv4(),
        name: 'Generated Tag',
        description: 'AI-generated tag based on the prompt'
      }
    ];
    
    if (selectedNode && selectedStepData) {
      const updatedNodes = selectedStepData.nodes.map(node => {
        if (node.id === selectedNode) {
          return {
            ...node,
            tags: [...node.tags, ...newTags]
          };
        }
        return node;
      });
      
      // Update nodes state
      setNodes(prev => ({
        ...prev,
        [selectedNode]: {
          ...prev[selectedNode],
          tags: [...(prev[selectedNode]?.tags || []), ...newTags]
        }
      }));
    }
    
    setIsGeneratingTags(false);
  };

  const streamResponse = async (response: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      content: '',
      type: 'assistant',
      streaming: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    let currentText = '';
    for (let i = 0; i < response.length; i++) {
      currentText += response[i];
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, content: currentText }
            : msg
        )
      );
      await new Promise(resolve => setTimeout(resolve, 20));
    }
    
    setMessages(prev => 
      prev.map(msg => 
        msg.id === newMessage.id 
          ? { ...msg, streaming: false }
          : msg
      )
    );
    setIsStreaming(false);
  };

  const handleQuerySubmit = async (query: string) => {
    if (!query.trim() || isStreaming) return;
    
    setIsStreaming(true);
    setMessages(prev => [...prev, {
      id: uuidv4(),
      content: query,
      type: 'user'
    }]);
    setCurrentQuery('');
    
    const sampleResponse = "Based on the analysis of G2 Enterprise Reviews for June 2024, there are several key insights:\n\n1. Enterprise security has become a primary selection factor, with 45% of technical decision makers prioritizing security features.\n\n2. API capabilities are increasingly driving technical evaluation, showing a 15% increase from the previous quarter.\n\n3. Integration depth is becoming more critical, with 38% of reviews mentioning integration capabilities.";
    
    await streamResponse(sampleResponse);
  };

  const selectedStageData = stages.find(s => s.id === selectedStage);
  const selectedStepData = selectedStageData?.steps.find(s => s.id === selectedStep);
  const selectedNodeData = selectedStepData?.nodes.find(n => n.id === selectedNode);

  return (
    <div className="min-h-screen bg-neutral-900">
      <Tabs defaultValue="report">
        <Header />
        
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <TabsContent value="report" className="mt-0">
            <div className="flex gap-6 h-[calc(100vh-8rem)]">
              <ReportAssistant
                messages={messages}
                currentQuery={currentQuery}
                isStreaming={isStreaming}
                onQueryChange={setCurrentQuery}
                onQuerySubmit={handleQuerySubmit}
              />
              <ReportView />
            </div>
          </TabsContent>

          <TabsContent value="workflow" className="mt-0">
            <div className="flex gap-6">
              <WorkflowStages
                stages={stages}
                selectedStage={selectedStage}
                selectedStep={selectedStep}
                onStageSelect={setSelectedStage}
                onStepSelect={setSelectedStep}
              />
              
              <div className="flex-1 min-w-0">
                {selectedStage && selectedStageData && !selectedStep && (
                  <StageDetails 
                    stage={selectedStageData}
                    onStepSelect={setSelectedStep}
                  />
                )}

                {selectedStage && selectedStep && selectedStepData && (
                  <div className="glass-panel">
                    <div className="flex justify-between items-start mb-6 p-6">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="stage-number">
                            {selectedStepData.stepNumber}
                          </span>
                          <h2 className="text-xl font-semibold text-white">
                            {selectedStepData.name}
                          </h2>
                        </div>
                        <p className="text-neutral-400">
                          {selectedStepData.description}
                        </p>
                      </div>
                      <button className="btn btn-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Node
                      </button>
                    </div>
                    
                    <div className="px-6 pb-6">
                      <NodeList
                        nodes={selectedStepData.nodes || []}
                        selectedNode={selectedNode}
                        onNodeSelect={setSelectedNode}
                      />
                    </div>
                  </div>
                )}
              </div>

              {selectedNode && selectedNodeData && (
                <NodeEditor
                  node={selectedNodeData}
                  editingTagId={editingTagId}
                  isGeneratingTags={isGeneratingTags}
                  onClose={() => setSelectedNode(null)}
                  onEditTag={setEditingTagId}
                  onPromptSubmit={handlePromptSubmit}
                />
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}