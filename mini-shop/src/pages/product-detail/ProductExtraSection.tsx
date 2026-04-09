import { useEffect, useMemo, useState } from "react";
import type { ProductDetailData, ProductReview } from "./productDetail.types";

type ProductTab = "details" | "reviews" | "faqs";
type ReviewSort = "latest" | "highest" | "lowest";
const INITIAL_VISIBLE_REVIEW_COUNT = 6;
const LOAD_MORE_REVIEW_STEP = 2;

const TABS: Array<{ id: ProductTab; label: string }> = [
    { id: "details", label: "Product Details" },
    { id: "reviews", label: "Rating & Reviews" },
    { id: "faqs", label: "FAQs" },
];

const formatReviewDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Recent review";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(parsedDate);
};

const getReviewerInitials = (name: string) =>
    name
        .split(" ")
        .map((part) => part[0] ?? "")
        .join("")
        .slice(0, 2)
        .toUpperCase();

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-0.5 text-[#FFC633]">
        {Array.from({ length: 5 }).map((_, index) => (
            <svg
                key={index}
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={`h-4.5 w-4.5 ${
                    index < Math.round(rating) ? "fill-current" : "fill-[#E6E6E6]"
                }`}
            >
                <path d="M12 2.5L14.781 8.136L21 9.04L16.5 13.426L17.562 19.62L12 16.696L6.438 19.62L7.5 13.426L3 9.04L9.219 8.136L12 2.5Z" />
            </svg>
        ))}
    </div>
);

const ReviewCard = ({ review }: { review: ProductReview }) => (
    <article className="rounded-[20px] border border-black/10 bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
            <StarRating rating={review.rating} />
            <button
                type="button"
                aria-label="Review actions"
                className="text-black/40 transition-colors hover:text-black"
            >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                    <circle cx="5" cy="12" r="1.8" />
                    <circle cx="12" cy="12" r="1.8" />
                    <circle cx="19" cy="12" r="1.8" />
                </svg>
            </button>
        </div>

        <div className="mt-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0EEED] text-[12px] font-bold text-black">
                {getReviewerInitials(review.reviewerName)}
            </div>
            <div className="min-w-0">
                <div className="flex items-center gap-2">
                    <h3 className="truncate text-[18px] font-bold text-black">
                        {review.reviewerName}
                    </h3>
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#01AB31]">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3 stroke-white">
                            <path
                                d="M5.5 12.5L9.5 16.5L18.5 7.5"
                                fill="none"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </div>
                <p className="text-[13px] text-black/40">{review.reviewerEmail}</p>
            </div>
        </div>

        <p className="mt-3 text-[14px] leading-6 text-black/60">{review.comment}</p>

        <p className="mt-5 text-[13px] text-black/40">
            Posted on {formatReviewDate(review.date)}
        </p>
    </article>
);

type ProductExtraSectionProps = {
    product: ProductDetailData;
    reviews: ProductReview[];
};

const ProductExtraSection = ({ product, reviews }: ProductExtraSectionProps) => {
    const [activeTab, setActiveTab] = useState<ProductTab>("reviews");
    const [sortOrder, setSortOrder] = useState<ReviewSort>("latest");
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_REVIEW_COUNT);

    useEffect(() => {
        setActiveTab("reviews");
        setSortOrder("latest");
        setVisibleCount(INITIAL_VISIBLE_REVIEW_COUNT);
    }, [product.id]);

    const sortedReviews = useMemo(() => {
        const nextReviews = [...reviews];

        switch (sortOrder) {
            case "highest":
                return nextReviews.sort((left, right) => right.rating - left.rating);
            case "lowest":
                return nextReviews.sort((left, right) => left.rating - right.rating);
            case "latest":
            default:
                return nextReviews.sort(
                    (left, right) =>
                        new Date(right.date).getTime() - new Date(left.date).getTime(),
                );
        }
    }, [reviews, sortOrder]);

    const detailItems = [
        { label: "Category", value: product.category.replace(/-/g, " ") },
        { label: "Brand", value: product.brand ?? "DummyJSON Brand" },
        {
            label: "Availability",
            value: product.availabilityStatus ?? `${product.stock ?? 0} items in stock`,
        },
        { label: "Shipping", value: product.shippingInformation ?? "Ships within a few days." },
    ];

    const faqItems = [
        {
            question: "Is this product authentic?",
            answer:
                "Yes. This product data comes from DummyJSON and the listing is presented as an official catalog item in this demo storefront.",
        },
        {
            question: "What is the return policy?",
            answer:
                product.returnPolicy ??
                "Returns are accepted within the return window shown for this item.",
        },
        {
            question: "Does it include a warranty?",
            answer:
                product.warrantyInformation ??
                "Warranty information is not listed for this product in the source data.",
        },
    ];

    const canLoadMoreReviews = visibleCount < sortedReviews.length;

    return (
        <section className="mt-12 pt-4 sm:mt-16 sm:pt-8">
            <div className="grid grid-cols-3 border-b border-black/10">
                {TABS.map((tab) => {
                    const isActive = tab.id === activeTab;

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative pb-3 text-center text-[13px] font-medium transition-colors sm:pb-4 sm:text-[18px] ${
                                isActive ? "text-black" : "text-black/40 hover:text-black/70"
                            }`}
                        >
                            {tab.label}
                            <span
                                className={`absolute inset-x-0 bottom-[-1px] h-[2px] rounded-full transition-opacity ${
                                    isActive ? "bg-black opacity-100" : "bg-transparent opacity-0"
                                }`}
                            />
                        </button>
                    );
                })}
            </div>

            {activeTab === "reviews" && (
                <div className="pt-6 sm:pt-8">
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:justify-between sm:overflow-visible sm:pb-0">
                        <div className="flex shrink-0 items-end gap-1.5 sm:gap-2">
                            <h2 className="text-[20px] font-bold text-black sm:text-[28px]">
                                All Reviews
                            </h2>
                            <span className="pb-0.5 text-[12px] text-black/40 sm:pb-1 sm:text-[14px]">
                                ({reviews.length})
                            </span>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            <button
                                type="button"
                                aria-label="Filter reviews"
                                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F0F0F0] text-black transition-colors hover:bg-black hover:text-white"
                            >
                                <img src="/filtr.svg" alt="" aria-hidden="true" className="h-4.5 w-4.5" />
                            </button>

                            <label className="relative hidden sm:block">
                                <select
                                    value={sortOrder}
                                    onChange={(event) =>
                                        setSortOrder(event.target.value as ReviewSort)
                                    }
                                    className="h-12 appearance-none rounded-full bg-[#F0F0F0] px-5 pr-11 text-[14px] font-medium text-black outline-none"
                                >
                                    <option value="latest">Latest</option>
                                    <option value="highest">Highest Rated</option>
                                    <option value="lowest">Lowest Rated</option>
                                </select>
                                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-black/60">
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

                            <button
                                type="button"
                                className="inline-flex h-12 items-center justify-center rounded-full bg-black px-4 text-[13px] font-medium whitespace-nowrap text-white transition-opacity hover:opacity-90 sm:px-5 sm:text-[14px]"
                            >
                                Write a Review
                            </button>
                        </div>
                    </div>

                    {reviews.length > 0 ? (
                        <>
                            <div className="mt-6 grid gap-4 xl:grid-cols-2">
                                {sortedReviews.slice(0, visibleCount).map((review, index) => (
                                    <ReviewCard
                                        key={`${review.reviewerEmail}-${review.date}-${index}`}
                                        review={review}
                                    />
                                ))}
                            </div>

                            {canLoadMoreReviews && (
                                <div className="mt-8 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setVisibleCount(
                                                (current) => current + LOAD_MORE_REVIEW_STEP,
                                            )
                                        }
                                        className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-[14px] font-medium text-black transition-colors hover:bg-black hover:text-white"
                                    >
                                        Load More Reviews
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="mt-6 rounded-[20px] border border-dashed border-black/10 bg-[#FAFAFA] px-6 py-10 text-center">
                            <p className="text-[16px] text-black/60">
                                No reviews yet for this product.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === "details" && (
                <div className="grid gap-4 pt-8 md:grid-cols-2">
                    <article className="rounded-[20px] border border-black/10 p-6">
                        <p className="text-[13px] uppercase tracking-[0.22em] text-black/35">
                            Description
                        </p>
                        <p className="mt-4 text-[15px] leading-7 text-black/60">
                            {product.description}
                        </p>
                    </article>

                    <article className="rounded-[20px] border border-black/10 p-6">
                        <p className="text-[13px] uppercase tracking-[0.22em] text-black/35">
                            Product Info
                        </p>
                        <div className="mt-4 space-y-4">
                            {detailItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-start justify-between gap-4 border-b border-black/8 pb-4 last:border-b-0 last:pb-0"
                                >
                                    <span className="text-[14px] text-black/40">{item.label}</span>
                                    <span className="text-right text-[14px] font-medium text-black">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </article>
                </div>
            )}

            {activeTab === "faqs" && (
                <div className="grid gap-4 pt-8">
                    {faqItems.map((item) => (
                        <article
                            key={item.question}
                            className="rounded-[20px] border border-black/10 p-6"
                        >
                            <h3 className="text-[18px] font-bold text-black">{item.question}</h3>
                            <p className="mt-3 text-[15px] leading-7 text-black/60">
                                {item.answer}
                            </p>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProductExtraSection;
