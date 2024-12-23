import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomeSection = () => {
    return (
        <section className="w-full mx-auto relative ">
            <div className="relative w-full">
                <img
                    src="/home-banner.webp"
                    alt="home banner"
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center gap-2 md:gap-4">
                    <h1 className="text-white text-xl md:text-4xl font-bold uppercase">
                        Đồng hồ nước thông minh - Đơn giản hóa quản lý, Nâng tầm
                        trải nghiệm
                    </h1>
                    <h2 className="text-white text-sm md:text-xl capitalize">
                        Tiết kiệm nước - Quản lý thông minh - Kết nối tương lai
                    </h2>

                    <Button className="max-w-[500px] mt-2">
                        Liên hệ nhận tư vấn <ArrowRight className="size-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HomeSection;
