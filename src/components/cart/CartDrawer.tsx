import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state: { items, total }, dispatch } = useCart();

  return (
    <div
      className={`fixed inset-0 overflow-hidden ${isOpen ? 'z-50' : 'z-[-1]'}`}
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className={`absolute inset-0 overflow-hidden ${!isOpen && 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`} onClick={onClose}></div>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className={`pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                  <button
                    type="button"
                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-8">
                  {items.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty</p>
                  ) : (
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {items.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{item.name}</h3>
                                  <p className="ml-4">${item.price.toFixed(2)}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <button
                                    className="px-2 py-1 border rounded-l"
                                    onClick={() => dispatch({
                                      type: 'UPDATE_QUANTITY',
                                      payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) }
                                    })}
                                  >
                                    -
                                  </button>
                                  <span className="px-4 py-1 border-t border-b">
                                    {item.quantity}
                                  </span>
                                  <button
                                    className="px-2 py-1 border rounded-r"
                                    onClick={() => dispatch({
                                      type: 'UPDATE_QUANTITY',
                                      payload: { id: item.id, quantity: item.quantity + 1 }
                                    })}
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  className="font-medium text-green-600 hover:text-green-500"
                                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {items.length > 0 && (
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Button className="w-full">
                      Checkout
                    </Button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <button
                      type="button"
                      className="font-medium text-green-600 hover:text-green-500"
                      onClick={() => dispatch({ type: 'CLEAR_CART' })}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}