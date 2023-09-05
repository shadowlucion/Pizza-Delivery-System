import { Link } from 'react-router-dom';
import SearchOrder from './../features/order/SearchOrder';
import Username from '../features/user/Username';
import { useSelector } from 'react-redux';
export default function Header() {
  // Your component logic and state can go here

  return (
    <header className="flex items-center justify-between border-b-2 border-stone-600 bg-yellow-400 p-4 text-sm uppercase text-stone-700 sm:p-6">
      <Link to="/" className="tracking-wide">
        Fast React Pizza
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
