import { http, HttpResponse } from 'msw';

export const timetableHandlers = [
  http.post('/api/v1/timetables/recommend', () => {
    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON_200_1',
      message: '요청 응답 성공',
      data: {
        totalCredits: 18,
        satisfiedFreeDays: ['FRI'],
        timetables: [
          {
            lectureId: 13,
            lectureName: '경영학원론',
            credit: 3,
            lectureClassification: 'MAJOR_REQUIREMENT',
            lectureTime: [
              { startTime: '10:30', endTime: '11:45', dayOfWeek: 'MON' },
              { startTime: '10:30', endTime: '11:45', dayOfWeek: 'WED' },
            ],
          },
          {
            lectureId: 21,
            lectureName: 'AI기초',
            credit: 3,
            lectureClassification: 'LIBERAL_ELECTIVE',
            lectureTime: [{ startTime: '09:00', endTime: '10:15', dayOfWeek: 'TUE' }],
          },
        ],
      },
    });
  }),
];
