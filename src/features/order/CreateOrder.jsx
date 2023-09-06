import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import store from '../../store';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = navigation.state === 'submitting';

  const {
    username,
    status: addressStatus,
    error: addressError,
    position: addressPos,
    address,
  } = useSelector((state) => state.user);

  const cart = useSelector(getCart);
  const formErrors = useActionData();
  // const username = useSelector((state) => state.user.username);
  const [withPriority, setWithPriority] = useState(false);

  const cartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? cartPrice * 0.2 : 0;
  const totalPrice = formatCurrency(cartPrice + priorityPrice);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-4">
      <h2 className="font-400 mb-6 text-lg">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Button onClick={() => dispatch(fetchAddress())}>Get Position</Button>
      <Form method="POST">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
          <label className="mb-1 inline-block sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            placeholder="Ex. Saurabh"
            defaultValue={username}
          />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
          <label className="mb-1 inline-block sm:basis-40">Phone number</label>
          <div className="flex grow flex-col gap-1">
            <input
              className="input grow"
              type="tel"
              name="phone"
              required
              placeholder="Ex. 9876543210"
            />
            {formErrors?.phone && formErrors.phone && (
              <span className="inline-block rounded bg-red-200 px-2 py-1 text-xs text-red-400">
                {formErrors.phone}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
          <label className="mb-1 inline-block sm:basis-40">Address</label>
          <div className="relative flex grow items-center">
            <span className="flex grow flex-col gap-1">
              <span className="relative flex items-center">
                {!addressPos.latitude && !addressPos.longitude && (
                  <span className="absolute right-0 md:right-1">
                    <Button
                      type="small"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(fetchAddress());
                      }}
                      className="absolute"
                    >
                      Get Location
                    </Button>
                  </span>
                )}
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Ex. Near Banjari Mod"
                  className="input w-full"
                  disabled={addressStatus === 'loading'}
                  defaultValue={address}
                />
              </span>

              {addressError && (
                <span className="inline-block grow rounded bg-red-200 px-2 py-1 text-xs text-red-400">
                  {addressError}
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              addressPos.latitude && addressPos.longitude
                ? `${addressPos.latitude},${addressPos.longitude}`
                : ''
            }
          />
        </div>

        <div>
          <Button type="primary">
            {isLoading ? 'Placing Order' : `Order now with ${totalPrice}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const form = await request.formData();
  const data = Object.fromEntries(form);
  const errors = {};
  if (!isValidPhone(data.phone)) {
    errors.phone = 'Please enter valid phone number!';
  }

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  // Do not overuse.
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
