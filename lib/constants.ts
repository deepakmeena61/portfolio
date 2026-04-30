export const PERSONAL = {
  name: "Deepak Meena",
  shortLogo: "Deepak.",
  title: "Data Science / Applied AI / GenAI Engineer",
  location: "Washington D.C., USA",
  email: "meena.deepak2201@gmail.com",
  linkedin: "https://www.linkedin.com/in/deepakkumarmeena/",
  github: "https://github.com/deepakmeena61",
  philosophy:
    "I don't just build models, I build things that make someone's Tuesday a little easier.",
  heroTyping: "Data Science / Applied AI / GenAI Engineer | LLMs, RAG, ML Systems"
} as const;

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "offbeat", label: "Beyond Code" },
  { id: "contact", label: "Contact" }
] as const;

export const EXPERIENCE = [
  {
    period: "2023 - PRESENT",
    role: "Data Scientist",
    company: "Spirent Communications",
    description:
      "Applied ML, GenAI, and analytics at scale across telecom support data, delivering risk and revenue intelligence with measurable business impact."
  },
  {
    period: "2022",
    role: "Data Science Intern",
    company: "Rotor Technologies",
    description:
      "Built exploratory analytics for aviation and autonomy initiatives to surface actionable insights."
  },
  {
    period: "2020 - 2021",
    role: "Machine Learning Engineer",
    company: "Aliste Technologies",
    description:
      "Developed end-to-end ML features from model training to production deployment workflows."
  }
] as const;

export const SKILL_BANDS = [
  {
    label: "GenAI",
    shortLabel: "GenAI",
    color: "#a855f7",
    radius: 0.76,
    items: [
      "LLM Integration",
      "Prompt Engineering",
      "Retrieval-Augmented Generation (RAG)",
      "Vector Search",
      "Knowledge Graphs",
      "LLM Optimization",
      "Conversational AI Systems",
      "AI System Design"
    ]
  },
  {
    label: "ML Libraries",
    shortLabel: "ML",
    color: "#00d4ff",
    radius: 0.66,
    items: [
      "TensorFlow",
      "Keras",
      "PyTorch",
      "Scikit-learn",
      "OpenCV",
      "NLTK",
      "spaCy",
      "NumPy",
      "Seaborn",
      "Matplotlib"
    ]
  },
  {
    label: "Data Stores",
    shortLabel: "Data",
    color: "#14b8a6",
    radius: 0.62,
    items: [
      "Snowflake",
      "Redshift",
      "SQL Server",
      "PostgreSQL",
      "MongoDB",
      "DynamoDB",
      "Databricks",
      "Excel"
    ]
  },
  {
    label: "Big Data",
    shortLabel: "BigData",
    color: "#22c55e",
    radius: 0.6,
    items: ["Spark", "Airflow", "Hadoop", "MapReduce", "Hive", "Kafka", "Cassandra", "SnapLogic"]
  },
  {
    label: "Analytics & BI",
    shortLabel: "Analytics",
    color: "#f59e0b",
    radius: 0.72,
    items: [
      "Power BI",
      "Tableau",
      "QuickSight",
      "Qlik",
      "Looker",
      "Google Analytics",
      "Alteryx"
    ]
  },
  {
    label: "Languages",
    shortLabel: "Lang",
    color: "#ec4899",
    radius: 0.7,
    items: ["Python", "R", "Java", "C++", "Scala", "MATLAB"]
  },
  {
    label: "Web & APIs",
    shortLabel: "Web",
    color: "#6366f1",
    radius: 0.64,
    items: ["HTML", "CSS", "ReactJS", "Flask", "RESTful API", "Neo4j"]
  },
  {
    label: "Workflow",
    shortLabel: "Ops",
    color: "#06b6d4",
    radius: 0.58,
    items: ["Git"]
  }
] as const;

export const ALL_TECH = Array.from(
  new Set(SKILL_BANDS.flatMap((band) => band.items))
) as string[];

export const SKILL_BADGE_FOCUS = [
  "Python",
  "SQL",
  "R",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "NLP",
  "Computer Vision",
  "RAG",
  "LLM Integration",
  "Vector Search",
  "Prompt Engineering",
  "Redshift",
  "Snowflake",
  "Spark",
  "Airflow",
  "Tableau",
  "QuickSight",
  "Power BI"
] as const;

export const CERTIFICATIONS = ["Oracle Cloud Infrastructure 2024 Generative AI Professional"] as const;

export const ACHIEVEMENTS = [
  {
    title: "RAG Intelligence Workbench",
    detail:
      "Built a RAG-based competitive intelligence workbench delivering high-accuracy synthesized insights.",
    icon: "brain"
  },
  {
    title: "AI Risk Analyzer",
    detail:
      "Developed an AI-driven risk analyzer using K-means and Redshift ML to improve sales prioritization.",
    icon: "chart"
  },
  {
    title: "LLM Support Assistants",
    detail:
      "Created LLM assistants for support-case analysis to reduce post-launch issue volume and triage latency.",
    icon: "bot"
  },
  {
    title: "Revenue Opportunity Dashboards",
    detail:
      "Designed analytics dashboards that helped uncover more than $1M in business opportunities.",
    icon: "dollar"
  }
] as const;

export const HOBBIES = [
  {
    key: "soccer",
    accent: "#22c55e",
    title: "On the Pitch",
    description:
      "Regular player. There is nothing like the flow state of a good match - reading patterns and predicting moves. Not unlike training a model.",
    icon: "soccer"
  },
  {
    key: "trekking",
    accent: "#f59e0b",
    title: "Trail & Summit",
    description:
      "Mountains reset my perspective. Some of my best ideas have arrived after long climbs far from a cell signal.",
    icon: "mountain"
  },
  {
    key: "djing",
    accent: "#a855f7",
    title: "Evening Frequencies",
    description:
      "I mix everything - house, lo-fi, Bollywood, hip-hop - usually while cooking. The kitchen is my studio.",
    icon: "headphones"
  },
  {
    key: "cooking",
    accent: "#ef4444",
    title: "All Cuisines Welcome",
    description:
      "I experiment constantly. Indian, Thai, Italian, Mexican - if there is a recipe, I will test my own version.",
    icon: "flame"
  },
  {
    key: "journaling",
    accent: "#6366f1",
    title: "Thought Frequencies",
    description:
      "Some days I put thoughts on paper to process and reflect. Not every meaningful output needs a GPU.",
    icon: "journal"
  }
] as const;

export const FEATURED_REPOS = [
  {
    name: "Financial-Fraud-Detection",
    summary:
      "Fraud detection system on online payments data with engineered balance-inconsistency features, class balancing, and comparative modeling across Logistic Regression, Decision Tree, and Random Forest."
  },
  {
    name: "Image-Colorisation",
    summary:
      "Pix2Pix-style image colorisation using a U-Net generator + PatchGAN discriminator in LAB space, trained on a curated 15,000-image COCO subset with augmentation for realistic grayscale-to-color output."
  }
] as const;

export const REPO_DESCRIPTION_OVERRIDES: Record<string, string> = {
  "Financial-Fraud-Detection":
    "Notebook-based fraud detection pipeline on online payments data with transaction filtering, feature engineering, SMOTE balancing, and robust model validation.",
  "Image-Colorisation":
    "GAN-based image colourisation notebook using a U-Net generator and PatchGAN discriminator, with LAB color-space conversion and COCO-sample training data.",
  "Digit-Recognition":
    "TensorFlow/Keras CNN experiments on MNIST with normalization, architecture comparison, and validation/test accuracy tracking.",
  "Bank-Marketing-Prediction-System":
    "End-to-end marketing response prediction workflow with preprocessing, SMOTE balancing, custom logistic regression implementation, and model comparisons.",
  "Visual-Analysis-on-Beijing-Winter-Olympics-2022":
    "Interactive Olympics analytics using Tableau with joined datasets for athletes, medals, events, coaches, and hockey performance.",
  "Visual-Analysis-on-Online-Courses-from-Harvard-and-MIT":
    "RMarkdown-driven exploratory analysis of Harvard and MIT online course data, published as an HTML report with trend insights.",
  LeetCode: "Curated coding problem solutions and algorithm practice implementations in Python.",
  deepakmeena61: "Configuration repository for GitHub profile presentation and supporting files.",
  portfolio:
    "Frequencies v2.0 - a personality-driven 3D portfolio with interactive Three.js scenes, narrative chapters, and static Next.js export optimized for zero-cost Vercel hosting."
};

export const BIO_PARAGRAPHS = [
  "I am Deepak - a Data Science / Applied AI / GenAI Engineer based in Washington D.C.",
  "I turn messy, complex data into AI products that actually work in production. From classical ML to modern LLM and RAG systems, I care about building things that are reliable, measurable, and maintainable long after launch.",
  "Currently at Spirent Communications, where I work on scalable analytics, GenAI use cases, and tooling that helps teams ship with confidence.",
  "When I am not training models, you will find me on a soccer pitch, mixing beats in my kitchen while experimenting with a new recipe, hiking a trail somewhere, or journaling my thoughts at the end of a long day."
] as const;

export const SECTION_META = [
  { id: "hero", code: "FREQUENCY 001", name: "SIGNAL" },
  { id: "about", code: "FREQUENCY 002", name: "ABOUT" },
  { id: "experience", code: "FREQUENCY 003", name: "EXPERIENCE" },
  { id: "skills", code: "FREQUENCY 004", name: "SPECTRUM" },
  { id: "projects", code: "FREQUENCY 005", name: "OUTPUT" },
  { id: "achievements", code: "FREQUENCY 006", name: "RESONANCE" },
  { id: "offbeat", code: "FREQUENCY 007", name: "OFFBEAT" },
  { id: "resume", code: "FREQUENCY 008", name: "RESUME" },
  { id: "contact", code: "FREQUENCY 009", name: "CONNECT" }
] as const;
