import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CartOverview() {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm text-stone-200 sm:p-8 md:text-base ">
      <p className="space-x-4 sm:space-x-6">
        <span>{cart.length}</span>
        <span>
          $
          {cart.reduce((totalPrice, item) => {
            return totalPrice + item.totalPrice;
          }, 0)}
        </span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
