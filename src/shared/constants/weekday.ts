const DAY_LABEL: Record<string, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};

const DAY_ORDER = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

/** ["FRI", "WED"] → "수요일, 금요일" (요일 순 정렬) */
export function formatFreeDays(days: string[]): string {
  return days
    .slice()
    .sort((a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b))
    .map((d) => `${DAY_LABEL[d] ?? d}요일`)
    .join(', ');
}
