import { useState } from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const formErrors = useActionData();
  const username = useSelector((state) => state.user.username);

  return (
    <div className="px-4 py-4">
      <h2 className="font-400 mb-6 text-lg">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
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
          <div className="flex grow">
            <input
              type="text"
              name="address"
              required
              placeholder="Ex. Near Banjari Mod"
              className="input grow"
            />
          </div>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        </div>

        <div>
          <Button type="primary">Order now</Button>
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
    priority: data.priority === 'on',
  };

  if (Object.keys(errors).length > 0) return errors;

  // const newOrder = await createOrder(order);

  // return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
