import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { Box } from '@mui/material';

// 스토리북 메타데이터 설정
const meta = {
  title: 'Components/DataDisplay/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['circular', 'rounded', 'square'],
      description: '아바타 모양',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 24, 48, 72],
      description: '아바타 크기',
    },
    colorVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success'],
      description: '아바타 색상 테마',
    },
    bordered: {
      control: 'boolean',
      description: '테두리 표시 여부',
    },
    status: {
      control: 'select',
      options: ['none', 'online', 'offline', 'away', 'busy'],
      description: '상태 뱃지 표시',
    },
    tooltip: {
      control: 'text',
      description: '툴팁 표시 텍스트',
    },
    alt: {
      control: 'text',
      description: '이미지 대체 텍스트',
    },
    src: {
      control: 'text',
      description: '이미지 URL',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    alt: 'User',
  },
};

// 이미지 스토리
export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'User Profile',
    tooltip: 'John Doe',
  },
};

// 상태 표시 스토리
export const WithStatus: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'User Profile',
    status: 'online',
    tooltip: 'Online',
  },
};

// 테두리 스토리
export const WithBorder: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'User Profile',
    bordered: true,
  },
};

// 다양한 크기 스토리
export const DifferentSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Avatar size="small" alt="S" />
      <Avatar size="medium" alt="M" />
      <Avatar size="large" alt="L" />
      <Avatar size={64} alt="64" />
    </Box>
  ),
};

// 다양한 모양 스토리
export const DifferentShapes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Avatar variant="circular" alt="C" />
      <Avatar variant="rounded" alt="R" />
      <Avatar variant="square" alt="S" />
    </Box>
  ),
};

// 다양한 색상 스토리
export const DifferentColors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Avatar colorVariant="primary" alt="P" />
      <Avatar colorVariant="secondary" alt="S" />
      <Avatar colorVariant="tertiary" alt="T" />
      <Avatar colorVariant="error" alt="E" />
      <Avatar colorVariant="warning" alt="W" />
      <Avatar colorVariant="info" alt="I" />
      <Avatar colorVariant="success" alt="S" />
    </Box>
  ),
};

// 다양한 상태 스토리
export const DifferentStatuses: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Avatar status="online" tooltip="Online" alt="ON" />
      <Avatar status="offline" tooltip="Offline" alt="OFF" />
      <Avatar status="away" tooltip="Away" alt="A" />
      <Avatar status="busy" tooltip="Busy" alt="B" />
      <Avatar status="none" tooltip="No Status" alt="N" />
    </Box>
  ),
};