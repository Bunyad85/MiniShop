export type ProductReview = {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
};

export type ProductDetailData = {
    id: number;
    title: string;
    description: string;
    category: string;
    brand?: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock?: number;
    availabilityStatus?: string;
    shippingInformation?: string;
    warrantyInformation?: string;
    returnPolicy?: string;
    reviews?: ProductReview[];
    images: string[];
    thumbnail: string;
};
