import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';

// 스토리북 메타데이터 설정
const meta = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
      description: '알림 중요도/유형',
    },
    variant: {
      control: 'select',
      options: ['standard', 'outlined', 'filled'],
      description: '알림 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '알림 크기',
    },
    rounded: {
      control: 'boolean',
      description: '둥근 모서리 적용 여부',
    },
    closable: {
      control: 'boolean',
      description: '닫기 버튼 표시 여부',
    },
    title: {
      control: 'text',
      description: '알림 제목',
    },
    content: {
      control: 'text',
      description: '알림 내용',
    },
    open: {
      control: 'boolean',
      description: '알림 표시 상태',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    severity: 'info',
    variant: 'standard',
    title: '정보',
    content: '이것은 기본 정보 알림입니다.',
    size: 'medium',
    rounded: false,
    closable: false,
    open: true,
  },
};

// 성공 알림 스토리
export const Success: Story = {
  args: {
    ...Default.args,
    severity: 'success',
    title: '성공',
    content: '작업이 성공적으로 완료되었습니다.',
  },
};

// 경고 알림 스토리
export const Warning: Story = {
  args: {
    ...Default.args,
    severity: 'warning',
    title: '경고',
    content: '이 작업을 진행하기 전에 저장을 확인하세요.',
  },
};

// 오류 알림 스토리
export const Error: Story = {
  args: {
    ...Default.args,
    severity: 'error',
    title: '오류',
    content: '작업 중 오류가 발생했습니다. 다시 시도해주세요.',
  },
};

// 다양한 변형 스토리
export const Variants: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert
        severity="info"
        variant="standard"
        title="표준 스타일"
        content="표준 스타일의 알림입니다."
      />
      <Alert
        severity="info"
        variant="outlined"
        title="외곽선 스타일"
        content="외곽선 스타일의 알림입니다."
      />
      <Alert
        severity="info"
        variant="filled"
        title="채워진 스타일"
        content="채워진 스타일의 알림입니다."
      />
    </Stack>
  ),
};

// 다양한 크기 스토리
export const Sizes: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert
        severity="info"
        size="small"
        title="작은 크기"
        content="작은 크기의 알림입니다."
      />
      <Alert
        severity="info"
        size="medium"
        title="중간 크기"
        content="중간 크기의 알림입니다."
      />
      <Alert
        severity="info"
        size="large"
        title="큰 크기"
        content="큰 크기의 알림입니다."
      />
    </Stack>
  ),
};

// 둥근 모서리 스토리
export const Rounded: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert
        severity="info"
        rounded={false}
        title="기본 모서리"
        content="기본 모서리의 알림입니다."
      />
      <Alert
        severity="info"
        rounded={true}
        title="둥근 모서리"
        content="둥근 모서리의 알림입니다."
      />
    </Stack>
  ),
};

// 닫기 가능한 알림 스토리 (상태 관리 포함)
export const Closable: Story = {
  render: function ClosableAlert() {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
      setOpen(false);
      setTimeout(() => setOpen(true), 2000); // 2초 후 다시 표시
    };

    return (
      <Box>
        <Alert
          severity="info"
          title="닫기 가능한 알림"
          content="닫기 버튼을 눌러보세요. 2초 후 다시 표시됩니다."
          closable={true}
          open={open}
          onClose={handleClose}
        />
      </Box>
    );
  },
};