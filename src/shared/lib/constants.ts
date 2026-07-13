/**
 * 백엔드 GET /api/v1/departments 응답 기준 (2026-07-13).
 * 학과가 3개로 고정이라 하드코딩. 학과가 추가되면 이 파일도 함께 수정해야 하며,
 * 앞으로 늘어날 예정이라면 API 연동으로 교체할 것.
 */
export const DEPARTMENTS = [
  { id: 1, name: '경영학과' },
  { id: 2, name: '컴퓨터공학과' },
  { id: 3, name: '전자공학과' },
] as const;
