export function Header() {
    return (
        <header className="relative w-full flex flex-col items-center justify-center overflow-hidden py-20 px-4 text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground relative z-10">
                devularia.dev
            </h1>

            <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto relative z-10">
                description
            </p>
        </header>
    );
}
