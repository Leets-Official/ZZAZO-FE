import { CandidateEmptyState } from '@/features/timetable/components/CandidateEmptyState';
import { Navbar } from '../../_component/Navbar';

export default function TimetableEmptyPage() {
  return (
    <div className="min-h-screen bg-s50">
      <Navbar
        actions={[
          {
            label: '피드백 남기기',
            href: '#',
            variant: 'text',
          },
        ]}
      />

      <main className="flex min-h-[calc(100vh-57px)] items-center justify-center">
        <CandidateEmptyState />
      </main>
    </div>
  );
}
