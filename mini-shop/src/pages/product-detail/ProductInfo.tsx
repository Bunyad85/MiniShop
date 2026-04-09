import { useMemo, useState } from "react";
import { useCart } from "../../context/CartContext";
import type { ProductDetailData } from "./productDetail.types";

const COLOR_OPTIONS = [
    { name: "Brown", value: "#4F4631" },
    { name: "Green", value: "#314F4A" },
    { name: "Navy", value: "#31344F" },
];

const SIZE_OPTIONS = ["Small", "Medium", "Large", "X-Large"];

type ProductInfoProps = {
    product: ProductDetailData;
    image: string;
};

const ProductInfo = ({ product, image }: ProductInfoProps) => {
    const { addToCart } = useCart();
    const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].name);
    const [selectedSize, setSelectedSize] = useState("Large");
    const [quantity, setQuantity] = useState(1);

    const oldPrice = useMemo(
        () => Math.round(product.price / (1 - product.discountPercentage / 100)),
        [product.discountPercentage, product.price],
    );

    const handleAddToCart = () => {
        Array.from({ length: quantity }).forEach(() => {
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image,
                oldPrice: oldPrice > product.price ? oldPrice : undefined,
                size: selectedSize,
                color: selectedColor,
            });
        });
    };

    return (
        <div className="flex min-w-0 h-full flex-col justify-between">
            <div>
                <h1 className="text-[25px] font-black uppercase leading-none text-black lg:text-[29px]">
                    {product.title}
                </h1>

                <div className="mt-2 flex items-center gap-2.5">
                    <div className="flex items-center gap-0.5 text-[#FFC633]">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <svg
                                key={index}
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className={`h-4.5 w-4.5 ${
                                    index < Math.round(product.rating)
                                        ? "fill-current"
                                        : "fill-[#E6E6E6]"
                                }`}
                            >
                                <path d="M12 2.5L14.781 8.136L21 9.04L16.5 13.426L17.562 19.62L12 16.696L6.438 19.62L7.5 13.426L3 9.04L9.219 8.136L12 2.5Z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-[13px] text-black/60">{product.rating}/5</span>
                </div>

                <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
                    <span className="text-[23px] font-bold leading-none text-black">
                        ${product.price}
                    </span>
                    <span className="text-[23px] font-bold leading-none text-black/30 line-through">
                        ${oldPrice}
                    </span>
                    <span className="rounded-full bg-[#FFEBEB] px-2.5 py-1 text-[12px] font-medium text-[#FF3333]">
                        -{Math.round(product.discountPercentage)}%
                    </span>
                </div>

                <p className="mt-2.5 border-b border-black/10 pb-3.5 text-[13px] leading-5.5 text-black/60">
                    {product.description}
                </p>

                <div className="border-b border-black/10 py-3.5">
                    <p className="text-[13px] text-black/60">Select Colors</p>
                    <div className="mt-2.5 flex items-center gap-2.5">
                        {COLOR_OPTIONS.map((color) => {
                            const isActive = selectedColor === color.name;

                            return (
                                <button
                                    key={color.name}
                                    type="button"
                                    aria-label={color.name}
                                    onClick={() => setSelectedColor(color.name)}
                                    className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full ${
                                        isActive ? "ring-2 ring-black ring-offset-2" : ""
                                    }`}
                                    style={{ backgroundColor: color.value }}
                                >
                                    {isActive && (
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className="h-4 w-4 stroke-white"
                                        >
                                            <path
                                                d="M5 12.5L9.2 16.5L19 7.5"
                                                fill="none"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="border-b border-black/10 py-3.5">
                    <p className="text-[13px] text-black/60">Choose Size</p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                        {SIZE_OPTIONS.map((size) => {
                            const isActive = selectedSize === size;

                            return (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => setSelectedSize(size)}
                                    className={`cursor-pointer rounded-full px-4 py-1.5 text-[12px] transition-colors ${
                                        isActive
                                            ? "bg-black text-white"
                                            : "bg-[#F0F0F0] text-black/60"
                                    }`}
                                >
                                    {size}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 pt-3.5">
                <div className="inline-flex h-10 min-w-[96px] items-center justify-between rounded-full bg-[#F0F0F0] px-4 sm:min-w-32">
                    <button
                        type="button"
                        onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                        className="cursor-pointer text-[15px] leading-none text-black/60"
                    >
                        -
                    </button>
                    <span className="text-[14px] font-medium text-black">{quantity}</span>
                    <button
                        type="button"
                        onClick={() => setQuantity((current) => current + 1)}
                        className="cursor-pointer text-[15px] leading-none text-black"
                    >
                        +
                    </button>
                </div>

                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center rounded-full bg-black px-7 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;
