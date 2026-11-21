import { PortfolioData } from './types';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: "Anil Kumar Rout",
    moniker: "Anil404",
    tagline: "Building intelligent things with code.",
    credential: "B.Tech CSE (AI & ML) // Available for Sprints",
    subHeadline: "ENGINEERING HIGH-THROUGHPUT DISTRIBUTED SYSTEMS, FOUNDATION MODELS & COMPUTATIONAL NEUROSCIENCE",
    aboutBio: "I am Anil Kumar Rout (Anil404), a Software Engineer and AI Researcher pursuing B.Tech in Computer Science and Engineering with a specialization in Artificial Intelligence & Machine Learning. My work converges at the intersection of deep generative models, scalable distributed architectures, and computational neuroscience. Driven by building resilient, autonomous systems that solve high-dimensional complexity.",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZAE5gRpeqaIGuoA7ysi889vzpxyml1Wx1Y0KWOtrekyAd7mPpcC0Z6F1Qw0vHcTwmTelNWlbcRPEryc_nMzdPjkmaqFutd92c3HzLX2AybdqRT0cSP8WZkjFboxgxSYHypMdwWpunTvHH20RLhLNJNFQhnKATtUxtM2cRUaw3kZncZ_fp2sY6u7LLwIYiuMKKw0qBH8t424FljruOy2x3Jhjk01bfWcNI3h4aIYi1",
    email: "anil@neuralmesh.dev",
    location: "Bhubaneswar / Remote",
    stats: [
      { label: "B.Tech", value: "CSE (AI & ML)" },
      { label: "15+", value: "AI & Full-Stack Projects" },
      { label: "99.9%", value: "Pipeline Uptime" },
      { label: "Top 1%", value: "Algorithms & Systems" }
    ]
  },
  socials: [
    {
      id: "soc_github",
      platform: "github",
      label: "GitHub",
      url: "https://github.com/anil404",
      enabled: true
    },
    {
      id: "soc_twitter",
      platform: "twitter",
      label: "Twitter / X",
      url: "https://x.com/anil404",
      enabled: true
    },
    {
      id: "soc_linkedin",
      platform: "linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com/in/anilkumarrout",
      enabled: true
    },
    {
      id: "soc_instagram",
      platform: "instagram",
      label: "Instagram",
      url: "https://instagram.com/anil404",
      enabled: true
    },
    {
      id: "soc_email",
      platform: "email",
      label: "Work Email",
      url: "mailto:anil@neuralmesh.dev",
      enabled: true
    }
  ],
  techStack: [
    // Row 1
    {
      id: "tech_python",
      slug: "python",
      name: "Python",
      category: "ai",
      categoryLabel: "AI / Scientific",
      badgeColor: "#3776AB",
      iconName: "terminal",
      summary: "Primary language for deep learning research, scientific computing & distributed pipeline orchestration.",
      marqueeRow: 1,
      order: 1,
      description: "Python serves as the backbone for machine learning models, neuro-computational simulations, and asynchronous system workers. Extensively tuned with Cython, NumPy vectorization, and C-bindings for maximal throughput.",
      whyUsed: "De-facto ecosystem for modern AI research, PyTorch tensor graph compilation, and rapid microservice prototyping.",
      architectureRole: "Core research runtime, model training loops, multi-agent reasoning graphs, and data pre-processing pipelines.",
      keyFeatures: ["Asynchronous asyncio workers", "NumPy & SciPy mathematical vectorization", "Torch C++ extension bindings", "FastAPI microservices"],
      associatedProjectIds: ["proj_neuropulse", "proj_omnimesh"],
      experienceYears: "4+ Years",
      status: "core"
    },
    {
      id: "tech_pytorch",
      slug: "pytorch",
      name: "PyTorch",
      category: "ai",
      categoryLabel: "Deep Learning",
      badgeColor: "#EE4C2C",
      iconName: "smart_toy",
      summary: "Dynamic computational graph framework powering Transformer models, EEG anomaly detection & latent embeddings.",
      marqueeRow: 1,
      order: 2,
      description: "Deep learning framework used to architect custom neural layers, attention heads, and real-time inference pipelines. Utilized with mixed precision (AMP) and CUDA kernels to achieve sub-10ms EEG spectral classification.",
      whyUsed: "Dynamic eager execution, seamless CUDA GPU acceleration, and rich ecosystem for custom gradient backpropagation.",
      architectureRole: "Custom Transformer encoder/decoder blocks, latent representation learning, and time-series Fourier analysis.",
      keyFeatures: ["Custom Autograd Function implementation", "FlashAttention & KV-cache optimization", "TorchScript JIT serialization", "DistributedDataParallel multi-GPU routines"],
      associatedProjectIds: ["proj_neuropulse"],
      experienceYears: "3+ Years",
      status: "core"
    },
    {
      id: "tech_nextjs",
      slug: "nextjs",
      name: "Next.js 15",
      category: "fullstack",
      categoryLabel: "App Router / SSR",
      badgeColor: "#FFFFFF",
      iconName: "web",
      summary: "Production-grade React framework powering high-throughput SSR, streaming WebGL viewports & edge CMS.",
      marqueeRow: 1,
      order: 3,
      description: "The primary full-stack web framework leveraging React 19 Server Components, Turbopack, partial pre-rendering, and streaming UI. Delivers ultra-low TTFB and instant ISR cache invalidation across distributed edge nodes.",
      whyUsed: "Unrivaled developer velocity, granular caching control, zero-waterfall server data fetching, and native Bun runtime support.",
      architectureRole: "Studio Control Center CMS, real-time client HUDs, telemetry graphs, and edge API proxies.",
      keyFeatures: ["Server Actions with optimistic UI updates", "Partial Pre-rendering (PPR)", "Dynamic Route Parallelism", "Next.js Turbopack compilation"],
      associatedProjectIds: ["proj_neuropulse", "proj_omnimesh"],
      experienceYears: "3+ Years",
      status: "production"
    },
    {
      id: "tech_typescript",
      slug: "typescript",
      name: "TypeScript",
      category: "fullstack",
      categoryLabel: "Type-Safe",
      badgeColor: "#3178C6",
      iconName: "code",
      summary: "Strict type safety across full-stack API boundaries, database schemas, and spatial state engines.",
      marqueeRow: 1,
      order: 4,
      description: "Enforces end-to-end type soundness across client components, database contracts, and RPC protocols. Prevents runtime anomalies and accelerates complex refactoring in distributed multi-agent systems.",
      whyUsed: "Eliminates type mismatch bugs at compile-time and enables automated documentation of data contracts.",
      architectureRole: "Schema validation, generic typed state stores, and Supabase database entity definitions.",
      keyFeatures: ["Strict null checks & discriminating unions", "Type inference from SQL schemas via Supabase CLI", "Branded types for ID safety", "Zero runtime overhead"],
      associatedProjectIds: ["proj_neuropulse", "proj_aetherdb", "proj_omnimesh"],
      experienceYears: "3+ Years",
      status: "core"
    },
    {
      id: "tech_supabase",
      slug: "supabase",
      name: "Supabase",
      category: "data",
      categoryLabel: "Edge / Auth / pgvector",
      badgeColor: "#3ECF8E",
      iconName: "database",
      summary: "PostgreSQL database tier with Row Level Security, pgvector HNSW indexing & S3-compatible asset storage.",
      marqueeRow: 1,
      order: 5,
      description: "Cloud database platform providing real-time data change broadcasting, token-based authentication, and ultra-fast vector similarity search for multi-modal embeddings and CMS storage.",
      whyUsed: "Combines the rock-solid reliability of Postgres with modern developer APIs, edge functions, and built-in vector storage.",
      architectureRole: "High-dimensional vector embeddings, admin session security, asset bucket storage, and real-time portfolio updates.",
      keyFeatures: ["HNSW vector index with cosine distance", "Row Level Security (RLS) policies", "Supabase Storage with automatic CDN caching", "Realtime WebSocket change subscriptions"],
      associatedProjectIds: ["proj_neuropulse", "proj_aetherdb"],
      experienceYears: "2+ Years",
      status: "core"
    },
    {
      id: "tech_cuda",
      slug: "cuda",
      name: "CUDA",
      category: "systems",
      categoryLabel: "Kernel Acceleration",
      badgeColor: "#76B900",
      iconName: "speed",
      summary: "Low-level GPU compute routines accelerating matrix transformations, parallel FFTs & tensor math.",
      marqueeRow: 1,
      order: 6,
      description: "Hardware acceleration interface enabling parallel thread block execution for neural activations and high-throughput vector cosine similarities directly on NVIDIA tensor cores.",
      whyUsed: "Orders-of-magnitude performance gains over CPU execution for high-dimensional matrix tensor operations.",
      architectureRole: "Accelerated neural inference, batched FFT decomposition, and parallel embeddings clustering.",
      keyFeatures: ["Shared memory tiling optimizations", "Asynchronous memory copies with CUDA Streams", "Warp-level shuffle primitives", "Mixed FP16/BF16 precision execution"],
      associatedProjectIds: ["proj_neuropulse"],
      experienceYears: "2+ Years",
      status: "core"
    },
    {
      id: "tech_postgresql",
      slug: "postgresql",
      name: "PostgreSQL",
      category: "data",
      categoryLabel: "Relational & Vector",
      badgeColor: "#336791",
      iconName: "storage",
      summary: "ACID-compliant relational engine augmented with pgvector for billion-scale similarity indexing.",
      marqueeRow: 1,
      order: 7,
      description: "Primary transactional data store managing telemetry records, relational case study graphs, and vector similarity manifolds.",
      whyUsed: "Battle-tested reliability, extensibility via custom extensions, and predictable performance under high concurrent loads.",
      architectureRole: "Persistent storage of system entities, audit logs, and hybrid relational-vector queries.",
      keyFeatures: ["pgvector extension integration", "Advanced JSONB indexing with GIN", "Materialized views for instant aggregates", "ACID transactional guarantees"],
      associatedProjectIds: ["proj_aetherdb", "proj_neuropulse"],
      experienceYears: "3+ Years",
      status: "production"
    },
    {
      id: "tech_docker",
      slug: "docker",
      name: "Docker",
      category: "systems",
      categoryLabel: "Microservices",
      badgeColor: "#2496ED",
      iconName: "grid_view",
      summary: "Reproducible containerization for training rigs, sandboxed agent execution & microservices.",
      marqueeRow: 1,
      order: 8,
      description: "Standardized container environment encapsulating CUDA drivers, Python virtual environments, and system binaries for seamless local-to-cloud parity.",
      whyUsed: "Eliminates 'works on my machine' anomalies and enables isolated sandboxes for untrusted agent code execution.",
      architectureRole: "Agent execution sandboxes, multi-service local development stacks, and CI/CD artifact building.",
      keyFeatures: ["Multi-stage minimal Alpine/Debian builds", "GPU pass-through with nvidia-container-toolkit", "Isolated container networks", "Deterministic environment freezing"],
      associatedProjectIds: ["proj_aetherdb", "proj_omnimesh"],
      experienceYears: "3+ Years",
      status: "production"
    },

    // Row 2
    {
      id: "tech_tensorflow",
      slug: "tensorflow",
      name: "TensorFlow",
      category: "ai",
      categoryLabel: "Neural Nets",
      badgeColor: "#FF6F00",
      iconName: "model_training",
      summary: "End-to-end machine learning platform used for production model quantization, TF Lite edge deployment & graph optimization.",
      marqueeRow: 2,
      order: 9,
      description: "Complementary deep learning platform leveraged for post-training quantization (INT8), TF-Lite edge inference, and legacy model interoperability.",
      whyUsed: "Mature production serving ecosystem (TF Serving) and cross-platform mobile/embedded runtimes.",
      architectureRole: "Model quantization, mobile edge compilation, and distributed benchmark verification.",
      keyFeatures: ["Post-training INT8 quantization", "TensorFlow Lite compilation", "XLA optimizing compiler", "SavedModel cross-platform export"],
      associatedProjectIds: ["proj_neuropulse"],
      experienceYears: "2+ Years",
      status: "active"
    },
    {
      id: "tech_tailwind",
      slug: "tailwind",
      name: "Tailwind CSS",
      category: "fullstack",
      categoryLabel: "Design Tokens",
      badgeColor: "#38BDF8",
      iconName: "palette",
      summary: "Utility-first CSS engine implementing the brutalist Obsidian Kinetic design system and hardware curves.",
      marqueeRow: 2,
      order: 10,
      description: "Utility-driven styling architecture customized with the Obsidian Kinetic palette, pill silhouettes, fluid clamp typography, and high-specular glass refraction effects.",
      whyUsed: "Zero-runtime CSS overhead, fluid responsive breakpoints, and strict design token standardization.",
      architectureRole: "Interface theme tokens, glowing jewel wells, responsive grids, and micro-interactions.",
      keyFeatures: ["Custom design token variables", "GPU-accelerated backdrop blur filters", "Fluid clamp() typography scaling", "Infinite CSS keyframe marquees"],
      associatedProjectIds: ["proj_neuropulse", "proj_omnimesh"],
      experienceYears: "3+ Years",
      status: "core"
    },
    {
      id: "tech_graphql",
      slug: "graphql",
      name: "GraphQL",
      category: "fullstack",
      categoryLabel: "Federation",
      badgeColor: "#E535AB",
      iconName: "hub",
      summary: "Declarative schema querying and federated API gateways across distributed services.",
      marqueeRow: 2,
      order: 11,
      description: "Strongly-typed query language providing precise data fetching, real-time subscriptions, and unified graph access over heterogeneous services.",
      whyUsed: "Prevents over-fetching on mobile networks and unifies multiple data sources under a single schema.",
      architectureRole: "Federated query routing, real-time telemetry subscriptions, and graph explorer tools.",
      keyFeatures: ["Type-safe schema definition (SDL)", "Realtime WebSocket subscriptions", "Query complexity validation", "Dataloader N+1 query batching"],
      associatedProjectIds: ["proj_aetherdb"],
      experienceYears: "2+ Years",
      status: "active"
    },
    {
      id: "tech_redis",
      slug: "redis",
      name: "Redis",
      category: "systems",
      categoryLabel: "In-Memory Cache",
      badgeColor: "#DC382D",
      iconName: "memory",
      summary: "Sub-millisecond in-memory data store for telemetry caching, distributed locks & Pub/Sub message queues.",
      marqueeRow: 2,
      order: 12,
      description: "High-performance key-value cache deployed ahead of the database layer to cache query results, rate-limit incoming API traffic, and orchestrate agent tasks via Redis Streams.",
      whyUsed: "Microsecond read/write latencies and versatile data structures (sorted sets, hyperloglogs, streams).",
      architectureRole: "API rate limiting, real-time session caching, distributed mutex locking, and transient vector buffers.",
      keyFeatures: ["Redis Streams pub/sub queuing", "Atomic transactions with MULTI/EXEC", "TTL auto-eviction policies", "Memory-efficient hashes"],
      associatedProjectIds: ["proj_aetherdb"],
      experienceYears: "3+ Years",
      status: "core"
    },
    {
      id: "tech_rust",
      slug: "rust",
      name: "Rust",
      category: "systems",
      categoryLabel: "Systems & WASM",
      badgeColor: "#DEA584",
      iconName: "precision_manufacturing",
      summary: "Zero-cost abstractions and memory safety without garbage collection for high-throughput query routing.",
      marqueeRow: 2,
      order: 13,
      description: "Systems programming language used to construct core vector routing primitives, parallel tokenizers, and WebAssembly modules where deterministic memory management is imperative.",
      whyUsed: "Fearless concurrency, zero-cost abstractions, and guaranteed memory safety without garbage collection pauses.",
      architectureRole: "HNSW graph search routing engine, streaming tokenizer pipelines, and high-performance micro-kernels.",
      keyFeatures: ["Borrow checker memory safety", "SIMD vector instructions", "Tokio asynchronous I/O runtime", "Zero-copy deserialization with Serde"],
      associatedProjectIds: ["proj_aetherdb"],
      experienceYears: "2+ Years",
      status: "core"
    },
    {
      id: "tech_huggingface",
      slug: "huggingface",
      name: "HuggingFace",
      category: "ai",
      categoryLabel: "Transformers / Hub",
      badgeColor: "#FFD21E",
      iconName: "auto_awesome",
      summary: "Model hub, tokenizers & Transformer pipelines for pre-trained weights, quantization & LoRA adapter merging.",
      marqueeRow: 2,
      order: 14,
      description: "Ecosystem for state-of-the-art open weights, parameter-efficient fine-tuning (PEFT), and fast Rust-backed tokenizers.",
      whyUsed: "Rapid access to cutting-edge open foundation models and standardized pipeline wrappers.",
      architectureRole: "Base LLM model downloads, dataset streaming, and PEFT adapter merging pipelines.",
      keyFeatures: ["Fast Rust-based Tokenizers", "PEFT LoRA/QLoRA adapter training", "Accelerate multi-GPU dispatch", "Optimum ONNX runtime compilation"],
      associatedProjectIds: ["proj_neuropulse", "proj_omnimesh"],
      experienceYears: "3+ Years",
      status: "core"
    },
    {
      id: "tech_langchain",
      slug: "langchain",
      name: "LangChain",
      category: "ai",
      categoryLabel: "Agent Orchestration",
      badgeColor: "#1C3C3C",
      iconName: "psychology",
      summary: "Autonomous agent execution graphs, recursive reasoning chains & tool-augmented synthesis.",
      marqueeRow: 2,
      order: 15,
      description: "Framework used in tandem with LangGraph to model deterministic cyclic agent state machines that self-evaluate code outputs, execute unit tests, and resolve pull requests autonomously.",
      whyUsed: "Structured state graph modeling and flexible tool calling integrations with LLM providers.",
      architectureRole: "Agent swarm coordination, memory management, and deterministic decision trees.",
      keyFeatures: ["LangGraph stateful cyclic execution", "Custom tool integration sandboxes", "Dynamic prompt chaining", "Structured JSON output schema enforcement"],
      associatedProjectIds: ["proj_omnimesh"],
      experienceYears: "2+ Years",
      status: "core"
    },
    {
      id: "tech_kafka",
      slug: "kafka",
      name: "Apache Kafka",
      category: "systems",
      categoryLabel: "Event Streaming",
      badgeColor: "#231F20",
      iconName: "stream",
      summary: "Distributed event streaming platform for handling high-volume telemetry ingestion and log replay.",
      marqueeRow: 2,
      order: 16,
      description: "Fault-tolerant messaging backbone handling partitioned streams of telemetry events, audit logs, and asynchronous worker dispatch.",
      whyUsed: "High-throughput sequential disk writes, partition scalability, and distributed replay capabilities.",
      architectureRole: "Sensor event ingestion pipelines, multi-service event bus, and reliable message ordering.",
      keyFeatures: ["Partition-based horizontal scale", "Zero-copy network transfers", "Exactly-once processing semantics", "Retention and log compaction"],
      associatedProjectIds: ["proj_aetherdb"],
      experienceYears: "2+ Years",
      status: "active"
    }
  ],
  projects: [
    {
      id: "proj_neuropulse",
      slug: "neuropulse-engine",
      title: "NeuroPulse Engine",
      category: "AI / Computational Neuroscience",
      categoryTag: "AI / Computational Neuroscience",
      summary: "Real-time neural signal decomposition and transformer-based EEG anomaly detection pipeline.",
      description: "Real-time neural signal decomposition and transformer-based EEG anomaly detection pipeline built with Next.js, PyTorch & Supabase. Processes streaming bio-telemetry at sub-10ms latency with Fourier spectral analysis and custom attention mechanisms.",
      problemStatement: "Traditional EEG classification algorithms suffer from high latency and inability to generalize across non-stationary neural time-series data, hindering real-time seizure and cognitive spike detection.",
      architectureDetails: "Engineered an asynchronous pipeline combining Fast Fourier Transform (FFT) preprocessing with a custom lightweight 1D-CNN and Transformer encoder. Deployed with PyTorch CUDA kernels on the backend, streaming decomposed frequency bands to a Next.js 15 WebGL canvas at 120 FPS via WebSockets.",
      techStackTags: ["Next.js 15", "PyTorch", "Supabase", "TypeScript", "Tailwind CSS", "CUDA", "Python"],
      githubUrl: "https://github.com/anil404/neuropulse-engine",
      liveUrl: "https://neuropulse.anil404.dev",
      metrics: [
        { label: "LATENCY", value: "<10MS" },
        { label: "ACCURACY", value: "98.4%" },
        { label: "STREAM", value: "120 FPS" }
      ],
      images: [
        {
          id: "np_img_1",
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvkvHXhhNhY7XEQy_0XW4ukG95trlXLjYraM1tCqPU5QxRuNlQDux8_hcQlJTpvNb-bt93gs7zh1s2zz1zpVvcyZp1ZoIF1VMqXFuvdsQZPQAUk1_2JcaOGf_wMx_pkEEw6fPooWtJFMKlFc0LLyw07wkbztbVnbNip-VKYQd-A9kYap8wipZ8hvwwYKyS030tok4WRpPuryovWD9l1w_f2FDXL9dOAP_achixaiZ4",
          caption: "Signal Decomposition // FFT Spectral Bands",
          type: "sub_1"
        },
        {
          id: "np_img_2",
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxvms-h6s7aXC74N1pjzyPbSShCgPGYZ87CPhQ-VDjHzJUEKtmOfn0eymojKhL3KslFNrMHkCUwOmXS9fvIQXXGtLKywvfF7-Lc5sc0VyR_ukGKdCr3ppom2APok5xD0-z0EErW5J7KdyR2DfWBArPZdgpcu-SRJoxjeqehOYm8u6_LnAjVyxW3nsyNrLblFyHUfllB9WlIpqEBV9-cy4QfgHnO4WAnSIY3hJoiyr-",
          caption: "Transformer Latent Attention Weights",
          type: "sub_2"
        },
        {
          id: "np_img_3",
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZjngTy6E_jY-s-sZAU0DytJCUW91YE3_L1uivtvHDgPv0pVDlcxQiC2Kj_GQWO8Mj2K7zLdJtItJh3FdK10j-NB-i3cJ8IeWFnnuhPnpLU4oecOhoLzT0u9tP04YvMqOzFHHnhx7wJTdgc8aR8YmqCpt3OsveRrSlhaqtDzNk5bc_V33sJqRb7-8V4KRMQyIY5nVvB7HLdJzfQDhfVTLqq5lKDNcRfuTRt6jYim5p",
          caption: "Real-Time Next.js 15 Telemetry Cockpit",
          type: "main"
        }
      ],
      published: true,
      featured: true
    },
    {
      id: "proj_aetherdb",
      slug: "aetherdb-vector-router",
      title: "AetherDB Vector Router",
      category: "Distributed Systems / Search",
      categoryTag: "Distributed Systems / Search",
      summary: "Distributed semantic search gateway with HNSW indexing and low latency.",
      description: "Distributed semantic search gateway and multi-modal embedding store optimized with HNSW indexing and low-latency edge inference for million-scale corpus retrieval. Implemented in Rust and PostgreSQL with Docker.",
      problemStatement: "Searching across multi-modal high-dimensional vectors at scale often leads to memory bottlenecks and degraded query throughput on conventional relational databases.",
      architectureDetails: "Developed a distributed vector router in Rust featuring hierarchical navigable small world (HNSW) graph quantization, layered Redis LRU caching, and an automated shard rebalancing daemon communicating across PostgreSQL pgvector replicas.",
      techStackTags: ["PostgreSQL", "Docker", "Redis", "Rust", "pgvector", "GraphQL", "Apache Kafka"],
      githubUrl: "https://github.com/anil404/aetherdb-vector-router",
      liveUrl: "https://aetherdb.anil404.dev",
      metrics: [
        { label: "SCALE", value: "1M CORPUS" },
        { label: "QUERY", value: "0.8MS P99" },
        { label: "REPLICAS", value: "8 REGIONS" }
      ],
      images: [
        {
          id: "adb_img_1",
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbUdVLlEVHqj66BJy11P3YProDwRFp2LegE1ztSYMc0DojZsQJbMOOt24WRn0lp50d1VEWPE6wV7sCvp3vcIAgNslKFm7fho7up4NB6EgaZG43UlaSvmMgGn8VxzGy0E762O9-H5p1r72CsAL7JAkjZNMF8o6orXM6Rv6S-U4KMb7q2BDxcWUWTd2Vhfkn6POQ17h5ZNDyrN8gurOKmnmYsVjTIf--rzV2b1xLqipp",
          caption: "HNSW Graph Cluster Map & Quantized Vectors",
          type: "sub_1"
        },
        {
          id: "adb_img_2",
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdmSKjlrCxEZ_4OYY4wfJ0fqnLXYR27O_4psWk5vnOrPcOI4hiIhaI_6BPGdMSMlgrN8EyjL1_WZ-CEfmaj-w0j64pzE2SoFmpLCmbykXVddefHifjEXvUNISVYJ5nS-hFIUVW3TtRvRGipO1XQGWJq0aJTRx0vG7D-tckzy2x460p_B8GLrJrghLkQIntBL147N1e1bz95JUAPSu5p2FSp7TQ8Lah88vmYNr24S-4",
          caption: "Multi-Region Sharding Topology & Edge Proxies",
          type: "sub_2"
        },
        {
          id: "adb_img_3",
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB10yLY7BohHUn_2oQQP_0Ls_fWgLBTHAEtVLFyGChuDEwJTFQxkQEpfXanWRwWz2RbqJjckdPMUw5dF9SFHLceEB3ZpeYUyAad2L-Bnkk5jbcQL_cf9kJsF_mbDRKzSiEwGpX2e_b1eD62G4E9tAydnCUyUl0NzKFW7uvS-U24WCF8a3RScdBjfxA1rCnZpdvvFOEQ4tu2ibe1DAPxZvFa75kBs6awwbGVk3M7qmCN",
          caption: "Sub-Millisecond Query Routing Visualizer",
          type: "main"
        }
      ],
      published: true,
      featured: true
    },
    {
      id: "proj_omnimesh",
      slug: "omnimesh-agents",
      title: "OmniMesh Autonomous Agents",
      category: "Multi-Agent Systems / LLM",
      categoryTag: "Multi-Agent Systems / LLM",
      summary: "Multi-agent orchestration framework for autonomous codebase synthesis.",
      description: "Multi-agent orchestration framework for autonomous codebase synthesis, deterministic test validation, self-healing pull requests, and automated zero-downtime deployment pipelines.",
      problemStatement: "Single-agent LLM systems lack rigorous verification loops and frequently generate hallucinated APIs, breaking production codebases when making cross-module alterations.",
      architectureDetails: "Constructed an autonomous swarm system using LangGraph and Python where architect, coder, and auditor agents work collaboratively. Integrated with isolated Docker sandbox containers to run test suites, inspect AST diffs, and perform self-healing git commits prior to user review.",
      techStackTags: ["LangChain", "Python", "Docker", "Next.js 15", "HuggingFace", "Tailwind CSS"],
      githubUrl: "https://github.com/anil404/omnimesh-agents",
      liveUrl: "https://omnimesh.anil404.dev",
      metrics: [
        { label: "SWARM", value: "ACTIVE" },
        { label: "HEALING", value: "94.2% PASS" },
        { label: "ISOLATION", value: "DOCKER SANDBOX" }
      ],
      images: [
        {
          id: "om_img_1",
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW_RlERe2e4GycWg2IntYItgdswTQK9XCl5AAJ2C2aULMXjPMVizwx0fwmsDnVfG45etfSx5CDMhJP3ofmNPmXFcDq0AkjGcm94eP6nE590y6qH5ENmt7ERlI1UPQlwm3GvH-WA_VW6YRi3BGRjvipYAUoX_q_83MIww2CoLYSo310o3yP4fxoqBFbWsBmblETnRiCz528b2a_dn1fwsq_lYAqsGTaUJt1lsy80WJR",
          caption: "Agent State Graph & Reasoning Loops",
          type: "sub_1"
        },
        {
          id: "om_img_2",
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmhJye2UB_6UFZxD7lPuNP0xog-7H7gGWQuAdONgovzc2JvdRZW9fO-CLDn6tJU1-fvEOnL2yXrAPUJ_JMt2jVle6ch9Lpqmy0gNdPpT4mOYTsdNkEJ4t3Xcng5iKdF6WqUhCI_-qSuLa9w9gfp-_2Y6UxYMlwbDhZPzQPCkvprd-lgngCh0A7ASKbuKMl76uTf1i3yZ7mbqyxJ558c0ZvPFWV5cOgWz3tSeCvwiX8",
          caption: "Deterministic Sandbox Test Execution Rig",
          type: "sub_2"
        },
        {
          id: "om_img_3",
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpPfL4Nv5bp_FWXL8Yipqc76QDx7qELB84yRwRDpb7bcoNiNjcJ5S7rEUlkifFk-nZPqCIWTcO1RtzCle3e4c5LKM_k7HCPzv1VOJ4utlrZ3TdTDHEZfwyqhP1TuEJ1coGty6k-7tnXboLxsSMDUH8TMVcs11z4Uzh1CYBSVFRACvZMeq2eqoStilWmxIB2GXFAIcevc1SBAeasJyIZ-iP7EdWEVM-hH5DqWdD_7kq",
          caption: "Swarm Orchestration Cockpit & Live Telemetry",
          type: "main"
        }
      ],
      published: true,
      featured: true
    }
  ],
  capabilities: [
    {
      id: "cap_1",
      number: "01",
      title: "Artificial Intelligence & Deep Learning",
      description: "PyTorch, Transformers, LLM fine-tuning (LoRA/QLoRA), computer vision architectures, LangChain, HuggingFace pipelines, and custom loss functions.",
      tags: ["PyTorch", "HuggingFace", "LoRA", "Transformers"],
      icon: "smart_toy"
    },
    {
      id: "cap_2",
      number: "02",
      title: "Machine Learning & Data Systems",
      description: "Scikit-learn, distributed training routines, feature stores, Vector DBs (pgvector, Pinecone, Milvus), Pandas, NumPy, and high-dimensional clustering.",
      tags: ["Vector DB", "pgvector", "NumPy", "HNSW"],
      icon: "dataset"
    },
    {
      id: "cap_3",
      number: "03",
      title: "Full-Stack Architecture",
      description: "Next.js (App Router), TypeScript, React, Tailwind CSS, deterministic state machines, WebSockets streaming, and serverless edge functions.",
      tags: ["Next.js 15", "TypeScript", "React", "Tailwind"],
      icon: "web"
    },
    {
      id: "cap_4",
      number: "04",
      title: "Backend & Cloud Infrastructure",
      description: "Supabase, PostgreSQL, Docker containers, Redis caching layers, resilient microservices, REST & GraphQL APIs, and automated CI/CD deployment pipelines.",
      tags: ["Supabase", "Docker", "Redis", "Postgres"],
      icon: "dns"
    },
    {
      id: "cap_5",
      number: "05",
      title: "Computational Neuroscience & Research",
      description: "Neural dynamics modeling, bio-inspired algorithms, spike-timing dependent plasticity simulations, and quantitative neural waveform signal processing.",
      tags: ["Bio-AI", "Neural Dynamics", "FFT", "BCI"],
      icon: "psychology_alt"
    }
  ],
  academic: {
    degree: "Bachelor of Technology in Computer Science & Engineering",
    specialization: "Artificial Intelligence & Machine Learning",
    status: "In Pursuit // Engineering Honours",
    honours: "Engineering Honours",
    coreFocus: [
      "Deep Learning & Neural Computing",
      "Distributed Systems & Fault-Tolerant Architectures",
      "Computational Neuroscience & Bio-Inspired AI",
      "Advanced Data Structures & Algorithm Optimization"
    ],
    researchInitiatives: [
      "Autonomous Multi-Agent Orchestration Frameworks",
      "Vector Search & Quantized Low-Latency Embeddings",
      "Transformer Inference Optimizations (FlashAttention, KV Caching)",
      "Brain-Computer Interface (BCI) Signal Simulations"
    ]
  }
};
