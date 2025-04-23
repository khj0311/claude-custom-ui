/**
 * 기본 컴포넌트 Props 타입 정의
 */

// 공통 Props 타입 - 모든 컴포넌트에서 사용 가능한 속성
export interface CommonProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

// 컬러 테마 타입
export type ThemeColor = 'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success';

// 사이즈 타입
export type Size = 'small' | 'medium' | 'large';

// 컴포넌트별 Props 타입은 각 컴포넌트 구현 시 추가
