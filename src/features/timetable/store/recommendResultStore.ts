import { create } from 'zustand';
import type { RecommendConditionRequest, RecommendResultData } from '../type';

interface RecommendResultState {
  result: RecommendResultData | null;
  condition: RecommendConditionRequest | null;
  setResult: (result: RecommendResultData, condition: RecommendConditionRequest) => void;
  clearResult: () => void;
}

// 추천 결과는 id도 없고 재조회 API도 없는 1회성 데이터라 persist하지 않는다.
// 새로고침하면 비어서 결과 화면이 조건 입력으로 되돌려보낸다.
export const useRecommendResultStore = create<RecommendResultState>((set) => ({
  result: null,
  condition: null,
  setResult: (result, condition) => set({ result, condition }),
  clearResult: () => set({ result: null, condition: null }),
}));
