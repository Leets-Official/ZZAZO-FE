import { AuthOnly } from '@/features/auth/components/AuthOnly';
import { SavedListContent } from './_component/SavedListContent';

export default function SavedListPage() {
  return (
    <AuthOnly>
      <SavedListContent />
    </AuthOnly>
  );
}
