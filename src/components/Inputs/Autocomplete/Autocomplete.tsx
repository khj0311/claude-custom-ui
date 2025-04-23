import React, { useState } from 'react';
import { Autocomplete as MuiAutocomplete, TextField, styled, AutocompleteProps as MuiAutocompleteProps } from '@mui/material';
import { CommonProps } from '../../../types';

// 스타일 적용된 MUI Autocomplete
const StyledAutocomplete = styled(MuiAutocomplete)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
  },
  '& .MuiAutocomplete-tag': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    borderRadius: '4px',
    '& .MuiChip-deleteIcon': {
      color: theme.palette.primary.contrastText,
      '&:hover': {
        color: theme.palette.primary.dark,
      },
    },
  },
}));

export interface AutocompleteProps<T> extends CommonProps, Omit<MuiAutocompleteProps<T, boolean, boolean, boolean>, 'renderInput'> {
  /** 입력 필드 레이블 */
  label?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 오류 상태 */
  error?: boolean;
  /** 오류 메시지 */
  errorText?: string;
  /** 입력 필드 플레이스홀더 */
  placeholder?: string;
  /** 필수 필드 여부 */
  required?: boolean;
  /** 입력 필드 크기 */
  size?: 'small' | 'medium';
  /** 전체 너비 채우기 */
  fullWidth?: boolean;
  /** 옵션 목록이 비어있을 때 표시할 텍스트 */
  noOptionsText?: string;
}

/**
 * 커스텀 Autocomplete 컴포넌트
 * 
 * MUI Autocomplete를 기반으로 하며, 스타일과 기능이 확장되었습니다.
 */
export function Autocomplete<T>({
  label,
  helperText,
  error = false,
  errorText,
  placeholder,
  required = false,
  size = 'medium',
  fullWidth = true,
  noOptionsText = '옵션 없음',
  ...props
}: AutocompleteProps<T>) {
  // 포커스 상태 관리
  const [isFocused, setIsFocused] = useState(false);

  return (
    <StyledAutocomplete
      fullWidth={fullWidth}
      size={size}
      noOptionsText={noOptionsText}
      renderInput={(params) => (
        <TextField 
          {...params}
          label={label}
          placeholder={placeholder}
          helperText={error ? errorText : helperText}
          error={error}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          InputProps={{
            ...params.InputProps,
            sx: {
              ...(isFocused && {
                boxShadow: '0 0 0 3px rgba(233, 80, 31, 0.2)',
              }),
            },
          }}
        />
      )}
      {...props}
    />
  );
}

export default Autocomplete;