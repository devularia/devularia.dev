import { FaQuestion } from "react-icons/fa";

export function Cards() {
  const cards = [
    {
      icon: <FaQuestion />,
      title: "title",
      description: "description",
    },
    {
      icon: <FaQuestion />,
      title: "title",
      description: "description",
    },
    {
      icon: <FaQuestion />,
      title: "title",
      description: "description",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[70rem] w-full">
      {cards.map((card, index) => (
        <div
          key={index}
          className="group relative rounded-2xl backdrop-blur-sm border border-border/50 transition-all duration-300 p-4 flex flex-row items-start text-left hover:shadow-lg hover:bg-card/70"
        >
          <div className="mr-4 bg-secondary/50 rounded-xl w-10 h-10 text-xl flex items-center justify-center shadow-sm flex-shrink-0 group-hover:bg-secondary/60 transition-colors duration-300">
            {card.icon}
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1 line-clamp-2 group-hover:text-foreground transition-colors duration-300">
              {card.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-snug line-clamp-3">
              {card.description}
            </p>
          </div>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-20 blur-xl transition duration-500 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
