import { Link } from "react-router-dom";
import ProductCard from "../home/components/new-arrivals/ProductCard";
import { useWishlist } from "../../context/WishlistContext";

const Wishlist = () => {
    const { items } = useWishlist();

    return (
        <main className="w-full bg-white py-4 pb-24 lg:py-8 lg:pb-50">
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                    <span className="text-black">Wishlist</span>
                </div>

                <h1 className="text-[24px] font-black uppercase leading-none text-black lg:text-[30px]">
                    Your Wishlist
                </h1>

                {items.length > 0 ? (
                    <div className="mt-6 grid grid-cols-2 gap-x-3.5 gap-y-6 sm:mt-8 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                        {items.map((item) => (
                            <ProductCard key={item.id} item={item} compactMobile />
                        ))}
                    </div>
                ) : (
                    <div className="mt-8 rounded-[20px] border border-dashed border-black/10 bg-[#FAFAFA] px-6 py-12 text-center">
                        <p className="text-[16px] text-black/60">Your wishlist is empty.</p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Wishlist;
