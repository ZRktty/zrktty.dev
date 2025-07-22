// app/maintenance/page.tsx
export default function MaintenancePage() {
  return (
    <main
      style={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        textAlign: 'center',
      }}
    >
      <h1 className="font-mono font-bold">🚧 We&#39;re Under Maintenance</h1>
      <p>Our site is temporarily unavailable. Please check back soon.</p>
    </main>
  )
}