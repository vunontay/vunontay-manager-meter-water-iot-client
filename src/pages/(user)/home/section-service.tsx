import { Check } from "lucide-react";

const ServiceSection = () => {
    return (
        <section className="py-12 sm:py-24 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl mx-auto">
            <div className="text-center flex flex-col justify-center items-center py-6 md:py-10">
                <h3 className="text-3xl md:text-4xl text-center font-bold uppercase">
                    Quản lý Ghi chỉ số Nước
                </h3>
                <p className="text-muted-foreground text-sm mt-4">
                    Giải pháp IoT đồng hồ nước sử dụng LoRa cho phép thu thập và
                    quản lý dữ liệu ghi chỉ số từ xa một cách chính xác và nhanh
                    chóng, giúp tiết kiệm thời gian và nhân lực.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-md overflow-hidden shadow-md flex items-center">
                    <img
                        src="/service-banner.webp"
                        alt="service"
                        loading="lazy"
                    />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <h4 className="text-xl font-medium">
                        Giải pháp Ghi chỉ số Nước IOT
                    </h4>

                    <p className="text-muted-foreground text-sm mt-4 flex items-center  gap-2">
                        <Check className="text-green-400" /> Hiện đại hóa công
                        việc ghi chỉ số đồng hồ, nâng cao năng suất lao động và
                        tăng cường quản lý giám sát.
                    </p>
                    <p className="text-muted-foreground text-sm mt-4 flex items-center  gap-2">
                        <Check className="text-green-400" /> Hiện đại hóa công
                        Loại bỏ phần lớn các công đoạn thủ công, nhờ đó giảm
                        thiểu các sai sót trong quá trình Ghi chỉ số.
                    </p>
                    <p className="text-muted-foreground text-sm mt-4 flex items-center  gap-2">
                        <Check className="text-green-400" /> Công nghệ LoRa cung
                        cấp kết nối mạnh mẽ và ổn định trên diện rộng, phù hợp
                        cho việc triển khai hệ thống ghi chỉ số nước ở cả khu
                        vực thành thị và nông thôn.
                    </p>
                    <p className="text-muted-foreground text-sm mt-4 flex items-center  gap-2">
                        <Check className="text-green-400" /> Công nghệ LoRa cung
                        Cung cấp khả năng giám sát trạng thái đồng hồ nước theo
                        thời gian thực và điều khiển từ xa thông qua nền tảng
                        quản lý trung tâm.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ServiceSection;