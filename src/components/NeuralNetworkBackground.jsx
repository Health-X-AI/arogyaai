import { useState } from "react";

export function NeuralNetworkBackground(){
  // Generate the random graph data only once on mount
  const [graphData] = useState(() => {
    const nodeCount = 60; // Number of dots
    const width = 800;
    const height = 800;
    const radius = 350; // Keep points inside this circle radius
    const connectionDistance = 120; // Max distance to draw a line
    
    const nodes = [];
    const links = [];
    
    // 1. Generate Nodes in a Circle
    for (let i = 0; i < nodeCount; i++) {
      // Random polar coordinates for circular distribution
      const r = Math.sqrt(Math.random()) * radius;
      const theta = Math.random() * 2 * Math.PI;
      
      nodes.push({
        x: width / 2 + r * Math.cos(theta),
        y: height / 2 + r * Math.sin(theta),
        id: i
      });
    }
    
    // 2. Generate Links based on distance
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          links.push({
            x1: nodes[i].x,
            y1: nodes[i].y,
            x2: nodes[j].x,
            y2: nodes[j].y,
            key: `${i}-${j}`
          });
        }
      }
    }

    return { nodes, links };
  });
  
  return (
    <div className="neural-spinner-container">
      <svg 
        viewBox="0 0 800 800" 
        xmlns="http://www.w3.org/2000/svg"
        className="neural-svg"
        >
        {/* Draw Lines */}
        {graphData.links.map(link => (
          <line
          key={link.key}
          x1={link.x1}
          y1={link.y1}
          x2={link.x2}
          y2={link.y2}
          stroke="#000000"
          strokeWidth="0.5"
          opacity="1"
          />
        ))}
        {/* Draw Nodes */}
        {graphData.nodes.map((node, i) => (
          <circle
          key={i}
          cx={node.x}
          cy={node.y}
          r="3"
          fill="#000000"
          />
        ))}
      </svg>
    </div>
  );
};
