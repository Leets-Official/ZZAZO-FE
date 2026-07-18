import { z } from 'zod';
import { DAYS_OF_WEEK } from './type';

export const conditionSchema = z.object({
  departmentId: z.string().min(1, '학과를 선택해주세요.'),
  targetCredits: z
    .string()
    .min(1, '목표 학점을 입력해주세요.')
    .refine((v) => Number(v) >= 12 && Number(v) <= 30, '목표 학점은 12~30 사이로 입력해주세요.'),
  preferredFreeDays: z
    .array(z.enum(DAYS_OF_WEEK))
    .max(2, '공강 요일은 최대 2개까지 선택할 수 있습니다.'),
});

export type ConditionForm = z.infer<typeof conditionSchema>;
