import { exampleHandlers } from './handlers/example';
import { timetableHandlers } from './handlers/timetable';

export const handlers = [...exampleHandlers, ...timetableHandlers];
