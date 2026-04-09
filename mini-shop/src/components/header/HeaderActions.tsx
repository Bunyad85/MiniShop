import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import type { HeaderIconButtonProps } from "./header.types";

const IconButton = ({ label, onClick, href, badgeCount = 0 }: HeaderIconButtonProps) => {
    const renderIcon = () => {
        if (label === "Cart") {
            const hasBadge = badgeCount > 0;

            return (
                <span className="relative inline-flex h-6 w-6 items-center justify-center">
                    <img
                        src="/Vector.svg"
                        alt=""
                        aria-hidden="true"
                        className="h-5.25 w-5.75 object-contain"
                    />
                    {hasBadge && (
                        <span className="absolute -right-3 -top-2 inline-flex min-w-4.5 items-center justify-center rounded-full border-2 border-white bg-[#FF3333] px-1 text-[10px] font-bold leading-none text-white">
                            {badgeCount > 99 ? "99+" : badgeCount}
                        </span>
                    )}
                </span>
            );
        }

        if (label === "Wishlist") {
            const hasBadge = badgeCount > 0;

            return (
                <span className="relative inline-flex h-6 w-6 items-center justify-center">
                    <CiHeart className="h-6 w-6 stroke-[1.1]" aria-hidden="true" />
                    {hasBadge && (
                        <span className="absolute -right-3 -top-2 inline-flex min-w-4.5 items-center justify-center rounded-full border-2 border-white bg-[#FF3333] px-1 text-[10px] font-bold leading-none text-white">
                            {badgeCount > 99 ? "99+" : badgeCount}
                        </span>
                    )}
                </span>
            );
        }

        return (
            <span className="inline-flex h-6 w-6 items-center justify-center">
                <img
                    src="/Vector2.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-5.5 w-5.5 object-contain"
                />
            </span>
        );
    };

    if (href) {
        return (
            <Link
                to={href}
                aria-label={label}
                className="inline-flex h-6 w-6 items-center justify-center text-black transition-opacity hover:opacity-70"
            >
                {renderIcon()}
            </Link>
        );
    }

    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className="inline-flex h-6 w-6 items-center justify-center text-black transition-opacity hover:opacity-70"
        >
            {renderIcon()}
        </button>
    );
};

const HeaderActions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { items } = useCart();
    const { items: wishlistItems } = useWishlist();
    const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const wishlistItemCount = wishlistItems.length;

    const handleMobileSearchClick = () => {
        const params = new URLSearchParams(location.search);
        const query = params.get("q")?.trim();
        const nextParams = new URLSearchParams();

        if (query) {
            nextParams.set("q", query);
        }

        nextParams.set("filters", "open");

        const targetPath = location.pathname.startsWith("/category/")
            ? location.pathname
            : "/category/all";

        navigate(`${targetPath}?${nextParams.toString()}`);
    };

    return (
        <div className="flex shrink-0 items-center gap-3.5">
            <button
                type="button"
                aria-label="Search"
                onClick={handleMobileSearchClick}
                className="inline-flex h-6 w-6 items-center justify-center text-black transition-opacity hover:opacity-70 lg:hidden"
            >
                <svg
                    className="h-5.5 w-5.5 text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M21 21L16.65 16.65"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <IconButton label="Cart" href="/cart" badgeCount={cartItemCount} />
            <IconButton label="Wishlist" href="/wishlist" badgeCount={wishlistItemCount} />
            <IconButton label="Profile" />
        </div>
    );
};

export default HeaderActions;
