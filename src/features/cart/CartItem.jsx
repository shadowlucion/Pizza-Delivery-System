import { formatCurrency } from '../../utils/helpers';
import DeleteButton from '../../ui/DeleteButton';
import UpdateItemQuantity from './UpdateItemQuantity';
import { useSelector } from 'react-redux';
import { getCurrentPizzaQtyById } from './cartSlice';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const getCurrentQty = useSelector(getCurrentPizzaQtyById(pizzaId));

  return (
    <li className="py-2 sm:flex sm:items-center sm:justify-between">
      <p className="text-stone-800 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p>{formatCurrency(totalPrice)}</p>

        <div className="gap flex gap-2 sm:gap-4">
          <UpdateItemQuantity pizzaId={pizzaId} qty={getCurrentQty} />
          <DeleteButton pizzaId={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
