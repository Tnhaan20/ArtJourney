import { Link } from 'react-router-dom';

export default function HighlightText({ children, to, className }) {
  return (
    <Link
      to={to}
      className={`flex-none group relative block transition duration-300 ${className}`}
    >
      <span className="text-sm">{children}</span>
      <span className="absolute inset-x-1 h-px bg-gradient-to-r from-secondary-blue/0 from-10% via-primary-blue to-primary-blue/0 to-90% transition duration-300 -bottom-0.5 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"></span>
      <span className="overflow-hidden absolute inset-0 transition origin-bottom duration-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100">
        <span className="absolute inset-x-4 -bottom-2 h-full bg-gradient-to-t from-secondary-blue/20 to-transparent blur rounded-t-full"></span>
      </span>
    </Link>
  );
}