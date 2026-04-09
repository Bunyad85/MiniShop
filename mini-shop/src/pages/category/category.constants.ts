import type { DummyCategoryProduct } from "./category.types";

export const PAGE_SIZE = 9;
export const MOBILE_PAGE_SIZE = 6;
export const MOBILE_BREAKPOINT = 640;
export const DRESS_STYLES = ["Casual", "Formal", "Party", "Gym"] as const;
export const PRODUCT_TYPE_OPTIONS = [
    "T-Shirts",
    "Shorts",
    "Shirts",
    "Hoodie",
    "Jeans",
] as const;
export const SIZE_OPTIONS = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
] as const;
export const COLOR_OPTIONS = [
    { name: "Green", value: "#00C12B" },
    { name: "Red", value: "#F50606" },
    { name: "Yellow", value: "#F5DD06" },
    { name: "Orange", value: "#F57906" },
    { name: "White", value: "#FFFFFF" },
    { name: "Sky", value: "#06CAF5" },
    { name: "Blue", value: "#063AF5" },
    { name: "Purple", value: "#7D06F5" },
    { name: "Pink", value: "#F506A4" },
    { name: "Black", value: "#000000" },
] as const;

export const formatLabel = (value: string) =>
    value
        .split(/[-\s]+/)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

export const getProductType = (product: DummyCategoryProduct) => {
    const source = `${product.title} ${product.category}`.toLowerCase();

    if (source.includes("shirt") || source.includes("tee") || source.includes("top")) {
        return "T-Shirts";
    }

    if (source.includes("polo")) {
        return "Shirts";
    }

    if (source.includes("jean") || source.includes("pant") || source.includes("trouser")) {
        return "Jeans";
    }

    if (source.includes("short")) {
        return "Shorts";
    }

    if (source.includes("hoodie") || source.includes("sweat")) {
        return "Hoodie";
    }

    return formatLabel(product.category);
};

export const getDressStyle = (product: DummyCategoryProduct) => {
    const source = `${product.title} ${product.category}`.toLowerCase();

    if (source.includes("sport") || source.includes("athletic") || source.includes("running")) {
        return "Gym";
    }

    if (source.includes("party") || source.includes("graphic") || source.includes("printed")) {
        return "Party";
    }

    if (source.includes("polo") || source.includes("shirt")) {
        return "Casual";
    }

    if (source.includes("dress") || source.includes("formal")) {
        return "Formal";
    }

    return DRESS_STYLES[product.id % DRESS_STYLES.length];
};

export const getColors = (productId: number) => {
    const first = COLOR_OPTIONS[productId % COLOR_OPTIONS.length].name;
    const second = COLOR_OPTIONS[(productId + 3) % COLOR_OPTIONS.length].name;
    return Array.from(new Set([first, second]));
};

export const getSizes = (productId: number) => {
    const startIndex = productId % 5;
    return SIZE_OPTIONS.slice(startIndex, startIndex + 4);
};

export const getInitialDressStyle = (slug: string | undefined) => {
    const normalizedSlug = slug?.toLowerCase() ?? "all";
    const matchedStyle = DRESS_STYLES.find(
        (style) => style.toLowerCase() === normalizedSlug,
    );

    return matchedStyle ?? null;
};

export const getPageTitle = (
    slug: string | undefined,
    activeDressStyle?: string | null,
) => {
    if (activeDressStyle) {
        return activeDressStyle;
    }

    if (!slug || slug === "all") {
        return "Casual";
    }

    return formatLabel(slug);
};
