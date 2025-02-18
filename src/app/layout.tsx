import "./globals.css";

export const metadata = {
  title: "To-Do List",
  description: "A simple Next.js to-do list app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
