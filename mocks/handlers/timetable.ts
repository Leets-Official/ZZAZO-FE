import { http, HttpResponse } from 'msw';
import { savedTimetables } from '../data/timetables';

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
];
