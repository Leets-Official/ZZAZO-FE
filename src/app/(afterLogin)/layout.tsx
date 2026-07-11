export default function AfterLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* 로그인 후 공통 레이아웃입니다 */}
      {children}
    </div>
  );
}
