import { useCart } from "../../context/CartContext";

type CartItem = {
    cartKey: string;
    id: number;
    title: string;
    size: string;
    color: string;
    price: number;
    image: string;
    quantity: number;
};

const CartItemCard = ({ item }: { item: CartItem }) => {
    const { removeFromCart, updateQuantity } = useCart();

    return (
        <article className="flex items-start gap-3 rounded-[18px] bg-white p-2.5 sm:border sm:border-black/10 sm:p-3.5">
            <div className="flex h-[100px] w-[92px] shrink-0 items-center justify-center rounded-[12px] bg-[#F0EEED] p-2 sm:h-25 sm:w-25 sm:p-2.5">
                <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="line-clamp-2 text-[16px] font-bold leading-5 text-black sm:text-[18px]">
                            {item.title}
                        </h3>
                        <p className="mt-1 text-[12px] leading-4 text-black/60 sm:text-[13px]">
                            Size: <span className="text-black">{item.size}</span>
                        </p>
                        <p className="mt-0.5 text-[12px] leading-4 text-black/60 sm:text-[13px]">
                            Color: <span className="text-black">{item.color}</span>
                        </p>
                    </div>

                    <button
                        type="button"
                        aria-label="Remove item"
                        onClick={() => removeFromCart(item.cartKey)}
                        className="mt-0.5 shrink-0 cursor-pointer text-[#FF3333]"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current sm:h-4.5 sm:w-4.5">
                            <path d="M9 3H15L16 5H21V7H3V5H8L9 3ZM6 9H18L17 21H7L6 9ZM10 11V18H12V11H10ZM14 11V18H16V11H14Z" />
                        </svg>
                    </button>
                </div>

                <div className="mt-3 flex items-end justify-between gap-3">
                    <p className="text-[26px] font-bold leading-none text-black sm:text-[21px]">
                        ${item.price}
                    </p>

                    <div className="inline-flex h-9 items-center gap-3 rounded-full bg-[#F0F0F0] px-3.5 text-[12px] sm:h-10">
                        <button
                            type="button"
                            onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                            className="cursor-pointer text-[15px] leading-none text-black/60"
                        >
                            -
                        </button>
                        <span className="font-medium text-black">{item.quantity}</span>
                        <button
                            type="button"
                            onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                            className="cursor-pointer text-[15px] leading-none text-black"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default CartItemCard;
