const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/debee.fbr/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6 md:w-7 md:h-7">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/debyfebrianty/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7">
        <path d="M4.98 3.5A2.49 2.49 0 1 1 5 8.48a2.49 2.49 0 0 1-.02-4.98zM3 9.75h4V21H3V9.75zM9.5 9.75h3.84v1.54h.05c.54-.97 1.85-2 3.79-2 4.05 0 4.8 2.67 4.8 6.14V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.32-1.96 2.69V21h-4V9.75z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:debyfebr2@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6 md:w-7 md:h-7">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3.5 7l8.5 6 8.5-6" />
      </svg>
    ),
  },
];

export default function FooterContact() {
  return (
    <footer className="w-full py-20 px-6 md:px-12 border-t border-[var(--color-charcoal)]/10 bg-[var(--color-mushroom)]/30">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter mb-4">
          Let&apos;s work together
        </h2>
        <p className="text-lg opacity-70 mb-14">I turn complex data into clear decisions.</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-14">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="group flex items-center gap-3 text-[var(--color-charcoal)] hover:text-[var(--color-coral)] transition-colors"
            >
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">{s.icon}</span>
              <span className="font-heading font-bold text-2xl md:text-4xl tracking-tight pb-1 border-b-2 border-transparent group-hover:border-[var(--color-coral)] transition-colors">
                {s.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 text-xs opacity-50 flex flex-col md:flex-row justify-between items-center">
        <span>© {new Date().getFullYear()} Deby Febrianty</span>
        <span className="mt-2 md:mt-0">Data Analyst Portfolio</span>
      </div>
    </footer>
  );
}