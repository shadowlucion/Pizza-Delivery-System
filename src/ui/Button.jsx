import { Link } from 'react-router-dom';

export default function Button({ children, disabled, to, type, onClick }) {
  // Your component logic and state can go here
  const baseStyle = `inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-900 
  transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed`;
  const styles = {
    primary: baseStyle + ` px-4 py-3 text-sm`,
    small: baseStyle + ` px-3 py-2.5 text-xs`,
    round: baseStyle + ` px-2.5 py-1.5 text-xs`,
    secondary: `inline-block transition-all duration-300 rounded-full border-2 md:px-6 md:py-3.5 px-4 py-2.5 text-sm text-stone-400 border-stone-200 font-semibold uppercase tracking-wide hover:bg-stone-300 hover:text-stone-800 hover:font-semibold focus:font-semibold focus:bg-stone-300 focus:font-light hover:font-extralight focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed`,
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button disabled={disabled} onClick={onClick} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
