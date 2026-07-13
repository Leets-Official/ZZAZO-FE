import { AuthOnly } from '@/features/auth/components/AuthOnly';
import { ConditionContent } from './_component/ConditionContent';

export default function TimetableConditionPage() {
  return (
    <AuthOnly>
      <ConditionContent />
    </AuthOnly>
  );
}
