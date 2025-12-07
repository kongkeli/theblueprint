"use client";

import { motion } from "framer-motion";

type Props = {
  onSelect: (idea: string) => void;
  disabled?: boolean;
};

const suggestions = [
  "A SaaS tool for freelancers to track clients, invoices, and projects with analytics.",
  "A mobile budgeting app for students with notifications and saving goals.",
  "A web platform where small local shops can manage inventory and get low-stock alerts.",
  "A task management app for dev teams with code-linked tasks and Git integration.",
  "An AI-powered note-taking app that turns meeting notes into action items and timelines.",
];

export function PromptSuggestions({ onSelect, disabled }: Props) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {suggestions.map((text, i) => (
        <motion.button
          key={text}
          type="button"
          onClick={() => !disabled && onSelect(text)}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-300 shadow-sm transition hover:border-indigo-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled}
        >
          {text}
        </motion.button>
      ))}
    </div>
  );
}
