export type ArchNode = { id: string; label: string; kind?: "source" | "process" | "store" | "serve" };
export type ArchEdge = { from: string; to: string };
export type Architecture = { nodes: ArchNode[]; edges: ArchEdge[] };

export type Role = {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  status: "running" | "shipped";
  headline: string;
  impacts: string[];
  bullets: string[];
  stack: string[];
  architecture: Architecture;
};

export const roles: Role[] = [
  {
    id: "humanitarians",
    company: "Humanitarians.ai",
    role: "AI Engineer",
    location: "Remote",
    start: "2026-02",
    end: "present",
    status: "running",
    headline: "Building data + retrieval infra for Mycroft — open-source multi-agent LLM framework.",
    impacts: ["RAG infra", "pgvector", "multi-agent LLM"],
    bullets: [
      "Architecting the data infrastructure powering Humanitarians.ai's agentic systems — building ingestion, embedding, and retrieval pipelines that feed LLM agents with grounded, real-time context.",
      "Designing vector + relational hybrid stores for long-context retrieval, evaluation harnesses, and feedback loops so model outputs are measurable, reproducible, and continually improving.",
      "Owning the AI data lifecycle end-to-end: source contracts, schema governance, lineage, and observability across structured, unstructured, and embedding data.",
      "Partnering with research and product to ship features where the bottleneck is data quality, not model capability — turning messy inputs into trustworthy AI outcomes.",
    ],
    stack: ["Python", "LangGraph", "OpenAI", "pgvector", "PostgreSQL", "Airflow", "dbt", "AWS", "Docker"],
    architecture: {
      nodes: [
        { id: "src", label: "Docs / APIs", kind: "source" },
        { id: "ing", label: "Ingest + Chunk", kind: "process" },
        { id: "emb", label: "Embeddings", kind: "process" },
        { id: "vec", label: "pgvector", kind: "store" },
        { id: "agent", label: "LLM Agents", kind: "serve" },
      ],
      edges: [
        { from: "src", to: "ing" },
        { from: "ing", to: "emb" },
        { from: "emb", to: "vec" },
        { from: "vec", to: "agent" },
      ],
    },
  },
  {
    id: "aris",
    company: "Aris Insights",
    role: "Founding Data Engineer",
    location: "Boston, MA",
    start: "2025-06",
    end: "2026-02",
    status: "shipped",
    headline: "Shipped 5TB+ payment data + retrieval infra powering LLM SQL and anomaly detection.",
    impacts: ["5TB+ ingested", "99.5% uptime", "80% reporting cut"],
    bullets: [
      "Automated ingestion of 5TB+ payment datasets from API and file sources into S3 (Parquet), building multi-tenant ELTL pipelines in Python with Airflow-orchestrated scheduling, pagination, rate-limit handling, and SDLC best practices — achieving 99.5% uptime.",
      "Transformed raw data at scale using PySpark/SparkSQL on EMR, tuning Spark jobs for low-latency performance with optimized partitioning; reinforced by AWS Lambda quality gates and a pipeline observability dashboard monitoring freshness, volume anomalies, and schema changes — reducing silent failures by 60%.",
      "Designed a star-schema dimensional model in ClickHouse with bronze/silver/gold dbt transformations, building reusable macros, incremental and materialized view strategies, and partition-optimized storage for low-latency retrieval across 10+ merchant warehouses.",
      "Cut release cycles by 50% with CI/CD pipelines using GitHub Actions and Terraform, automating dbt deployments, schema migrations, and environment provisioning across dev and production.",
      "Built a semantic layer in PostgreSQL with Product and the AI engineer — defining data contracts, business metrics, and entity relationships that enabled LLM-powered SQL generation and AI-assisted anomaly detection, cutting manual reporting by 80%.",
    ],
    stack: ["Python", "Airflow", "PySpark", "EMR", "S3", "ClickHouse", "dbt", "PostgreSQL", "GitHub Actions", "Terraform", "LLM"],
    architecture: {
      nodes: [
        { id: "api", label: "APIs / Files", kind: "source" },
        { id: "s3", label: "S3 (Parquet)", kind: "store" },
        { id: "spark", label: "PySpark / EMR", kind: "process" },
        { id: "dbt", label: "dbt bronze→gold", kind: "process" },
        { id: "ch", label: "ClickHouse", kind: "store" },
        { id: "sem", label: "Semantic + LLM", kind: "serve" },
      ],
      edges: [
        { from: "api", to: "s3" },
        { from: "s3", to: "spark" },
        { from: "spark", to: "dbt" },
        { from: "dbt", to: "ch" },
        { from: "ch", to: "sem" },
      ],
    },
  },
  {
    id: "slowrida",
    company: "SlowRida",
    role: "Data Engineer",
    location: "Boston, MA",
    start: "2025-02",
    end: "2025-05",
    status: "shipped",
    headline: "Snowflake pipelines: 1M+ trip records/day at sub-10-min latency for ML.",
    impacts: ["1M+ records/day", "sub-10-min latency", "+30% rec accuracy"],
    bullets: [
      "Eliminated manual intervention by architecting a pipeline processing 1M+ trip records/day, configuring Snowpipe with AUTOINGEST and S3 event notifications (SQS) for sub-10-minute latency into Snowflake — backed by Glue for schema discovery and Lambda validation.",
      "Developed dbt models and Python transformations in Snowflake with schema evolution tracking, automated data quality checks, and freshness monitoring — reducing downstream data issues by 25% and saving 5+ hours/week through optimized geospatial processing.",
      "Translated ambiguous business questions into dimensional models and KPIs, building interactive Tableau and Power BI dashboards that boosted route-optimization efficiency by 25%.",
      "Built an LLM-powered recommendation system using a RAG pipeline with embedding generation, vector search, and latency-optimized retrieval over 1M+ Snowflake records — improving recommendation accuracy by 30%.",
    ],
    stack: ["Snowflake", "Snowpipe", "AWS Glue", "Lambda", "dbt", "Python", "Tableau", "Power BI", "RAG"],
    architecture: {
      nodes: [
        { id: "trips", label: "Trip events", kind: "source" },
        { id: "s3", label: "S3 + SQS", kind: "store" },
        { id: "pipe", label: "Snowpipe", kind: "process" },
        { id: "sf", label: "Snowflake", kind: "store" },
        { id: "dbt", label: "dbt + QA", kind: "process" },
        { id: "bi", label: "BI + RAG", kind: "serve" },
      ],
      edges: [
        { from: "trips", to: "s3" },
        { from: "s3", to: "pipe" },
        { from: "pipe", to: "sf" },
        { from: "sf", to: "dbt" },
        { from: "dbt", to: "bi" },
      ],
    },
  },
  {
    id: "corpack",
    company: "CorPack Solutions",
    role: "Data Engineer",
    location: "Mumbai, IN",
    start: "2021-01",
    end: "2023-01",
    status: "shipped",
    headline: "Unified 7+ data sources into AWS data lake — 40% faster queries, org-wide BI.",
    impacts: ["7+ sources unified", "40% faster queries", "90% fewer metric errors"],
    bullets: [
      "Built an AWS data lake on S3, Glue, and Redshift with Python ingestion scripts integrating 7+ data sources (ERP, billing, CRM) — eliminating manual dependencies.",
      "Optimized Redshift warehouse performance with star-schema design, sort/dist key tuning, and workload management — improving query speeds by 40% and cutting storage costs by 25%.",
      "Modeled stakeholder KPIs into dimensional schemas (star/snowflake) using SQL-driven transformations — reducing metric discrepancies by 90%.",
      "Built Tableau and Power BI dashboards on financial datasets surfacing revenue trends, margin variance, and cost analytics; owned ad-hoc reporting for finance and operations.",
    ],
    stack: ["AWS Redshift", "S3", "Glue", "Python", "SQL", "Tableau", "Power BI"],
    architecture: {
      nodes: [
        { id: "src", label: "ERP · CRM · Billing", kind: "source" },
        { id: "ing", label: "Python ingest", kind: "process" },
        { id: "lake", label: "S3 + Glue", kind: "store" },
        { id: "rs", label: "Redshift star", kind: "store" },
        { id: "bi", label: "Tableau / PBI", kind: "serve" },
      ],
      edges: [
        { from: "src", to: "ing" },
        { from: "ing", to: "lake" },
        { from: "lake", to: "rs" },
        { from: "rs", to: "bi" },
      ],
    },
  },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  href: string;
  period: string;
  language: string;
  featured?: boolean;
  architecture?: Architecture;
};

export const projects: Project[] = [
  {
    id: "eventlens",
    name: "EventLens",
    tagline: "Full-Stack AI event recommendation platform",
    description:
      "FastAPI + Streamlit + LangGraph/OpenAI RAG pipeline delivering contextual event suggestions over 1M+ records scraped via Selenium, BeautifulSoup, and Apify into Snowflake. Snowflake Cortex for classification, vector similarity for dedup (+95% coverage). Dockerized with GitHub Actions CI/CD.",
    stack: ["FastAPI", "Streamlit", "LangGraph", "OpenAI", "Snowflake Cortex", "Docker", "GitHub Actions"],
    href: "https://github.com/saiyam155",
    period: "Jan 2025 – Apr 2025",
    language: "Python",
    featured: true,
    architecture: {
      nodes: [
        { id: "scrape", label: "Selenium / Apify", kind: "source" },
        { id: "sf", label: "Snowflake", kind: "store" },
        { id: "cortex", label: "Cortex Classify", kind: "process" },
        { id: "rag", label: "LangGraph RAG", kind: "process" },
        { id: "ui", label: "Streamlit", kind: "serve" },
      ],
      edges: [
        { from: "scrape", to: "sf" },
        { from: "sf", to: "cortex" },
        { from: "cortex", to: "rag" },
        { from: "rag", to: "ui" },
      ],
    },
  },
  {
    id: "collisions",
    name: "Vehicle Collisions Data Warehouse",
    tagline: "20M+ records · Kimball star-schema · Talend ETL",
    description:
      "Cleaned, profiled, and transformed 20M+ collision records from 3 cities in SQL Server. Designed a Kimball star-schema with Talend ETL pipelines and built Power BI / Tableau dashboards with DAX measures surfacing collision trends.",
    stack: ["SQL Server", "Talend", "Power BI", "Tableau", "DAX"],
    href: "https://github.com/saiyam155",
    period: "Aug 2024 – Dec 2024",
    language: "SQL",
    architecture: {
      nodes: [
        { id: "cities", label: "3 City Sources", kind: "source" },
        { id: "sql", label: "SQL Server", kind: "store" },
        { id: "talend", label: "Talend ETL", kind: "process" },
        { id: "star", label: "Star Schema", kind: "store" },
        { id: "bi", label: "Power BI / Tableau", kind: "serve" },
      ],
      edges: [
        { from: "cities", to: "sql" },
        { from: "sql", to: "talend" },
        { from: "talend", to: "star" },
        { from: "star", to: "bi" },
      ],
    },
  },
];

export const skills: { category: string; items: string[]; highlight?: boolean }[] = [
  { category: "ai-llm", items: ["LangGraph", "pgvector", "RAG", "OpenAI", "LLM SQL", "Vector Search", "Embedding Pipelines"], highlight: true },
  { category: "languages", items: ["Python", "SQL", "Java", "C/C++", "FastAPI", "Flask"] },
  { category: "etl-orchestration", items: ["dbt", "Apache Airflow", "Kafka", "PySpark", "SparkSQL", "Talend", "Airbyte"] },
  { category: "warehouses-databases", items: ["Snowflake", "ClickHouse", "AWS Redshift", "Databricks", "PostgreSQL", "MySQL", "SQL Server"] },
  { category: "cloud-infra", items: ["AWS S3", "Glue", "Lambda", "EMR", "Athena", "EC2", "Azure", "GCP", "Hadoop"] },
  { category: "devops", items: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "Jenkins", "Git", "Agile Scrum"] },
  { category: "bi-viz", items: ["Tableau", "Power BI", "AWS QuickSight", "Plotly", "Dash"] },
];

export const kpis = [
  { label: "Data ingested", value: 5, suffix: "TB+", sub: "payment datasets @ Aris", color: "green" as const, source: "Aris Insights", trend: "up" as const },
  { label: "Pipeline uptime", value: 99.5, suffix: "%", sub: "Airflow + observability gates", decimals: 1, color: "cyan" as const, source: "Aris Insights", trend: "flat" as const },
  { label: "Records / day", value: 1, suffix: "M+", sub: "Snowpipe → Snowflake", color: "green" as const, source: "SlowRida", trend: "up" as const },
  { label: "Manual reporting cut", value: 80, suffix: "%", sub: "via LLM-powered semantic layer", color: "purple" as const, source: "Aris Insights", trend: "up" as const },
];

export const contact = {
  email: "saiyamndoshi@gmail.com",
  phone: "(857) 396-4471",
  linkedin: "https://linkedin.com/in/saiyam-doshi",
  github: "https://github.com/saiyam155",
  location: "Boston, MA",
};
