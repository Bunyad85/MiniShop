import type { HeaderNavItem } from "./header.types";

export const HEADER_NAV_ITEMS: ReadonlyArray<HeaderNavItem> = [
    {
        id: 'shop',
        label: 'Shop',
        href: '/category/all',
        hasDropdown: true,
    },
    {
        id: 'on-sale',
        label: 'On Sale',
        href: '/sale',
    },
    {
        id: 'new-arrivals',
        label: 'New Arrivals',
        href: '/new-arrivals',
    },
    {
        id: 'brands',
        label: 'Brands',
        href: '/brands',
    },
];