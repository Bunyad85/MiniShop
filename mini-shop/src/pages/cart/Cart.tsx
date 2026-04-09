import CartItemCard from "./CartItemCard";
import OrderSummary from "./OrderSummary";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { items } = useCart();

    return (
        <main className="w-full bg-white py-4 pb-14 lg:py-8 lg:pb-[200px]">
            <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
                <div className="mb-1 flex items-center gap-2 text-[14px] text-black/60">
                    <Link to="/" className="transition-colors hover:text-black">
                        Home
                    </Link>
                    <img
                        src="/right.svg"
                        alt=""
                        aria-hidden="true"
                        className="h-3.5 w-3.5 opacity-50"
                    />
                    <span className="text-black">Cart</span>
                </div>

                <h1 className="text-[24px] font-black uppercase leading-none text-black lg:text-[30px]">
                    Your Cart
                </h1>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1.55fr_0.95fr] lg:gap-5">
                    <div className="space-y-2.5 rounded-[20px] border border-black/10 p-2.5 sm:p-3 lg:max-h-120 lg:overflow-y-auto">
                        {items.length > 0 ? (
                            items.map((item) => <CartItemCard key={item.cartKey} item={item} />)
                        ) : (
                            <div className="rounded-[16px] bg-[#F8F8F8] p-8 text-center text-[16px] text-black/60">
                                Your cart is empty.
                            </div>
                        )}
                    </div>

                    <OrderSummary />
                </div>
            </section>
        </main>
    );
};

export default Cart;
