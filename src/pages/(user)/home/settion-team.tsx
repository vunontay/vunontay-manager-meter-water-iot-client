import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { GithubIcon, LinkedinIcon, XIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface TeamProps {
    imageUrl: string;
    firstName: string;
    lastName: string;
    positions: string[];
    socialNetworks: SocialNetworkProps[];
}
interface SocialNetworkProps {
    name: string;
    url: string;
}
const TeamSection = () => {
    const teamList: TeamProps[] = [
        {
            imageUrl: "/team-1.webp",
            firstName: "Nguyễn Hoàng",
            lastName: "Vũ",
            positions: ["Web Developer", "Creator Of This Website"],
            socialNetworks: [
                {
                    name: "LinkedIn",
                    url: "",
                },
                {
                    name: "Github",
                    url: "",
                },
                {
                    name: "X",
                    url: "",
                },
            ],
        },
        {
            imageUrl: "/team-2.webp",
            firstName: "Hoàng Tuấn",
            lastName: "Vũ",
            positions: ["Embedded Developer", "IoT Developer"],
            socialNetworks: [
                {
                    name: "LinkedIn",
                    url: "",
                },
                {
                    name: "X",
                    url: "",
                },
            ],
        },
    ];
    const socialIcon = (socialName: string) => {
        switch (socialName) {
            case "LinkedIn":
                return <LinkedinIcon />;
            case "Github":
                return <GithubIcon />;
            case "X":
                return <XIcon />;
        }
    };

    return (
        <section
            id="team"
            className="py-12 sm:py-24 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl mx-auto"
        >
            <div className="text-center mb-8">
                <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
                    Team
                </h2>

                <h2 className="text-3xl md:text-4xl text-center font-bold uppercase">
                    Đội ngũ của công ty
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {teamList.map(
                    (
                        {
                            imageUrl,
                            firstName,
                            lastName,
                            positions,
                            socialNetworks,
                        },
                        index
                    ) => (
                        <Card
                            key={index}
                            className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg"
                        >
                            <CardHeader className="p-0 gap-0">
                                <div className="h-full overflow-hidden">
                                    <img
                                        loading="lazy"
                                        src={imageUrl}
                                        alt=""
                                        width={300}
                                        height={300}
                                        className="w-full aspect-square object-cover saturate-0 transition-all duration-200 ease-linear size-full group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.01]"
                                    />
                                </div>
                                <CardTitle className="py-6 pb-4 px-6">
                                    {firstName}
                                    <span className="text-primary ml-2">
                                        {lastName}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            {positions.map((position, index) => (
                                <CardContent
                                    key={index}
                                    className={`pb-0 text-muted-foreground ${
                                        index === positions.length - 1 && "pb-6"
                                    }`}
                                >
                                    {position}
                                    {index < positions.length - 1 && (
                                        <span>,</span>
                                    )}
                                </CardContent>
                            ))}

                            <CardFooter className="space-x-4 mt-auto">
                                {socialNetworks.map(({ name, url }, index) => (
                                    <Link
                                        key={index}
                                        to={url}
                                        target="_blank"
                                        className="hover:opacity-80 transition-all"
                                    >
                                        {socialIcon(name)}
                                    </Link>
                                ))}
                            </CardFooter>
                        </Card>
                    )
                )}
            </div>
        </section>
    );
};

export default TeamSection;
