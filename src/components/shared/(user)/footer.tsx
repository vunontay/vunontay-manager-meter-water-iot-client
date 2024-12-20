import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer id="footer" className="container">
            <div className="p-10 bg-card border border-secondary rounded-2xl">
                <div className="w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
                        <div className="col-span-full xl:col-span-2">
                            <Link to="/">
                                <img
                                    alt="logo"
                                    src="/logo.webp"
                                    className={
                                        "transition-all duration-300 ease-in-out size-32"
                                    }
                                />
                            </Link>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold text-md">Liên hệ</h3>
                            <div>
                                <Link
                                    to="#"
                                    className="opacity-60 hover:opacity-100 text-sm"
                                >
                                    Github
                                </Link>
                            </div>

                            <div>
                                <Link
                                    to="#"
                                    className="opacity-60 hover:opacity-100 text-sm"
                                >
                                    Facebook
                                </Link>
                            </div>

                            <div>
                                <Link
                                    to="#"
                                    className="opacity-60 hover:opacity-100 text-sm"
                                >
                                    Zalo
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold text-md">Nền tảng</h3>
                            <div>
                                <Link
                                    to="#"
                                    className="opacity-60 hover:opacity-100 text-sm"
                                >
                                    iOS
                                </Link>
                            </div>

                            <div>
                                <Link
                                    to="#"
                                    className="opacity-60 hover:opacity-100 text-sm"
                                >
                                    Android
                                </Link>
                            </div>

                            <div>
                                <Link
                                    to="#"
                                    className="opacity-60 hover:opacity-100 text-sm"
                                >
                                    Web
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold text-md">Hỗ trợ</h3>
                            <div>
                                <Link
                                    to="#"
                                    className="opacity-60 hover:opacity-100 text-sm"
                                >
                                    Liên hệ chúng tôi
                                </Link>
                            </div>

                            <div>
                                <Link
                                    to="#"
                                    className="opacity-60 hover:opacity-100 text-sm"
                                >
                                    Câu hỏi thường gặp
                                </Link>
                            </div>

                            <div>
                                <Link
                                    to="#"
                                    className="opacity-60 hover:opacity-100 text-sm"
                                >
                                    Phản hồi
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold text-md">Kết nối</h3>
                            <div>
                                <Link
                                    to="#"
                                    className="opacity-60 hover:opacity-100 text-sm"
                                >
                                    YouTube
                                </Link>
                            </div>

                            <div>
                                <Link
                                    to="#"
                                    className="opacity-60 hover:opacity-100 text-sm"
                                >
                                    Facebook
                                </Link>
                            </div>

                            <div>
                                <Link
                                    to="#"
                                    className="opacity-60 hover:opacity-100 text-sm"
                                >
                                    TikTok
                                </Link>
                            </div>
                        </div>
                    </div>

                    <section className="mt-4 border-t">
                        <h3 className="text-center mt-4">
                            &copy; 2024 Thiết kế và phát triển bởi
                            <Link
                                target="_blank"
                                to="https://www.facebook.com/Vu.0207"
                                className="text-primary transition-all border-primary hover:border-b-2 ml-1"
                            >
                                @vunontay
                            </Link>
                        </h3>
                    </section>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
