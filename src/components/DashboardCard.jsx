import PropTypes from "prop-types";

export default function DashboardCard({
  title,
  value,
  color,
}) {
  return (
    <div
      className={`rounded-3xl p-6 border border-white/10 ${color}`}
    >
      <p className="text-zinc-300 text-sm mb-3">
        {title}
      </p>

      <h1 className="text-5xl font-black text-white">
        {value}
      </h1>
    </div>
  );
}

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
};