import React, { useState } from 'react';
import {
  Accordion as MuiAccordion,
  AccordionProps as MuiAccordionProps,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  styled,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// CommonProps와 Size 타입 정의
interface CommonProps {
  className?: string;
  style?: React.CSSProperties;
}

type Size = 'small' | 'medium' | 'large';

// 스타일된 컴포넌트들
const StyledAccordion = styled(MuiAccordion, {
  shouldForwardProp: (prop) =>
    prop !== 'customSize' && 
    prop !== 'rounded' &&
    prop !== 'customColor',
})<{
  customSize?: Size;
  rounded?: boolean;
  customColor?: string;
}>(({ theme, customSize, rounded, customColor }) => ({
  // 크기별 스타일 조정
  ...(customSize === 'small' && {
    '& .MuiAccordionSummary-content': {
      margin: '8px 0',
    },
    '& .MuiAccordionSummary-root': {
      minHeight: '40px',
    },
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
    },
    '& .MuiAccordionDetails-root': {
      padding: '8px 16px 16px',
    },
  }),
  ...(customSize === 'medium' && {
    '& .MuiAccordionSummary-content': {
      margin: '12px 0',
    },
    '& .MuiAccordionSummary-root': {
      minHeight: '48px',
    },
    '& .MuiTypography-root': {
      fontSize: '1rem',
    },
  }),
  ...(customSize === 'large' && {
    '& .MuiAccordionSummary-content': {
      margin: '16px 0',
    },
    '& .MuiAccordionSummary-root': {
      minHeight: '56px',
    },
    '& .MuiTypography-root': {
      fontSize: '1.125rem',
    },
    '& .MuiAccordionDetails-root': {
      padding: '16px 24px 24px',
    },
  }),

  // 모서리 둥글기 적용
  borderRadius: rounded ? '8px' : '4px',
  overflow: 'hidden', // 내부 요소들이 모서리를 벗어나지 않도록 함
  '& .MuiAccordionSummary-root': {
    borderRadius: rounded ? '8px' : '4px',
  },

  // 커스텀 컬러
  ...(customColor && {
    '& .MuiAccordionSummary-root': {
      backgroundColor: `${customColor}15`, // 낮은 투명도로 배경색 적용
    },
    '& .MuiButtonBase-root:hover': {
      backgroundColor: `${customColor}20`, // 호버 시 배경색
    },
  }),

  // 기본 스타일 오버라이드
  boxShadow: theme.shadows[1],
  transition: 'all 0.3s ease-in-out',
  margin: '8px 0',
  
  '&:first-of-type': {
    marginTop: 0,
  },
  '&:last-of-type': {
    marginBottom: 0,
  },
  
  '&:before': {
    display: 'none', // 기본 divider 제거
  },
  
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
  
  // 확장 시 스타일 - 중복 선택자 통합
  '&.Mui-expanded': {
    boxShadow: theme.shadows[3],
    margin: '16px 0',
    borderRadius: rounded ? '8px' : '4px',
    '& .MuiAccordionSummary-root': {
      borderRadius: rounded ? '8px 8px 0 0' : '4px 4px 0 0',
      ...(customColor && {
        backgroundColor: `${customColor}25`, // 확장 시 더 진한 배경색
      }),
    },
  },
  
  // 아이콘 애니메이션
  '& .MuiAccordionSummary-expandIconWrapper': {
    transition: 'transform 0.3s ease-in-out',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
}));

// 스타일된 AccordionSummary
const StyledAccordionSummary = styled(MuiAccordionSummary)(() => ({
  cursor: 'pointer',
  '&.MuiAccordionSummary-root': {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
}));

// 스타일된 AccordionDetails
const StyledAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: '16px',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

// 컴포넌트 Props 정의 (문제 해결)
interface AccordionBaseProps extends CommonProps {
  /** 아코디언 제목 */
  title: React.ReactNode;
  /** 아코디언 내용 */
  content: React.ReactNode;
  /** 아코디언 크기 */
  size?: Size;
  /** 모서리를 둥글게 표시 */
  rounded?: boolean;
  /** 아코디언 헤더 배경 색상 (hex 코드) */
  headerColor?: string;
  /** 기본적으로 펼쳐진 상태 */
  defaultExpanded?: boolean;
  /** 확장 상태 제어 (제공 시 제어 컴포넌트로 동작) */
  expanded?: boolean;
  /** 확장 상태 변경 핸들러 */
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  /** 커스텀 확장 아이콘 */
  expandIcon?: React.ReactNode;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export type AccordionProps = AccordionBaseProps & Omit<MuiAccordionProps, 'children' | 'title' | 'onChange'>;

/**
 * 커스텀 Accordion 컴포넌트
 * 
 * MUI Accordion을 기반으로 하며, 크기, 모서리 둥글기, 커스텀 색상 등의 추가 기능을 제공합니다.
 */
export const Accordion = ({
  title,
  content,
  size = 'medium',
  rounded = false,
  headerColor,
  defaultExpanded = false,
  expanded,
  onChange,
  expandIcon = <ExpandMoreIcon />,
  disabled = false,
  ...props
}: AccordionProps) => {
  // 내부 확장 상태 관리 (비제어 컴포넌트용)
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  
  // 확장 상태 변경 핸들러
  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    if (!onChange) {
      setInternalExpanded(isExpanded);
    } else {
      onChange(event, isExpanded);
    }
  };
  
  // 제어/비제어 모드 결정
  const isControlled = expanded !== undefined;
  const isExpanded = isControlled ? expanded : internalExpanded;

  // 유니크 아이디 생성
  const accordionId = props.id || `accordion-${Math.random().toString(36).substring(2, 9)}`;
  const panelContentId = `panel-content-${accordionId}`;
  const panelHeaderId = `panel-header-${accordionId}`;

  return (
    <StyledAccordion
      customSize={size}
      rounded={rounded}
      customColor={headerColor}
      expanded={isExpanded}
      onChange={handleChange}
      disabled={disabled}
      disableGutters // 기본 패딩 제거
      square={!rounded} // 기본 모서리 둥글기 제어
      elevation={0} // 기본 그림자 제거 (커스텀 그림자 사용)
      id={accordionId}
      TransitionProps={{ unmountOnExit: true }} // 디테일 영역이 마운트 여부
      {...props}
    >
      <StyledAccordionSummary
        expandIcon={expandIcon}
        aria-controls={panelContentId}
        id={panelHeaderId}
      >
        {typeof title === 'string' ? (
          <Typography variant={size === 'large' ? 'h6' : size === 'medium' ? 'subtitle1' : 'subtitle2'}>
            {title}
          </Typography>
        ) : (
          title
        )}
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        {typeof content === 'string' ? (
          <Typography>{content}</Typography>
        ) : (
          content
        )}
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default Accordion;