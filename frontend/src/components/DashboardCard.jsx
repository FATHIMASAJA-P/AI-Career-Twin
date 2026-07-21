import { Link } from "react-router-dom";

function DashboardCard({ icon, title, description, link }) {
  return (
    <Link
      to={link}
      className="bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-cyan-500/20 hover:scale-105 transition duration-300"
    >
      <div className="text-4xl mb-4">{icon}</div>

      <h2 className="text-xl font-bold text-white">
        {title}
      </h2>

      <p className="text-gray-400 mt-2">
        {description}
      </p>
    </Link>
  );
}

export default DashboardCard;