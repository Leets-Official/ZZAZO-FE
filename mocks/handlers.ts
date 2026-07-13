import { exampleHandlers } from './handlers/example';
import { timetableHandlers } from './handlers/timetable';
import { authHandlers } from './handlers/auth';

export const handlers = [...exampleHandlers, ...authHandlers, ...timetableHandlers];
