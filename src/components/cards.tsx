import { FaQuestion } from "react-icons/fa";

export function Cards() {
  const cards = [
    {
      icon: <FaQuestion />,
      title: '???',
      description: '???????????????????????????????????????',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[70rem] w-full">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-2xl backdrop-blur-sm border transition-all duration-300 p-4 flex flex-row items-start text-left hover:shadow-lg hover:bg-card"
        >
          <div className="mr-4 bg-secondary/50 rounded-xl w-10 h-10 text-xl flex items-center justify-center shadow-sm flex-shrink-0">
            {card.icon}
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1 line-clamp-2">
              {card.title}
            </h3>
            <p className="text-sm text-muted-foreground ">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
