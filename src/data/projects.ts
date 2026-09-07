export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projectList: Project[] = [
  {
    title: "F1Tenth Autonomous Racing Platform",
    description: "Autonomous racecar algorithms implemented using ROS and Python. Implemented LiDAR-based obstacle detection, reactive gap-finding, and pure pursuit path tracking.",
    tags: ["Python", "ROS", "LiDAR", "Robotics", "NumPy"],
    githubUrl: "https://github.com/EthanRVillanueva"
  },
  {
    title: "Reversi AI Engine",
    description: "Game engine and minimax AI bot with alpha-beta pruning and heuristic board evaluation for the classic board game Reversi (Othello).",
    tags: ["Java", "JUnit", "Algorithms", "Game Theory"],
    githubUrl: "https://github.com/EthanRVillanueva"
  },
  {
    title: "Relational Vehicle Management System",
    description: "Full-stack inventory and maintenance tracking system with custom relational database schema, ACID transaction guarantees, and complex analytical SQL queries.",
    tags: ["PostgreSQL", "SQL", "Python", "Flask"],
    githubUrl: "https://github.com/EthanRVillanueva"
  },
  {
    title: "Network Graph Visualizer",
    description: "Interactive graph analysis tool implementing Dijkstra's, A*, and BFS/DFS algorithms with real-time performance benchmarks and visualization.",
    tags: ["JavaScript", "HTML5 Canvas", "Data Structures"],
    githubUrl: "https://github.com/EthanRVillanueva"
  }
];
