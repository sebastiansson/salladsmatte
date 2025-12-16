interface HeaderProps {
  className?: string;
}

export function Header({ className = "" }: HeaderProps) {
  return (
    <header
      className={`bg-white border-b border-gray-100 sticky top-0 z-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://www.picadeli.se/sites/default/files/2023-02/logo-picadeli.svg"
            alt="Picadeli"
            className="h-8"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-picadeli-dark">
              Salladskalkylator
            </h1>
            <p className="text-xs text-gray-500">
              Beräkna näringsvärdet för din sallad
            </p>
          </div>
        </div>
        <a
          href="https://www.picadeli.se/sv/sortiment/salladsbaren"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-picadeli-green hover:underline"
        >
          Visa sortiment →
        </a>
      </div>
    </header>
  );
}
