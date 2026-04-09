import type { Dispatch, SetStateAction } from "react";
import type { FilterState } from "./category.types";

type CategoryPriceFilterProps = {
    draftFilters: FilterState | null;
    priceBounds: { min: number; max: number };
    onSetDraftFilters: Dispatch<SetStateAction<FilterState | null>>;
};

const CategoryPriceFilter = ({
    draftFilters,
    priceBounds,
    onSetDraftFilters,
}: CategoryPriceFilterProps) => {
    return (
        <section className="border-t border-black/10 pt-4">
            <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-black">Price</h3>
                <span className="text-[14px] text-black/40">
                    ${draftFilters?.minPrice ?? 0} - ${draftFilters?.maxPrice ?? 0}
                </span>
            </div>

            <div className="mt-3">
                <div className="relative h-7">
                    <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-[#F0F0F0]" />
                    <div
                        className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-black"
                        style={{
                            left: `${
                                (((draftFilters?.minPrice ?? priceBounds.min) - priceBounds.min) /
                                    Math.max(1, priceBounds.max - priceBounds.min)) *
                                100
                            }%`,
                            right: `${
                                100 -
                                (((draftFilters?.maxPrice ?? priceBounds.max) - priceBounds.min) /
                                    Math.max(1, priceBounds.max - priceBounds.min)) *
                                    100
                            }%`,
                        }}
                    />
                    <input
                        type="range"
                        min={priceBounds.min}
                        max={priceBounds.max}
                        value={draftFilters?.minPrice ?? priceBounds.min}
                        onChange={(event) =>
                            onSetDraftFilters((current) =>
                                current
                                    ? {
                                          ...current,
                                          minPrice: Math.min(
                                              Number(event.target.value),
                                              current.maxPrice,
                                          ),
                                      }
                                    : current,
                            )
                        }
                        className="pointer-events-none absolute h-7 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
                    />
                    <input
                        type="range"
                        min={priceBounds.min}
                        max={priceBounds.max}
                        value={draftFilters?.maxPrice ?? priceBounds.max}
                        onChange={(event) =>
                            onSetDraftFilters((current) =>
                                current
                                    ? {
                                          ...current,
                                          maxPrice: Math.max(
                                              Number(event.target.value),
                                              current.minPrice,
                                          ),
                                      }
                                    : current,
                            )
                        }
                        className="pointer-events-none absolute h-7 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
                    />
                </div>
            </div>
        </section>
    );
};

export default CategoryPriceFilter;
