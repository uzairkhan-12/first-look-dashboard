import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface LockScreenProps {
  onUnlock: (code: string) => boolean;
}

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const trimmedCode = code.trim();
    if (!trimmedCode) {
      setError("Enter the access code to continue.");
      return;
    }

    const unlocked = onUnlock(trimmedCode);
    if (!unlocked) {
      setError("That code doesn't match. Try again.");
      return;
    }

    setError(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),_transparent_55%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary shadow-[0_0_30px_rgba(59,130,246,0.35)]">
              <Lock className="h-6 w-6" />
            </div>
            <div className="mt-5 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-[11px] uppercase tracking-[0.3em] text-white/70">
              Secure workspace
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white">
              <span className="bg-gradient-to-r from-white via-slate-200 to-sky-200 bg-clip-text text-transparent">KSADB</span>
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Secure access is enabled. Enter the lock code to unlock the dashboard.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Input
                type="password"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter access code"
                className="border-white/15 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-primary/70"
              />
              {error ? <p className="text-xs text-rose-200">{error}</p> : null}
            </div>
            <Button type="submit" className="w-full">
              Unlock dashboard
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-white/50">
            Protected for KSADB 2026 internal use.
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LockScreen;
