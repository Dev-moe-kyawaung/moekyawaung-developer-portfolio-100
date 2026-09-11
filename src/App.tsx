import { useEffect, useRef, useState } from "react";
import { quantum, qubits, entanglements, architectureNodes, waveFunctions, matrixLog, observables } from "./data";

// Matrix Rain Effect
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = "01ψℏ∫∂∆◈⚡✓→←↑↓01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);
    
    const draw = () => {
      ctx.fillStyle = "rgba(3, 4, 6, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#00f0ff";
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 35);
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="matrix-container" />;
}

// Particle Field
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: { x: number; y: number; vx: number; vy: number; color: string }[] = [];
    const colors = ["#00f0ff", "#ff00a0", "#8b5cf6", "#00ff88"];
    
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Connect nearby particles
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.2 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(draw);
    };
    
    draw();
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    
    return () => window.removeEventListener("resize", resize);
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none opacity-60" />;
}

// AI Orb with particle bursts
function AIOrb({ onClick }: { onClick: () => void }) {
  const [bursting, setBursting] = useState(false);
  const [hover, setHover] = useState(false);
  
  const handleClick = () => {
    setBursting(true);
    setTimeout(() => setBursting(false), 1000);
    onClick();
  };
  
  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="fixed bottom-8 right-8 z-50 float-orb"
    >
      <div className={`relative w-20 h-20 rounded-full transition-all duration-500 ${hover ? 'scale-125' : ''}`}>
        {/* Core orb */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, #00f0ff, #0088aa 40%, #004455 100%)",
            boxShadow: hover 
              ? "0 0 60px rgba(0, 240, 255, 0.8), inset 0 0 30px rgba(0, 240, 255, 0.5)"
              : "0 0 30px rgba(0, 240, 255, 0.4), inset 0 0 20px rgba(0, 240, 255, 0.3)",
          }}
        />
        
        {/* Orbiting rings */}
        <div 
          className="absolute inset-[-10px] rounded-full border border-cyan-500/30"
          style={{ animation: "spin 8s linear infinite" }}
        />
        <div 
          className="absolute inset-[-20px] rounded-full border border-magenta-500/20"
          style={{ animation: "spin 12s linear infinite reverse" }}
        />
        
        {/* Burst particles */}
        {bursting && (
          <>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full burst-particle"
                style={{
                  background: i % 2 === 0 ? "#00f0ff" : "#ff00a0",
                  transform: `rotate(${i * 30}deg) translateX(40px)`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </>
        )}
        
        {/* Label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-cyan-400">
          QUANTUM_AI
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}

// Quantum Node Graph
function QuantumGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  
  const width = 600;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;
  
  const nodePositions = qubits.map((q, i) => {
    const angle = (i / qubits.length) * Math.PI * 2 - Math.PI / 2;
    const radius = 120;
    return {
      ...q,
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  });
  
  return (
    <div className="relative w-full h-full min-h-[400px]">
      <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        {/* Connection lines */}
        {entanglements.map((e, i) => {
          const source = nodePositions.find(n => n.id === e.source);
          const target = nodePositions.find(n => n.id === e.target);
          if (!source || !target) return null;
          
          return (
            <line
              key={i}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke={`rgba(0, 240, 255, ${e.strength * 0.5})`}
              strokeWidth={e.strength * 3}
              className="connection-line"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          );
        })}
        
        {/* Nodes */}
        {nodePositions.map((node) => (
          <g
            key={node.id}
            transform={`translate(${node.x}, ${node.y})`}
            className="cursor-pointer"
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <circle
              r={hovered === node.id ? 35 : 28}
              fill={`${node.color}22`}
              stroke={node.color}
              strokeWidth={2}
              className="node-pulse transition-all duration-300"
            />
            <circle
              r={8}
              fill={node.color}
              className="transition-all duration-300"
              style={{
                filter: hovered === node.id ? `drop-shadow(0 0 10px ${node.color})` : "none",
              }}
            />
            <text
              y={50}
              textAnchor="middle"
              fill="#e0f2f1"
              fontSize="10"
              fontFamily="monospace"
              className="transition-opacity duration-300"
              style={{ opacity: hovered === node.id ? 1 : 0.7 }}
            >
              {node.name}
            </text>
            <text
              y={-40}
              textAnchor="middle"
              fill={node.color}
              fontSize="12"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {node.state}
            </text>
          </g>
        ))}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 font-mono text-xs text-cyan-400/70">
        <div>Superposition: |ψ⟩ = α|0⟩ + β|1⟩</div>
        <div>Entanglement strength shown by line opacity</div>
      </div>
    </div>
  );
}

// 3D Architecture Visualization
function Architecture3D() {
  const [rotation, setRotation] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => r + 0.5);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  const project = (x: number, y: number, z: number) => {
    const scale = 800 / (800 + z * 50);
    return {
      x: 200 + x * 60 * scale,
      y: 150 + y * 40 * scale,
      scale,
    };
  };
  
  return (
    <div className="relative w-full h-[300px] perspective-[800px]">
      <div 
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        {architectureNodes.map((node) => {
          const pos = project(node.x, node.y, node.z);
          const isSelected = selected === node.id;
          
          return (
            <button
              key={node.id}
              onClick={() => setSelected(isSelected ? null : node.id)}
              className="absolute transition-all duration-300"
              style={{
                left: pos.x,
                top: pos.y,
                transform: `scale(${pos.scale}) ${isSelected ? 'scale(1.3)' : ''}`,
                zIndex: Math.floor(pos.scale * 100),
              }}
            >
              <div 
                className={`px-3 py-2 rounded border font-mono text-xs ${
                  isSelected 
                    ? 'bg-cyan-500/30 border-cyan-400 text-cyan-100' 
                    : 'bg-void-3/80 border-cyan-500/30 text-cyan-400/70'
                }`}
              >
                {node.label}
              </div>
              
              {isSelected && (
                <div className="absolute top-full mt-2 left-0 w-48 p-2 glass-quantum rounded text-xs">
                  <div className="text-cyan-400 mb-1">Type: {node.type}</div>
                  <div className="text-gray-400">Dependencies: 3 active</div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="absolute bottom-4 right-4 text-xs font-mono text-cyan-500/50">
        Rotating 3D topology
      </div>
    </div>
  );
}

// Wave Function Visualizer
function WaveFunctionViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = 400;
    canvas.height = 200;
    
    let t = 0;
    
    const draw = () => {
      ctx.fillStyle = "rgba(3, 4, 6, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      waveFunctions.forEach((wf, i) => {
        ctx.beginPath();
        ctx.strokeStyle = wf.c;
        ctx.lineWidth = 2;
        
        for (let x = 0; x < canvas.width; x += 2) {
          const y = 100 + Math.sin((x + t) * 0.02 + wf.phase * Math.PI / 180) * wf.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        ctx.stroke();
        
        // Draw label
        ctx.fillStyle = wf.c;
        ctx.font = "10px monospace";
        ctx.fillText(wf.n, 10, 20 + i * 15);
      });
      
      t += 2;
      requestAnimationFrame(draw);
    };
    
    draw();
  }, []);
  
  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full h-[200px] rounded-lg" />
      <div className="absolute top-2 right-2 font-mono text-xs text-cyan-400/50">
        |ψ(x,t)|² probability density
      </div>
    </div>
  );
}

// Main App
export default function App() {
  const [showAI, setShowAI] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  
  const handleAIClick = () => {
    setShowAI(true);
    setAiMessage("Analyzing quantum architecture state...");
    setTimeout(() => {
      setAiMessage("42 modules in superposition. Entanglement strength: 0.95. Ready to collapse to production.");
    }, 1500);
  };
  
  return (
    <div className="relative min-h-screen bg-void">
      {/* Background effects */}
      <MatrixRain />
      <ParticleField />
      
      {/* Grid overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      
      {/* Header */}
      <header className="relative z-10 p-6 border-b border-cyan-500/20 glass-quantum">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold fractal-text font-mono">
              {quantum.name}
            </h1>
            <p className="text-cyan-400/70 font-mono text-sm mt-1">
              {quantum.handle} · {quantum.title}
            </p>
          </div>
          <div className="text-right font-mono text-xs text-cyan-500/50">
            <div>ψ(x,t) = A·e^(i(kx-ωt))</div>
            <div className="mt-1">ℏ = 1.054 × 10⁻³⁴ J·s</div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto p-6 space-y-6">
        
        {/* Hero stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {observables.map((obs, i) => (
            <div key={i} className="glass-quantum rounded-lg p-4 border border-cyan-500/20">
              <div className="font-mono text-xs text-cyan-400/50 mb-1">{obs.operator}</div>
              <div className="text-2xl font-bold text-cyan-300">{obs.eigenvalue}</div>
              <div className="font-mono text-xs text-magenta-400/70 mt-1">Δ: {obs.uncertainty}</div>
            </div>
          ))}
        </div>
        
        {/* Quantum Graph */}
        <section className="glass-quantum rounded-xl p-6 border border-cyan-500/20">
          <h2 className="font-mono text-lg text-cyan-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Project Superposition Graph
          </h2>
          <QuantumGraph />
        </section>
        
        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Architecture 3D */}
          <section className="glass-quantum rounded-xl p-6 border border-cyan-500/20">
            <h2 className="font-mono text-lg text-cyan-400 mb-4">3D Module Topology</h2>
            <Architecture3D />
          </section>
          
          {/* Wave Functions */}
          <section className="glass-quantum rounded-xl p-6 border border-cyan-500/20">
            <h2 className="font-mono text-lg text-cyan-400 mb-4">Skill Wave Functions</h2>
            <WaveFunctionViz />
          </section>
        </div>
        
        {/* Matrix Log */}
        <section className="glass-quantum rounded-xl p-6 border border-cyan-500/20">
          <h2 className="font-mono text-lg text-cyan-400 mb-4">System Log</h2>
          <div className="font-mono text-sm space-y-1">
            {matrixLog.map((line, i) => (
              <div key={i} className="text-cyan-300/70">
                {line}
              </div>
            ))}
          </div>
        </section>
        
        {/* Contact */}
        <section className="glass-quantum rounded-xl p-6 border border-cyan-500/20 text-center">
          <h2 className="font-mono text-lg text-cyan-400 mb-4">Collapse to Contact State</h2>
          <a 
            href={`mailto:${quantum.email}`}
            className="inline-block px-8 py-3 bg-cyan-500/20 border border-cyan-400 rounded-lg text-cyan-300 font-mono hover:bg-cyan-500/30 transition-all"
          >
            {quantum.email}
          </a>
        </section>
      </main>
      
      {/* AI Orb */}
      <AIOrb onClick={handleAIClick} />
      
      {/* AI Panel */}
      {showAI && (
        <div className="fixed bottom-32 right-8 z-50 w-80 glass-quantum rounded-xl p-4 border border-cyan-400/50 quantum-glow">
          <div className="flex items-center justify-between mb-3">
            <div className="font-mono text-cyan-400 text-sm">QUANTUM_AI v3.0</div>
            <button 
              onClick={() => setShowAI(false)}
              className="text-cyan-500/50 hover:text-cyan-400"
            >
              ×
            </button>
          </div>
          <div className="font-mono text-sm text-cyan-100/80 leading-relaxed">
            {aiMessage}
          </div>
          <div className="mt-3 flex gap-2">
            {["modules", "tests", "deploy"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => setAiMessage(`Executing ${cmd}... State vector normalized.`)}
                className="px-3 py-1 text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400 hover:bg-cyan-500/20"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
