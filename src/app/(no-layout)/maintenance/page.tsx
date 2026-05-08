const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zoltanrakottyai' },
  { label: 'GitHub', href: 'https://github.com/zrktty' },
  { label: 'Email', href: 'mailto:zoltanrakottyai@gmail.com' },
]

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-lg w-full">
        <p className="font-vin-pro-mono text-[11px] uppercase tracking-widest text-gray-400 mb-10">
          ERROR_503
        </p>

        <h1 className="font-vin-pro-mono font-bold text-[52px] md:text-[72px] leading-none text-gray-900 mb-12">
          SYSTEM_DOWN<span className="animate-pulse text-green-600">_</span>
        </h1>

        <div className="mb-12 flex flex-col gap-2">
          <p className="font-vin-pro-mono text-[16px] text-gray-900">
            🚧 We&apos;re Under Maintenance
          </p>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            Our site is temporarily unavailable. Please check back soon.
          </p>
        </div>

        <div className="flex items-center justify-center gap-8">
          {socialLinks.map((link, i) => (
            <span key={link.label} className="flex items-center gap-8">
              <a
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="font-vin-pro-mono text-[12px] text-gray-400 hover:text-green-600 transition-colors"
              >
                {link.label}
              </a>
              {i < socialLinks.length - 1 && (
                <span className="font-vin-pro-mono text-[12px] text-gray-200">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </main>
  )
}
