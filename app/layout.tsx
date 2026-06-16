import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scrollbar-none">
      <body>
        {children}
      </body>
    </html>
  )
}