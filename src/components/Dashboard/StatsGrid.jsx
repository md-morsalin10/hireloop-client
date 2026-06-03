import StatCard from "./StatCard";

export default function StatsGrid({ statsData }) {
  if (!statsData || statsData.length === 0) return null;

  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
        />
      ))}
    </div>
  );
}