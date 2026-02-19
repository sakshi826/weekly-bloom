import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Sparkles, TrendingUp, Calendar } from "lucide-react";
import { getUserId } from "../lib/auth";
import { saveJournalEntry } from "../lib/db";

const WeeklyReflection = () => {
  const [entry, setEntry] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const userId = getUserId();
    if (userId && entry.trim()) {
      setIsSaving(true);
      try {
        await saveJournalEntry(userId, {
          content: entry.trim(),
          prompt: "Weekly Reflection",
          logged_at: new Date().toISOString(),
        });
        setIsSaved(true);
      } catch (error) {
        console.error("Failed to save reflection:", error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (isSaved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
          <Check className="w-10 h-10 text-primary" strokeWidth={3} />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Reflection Saved!</h2>
          <p className="text-muted-foreground mt-2 max-w-xs">Acknowledging your weekly journey helps you grow. Well done.</p>
        </div>
        <Button
          variant="outline"
          onClick={() => { setIsSaved(false); setEntry(""); }}
          className="rounded-full px-8"
        >
          Check in again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-10 py-8 px-4 animate-in fade-in duration-700">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-3 h-3" />
          Weekly Bloom
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">How was your week?</h1>
        <p className="text-muted-foreground text-lg italic">"Looking back with kindness clarifies the path forward."</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Sparkles, label: "Highlights", color: "text-amber" },
          { icon: TrendingUp, label: "Growth Points", color: "text-emerald" }
        ]?.map((item) => (
          <div key={item.label} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border">
            <div className={`p-2 rounded-lg bg-muted ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className="font-semibold text-sm">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Capture your achievements, challenges, and lessons from the past 7 days..."
          className="min-h-[250px] rounded-3xl border-muted bg-muted/20 p-8 text-lg leading-relaxed focus:bg-background transition-all"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
      </div>

      <Button
        className="w-full h-16 rounded-3xl text-lg font-bold shadow-xl transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50"
        disabled={!entry.trim() || isSaving}
        onClick={handleSave}
      >
        {isSaving ? "Saving..." : "Save Weekly Reflection"}
      </Button>
    </div>
  );
};

export default WeeklyReflection;
