import { AuthOnly } from '@/features/auth/components/AuthOnly';
import { DashboardContent } from './_component/DashboardContent';

export default function DashboardPage() {
  return (
    <AuthOnly>
      <DashboardContent />
    </AuthOnly>
  );
}
