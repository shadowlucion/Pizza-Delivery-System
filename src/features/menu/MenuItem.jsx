import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from './../../utils/helpers';
import { addToCart } from '../cart/cartSlice';
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(
      addToCart({
        pizzaId: id,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice * 1,
      }),
    );
  }

  return (
    <li className="flex gap-4 py-2 pt-0.5">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 w-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between text-xs">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
          {!soldOut && (
            <Button type="small" onClick={handleClick}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
