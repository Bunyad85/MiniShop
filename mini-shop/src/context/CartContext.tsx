import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

type CartItem = {
    cartKey: string;
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    size: string;
    color: string;
    oldPrice?: number;
};

type CartContextValue = {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, "cartKey" | "quantity">) => void;
    removeFromCart: (cartKey: string) => void;
    updateQuantity: (cartKey: string, quantity: number) => void;
    isInCart: (id: number) => boolean;
    subtotal: number;
    discount: number;
    deliveryFee: number;
    total: number;
};

const CART_STORAGE_KEY = "mini-shop-cart";

const CartContext = createContext<CartContextValue | undefined>(undefined);

const createCartKey = (item: Pick<CartItem, "id" | "size" | "color">) =>
    `${item.id}-${item.size.toLowerCase()}-${item.color.toLowerCase()}`;

const readCartStorage = (): CartItem[] => {
    if (typeof window === "undefined") {
        return [];
    }

    const raw = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!raw) {
        return [];
    }

    try {
        const parsed = JSON.parse(raw) as Array<Omit<CartItem, "cartKey"> & { cartKey?: string }>;

        return parsed.map((item) => ({
            ...item,
            cartKey: item.cartKey ?? createCartKey(item),
        }));
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>(() => readCartStorage());

    useEffect(() => {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addToCart = (item: Omit<CartItem, "cartKey" | "quantity">) => {
        setItems((current) => {
            const cartKey = createCartKey(item);
            const existingItem = current.find((cartItem) => cartItem.cartKey === cartKey);

            if (existingItem) {
                return current.map((cartItem) =>
                    cartItem.cartKey === cartKey
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem,
                );
            }

            return [...current, { ...item, cartKey, quantity: 1 }];
        });
    };

    const removeFromCart = (cartKey: string) => {
        setItems((current) => current.filter((item) => item.cartKey !== cartKey));
    };

    const updateQuantity = (cartKey: string, quantity: number) => {
        setItems((current) =>
            current
                .map((item) =>
                    item.cartKey === cartKey ? { ...item, quantity: Math.max(1, quantity) } : item,
                )
                .filter((item) => item.quantity > 0),
        );
    };

    const isInCart = (id: number) => items.some((item) => item.id === id);

    const value = useMemo(() => {
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const oldTotal = items.reduce(
            (sum, item) => sum + (item.oldPrice ?? item.price) * item.quantity,
            0,
        );
        const discount = Math.max(0, oldTotal - subtotal);
        const deliveryFee = items.length > 0 ? 15 : 0;
        const total = subtotal - discount + deliveryFee;

        return {
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            isInCart,
            subtotal,
            discount,
            deliveryFee,
            total,
        };
    }, [items]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }

    return context;
};
