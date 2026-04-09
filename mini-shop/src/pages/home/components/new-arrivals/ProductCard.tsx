import type { NewArrivalItem } from "./newArrivals.types";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { useCart } from "../../../../context/CartContext";
import { useWishlist } from "../../../../context/WishlistContext";

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-[#FFC633]">
                {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                        key={index}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className={`h-4.5 w-4.5 ${
                            index < Math.round(rating) ? "fill-current" : "fill-[#E6E6E6]"
                        }`}
                    >
                        <path d="M12 2.5L14.781 8.136L21 9.04L16.5 13.426L17.562 19.62L12 16.696L6.438 19.62L7.5 13.426L3 9.04L9.219 8.136L12 2.5Z" />
                    </svg>
                ))}
            </div>
            <span className="text-[14px] text-black/60">{rating}/5</span>
        </div>
    );
};

const ProductCard = ({
    item,
    compactMobile = false,
}: {
    item: NewArrivalItem;
    compactMobile?: boolean;
}) => {
    const { addToCart, isInCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isWishlisted = isInWishlist(item.id);
    const inCart = isInCart(item.id);

    return (
        <article className="min-w-0">
            <div
                className={`relative flex items-center justify-center rounded-[20px] bg-[#F0EEED] ${
                    compactMobile ? "h-46 p-4 sm:h-70 sm:p-5" : "h-70 p-5"
                }`}
            >
                <button
                    type="button"
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    onClick={() => toggleWishlist(item)}
                    className={`absolute cursor-pointer items-center justify-center rounded-full ${
                        compactMobile ? "left-3 top-3 inline-flex h-7.5 w-7.5" : "left-4 top-4 inline-flex h-8.5 w-8.5"
                    } ${isWishlisted ? "bg-black text-white" : "bg-white text-black"} shadow-sm transition-opacity hover:opacity-90`}
                >
                    <CiHeart
                        aria-hidden="true"
                        className={`${compactMobile ? "h-4 w-4" : "h-4.5 w-4.5"} ${
                            isWishlisted ? "stroke-[1.3]" : "stroke-[1.15]"
                        }`}
                    />
                </button>

                <button
                    type="button"
                    aria-label="Add to cart"
                    onClick={() =>
                        addToCart({
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            image: item.image,
                            oldPrice: item.oldPrice,
                            size: "Medium",
                            color: "Black",
                        })
                    }
                    className={`absolute cursor-pointer items-center justify-center rounded-full ${
                        compactMobile ? "right-3 top-3 inline-flex h-8.5 w-8.5" : "right-4 top-4 inline-flex h-10 w-10"
                    } ${inCart ? "bg-black text-white" : "bg-white text-black"} shadow-sm transition-opacity hover:opacity-90`}
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className={`${compactMobile ? "h-4.5 w-4.5" : "h-5 w-5"} stroke-current`}
                    >
                        <path
                            d="M3 4H5L7.2 14.2C7.39516 15.1036 8.19331 15.75 9.12 15.75H17.88C18.8067 15.75 19.6048 15.1036 19.8 14.2L21 8H6"
                            fill="none"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle cx="9" cy="19" r="1.5" fill="currentColor" stroke="none" />
                        <circle cx="18" cy="19" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                </button>

                <Link to={`/product/${item.id}`} className="block h-full w-full">
                    <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-contain"
                    />
                </Link>
            </div>

            <Link
                to={`/product/${item.id}`}
                className={`mt-3 block font-bold leading-6 text-black sm:mt-4 ${
                    compactMobile
                        ? "truncate text-[15px] leading-5 sm:text-[18px] sm:leading-6"
                        : "text-[18px]"
                }`}
            >
                {item.title}
            </Link>

            <div className={`${compactMobile ? "mt-1.5 sm:mt-2" : "mt-2"}`}>
                <StarRating rating={item.rating} />
            </div>

            <div className={`flex flex-wrap items-center ${compactMobile ? "mt-2 gap-2" : "mt-3 gap-3"}`}>
                <span
                    className={`font-bold leading-none text-black ${
                        compactMobile ? "text-[20px] sm:text-[28px]" : "text-[28px]"
                    }`}
                >
                    ${item.price}
                </span>

                {item.oldPrice && (
                    <span
                        className={`font-bold leading-none text-black/40 line-through ${
                            compactMobile ? "text-[20px] sm:text-[28px]" : "text-[28px]"
                        }`}
                    >
                        ${item.oldPrice}
                    </span>
                )}

                {item.discount && (
                    <span
                        className={`rounded-full bg-[#FFEBEB] font-medium text-[#FF3333] ${
                            compactMobile ? "px-2 py-0.5 text-[10px] sm:px-3 sm:py-1 sm:text-[12px]" : "px-3 py-1 text-[12px]"
                        }`}
                    >
                        {item.discount}
                    </span>
                )}
            </div>
        </article>
    );
};

export default ProductCard;
