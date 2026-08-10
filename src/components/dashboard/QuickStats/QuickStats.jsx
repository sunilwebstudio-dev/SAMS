import "./QuickStats.css";

function QuickStats() {
  const stats = [
    {
      title: "Total Agreements",
      value: "128",
      change: "+12%",
      color: "#16A34A",
    },
    {
      title: "Active Agreements",
      value: "96",
      change: "+8%",
      color: "#2563EB",
    },
    {
      title: "Notifications",
      value: "24",
      change: "-5%",
      color: "#F59E0B",
    },
    {
      title: "Total Amount",
      value: "₹48.75L",
      change: "+15%",
      color: "#8B5CF6",
    },
  ];

  return (
    <div className="stats-grid">

      {stats.map((item) => (
        <div
          className="stat-card"
          key={item.title}
        >

          <div
            className="stat-icon"
            style={{
              background: item.color,
            }}
          />

          <h4>
            {item.title}
          </h4>

          <h2>
            {item.value}
          </h2>

          <span
            className={
              item.change.startsWith("-")
                ? "stat-change negative"
                : "stat-change positive"
            }
          >
            {item.change}
          </span>

        </div>
      ))}

    </div>
  );
}

export default QuickStats;