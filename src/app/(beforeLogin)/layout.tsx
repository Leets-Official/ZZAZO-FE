import { Navbar } from './_component/Navbar';

export default function BeforeLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
