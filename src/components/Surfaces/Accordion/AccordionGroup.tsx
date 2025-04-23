import React, { useState } from 'react';
import { styled, Box } from '@mui/material';
import { CommonProps } from '../../../types';
import Accordion, { AccordionProps } from './Accordion';

// 아코디언 그룹 스타일링
const StyledAccordionGroup = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  
  // 중첩된 아코디언 스타일 조정
  '& .MuiAccordion-root': {
    margin: '0 !important',
    boxShadow: theme.shadows[1], // 더 가벼운 그림자 사용
    
    '&:first-of-type': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
    },
    
    '&:last-of-type': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
    },
    
    '&.Mui-expanded': {
      margin: '0 !important',
      // 확장 시 그림자 약간 진하게
      boxShadow: theme.shadows[2],
    },
  },
}));

// 아코디언 아이템 타입 정의
export interface AccordionItem extends Omit<AccordionProps, 'expanded' | 'onChange'> {
  /** 아코디언 아이템 ID */
  id: string;
}

// 컴포넌트 Props 정의
export interface AccordionGroupProps extends CommonProps {
  /** 아코디언 아이템 배열 */
  items: AccordionItem[];
  /** 단일 확장 모드 (한 번에 하나의 아코디언만 펼칠 수 있음) */
  singleExpansion?: boolean;
  /** 기본적으로 확장된 아코디언 아이템 ID 배열 (단일 확장 모드에서는 첫 번째 ID만 적용) */
  defaultExpandedIds?: string[];
  /** 아코디언 확장 상태 변경 시 콜백 */
  onExpansionChange?: (expandedIds: string[]) => void;
}

/**
 * 아코디언 그룹 컴포넌트
 * 
 * 여러 아코디언 컴포넌트를 그룹으로 관리하고 표시합니다.
 * 단일 확장 모드를 지원하여 한 번에 하나의 아코디언만 펼칠 수 있습니다.
 */
export const AccordionGroup = ({
  items,
  singleExpansion = false,
  defaultExpandedIds = [],
  onExpansionChange,
  ...props
}: AccordionGroupProps) => {
  // 확장된 아코디언 ID 관리
  const [expandedIds, setExpandedIds] = useState<string[]>(
    singleExpansion && defaultExpandedIds.length > 0 
      ? [defaultExpandedIds[0]] 
      : defaultExpandedIds
  );
  
  // 아코디언 확장 상태 변경 핸들러
  const handleAccordionChange = (accordionId: string, isExpanded: boolean) => {
    let newExpandedIds: string[];
    
    if (singleExpansion) {
      // 단일 확장 모드: 선택된 아코디언만 확장
      newExpandedIds = isExpanded ? [accordionId] : [];
    } else {
      // 다중 확장 모드: 여러 아코디언 확장 가능
      if (isExpanded) {
        newExpandedIds = [...expandedIds, accordionId];
      } else {
        newExpandedIds = expandedIds.filter(id => id !== accordionId);
      }
    }
    
    setExpandedIds(newExpandedIds);
    
    // 콜백 실행
    if (onExpansionChange) {
      onExpansionChange(newExpandedIds);
    }
  };
  
  return (
    <StyledAccordionGroup {...props}>
      {items.map((item) => {
        const { id, ...accordionProps } = item;
        const isExpanded = expandedIds.includes(id);
        
        return (
          <Accordion
            key={id}
            {...accordionProps}
            expanded={isExpanded}
            onChange={(event, expanded) => handleAccordionChange(id, expanded)}
          />
        );
      })}
    </StyledAccordionGroup>
  );
};

export default AccordionGroup;