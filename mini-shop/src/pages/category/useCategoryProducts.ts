import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
    getColors,
    getDressStyle,
    getInitialDressStyle,
    getPageTitle,
    getProductType,
    getSizes,
    MOBILE_BREAKPOINT,
    MOBILE_PAGE_SIZE,
    PAGE_SIZE,
    PRODUCT_TYPE_OPTIONS,
} from "./category.constants";
import type {
    CategoryProduct,
    DummyProductsResponse,
    FilterState,
    SortOption,
} from "./category.types";

export const useCategoryProducts = (
    slug: string | undefined,
    searchQuery: string,
) => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    const [products, setProducts] = useState<CategoryProduct[]>([]);
    const [draftFilters, setDraftFilters] = useState<FilterState | null>(null);
    const [appliedFilters, setAppliedFilters] = useState<FilterState | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>("most-popular");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [pageSize, setPageSize] = useState(() =>
        typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT
            ? MOBILE_PAGE_SIZE
            : PAGE_SIZE,
    );

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const updatePageSize = () => {
            setPageSize(window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_PAGE_SIZE : PAGE_SIZE);
        };

        updatePageSize();
        window.addEventListener("resize", updatePageSize);

        return () => window.removeEventListener("resize", updatePageSize);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setHasError(false);

                const { data } = await axios.get<DummyProductsResponse>(
                    "https://dummyjson.com/products?limit=200",
                );

                setProducts(
                    data.products.map<CategoryProduct>((product) => {
                        const oldPrice = Math.round(
                            product.price / (1 - product.discountPercentage / 100),
                        );

                        return {
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            image: product.images?.[0] ?? product.thumbnail,
                            oldPrice: oldPrice > product.price ? oldPrice : undefined,
                            discount:
                                product.discountPercentage > 0
                                    ? `-${Math.round(product.discountPercentage)}%`
                                    : undefined,
                            rating: Number(product.rating.toFixed(1)),
                            category: product.category,
                            productType: getProductType(product),
                            dressStyle: getDressStyle(product),
                            colors: getColors(product.id),
                            sizes: getSizes(product.id),
                        };
                    }),
                );
            } catch {
                setHasError(true);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchProducts();
    }, []);

    const priceBounds = useMemo(() => {
        if (products.length === 0) {
            return { min: 0, max: 500 };
        }

        return {
            min: Math.floor(Math.min(...products.map((product) => product.price))),
            max: Math.ceil(Math.max(...products.map((product) => product.price))),
        };
    }, [products]);

    useEffect(() => {
        if (products.length === 0) {
            return;
        }

        const initialFilters: FilterState = {
            productTypes: [],
            minPrice: priceBounds.min,
            maxPrice: priceBounds.max,
            colors: [],
            sizes: [],
            dressStyle: getInitialDressStyle(slug),
        };

        setDraftFilters(initialFilters);
        setAppliedFilters(initialFilters);
        setCurrentPage(1);
    }, [slug, products, priceBounds.max, priceBounds.min]);

    const productTypes = useMemo(
        () => [...PRODUCT_TYPE_OPTIONS],
        [],
    );

    const filteredProducts = useMemo(() => {
        if (!appliedFilters) {
            return [];
        }

        const filtered = products.filter((product) => {
            const matchesType =
                appliedFilters.productTypes.length === 0 ||
                appliedFilters.productTypes.includes(product.productType);
            const matchesPrice =
                product.price >= appliedFilters.minPrice &&
                product.price <= appliedFilters.maxPrice;
            const matchesColor =
                appliedFilters.colors.length === 0 ||
                product.colors.some((color) => appliedFilters.colors.includes(color));
            const matchesSize =
                appliedFilters.sizes.length === 0 ||
                product.sizes.some((size) => appliedFilters.sizes.includes(size));
            const matchesStyle =
                !appliedFilters.dressStyle ||
                product.dressStyle === appliedFilters.dressStyle;
            const matchesSearch =
                normalizedSearchQuery.length === 0 ||
                [
                    product.title,
                    product.category,
                    product.productType,
                    product.dressStyle,
                    product.colors.join(" "),
                    product.sizes.join(" "),
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(normalizedSearchQuery);

            return (
                matchesType &&
                matchesPrice &&
                matchesColor &&
                matchesSize &&
                matchesStyle &&
                matchesSearch
            );
        });

        switch (sortBy) {
            case "price-low":
                return [...filtered].sort((left, right) => left.price - right.price);
            case "price-high":
                return [...filtered].sort((left, right) => right.price - left.price);
            case "newest":
                return [...filtered].sort((left, right) => right.id - left.id);
            default:
                return [...filtered].sort((left, right) => right.rating - left.rating);
        }
    }, [appliedFilters, normalizedSearchQuery, products, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    return {
        draftFilters,
        filteredProducts,
        hasError,
        isLoading,
        pageSize,
        pageNumbers: Array.from({ length: totalPages }, (_, index) => index + 1),
        pageTitle: getPageTitle(slug, appliedFilters?.dressStyle),
        paginatedProducts: filteredProducts.slice(
            (safePage - 1) * pageSize,
            safePage * pageSize,
        ),
        priceBounds,
        productTypes,
        rangeEnd: Math.min(safePage * pageSize, filteredProducts.length),
        rangeStart: filteredProducts.length === 0 ? 0 : (safePage - 1) * pageSize + 1,
        safePage,
        setCurrentPage,
        setDraftFilters,
        setSortBy,
        sortBy,
        totalPages,
        applyFilters: () => {
            if (!draftFilters) {
                return;
            }

            setAppliedFilters({ ...draftFilters });
            setCurrentPage(1);
        },
        toggleDraftValue: (
            key: "productTypes" | "colors" | "sizes",
            value: string,
        ) => {
            setDraftFilters((current) => {
                if (!current) {
                    return current;
                }

                const nextValues = current[key].includes(value)
                    ? current[key].filter((item) => item !== value)
                    : [...current[key], value];

                return { ...current, [key]: nextValues };
            });
        },
    };
};
