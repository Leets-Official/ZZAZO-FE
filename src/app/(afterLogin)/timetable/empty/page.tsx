import { CandidateEmptyState } from '@/features/timetable/components/CandidateEmptyState';

export default function TimetableEmptyPage() {
  return (
    <div className="min-h-screen bg-s50">
      <main className="flex min-h-[calc(100vh-57px)] items-center justify-center">
        <CandidateEmptyState />
      </main>
    </div>
  );
}
