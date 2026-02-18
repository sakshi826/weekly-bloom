import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";

interface WeeklyStats {
  activitiesCompleted: number;
  moodsLogged: number;
  streak: number;
}

const getWeeklyStats = (): WeeklyStats => {
  try {
    const activities = JSON.parse(localStorage.getItem("activities_completed") || "[]");
    const moods = JSON.parse(localStorage.getItem("mood_logs") || "[]");
    const streak = parseInt(localStorage.getItem("current_streak") || "0", 10);
    return {
      activitiesCompleted: Array.isArray(activities) ? activities.length : 0,
      moodsLogged: Array.isArray(moods) ? moods.length : 0,
      streak,
    };
  } catch {
    return { activitiesCompleted: 0, moodsLogged: 0, streak: 0 };
  }
};

const WeeklyReflection = () => {
  const [stats, setStats] = useState<WeeklyStats>({ activitiesCompleted: 0, moodsLogged: 0, streak: 0 });
  const [entry, setEntry] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setStats(getWeeklyStats());
  }, []);

  const prompt = "What has changed for you this week?";
  const canSave = entry.trim().length > 0;

  const handleSave = () => {
    const existing = JSON.parse(localStorage.getItem("journal_entries") || "[]");
    existing.push({
      prompt,
      entry: entry.trim(),
      date: new Date().toISOString(),
      type: "weekly",
    });
    localStorage.setItem("journal_entries", JSON.stringify(existing));
    setSaved(true);
  };

  const handleSkip = () => {
    // In a real app this would navigate away
    window.history.back();
  };

  if (saved) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-background">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Reflection Saved</h2>
          <p className="text-muted-foreground text-center max-w-sm">
            Taking time to reflect is a powerful act of self-care. Well done.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-10 bg-background">
      <div className="w-full max-w-xl flex flex-col gap-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground text-center tracking-tight">
          Weekly Reflection
        </h1>

        {/* Weekly Summary Banner */}
        <div className="summary-card rounded-2xl p-6 border border-border/50">
          <p className="text-foreground/90 text-center text-base leading-relaxed">
            This week you completed{" "}
            <span className="font-semibold text-primary">{stats.activitiesCompleted}</span>{" "}
            activities, logged{" "}
            <span className="font-semibold text-primary">{stats.moodsLogged}</span>{" "}
            moods, and built a{" "}
            <span className="font-semibold text-primary">{stats.streak}-day</span> streak.
          </p>
        </div>

        {/* Reflective Prompt */}
        <div className="prompt-card rounded-2xl p-6 border border-border/50">
          <p className="text-foreground/80 text-center text-lg italic leading-relaxed">
            "{prompt}"
          </p>
        </div>

        {/* Text Area */}
        <Textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your thoughts..."
          className="rounded-xl min-h-[200px] resize-none text-base bg-card border-border focus-visible:ring-primary/40 p-4"
          rows={8}
        />

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <Button
            variant="ghost"
            className="rounded-full px-8 text-muted-foreground hover:text-foreground"
            onClick={handleSkip}
          >
            Skip
          </Button>
          <Button
            className="rounded-full px-8"
            disabled={!canSave}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReflection;
