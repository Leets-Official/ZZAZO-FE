/** GET /timetables 목록 항목 (상세와 필드가 다름) */
export interface SavedTimetableSummary {
  timetableId: number;
  candidateName: string;
  departmentId: number;
  totalCredits: number;
  preferredFreeDays: string[]; // "MON" | "TUE" ... 영문 코드
  createdAt: string; // ISO 8601
}

export interface SavedTimetableListData {
  timetables: SavedTimetableSummary[];
}
