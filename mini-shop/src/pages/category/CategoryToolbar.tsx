import type { SortOption } from "./category.types";

type CategoryToolbarProps = {
    pageTitle: string;
    rangeStart: number;
    rangeEnd: number;
    totalProducts: number;
    sortBy: SortOption;
    onOpenFilters: () => void;
    onSortChange: (value: SortOption) => void;
};

const CategoryToolbar = ({
    pageTitle,
    rangeStart,
    rangeEnd,
    totalProducts,
    sortBy,
    onOpenFilters,
    onSortChange,
}: CategoryToolbarProps) => {
    return (
        <div className="flex items-start justify-between gap-3 sm:items-end">
            <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h1 className="text-[28px] font-bold leading-none text-black sm:text-[32px]">
                        {pageTitle}
                    </h1>
                    <span className="text-[14px] text-black/60">
                        Showing {rangeStart}-{rangeEnd} of {totalProducts} Products
                    </span>
                </div>

                <div className="mt-2 hidden flex-wrap items-center gap-2 text-[14px] text-black/60 sm:flex">
                    <span>Sort by</span>
                    <label className="relative">
                        <select
                            value={sortBy}
                            onChange={(event) => onSortChange(event.target.value as SortOption)}
                            className="appearance-none bg-transparent pr-5 font-medium text-black outline-none"
                        >
                            <option value="most-popular">Most Popular</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="newest">Newest</option>
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="h-4 w-4 stroke-current"
                            >
                                <path
                                    d="M6 9L12 15L18 9"
                                    fill="none"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </label>
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-[14px] text-black/60">
                <button
                    type="button"
                    onClick={onOpenFilters}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F0F0] text-black xl:hidden"
                    aria-label="Open filters"
                >
                    <img src="/filtr.svg" alt="" aria-hidden="true" className="h-4.5 w-4.5" />
                </button>
            </div>
        </div>
    );
};

export default CategoryToolbar;
