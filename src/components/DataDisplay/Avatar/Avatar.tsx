import React from 'react';
import { Avatar as MuiAvatar, styled, AvatarProps as MuiAvatarProps, Badge, Tooltip } from '@mui/material';
import { CommonProps, Size, ThemeColor } from '../../../types';

// 스타일 적용된 MUI Avatar
const StyledAvatar = styled(MuiAvatar, {
  shouldForwardProp: (prop) => prop !== 'colorVariant' && prop !== 'bordered',
})<{ colorVariant?: ThemeColor; bordered?: boolean }>(({ theme, colorVariant, bordered }) => ({
  backgroundColor: colorVariant ? theme.palette[colorVariant].main : theme.palette.primary.main,
  color: colorVariant ? theme.palette[colorVariant].contrastText : theme.palette.primary.contrastText,
  fontWeight: 600,
  transition: 'transform 0.2s ease-in-out',
  // 테두리 스타일
  ...(bordered && {
    border: `2px solid ${theme.palette.common.white}`,
    boxShadow: `0 0 0 1px ${theme.palette.grey[300]}`,
  }),
  // 호버 효과
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

// 컴포넌트 Props 정의
export interface AvatarProps extends CommonProps, Omit<MuiAvatarProps, 'variant'> {
  /** 아바타 변형(모양) */
  variant?: 'circular' | 'rounded' | 'square';
  /** 아바타 크기 */
  size?: Size | number;
  /** 아바타 색상 테마 */
  colorVariant?: ThemeColor;
  /** 테두리 표시 여부 */
  bordered?: boolean;
  /** 상태 뱃지 표시 여부 */
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none';
  /** 툴팁 표시 텍스트 */
  tooltip?: string;
}

/**
 * 커스텀 Avatar 컴포넌트
 * 
 * MUI Avatar를 기반으로 하며, 추가 기능으로 색상 테마, 테두리, 상태 뱃지 등을 제공합니다.
 */
export const Avatar = ({
  variant = 'circular',
  size = 'medium',
  colorVariant = 'primary',
  bordered = false,
  status = 'none',
  tooltip,
  alt = '',
  src,
  children,
  ...props
}: AvatarProps) => {
  // 사이즈에 따른 픽셀 값 계산
  const getSize = () => {
    if (typeof size === 'number') return size;
    
    switch (size) {
      case 'small':
        return 32;
      case 'large':
        return 56;
      case 'medium':
      default:
        return 40;
    }
  };

  // 상태에 따른 색상 결정
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'success.main';
      case 'offline':
        return 'grey.500';
      case 'away':
        return 'warning.main';
      case 'busy':
        return 'error.main';
      default:
        return '';
    }
  };

  // 아바타 컴포넌트
  const avatarComponent = (
    <StyledAvatar
      variant={variant}
      colorVariant={colorVariant}
      bordered={bordered}
      src={src}
      alt={alt}
      sx={{
        width: getSize(),
        height: getSize(),
        fontSize: `${getSize() / 2.5}px`,
        ...props.sx,
      }}
      {...props}
    >
      {!src && (alt ? alt.charAt(0).toUpperCase() : children)}
    </StyledAvatar>
  );

  // 상태 뱃지가 있는 경우 Badge로 감싸기
  const avatarWithBadge = status !== 'none' ? (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: getStatusColor(),
          boxShadow: '0 0 0 2px white',
        },
      }}
    >
      {avatarComponent}
    </Badge>
  ) : (
    avatarComponent
  );

  // 툴팁이 있는 경우 Tooltip으로 감싸기
  return tooltip ? (
    <Tooltip title={tooltip} arrow>
      {avatarWithBadge}
    </Tooltip>
  ) : (
    avatarWithBadge
  );
};

export default Avatar;