import type { CourseCategory } from '@/shared/types';
import type { BadgeVariant } from '@/shared/ui/Badge';
import { Badge } from '@/shared/ui/Badge';

const COURSE_BADGE_VARIANT: Record<CourseCategory, BadgeVariant> = {
  전공기초: 'majorBasic',
  교양필수: 'generalEducationRequired',
  교양선택: 'generalEducationElective',
  전공필수: 'majorRequired',
  전공선택: 'majorElective',
  일반선택: 'general',
};

export function CourseTypeBadge({ type }: { type: CourseCategory }) {
  return <Badge variant={COURSE_BADGE_VARIANT[type]}>{type}</Badge>;
}
