export default function Footer() {
  return (
    <footer className="relative z-10 w-full py-4 px-6 flex flex-wrap items-center justify-between gap-2 text-white/40 text-xs border-t border-white/5">
      <a
        href="mailto:daniel@devcon1solutions.com"
        className="hover:text-white/70 transition-colors"
      >
        daniel@devcon1solutions.com
      </a>
      <p className="hidden md:block">
        DevCon1 Solutions LLC, All Rights Reserved
      </p>
      <p>Copyright &copy; {new Date().getFullYear()}</p>
    </footer>
  )
}
