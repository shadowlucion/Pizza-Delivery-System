import { useDispatch } from 'react-redux';
import Button from './Button';
import { removeFromcart } from '../features/cart/cartSlice';

export default function DeleteButton({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(removeFromcart(pizzaId))}>
      Delete
    </Button>
  );
}
