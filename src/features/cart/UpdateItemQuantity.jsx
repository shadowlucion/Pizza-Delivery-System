import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQty, increaseItemQty } from './cartSlice';

export default function UpdateItemQuantity({ pizzaId, qty }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1">
      <Button type="round" onClick={() => dispatch(decreaseItemQty(pizzaId))}>
        -
      </Button>
      {qty}
      <Button type="round" onClick={() => dispatch(increaseItemQty(pizzaId))}>
        +
      </Button>
    </div>
  );
}
