export type DressStyleItem = {
    id: number;
    title: string;
    image: string;
    mobileImage?: string;
    span: "small" | "large";
    imageClassName: string;
};

export const dressStyleItems: DressStyleItem[] = [
    {
        id: 1,
        title: "Casual",
        image: "/Frame%2061.png",
        mobileImage: "/img11.png",
        span: "small",
        imageClassName: "object-right scale-100 sm:object-left sm:scale-100",
    },
    {
        id: 2,
        title: "Gym",
        image: "/Frame%2062.png",
        span: "large",
        imageClassName: "object-right scale-100 sm:object-left sm:scale-100",
    },
    {
        id: 3,
        title: "Party",
        image: "/Frame%2064.png",
        span: "large",
        imageClassName: "object-right scale-100 sm:object-left sm:scale-100",
    },
    {
        id: 4,
        title: "Formal",
        image: "/Frame%2063.png",
        mobileImage: "/img14.png",
        span: "small",
        imageClassName: "object-right scale-100 sm:object-left sm:scale-100",
    },
];
