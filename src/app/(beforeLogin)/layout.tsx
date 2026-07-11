export default function BeforeLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* 로그인 전 공통 레이아웃입니다 */}
      {children}
    </div>
  );
}
