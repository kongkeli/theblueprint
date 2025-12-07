import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "HUGGINGFACE_API_KEY is missing." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => null);
    const idea = body?.idea?.trim();

    if (!idea || idea.length < 5) {
      return NextResponse.json(
        { error: "Please write a longer idea description." },
        { status: 400 }
      );
    }

    const hf = new HfInference(apiKey);

    const systemInstruction = `
    You are a senior software architect.
    Your task is to generate a JSON blueprint for a software idea.
    
    CRITICAL RULES:
    1. Output ONLY valid JSON.
    2. Do NOT include any text before or after the JSON.
    3. Do NOT use markdown code blocks.
    `;
    const userPrompt = `
    Idea: "${idea}"
    
    Generate a JSON object with this EXACT structure:
    {
      "featureList": ["feature1", "feature2", "feature3"],
      "techStack": {
        "frontend": "name of tech",
        "backend": "name of tech",
        "database": "name of tech",
        "auth": "name of tech",
        "hosting": "name of tech"
      },
      "architecture": "High level description of data flow",
      "databaseSchema": "Description of tables/collections",
      "apiEndpoints": ["GET /example", "POST /example"],
      "timeline": ["Week 1: ...", "Week 2: ..."],
      "risks": ["risk 1", "risk 2"],
      "folderStructure": "A string representation of the file tree (e.g. src/components/Header.tsx\\nsrc/api/...)",
      "mermaidDiagram": "A valid Mermaid.js graph string. IMPORTANT: Use simple node IDs without spaces, and put the text labels in brackets. Example: graph TD; A[Frontend] --> B[Backend API]; B --> C[Database];"
    }
    `;

    const response = await hf.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const text = response.choices[0].message.content || "";
    console.log("AI Output:", text); 

    let jsonStr = text.trim();
    jsonStr = jsonStr.replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '');

    let blueprint;
    try {
      blueprint = JSON.parse(jsonStr);
    } catch (err) {
      console.error("JSON parse error:", err, "\nRaw output:", text);
      return NextResponse.json(
        { error: "AI returned invalid JSON. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ blueprint });

  } catch (err: any) {
    console.error("Hugging Face Error:", err);
    
    if (err.message && (err.message.includes("loading") || err.message.includes("503"))) {
        return NextResponse.json(
            { error: "Model is warming up. Please try again in 10 seconds." },
            { status: 503 }
          );
    }

    return NextResponse.json(
      { error: "Failed to generate blueprint." },
      { status: 500 }
    );
  }
}