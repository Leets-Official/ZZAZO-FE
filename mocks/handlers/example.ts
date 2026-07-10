import { http, HttpResponse } from 'msw';

export const exampleHandlers = [
  http.get('/api/health', () => {
    return HttpResponse.text('OK');
  }),
];
