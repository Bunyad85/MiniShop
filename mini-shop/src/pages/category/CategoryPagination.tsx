type CategoryPaginationProps = {
    pageNumbers: number[];
    safePage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const getVisiblePages = (pageNumbers: number[], safePage: number, totalPages: number) => {
    if (totalPages <= 7) {
        return pageNumbers.map((page) => ({ type: "page" as const, value: page }));
    }

    const middlePages = [safePage - 1, safePage, safePage + 1].filter(
        (page) => page > 1 && page < totalPages,
    );

    const uniquePages = Array.from(new Set([1, ...middlePages, totalPages])).sort(
        (left, right) => left - right,
    );

    return uniquePages.flatMap((page, index) => {
        const previousPage = uniquePages[index - 1];
        const items = [];

        if (previousPage && page - previousPage > 1) {
            items.push({ type: "dots" as const, value: `dots-${previousPage}-${page}` });
        }

        items.push({ type: "page" as const, value: page });
        return items;
    });
};

const CategoryPagination = ({
    pageNumbers,
    safePage,
    totalPages,
    onPageChange,
}: CategoryPaginationProps) => {
    const visiblePages = getVisiblePages(pageNumbers, safePage, totalPages);

    return (
        <div className="mt-9 flex items-center justify-between gap-2 border-t border-black/10 pt-5 sm:gap-3">
            <button
                type="button"
                onClick={() => onPageChange(Math.max(1, safePage - 1))}
                disabled={safePage === 1}
                className="inline-flex h-8 shrink-0 items-center justify-center rounded-full border border-black/10 px-2.5 text-[12px] font-medium text-black transition-colors enabled:hover:bg-black enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:px-3.5 sm:text-[14px]"
            >
                Previous
            </button>

            <div className="flex min-w-0 flex-1 flex-nowrap items-center justify-center gap-1 overflow-hidden sm:gap-1.5">
                {visiblePages.map((item) => {
                    if (item.type === "dots") {
                        return (
                            <span
                                key={item.value}
                                className="inline-flex h-8 min-w-6 items-center justify-center px-0.5 text-[12px] text-black/40 sm:h-9 sm:min-w-9 sm:px-1 sm:text-[14px]"
                            >
                                ...
                            </span>
                        );
                    }

                    const isActive = item.value === safePage;

                    return (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => onPageChange(item.value)}
                            className={`inline-flex h-8 min-w-8 shrink-0 items-center justify-center rounded-[8px] px-1.5 text-[12px] transition-colors sm:h-9 sm:min-w-9 sm:px-2 sm:text-[14px] ${
                                isActive
                                    ? "bg-[#F0F0F0] font-medium text-black"
                                    : "text-black/50 hover:bg-[#F0F0F0]"
                            }`}
                        >
                            {item.value}
                        </button>
                    );
                })}
            </div>

            <button
                type="button"
                onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
                disabled={safePage === totalPages}
                className="inline-flex h-8 shrink-0 items-center justify-center rounded-full border border-black/10 px-2.5 text-[12px] font-medium text-black transition-colors enabled:hover:bg-black enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:px-3.5 sm:text-[14px]"
            >
                Next
            </button>
        </div>
    );
};

export default CategoryPagination;
