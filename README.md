#  The Blueprint: AI Software Architect

> **Turn rough ideas into actionable engineering plans in seconds.**


##  Overview

The Blueprint is a full-stack Next.js application designed to bridge the gap between an "app idea" and "technical execution."

Instead of spending days planning database schemas and architectures, users simply input a concept. The system uses **Generative AI (Llama 3)** to instantly compile a professional technical specification document.

** Design Inspiration:**
The project's name and visual identity—specifically the deep electric blue intro sequence and architectural lines—pay homage to **Jay-Z's legendary album _The Blueprint_**. It merges the precision of software architecture with the iconic aesthetics of the legendary album.

## Key Features

* Instant Architecture: Generates feature lists, tech stacks, and risk assessments instantly.
* Live System Diagrams: Automatically renders **Mermaid.js** flowcharts to visualize system architecture and data flow.
* File Structure Generation: Outputs a complete project file tree (folder structure) ready for scaffolding.
* Iconic UI: A custom "Intro Sequence" featuring the "blue compass" aesthetic inspired by Jay-Z's album art.
* Export Ready:One-click **"Export to Markdown"** feature to easily copy the plan into GitHub READMEs, Notion, or Jira.
* Robust Error Handling:Smart parsing logic to clean and repair AI-generated JSON and Mermaid syntax errors.

##  Tech Stack

This project was built using the latest modern web technologies:

* Framework: [Next.js 14](https://nextjs.org/) (App Router, Server Actions)
* Language: [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
* AI Model: [Meta Llama 3](https://llama.meta.com/) (via Hugging Face Inference API)
* Styling: [Tailwind CSS](https://tailwindcss.com/)
* Animations: [Framer Motion](https://www.framer.com/motion/) (Complex transitions & intro)
* Visualization: [Mermaid.js](https://mermaid.js.org/) (Diagram rendering)
* Icons: [Lucide React](https://lucide.dev/)

## Screenshots

I have add some screenshots.

##  How It Works

1.  **Input:** The user selects a template (SaaS, E-commerce, Crypto) or types a custom idea.
2.  **Processing:** The app sends a highly engineered prompt to the **Llama 3** model, enforcing a strict JSON schema output.
3.  **Visualization:**
    * The JSON response is parsed.
    * The `folderStructure` is rendered as a code block.
    * The `mermaidDiagram` string is cleaned and rendered into an SVG flowchart.
4.  **Output:** The user gets a complete blueprint that can be exported.

##  Getting Started

Clone the repository and run the development server:

```bash
git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME
npm install
