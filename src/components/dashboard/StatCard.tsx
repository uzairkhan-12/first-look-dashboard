interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  trend?: "up" | "down" | "neutral";
}

const StatCard = ({ label, value, subValue, trend }: StatCardProps) => {
  return (
    <div className="rounded-lg border border-border bg-card p-4 glow-primary animate-fade-in">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      <p className={`text-2xl font-mono font-bold ${trend === "up" ? "text-up" : trend === "down" ? "text-down" : "text-foreground"}`}>
        {value}
      </p>
      {subValue && (
        <p className="text-xs text-muted-foreground mt-1">{subValue}</p>
      )}
    </div>
  );
};

export default StatCard;
