import { formatCurrency } from '../../utils/helpers';
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className=" py-3">
      <div className="flex flex-wrap items-center justify-between gap-1 py-2">
        <p className="text-lg font-bold">
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="text-xs font-semibold text-stone-500">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      {isLoadingIngredients && <p>Loading...</p>}
      {!isLoadingIngredients && (
        <p className="capitalize italic">{ingredients.join(', ')}</p>
      )}
    </li>
  );
}

export default OrderItem;
