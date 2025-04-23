import React from 'react';
import {
  Alert as MuiAlert,
  AlertProps as MuiAlertProps,
  styled,
  IconButton,
  Collapse,
  AlertTitle,
} from '@mui/material';
import { CommonProps, Size } from '../../../types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';

// 스타일 적용된 MUI Alert
const StyledAlert = styled(MuiAlert, {
  shouldForwardProp: (prop) => 
    prop !== 'customSize' && 
    prop !== 'rounded' && 
    prop !== 'outlined' && 
    prop !== 'filled',
})<{
  customSize?: Size;
  rounded?: boolean;
}>(({ theme, customSize, rounded, variant }) => ({
  // 사이즈별 패딩 조정
  ...(customSize === 'small' && {
    padding: '0.25rem 0.5rem',
    fontSize: '0.75rem',
    '& .MuiAlert-icon': {
      fontSize: '1rem',
      padding: '0.25rem 0',
      marginRight: '0.25rem',
    },
  }),
  ...(customSize === 'medium' && {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    '& .MuiAlert-icon': {
      fontSize: '1.25rem',
      padding: '0.375rem 0',
      marginRight: '0.5rem',
    },
  }),
  ...(customSize === 'large' && {
    padding: '0.75rem 1.25rem',
    fontSize: '1rem',
    '& .MuiAlert-icon': {
      fontSize: '1.5rem',
      padding: '0.5rem 0',
      marginRight: '0.75rem',
    },
  }),
  
  // 모서리 둥글기 조정
  borderRadius: rounded ? '16px' : '4px',
  
  // 테마 컬러 스타일
  ...(variant === 'standard' && {
    '&.MuiAlert-standardSuccess': {
      backgroundColor: `${theme.palette.success.light}40`, // 알파값 추가
      color: theme.palette.success.dark,
    },
    '&.MuiAlert-standardError': {
      backgroundColor: `${theme.palette.error.light}40`,
      color: theme.palette.error.dark,
    },
    '&.MuiAlert-standardWarning': {
      backgroundColor: `${theme.palette.warning.light}40`,
      color: theme.palette.warning.dark,
    },
    '&.MuiAlert-standardInfo': {
      backgroundColor: `${theme.palette.info.light}40`,
      color: theme.palette.info.dark,
    },
  }),
  
  // 기본 스타일 조정
  boxShadow: variant === 'filled' ? theme.shadows[2] : 'none',
  transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
  
  // 호버 효과
  '&:hover': {
    boxShadow: variant === 'filled' ? theme.shadows[4] : 'none',
    transform: 'translateY(-1px)',
  },
}));

// 커스텀 아이콘 매핑
const AlertIcons = {
  success: <CheckCircleIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
};

// 컴포넌트 Props 정의
export interface AlertProps extends CommonProps, Omit<MuiAlertProps, 'size'> {
  /** 알림 제목 */
  title?: string;
  /** 알림 콘텐츠 */
  content: React.ReactNode;
  /** 알림 크기 */
  size?: Size;
  /** 모서리를 둥글게 표시 */
  rounded?: boolean;
  /** 닫기 버튼 표시 여부 */
  closable?: boolean;
  /** 닫기 이벤트 핸들러 */
  onClose?: () => void;
  /** 알림 표시 여부 (애니메이션 효과 포함) */
  open?: boolean;
}

/**
 * 커스텀 Alert 컴포넌트
 * 
 * MUI Alert를 기반으로 하며, 추가 기능으로 사이즈 조정, 둥근 모서리, 애니메이션 등을 제공합니다.
 */
export const Alert = ({
  title,
  content,
  size = 'medium',
  rounded = false,
  closable = false,
  onClose,
  open = true,
  severity = 'info',
  variant = 'standard',
  icon = AlertIcons[severity as keyof typeof AlertIcons],
  ...props
}: AlertProps) => {
  // 닫기 버튼 이벤트 핸들러
  const handleClose = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    if (onClose) onClose();
  };

  return (
    <Collapse in={open}>
      <StyledAlert
        severity={severity}
        variant={variant}
        icon={icon}
        customSize={size}
        rounded={rounded}
        action={
          closable ? (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          ) : null
        }
        {...props}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {content}
      </StyledAlert>
    </Collapse>
  );
};

export default Alert;