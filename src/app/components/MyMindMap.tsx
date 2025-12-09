'use client';

import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Controls,
  Background,
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { XMarkIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface StructureItem {
  id: string;
  title: string;
  messages: string[];
}

interface ProjectDetail {
    name: string;
    structure: StructureItem[];
}

const createFlowElements = (data: ProjectDetail) => {
  if (!data || !data.structure) return { initialNodes: [], initialEdges: [] };

  const centerNodeId = 'ROOT';
  const centerNodeName = data.name;

  const initialNodes: Node[] = [
    {
      id: centerNodeId,
      position: { x: 0, y: 0 },
      data: { label: centerNodeName },
      type: 'default',
      style: { background: '#3b82f6', color: 'white', fontWeight: 'bold', borderRadius: '10px', padding: '15px' },
    },
  ];

  const initialEdges: Edge[] = [];
  const radius = 200;

  data.structure.forEach((item: StructureItem, index: number) => {
    const angle = (index / data.structure.length) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    initialNodes.push({
      id: item.id,
      position: { x: x, y: y },
      data: { 
        label: item.title, 
        messages: item.messages,
        title: item.title 
      },
      type: 'default',
      style: { background: '#fef3c7', border: '1px solid #f59e0b', padding: '10px' },
    });

    initialEdges.push({
      id: `e${centerNodeId}-${item.id}`,
      source: centerNodeId,
      target: item.id,
      animated: true,
      style: { stroke: '#9ca3af' },
    });
  });

  return { initialNodes, initialEdges };
};


interface MyMindMapProps {
  projectSlug: string;
}

const MyMindMap: React.FC<MyMindMapProps> = ({ projectSlug }) => {
  
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNodeData, setSelectedNodeData] = useState<{ title: string; messages: string[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/projects?slug=${projectSlug}`);
            if (!res.ok) {
                console.error(`Failed to fetch project details for slug: ${projectSlug}`);
                throw new Error('Failed to fetch project details');
            }
            
            const data: ProjectDetail = await res.json();
            
            const { initialNodes, initialEdges } = createFlowElements(data);
            setNodes(initialNodes);
            setEdges(initialEdges);

        } catch (error) {
            console.error("Error loading project details:", error);
            setNodes([]);
            setEdges([]);
        } finally {
            setIsLoading(false);
            setSelectedNodeData(null); 
        }
    };
    
    if (projectSlug) {
        fetchProjectDetails();
    }
  }, [projectSlug]); 

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);
  const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    if (node.data.messages) {
      setSelectedNodeData({ 
        title: node.data.title, 
        messages: node.data.messages 
      });
    }
  };

  return (
    <div className="w-full h-full relative">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full text-lg text-gray-500 dark:text-gray-400">
          프로젝트 상세 데이터를 불러오는 중...
        </div>
      ) : nodes.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full text-lg text-red-500 dark:text-red-400">
          데이터를 불러오지 못했습니다.
        </div>
      ) : (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView 
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      )}

      {selectedNodeData && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-30">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-lg w-full shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedNodeData(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition"
              title="나가기"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h3 className="text-2xl font-bold mb-4 flex items-center text-blue-600 dark:text-blue-400">
              <BookOpenIcon className="h-6 w-6 mr-2" />
              {selectedNodeData.title}
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {selectedNodeData.messages.map((msg, index) => (
                <p key={index} className="border-l-4 border-gray-200 dark:border-gray-700 pl-3 py-1">
                  {msg}
                </p>
              ))}
            </div>
            
            <button 
                onClick={() => setSelectedNodeData(null)} 
                className="mt-6 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
                나가기
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyMindMap;