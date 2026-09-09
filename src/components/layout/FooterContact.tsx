export default function FooterContact() {
  return (
    <footer className="w-full py-20 px-6 md:px-12 border-t border-[var(--color-charcoal)]/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter mb-4">Let&apos;s work together</h2>
          <p className="text-lg opacity-70">I turn complex data into clear decisions.</p>
        </div>
        <a href="mailto:debyfebr2@gmail.com" className="text-sm uppercase tracking-[0.2em] border-b border-[var(--color-charcoal)] pb-1 hover:border-[var(--color-coral)] hover:text-[var(--color-coral)] transition-colors">
          debyfebr2@gmail.com
        </a>
      </div>
      <div className="max-w-7xl mx-auto mt-12 text-xs opacity-50 flex flex-col md:flex-row justify-between items-center">
        <span>© {new Date().getFullYear()} Deby Febrianty</span>
        <span className="mt-2 md:mt-0">Data Analyst Portfolio</span>
      </div>
    </footer>
  );
}
