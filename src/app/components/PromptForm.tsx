"use client";

import { useState, useEffect } from "react";

type Props = {
  onGenerate: (idea: string) => void;
  loading: boolean;
  value: string;
  onChange: (value: string) => void;
};

export function PromptForm({ onGenerate, loading, value, onChange }: Props) {
  const [localIdea, setLocalIdea] = useState("");

  useEffect(() => {
    setLocalIdea(value);
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localIdea.trim() || loading) return;
    onGenerate(localIdea.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-4 md:flex-row"
    >
      <textarea
        className="min-h-[120px] flex-1 rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-50 outline-none transition focus:border-indigo-400"
        placeholder='Describe your app idea, e.g. "A mobile budgeting app for students with analytics and notifications."'
        value={localIdea}
        onChange={(e) => {
          setLocalIdea(e.target.value);
          onChange(e.target.value);
        }}
      />
      <button
        type="submit"
        disabled={loading}
        className="h-[48px] rounded-2xl bg-indigo-500 px-5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60 md:self-end"
      >
        {loading ? "Generating..." : "Generate Blueprint"}
      </button>
    </form>
  );
}
