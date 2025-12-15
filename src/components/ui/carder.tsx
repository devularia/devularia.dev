import { Link } from "@tanstack/react-router";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface CarderProps {
    cards: {
        icon: React.ReactNode | string;
        title: string;
        path?: string;
        url?: string;
        description?: string;
    }[];
}

export function Carder({ cards }: CarderProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[70rem] w-full">
            <TooltipProvider>
                {cards.map((card, index) => {
                    const isExternal = !!card.url;
                    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
                        isExternal ? (
                            <div onClick={() => window.open(card.url, "_blank")}>{children}</div>
                        ) : (
                            <Link to={card.path || "#"}>{children}</Link>
                        );

                    return (
                        <Tooltip key={index}>
                            <TooltipTrigger>
                                <Wrapper>
                                    <div className="group relative rounded-2xl backdrop-blur-sm border border-border/50 transition-all duration-300 p-4 flex flex-row items-start text-left cursor-pointer hover:shadow-lg hover:bg-card/70">
                                        <div className="mr-4 bg-secondary/50 rounded-xl w-10 h-10 text-xl flex items-center justify-center shadow-sm flex-shrink-0 group-hover:bg-secondary/60 transition-colors duration-300">
                                            {typeof card.icon === "string" ? (
                                                <img src={card.icon} className="w-5 h-5 object-contain" />
                                            ) : (
                                                card.icon
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold mb-1 line-clamp-2 group-hover:text-foreground transition-colors duration-300">
                                                {card.title}
                                            </h3>
                                            {card.description && (
                                                <p className="text-sm text-muted-foreground leading-snug line-clamp-3">
                                                    {card.description}
                                                </p>
                                            )}
                                        </div>

                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-20 blur-xl transition duration-500 pointer-events-none" />
                                    </div>
                                </Wrapper>
                            </TooltipTrigger>
                            <TooltipContent>
                                {isExternal ? (
                                    <>You will be redirected to <span className="font-bold">{card.title}</span></>
                                ) : (
                                    <>You will navigate to <span className="font-bold">{card.title}</span></>
                                )}
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </TooltipProvider>
        </div>
    );
}
