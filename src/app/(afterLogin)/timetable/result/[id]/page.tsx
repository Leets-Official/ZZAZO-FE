import { notFound } from 'next/navigation';
import { TimetableDetail } from '@/features/timetable/components/TimetableDetail';
import { getTimetableCandidateMock } from '../../../../../../mocks/data/timetableCandidates';

export default async function TimetableResultDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const candidate = getTimetableCandidateMock(id);

  if (!candidate) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-s50">
      <div className="w-full px-8 py-10">
        <TimetableDetail candidate={candidate} />
      </div>
    </main>
  );
}
