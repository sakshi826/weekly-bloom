import { Button } from "@/components/ui/button";
import { ArrowRight, Flower2 } from "lucide-react";

const WeeklyReflection = () => {
  return (
    <div className="max-w-md mx-auto space-y-8 py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <Flower2 className="w-12 h-12 text-green-600 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Weekly Bloom</h1>
        <p className="text-gray-500 text-lg italic">"Celebrating your growth this week."</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-green-100 space-y-3">
          <h3 className="text-sm font-bold text-green-700 uppercase tracking-widest">Highlights</h3>
          <p className="text-gray-700 text-lg font-medium leading-relaxed">
            "You showed up for yourself in ways that matter."
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-green-100 space-y-3">
          <h3 className="text-sm font-bold text-green-700 uppercase tracking-widest">Growth Points</h3>
          <p className="text-gray-700 text-lg font-medium leading-relaxed">
            "Every week teaches something valuable, even in small moments."
          </p>
        </div>
      </div>

      <Button 
        className="w-full h-16 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-xl font-bold shadow-lg shadow-green-200 transition-all hover:scale-[1.02] active:scale-95 group"
        onClick={() => window.location.reload()}
      >
        Continue
        <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
      </Button>
    </div>
  );
};

export default WeeklyReflection;