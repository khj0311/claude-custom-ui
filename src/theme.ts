import { createTheme } from '@mui/material/styles';

// 노션 문서에 정의된 테마 색상
// Primary: #e9501f
// Secondary: #313131
// Tertiary: #ffc107 (선택 사항)

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

// 커스텀 테마 정의
export const theme = createTheme({
  palette: {
    primary: {
      main: '#e9501f',
      light: '#ff8045',
      dark: '#af1f00',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#313131',
      light: '#5a5a5a',
      dark: '#0a0a0a',
      contrastText: '#ffffff',
    },
    tertiary: {
      main: '#ffc107',
      light: '#fff350',
      dark: '#c79100',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    // 글로벌 컴포넌트 오버라이드
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;