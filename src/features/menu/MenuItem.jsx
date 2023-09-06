import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from './../../utils/helpers';
import { addToCart, getCurrentPizzaQtyById } from '../cart/cartSlice';
import DeleteButton from '../../ui/DeleteButton';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  const getCurrentQty = useSelector(getCurrentPizzaQtyById(id));
  const isInCart = getCurrentQty > 0;

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
        <div className="mt-auto flex flex-wrap items-center justify-between gap-1 text-xs">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}

          {isInCart && (
            <div className="flex gap-2">
              <UpdateItemQuantity pizzaId={id} qty={getCurrentQty} />
              <DeleteButton pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
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
