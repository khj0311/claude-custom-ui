import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from './Autocomplete';

// 영화 목록 샘플 데이터
const movieOptions = [
  { title: '인셉션', year: 2010 },
  { title: '인터스텔라', year: 2014 },
  { title: '조커', year: 2019 },
  { title: '어벤져스: 엔드게임', year: 2019 },
  { title: '기생충', year: 2019 },
  { title: '모노노케 히메', year: 1997 },
  { title: '센과 치히로의 행방불명', year: 2001 },
  { title: '하울의 움직이는 성', year: 2004 },
  { title: '매트릭스', year: 1999 },
  { title: '스타워즈: 제국의 역습', year: 1980 },
  { title: '반지의 제왕: 왕의 귀환', year: 2003 },
  { title: '다크 나이트', year: 2008 },
  { title: '포레스트 검프', year: 1994 },
  { title: '그랜드 부다페스트 호텔', year: 2014 },
  { title: '아바타', year: 2009 },
];

// 영화 옵션 인터페이스 정의
interface MovieOption {
  title: string;
  year: number;
}

// 스토리북 메타데이터 설정
const meta = {
  title: 'Components/Inputs/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium'],
      description: '입력 필드 크기',
    },
    fullWidth: {
      control: 'boolean',
      description: '컴포넌트 너비를 100%로 설정',
    },
    label: {
      control: 'text',
      description: '입력 필드 레이블',
    },
    placeholder: {
      control: 'text',
      description: '입력 필드 플레이스홀더',
    },
    helperText: {
      control: 'text',
      description: '도움말 텍스트',
    },
    required: {
      control: 'boolean',
      description: '필수 필드 여부',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    errorText: {
      control: 'text',
      description: '에러 메시지',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    multiple: {
      control: 'boolean',
      description: '다중 선택 가능 여부',
    },
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    options: movieOptions,
    getOptionLabel: (option: MovieOption) => option.title || '',
    label: '영화 선택',
    placeholder: '영화를 검색하세요',
    helperText: '원하는 영화를 선택하세요',
  },
};

// 다중 선택 스토리
export const Multiple: Story = {
  args: {
    ...Default.args,
    multiple: true,
    helperText: '여러 영화를 선택할 수 있습니다',
  },
};

// 에러 상태 스토리
export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
    errorText: '영화를 선택해주세요',
  },
};

// 필수 필드 스토리
export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
    helperText: '필수 선택 항목입니다',
  },
};

// 비활성화 스토리
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    helperText: '이 필드는 비활성화되었습니다',
  },
};

// 작은 크기 스토리
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
};