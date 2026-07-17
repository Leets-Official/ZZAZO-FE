import { AuthOnly } from '@/features/auth/components/AuthOnly';
import { SavedDetailContent } from './_component/SavedDetailContent';

export default async function SavedDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AuthOnly>
      <SavedDetailContent id={Number(id)} />
    </AuthOnly>
  );
}
