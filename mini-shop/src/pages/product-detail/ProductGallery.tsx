type ProductGalleryProps = {
    images: string[];
    title: string;
    selectedImage: string;
    onSelectImage: (image: string) => void;
};

const ProductGallery = ({
    images,
    title,
    selectedImage,
    onSelectImage,
}: ProductGalleryProps) => {
    return (
        <div className="grid gap-3 md:grid-cols-[84px_minmax(0,1fr)]">
            <div className="order-2 flex gap-2.5 overflow-x-auto pb-1 md:order-1 md:flex-col md:overflow-visible md:pb-0">
                {images.map((image, index) => {
                    const isActive = image === selectedImage;

                    return (
                        <button
                            key={`${image}-${index}`}
                            type="button"
                            onClick={() => onSelectImage(image)}
                            className={`flex h-21 w-21 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[14px] border bg-[#F0EEED] p-2 transition-colors ${
                                isActive ? "border-black" : "border-transparent"
                            }`}
                        >
                            <img
                                src={image}
                                alt={`${title} preview ${index + 1}`}
                                className="h-full w-full object-contain"
                            />
                        </button>
                    );
                })}
            </div>

            <div className="order-1 flex min-h-[390px] items-center justify-center rounded-[14px] bg-[#F0EEED] p-4 md:order-2">
                <img
                    src={selectedImage}
                    alt={title}
                    className="max-h-[265px] w-full object-contain md:max-h-[295px]"
                />
            </div>
        </div>
    );
};

export default ProductGallery;
