import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import type { NewArrivalItem } from "../pages/home/components/new-arrivals/newArrivals.types";

type WishlistContextValue = {
    items: NewArrivalItem[];
    addToWishlist: (item: NewArrivalItem) => void;
    removeFromWishlist: (id: number) => void;
    toggleWishlist: (item: NewArrivalItem) => void;
    isInWishlist: (id: number) => boolean;
};

const WISHLIST_STORAGE_KEY = "mini-shop-wishlist";

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const readWishlistStorage = (): NewArrivalItem[] => {
    if (typeof window === "undefined") {
        return [];
    }

    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);

    if (!raw) {
        return [];
    }

    try {
        return JSON.parse(raw) as NewArrivalItem[];
    } catch {
        return [];
    }
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<NewArrivalItem[]>(() => readWishlistStorage());

    useEffect(() => {
        window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addToWishlist = (item: NewArrivalItem) => {
        setItems((current) => {
            if (current.some((wishlistItem) => wishlistItem.id === item.id)) {
                return current;
            }

            return [...current, item];
        });
    };

    const removeFromWishlist = (id: number) => {
        setItems((current) => current.filter((item) => item.id !== id));
    };

    const toggleWishlist = (item: NewArrivalItem) => {
        setItems((current) => {
            if (current.some((wishlistItem) => wishlistItem.id === item.id)) {
                return current.filter((wishlistItem) => wishlistItem.id !== item.id);
            }

            return [...current, item];
        });
    };

    const isInWishlist = (id: number) => items.some((item) => item.id === id);

    const value = useMemo(
        () => ({
            items,
            addToWishlist,
            removeFromWishlist,
            toggleWishlist,
            isInWishlist,
        }),
        [items],
    );

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);

    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }

    return context;
};
