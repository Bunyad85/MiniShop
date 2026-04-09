export type HeaderNavItem = {
    id: string;
    label: string;
    href: string;
    hasDropdown?: boolean;
};

export type HeaderIconButtonProps = {
    label: string;
    onClick?: () => void;
    href?: string;
    badgeCount?: number;
};
