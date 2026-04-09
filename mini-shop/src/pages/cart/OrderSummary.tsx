import { useCart } from "../../context/CartContext";

const OrderSummary = () => {
    const { subtotal, discount, deliveryFee, total } = useCart();

    return (
        <aside className="rounded-[20px] border border-black/10 p-4 sm:p-5 lg:p-6">
            <h2 className="text-[24px] font-bold leading-none text-black">Order Summary</h2>

            <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
                <div className="flex items-center justify-between text-[16px] sm:text-[20px]">
                    <span className="text-black/60">Subtotal</span>
                    <span className="font-bold text-black">${subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-[16px] sm:text-[20px]">
                    <span className="text-black/60">Discount (-20%)</span>
                    <span className="font-bold text-[#FF3333]">-${discount}</span>
                </div>
                <div className="flex items-center justify-between text-[16px] sm:text-[20px]">
                    <span className="text-black/60">Delivery Fee</span>
                    <span className="font-bold text-black">${deliveryFee}</span>
                </div>
            </div>

            <div className="mt-5 h-px bg-black/10 sm:mt-6" />

            <div className="mt-5 flex items-center justify-between text-[18px] sm:mt-6 sm:text-[20px]">
                <span className="text-black">Total</span>
                <span className="text-[26px] font-bold leading-none text-black sm:text-[32px]">${total}</span>
            </div>

            <div className="mt-5 flex gap-2.5 sm:mt-6 sm:gap-3">
                <label className="relative block flex-1">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/40">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 stroke-current">
                            <path
                                d="M20 10.5L13.5 4H6C4.89543 4 4 4.89543 4 6V13.5L10.5 20C11.281 20.781 12.5474 20.781 13.3284 20L20 13.3284C20.781 12.5474 20.781 11.281 20 10.5Z"
                                fill="none"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                            <circle cx="8.25" cy="8.25" r="1.25" fill="currentColor" stroke="none" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Add promo code"
                        className="h-[48px] w-full rounded-full bg-[#F0F0F0] pl-12 pr-4 text-[14px] outline-none placeholder:text-black/40"
                    />
                </label>
                <button
                    type="button"
                    className="inline-flex h-[48px] min-w-[86px] items-center justify-center rounded-full bg-black px-5 text-[14px] font-medium text-white sm:min-w-[119px] sm:px-6"
                >
                    Apply
                </button>
            </div>

            <button
                type="button"
                className="mt-5 inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-full bg-black text-[15px] font-medium text-white sm:mt-6 sm:text-[16px]"
            >
                Go to Checkout
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 stroke-current">
                    <path
                        d="M5 12H19"
                        fill="none"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                    <path
                        d="M13 6L19 12L13 18"
                        fill="none"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </aside>
    );
};

export default OrderSummary;
