import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import type { NewArrivalItem } from "../home/components/new-arrivals/newArrivals.types";
import ProductGallery from "./ProductGallery";
import ProductExtraSection from "./ProductExtraSection";
import ProductInfo from "./ProductInfo";
import ProductRecommendations from "./ProductRecommendations";
import type { ProductDetailData, ProductReview } from "./productDetail.types";

const formatCategoryLabel = (category: string) =>
    category
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

type RelatedProductsResponse = {
    products: Array<{
        id: number;
        title: string;
        price: number;
        discountPercentage: number;
        rating: number;
        thumbnail: string;
        images?: string[];
    }>;
};

type CommentsResponse = {
    comments: Array<{
        id: number;
        body: string;
        likes?: number;
        user: {
            username: string;
            fullName: string;
        };
    }>;
};

const createFallbackReviewDate = (index: number) => {
    const date = new Date();
    date.setDate(date.getDate() - (index + 1) * 4);
    return date.toISOString();
};

const INITIAL_REVIEW_COUNT = 6;
const MAX_REVIEW_COUNT = 10;

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductDetailData | null>(null);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [recommendedItems, setRecommendedItems] = useState<NewArrivalItem[]>([]);
    const [reviews, setReviews] = useState<ProductReview[]>([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });

        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                setHasError(false);

                const { data } = await axios.get<ProductDetailData>(
                    `https://dummyjson.com/products/${id}`,
                );

                const baseImages = data.images?.length ? data.images : [data.thumbnail];
                const baseReviews = data.reviews ?? [];

                let extraImages: string[] = [];
                let extraReviews: ProductReview[] = [];
                let nextRecommendedItems: NewArrivalItem[] = [];

                try {
                    const { data: relatedData } = await axios.get<RelatedProductsResponse>(
                        `https://dummyjson.com/products/category/${encodeURIComponent(
                            data.category,
                        )}?limit=10`,
                    );

                    extraImages = relatedData.products
                        .filter((relatedProduct) => relatedProduct.id !== data.id)
                        .map(
                            (relatedProduct) =>
                                relatedProduct.images?.[0] ?? relatedProduct.thumbnail,
                        )
                        .filter((image) => !baseImages.includes(image))
                        .slice(0, 2);

                    nextRecommendedItems = relatedData.products
                        .filter((relatedProduct) => relatedProduct.id !== data.id)
                        .slice(0, 4)
                        .map((relatedProduct) => {
                            const oldPrice = Math.round(
                                relatedProduct.price /
                                    (1 - relatedProduct.discountPercentage / 100),
                            );

                            return {
                                id: relatedProduct.id,
                                title: relatedProduct.title,
                                price: relatedProduct.price,
                                image:
                                    relatedProduct.images?.[0] ?? relatedProduct.thumbnail,
                                oldPrice:
                                    oldPrice > relatedProduct.price ? oldPrice : undefined,
                                discount:
                                    relatedProduct.discountPercentage > 0
                                        ? `-${Math.round(relatedProduct.discountPercentage)}%`
                                        : undefined,
                                rating: Number(relatedProduct.rating.toFixed(1)),
                            };
                        });
                } catch {
                    extraImages = [];
                    nextRecommendedItems = [];
                }

                if (baseReviews.length < MAX_REVIEW_COUNT) {
                    try {
                        const neededReviews = MAX_REVIEW_COUNT - baseReviews.length;
                        const { data: commentsData } = await axios.get<CommentsResponse>(
                            `https://dummyjson.com/comments?limit=${neededReviews}&skip=${
                                Math.max((Number(id ?? 1) - 1) * neededReviews, 0)
                            }`,
                        );

                        extraReviews = commentsData.comments.map((comment, index) => ({
                            rating: Math.min(5, Math.max(3, 5 - ((comment.likes ?? 0) % 3))),
                            comment: comment.body,
                            date: createFallbackReviewDate(index),
                            reviewerName: comment.user.fullName,
                            reviewerEmail: `${comment.user.username}@dummyjson.dev`,
                        }));
                    } catch {
                        extraReviews = [];
                    }
                }

                setProduct(data);
                setGalleryImages([...baseImages, ...extraImages]);
                setRecommendedItems(nextRecommendedItems);
                setReviews(
                    [...baseReviews, ...extraReviews].slice(
                        0,
                        Math.max(INITIAL_REVIEW_COUNT, MAX_REVIEW_COUNT),
                    ),
                );
                setSelectedImage(baseImages[0] ?? data.thumbnail);
            } catch {
                setHasError(true);
                setGalleryImages([]);
                setRecommendedItems([]);
                setReviews([]);
            } finally {
                setIsLoading(false);
            }
        };

        if (!id) {
            setHasError(true);
            setIsLoading(false);
            setGalleryImages([]);
            setRecommendedItems([]);
            setReviews([]);
            return;
        }

        void fetchProduct();
    }, [id]);

    return (
        <main className="w-full bg-white py-4 pb-50 lg:py-5 lg:pb-50">
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-2 text-[14px] text-black/60">
                    <Link to="/" className="transition-colors hover:text-black">
                        Home
                    </Link>
                    <img
                        src="/right.svg"
                        alt=""
                        aria-hidden="true"
                        className="h-3.5 w-3.5 opacity-50"
                    />
                    <span>Shop</span>
                    {product && (
                        <>
                            <img
                                src="/right.svg"
                                alt=""
                                aria-hidden="true"
                                className="h-3.5 w-3.5 opacity-50"
                            />
                            <span>{formatCategoryLabel(product.category)}</span>
                        </>
                    )}
                </div>

                {hasError ? (
                    <div className="mt-10 rounded-[20px] border border-black/10 p-8 text-center">
                        <p className="text-[16px] text-black/60">Product could not be loaded.</p>
                    </div>
                ) : isLoading || !product ? (
                    <div className="mt-5 grid gap-5 lg:grid-cols-[0.88fr_0.92fr]">
                        <div className="grid gap-3 md:grid-cols-[80px_minmax(0,1fr)]">
                            <div className="order-2 flex gap-3 md:order-1 md:flex-col">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-20 w-20 animate-pulse rounded-2xl bg-[#F0EEED]"
                                    />
                                ))}
                            </div>
                            <div className="order-1 min-h-80 animate-pulse rounded-2xl bg-[#F0EEED] md:order-2" />
                        </div>

                        <div className="animate-pulse">
                            <div className="h-10 w-3/4 rounded bg-[#F0EEED]" />
                            <div className="mt-4 h-6 w-40 rounded bg-[#F0EEED]" />
                            <div className="mt-4 h-10 w-1/2 rounded bg-[#F0EEED]" />
                            <div className="mt-5 h-20 rounded bg-[#F0EEED]" />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mt-5 grid gap-5 lg:grid-cols-[0.88fr_0.92fr] lg:items-stretch">
                            <ProductGallery
                                images={galleryImages}
                                title={product.title}
                                selectedImage={selectedImage}
                                onSelectImage={setSelectedImage}
                            />
                            <ProductInfo product={product} image={selectedImage} />
                        </div>
                        <ProductExtraSection product={product} reviews={reviews} />
                        <ProductRecommendations items={recommendedItems} />
                    </>
                )}
            </section>
        </main>
    );
};

export default ProductDetail;
