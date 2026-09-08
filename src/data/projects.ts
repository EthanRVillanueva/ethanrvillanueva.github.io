export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projectList: Project[] = [
  {
    title: "Mindmaply",
    description: "Winner of 'Best Use of Google Gemini API' at LeedsHack 2026. Conversations branch by topic into an interactive mind map rather than collapsing into one linear thread. Built the core Python conversation engine, graph data models, intent detection using vector embeddings and Gemini API prompts, and context scoping logic to keep model drift in check. Built in 24 hours with a team of four.",
    tags: ["Python", "Gemini API", "Vector Embeddings", "Graph Data Structures"],
    githubUrl: "https://github.com/Ethan-Villanueva/LeedsHack2026"
  },
  {
    title: "Operating System Kernel Simulator",
    description: "Low-level OS simulator in C covering process management and CPU scheduling. Built a round-robin scheduler for multi-threaded task queues, implemented POSIX threads, mutexes, and semaphores to manage concurrency, and verified correctness by eliminating deadlocks and memory leaks with Valgrind.",
    tags: ["C", "POSIX Threads", "Linux/Unix", "Concurrency", "Valgrind"]
  },
  {
    title: "Forest Fire Prediction Models",
    description: "Machine learning research project predicting forest fire burn areas from meteorological data. Built linear regression and neural network models in Scikit-Learn, evaluated with k-fold cross-validation, and achieved an MSE of 0.058 with the neural network. Visualised dataset insights and model performance in Jupyter Notebook.",
    tags: ["Python", "Scikit-Learn", "Pandas", "Matplotlib", "Jupyter"]
  },
  {
    title: "Vehicle Management System",
    description: "Full-stack web app for vehicle and owner record management. Responsive frontend with async RESTful API calls, a Supabase PostgreSQL backend with relational tables, automated end-to-end integration tests with Playwright, and a performance and accessibility audit using Google Lighthouse.",
    tags: ["HTML", "CSS", "JavaScript", "PostgreSQL", "Supabase", "Playwright"]
  },
  {
    title: "Route Network Server",
    description: "Concurrent TCP/IP routing server in C using Berkeley sockets. Supports multiple simultaneous clients, runs Dijkstra's Algorithm over a custom graph library for real-time optimal path queries, and uses a custom client-server protocol with dynamic node and edge updates and persistent connection state.",
    tags: ["C", "TCP/IP", "Berkeley Sockets", "Dijkstra's Algorithm", "Networking"]
  }
];
