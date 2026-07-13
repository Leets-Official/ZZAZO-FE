import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { scheduleGridCourses } from '../../../../mocks/data/scheduleGrid';
import { ScheduleGrid } from './ScheduleGrid';

const meta = {
  title: 'features/timetable/ScheduleGrid',
  component: ScheduleGrid,
  parameters: {
    layout: 'padded',
  },
  args: {
    courses: scheduleGridCourses,
  },
} satisfies Meta<typeof ScheduleGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    courses: [],
  },
};

export const EmptyLectureTime: Story = {
  args: {
    courses: [
      {
        lectureId: 13,
        lectureName: '경영학원론',
        section: '001',
        professor: '홍길동',
        credit: 3,
        lectureClassification: '전공필수',
        classroom: '가천관 000호',
        lectureTime: [],
      },
    ],
  },
};

export const Overlapped: Story = {
  args: {
    courses: [
      ...scheduleGridCourses,
      {
        lectureId: 13,
        lectureName: '경영학원론',
        section: '001',
        professor: '홍길동',
        credit: 3,
        lectureClassification: '전공필수',
        classroom: '가천관 000호',
        lectureTime: [{ dayOfWeek: 'MON', startTime: '10:30', endTime: '11:45' }],
      },
    ],
  },
};
