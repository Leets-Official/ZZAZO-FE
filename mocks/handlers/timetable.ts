import { http, HttpResponse } from 'msw';
import { savedTimetables } from '../data/timetables';
import { savedTimetableDetails } from '../data/savedTimetableDetail';
const BASE = 'http://localhost:9090/api/v1';

export const timetableHandlers = [
  http.get(`${BASE}/timetables`, () => {
    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON_200_1',
      message: '요청 응답 성공',
      data: { timetables: savedTimetables },
    });
  }),

  http.get(`${BASE}/timetables/:timetableId`, ({ params }) => {
    const id = Number(params.timetableId);
    const detail = savedTimetableDetails[id];

    if (!detail) {
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 'TIMETABLE_404_1',
          message: '시간표를 찾을 수 없습니다.',
          data: null,
        },
        { status: 404 }
      );
    }
    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON_200_1',
      message: '요청 응답 성공',
      data: detail,
    });
  }),
];
