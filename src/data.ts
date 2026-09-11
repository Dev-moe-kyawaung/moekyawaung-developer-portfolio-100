export const quantum = {
  name: "Moe Kyaw Aung",
  handle: "QUANTUM_ARCHITECT",
  title: "Senior Android Engineer · Quantum Systems",
  location: "Tachileik ↔ Bangkok",
  email: "moekyawaung@programmer.net",
  github: "https://github.com/Dev-moe-kyawaung",
  avatar: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778527878/IMG_20260430_053105_uef0yr.png",
  wave: "ψ(x,t) = A·e^(i(kx-ωt))",
};

export const qubits = [
  { id: 1, name: "Social Dashboard", state: "|1⟩", prob: 0.97, color: "#00f0ff", connections: [2, 3] },
  { id: 2, name: "POS Ultimate", state: "|1⟩", prob: 0.99, color: "#ff00a0", connections: [1, 4, 5] },
  { id: 3, name: "Video Player", state: "|1⟩", prob: 0.95, color: "#00ff88", connections: [1, 6] },
  { id: 4, name: "Translator AI", state: "|0⟩", prob: 0.88, color: "#8b5cf6", connections: [2] },
  { id: 5, name: "Lens Lite", state: "|1⟩", prob: 0.92, color: "#ffaa00", connections: [2] },
  { id: 6, name: "Game Collection", state: "|1⟩", prob: 0.96, color: "#ff00a0", connections: [3] },
];

export const entanglements = [
  { source: 1, target: 2, strength: 0.95 },
  { source: 2, target: 4, strength: 0.88 },
  { source: 1, target: 3, strength: 0.82 },
  { source: 3, target: 6, strength: 0.79 },
  { source: 2, target: 5, strength: 0.91 },
];

export const architectureNodes = [
  { id: "chassis", label: "Chassis", x: 0, y: 0, z: 0, type: "core" },
  { id: "feature", label: "Features", x: -2, y: 1, z: 1, type: "module" },
  { id: "domain", label: "Domain", x: 0, y: 2, z: 2, type: "core" },
  { id: "data", label: "Data", x: 2, y: 1, z: 1, type: "module" },
  { id: "core", label: "Core", x: 0, y: -1, z: -1, type: "utility" },
  { id: "ui", label: "UI", x: -1, y: 0, z: 0, type: "surface" },
  { id: "sync", label: "Sync", x: 1, y: 0, z: 0, type: "utility" },
];

export const waveFunctions = [
  { n: "Kotlin", amplitude: 0.97, phase: 0, c: "#00f0ff" },
  { n: "Compose", amplitude: 0.95, phase: 45, c: "#ff00a0" },
  { n: "Clean Arch", amplitude: 0.96, phase: 90, c: "#8b5cf6" },
  { n: "Hilt", amplitude: 0.91, phase: 135, c: "#00ff88" },
  { n: "Firebase", amplitude: 0.92, phase: 180, c: "#ffaa00" },
  { n: "CI/CD", amplitude: 0.93, phase: 225, c: "#00f0ff" },
  { n: "TFLite", amplitude: 0.86, phase: 270, c: "#ff00a0" },
  { n: "Security", amplitude: 0.88, phase: 315, c: "#8b5cf6" },
];

export const matrixLog = [
  "[ψ] Wave function initialized...",
  "[ℏ] Planck constant set: 6.626e-34",
  "[∫] Superposition: 42 modules active",
  "[⚡] Entanglement: CI/CD ↔ Tests",
  "[◈] Collapsing to production state...",
  "[✓] Deployment eigenvalue: 99.98%",
];

export const observables = [
  { operator: "Ĥ (Hamiltonian)", eigenvalue: "10M+ users", uncertainty: "±0.02%" },
  { operator: "Ŝ (Ship operator)", eigenvalue: "43 apps", uncertainty: "±0" },
  { operator: "T̂ (Test operator)", eigenvalue: "5,400+", uncertainty: "±8" },
  { operator: "Ĉ (Coverage)", eigenvalue: "92%", uncertainty: "±1.5%" },
];
