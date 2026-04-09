import type { Dispatch, SetStateAction } from "react";
import { COLOR_OPTIONS, DRESS_STYLES, SIZE_OPTIONS } from "./category.constants";
import CategoryPriceFilter from "./CategoryPriceFilter";
import type { FilterState } from "./category.types";

type CategoryFiltersProps = {
    productTypes: string[];
    draftFilters: FilterState | null;
    priceBounds: { min: number; max: number };
    onClose?: () => void;
    onToggleValue: (key: "productTypes" | "colors" | "sizes", value: string) => void;
    onSetDraftFilters: Dispatch<SetStateAction<FilterState | null>>;
    onApplyFilters: () => void;
};

const CategoryFilters = ({
    productTypes,
    draftFilters,
    priceBounds,
    onClose,
    onToggleValue,
    onSetDraftFilters,
    onApplyFilters,
}: CategoryFiltersProps) => {
    return (
        <aside className="w-full rounded-[20px] border border-black/10 bg-white p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-bold text-black">Filters</h2>
                {onClose ? (
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F0F0] text-black xl:hidden"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 stroke-current">
                            <path
                                d="M6 6L18 18M18 6L6 18"
                                fill="none"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                ) : (
                    <img
                        src="/filtr.svg"
                        alt=""
                        aria-hidden="true"
                        className="h-5 w-5"
                    />
                )}
            </div>

            <div className="mt-4 space-y-4">
                <section className="border-t border-black/10 pt-4">
                    <h3 className="text-[15px] font-bold text-black">Category</h3>
                    <div className="mt-3 space-y-1.5">
                        {productTypes.map((type) => {
                            const isActive = draftFilters?.productTypes.includes(type) ?? false;

                            return (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => onToggleValue("productTypes", type)}
                                    className={`flex w-full items-center justify-between rounded-full px-3 py-1.5 text-left text-[15px] transition-colors ${
                                        isActive
                                            ? "bg-[#F0F0F0] font-medium text-black"
                                            : "text-black/60 hover:bg-[#F8F8F8]"
                                    }`}
                                >
                                    <span>{type}</span>
                                    <img
                                        src="/right.svg"
                                        alt=""
                                        aria-hidden="true"
                                        className={`h-3.5 w-3.5 ${isActive ? "opacity-100" : "opacity-50"}`}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </section>

                <CategoryPriceFilter
                    draftFilters={draftFilters}
                    priceBounds={priceBounds}
                    onSetDraftFilters={onSetDraftFilters}
                />

                <section className="border-t border-black/10 pt-4">
                    <h3 className="text-[15px] font-bold text-black">Colors</h3>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                        {COLOR_OPTIONS.map((color) => {
                            const isActive = draftFilters?.colors.includes(color.name) ?? false;

                            return (
                                <button
                                    key={color.name}
                                    type="button"
                                    aria-label={color.name}
                                    onClick={() => onToggleValue("colors", color.name)}
                                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                                        color.name === "Black" || color.name === "White"
                                            ? "border border-black"
                                            : ""
                                    }`}
                                    style={{ backgroundColor: color.value }}
                                >
                                    {isActive && (
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className={`h-4 w-4 ${
                                                color.name === "Yellow"
                                                    ? "stroke-black"
                                                    : "stroke-white"
                                            }`}
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
                </section>

                <section className="border-t border-black/10 pt-4">
                    <h3 className="text-[15px] font-bold text-black">Size</h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {SIZE_OPTIONS.map((size) => {
                            const isActive = draftFilters?.sizes.includes(size) ?? false;

                            return (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => onToggleValue("sizes", size)}
                                    className={`rounded-full px-4 py-2 text-[13px] transition-colors ${
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
                </section>

                <section className="border-t border-black/10 pt-4">
                    <h3 className="text-[15px] font-bold text-black">Dress Style</h3>
                    <div className="mt-3 space-y-1.5">
                        {DRESS_STYLES.map((style) => {
                            const isActive = draftFilters?.dressStyle === style;

                            return (
                                <button
                                    key={style}
                                    type="button"
                                    onClick={() =>
                                        onSetDraftFilters((current) =>
                                            current
                                                ? {
                                                      ...current,
                                                      dressStyle: isActive ? null : style,
                                                  }
                                                : current,
                                        )
                                    }
                                    className={`flex w-full items-center justify-between text-left text-[15px] transition-colors ${
                                        isActive ? "text-black" : "text-black/60"
                                    }`}
                                >
                                    <span>{style}</span>
                                    <img
                                        src="/right.svg"
                                        alt=""
                                        aria-hidden="true"
                                        className="h-3.5 w-3.5 opacity-50"
                                    />
                                </button>
                            );
                        })}
                    </div>
                </section>

                <button
                    type="button"
                    onClick={() => {
                        onApplyFilters();
                        onClose?.();
                    }}
                    className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-5 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
                >
                    Apply Filter
                </button>
            </div>
        </aside>
    );
};

export default CategoryFilters;
