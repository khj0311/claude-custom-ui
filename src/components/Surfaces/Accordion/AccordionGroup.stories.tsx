import type { Meta, StoryObj } from '@storybook/react';
import { AccordionGroup } from './AccordionGroup';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';

// 스토리북 메타데이터 설정
const meta = {
  title: 'Components/Surfaces/AccordionGroup',
  component: AccordionGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    singleExpansion: {
      control: 'boolean',
      description: '단일 확장 모드 (한 번에 하나의 아코디언만 펼칠 수 있음)',
    },
    defaultExpandedIds: {
      control: 'array',
      description: '기본적으로 확장된 아코디언 아이템 ID 배열',
    },
  },
} satisfies Meta<typeof AccordionGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 아코디언 그룹 스토리
export const Default: Story = {
  args: {
    items: [
      {
        id: 'accordion1',
        title: '첫 번째 아코디언',
        content: '첫 번째 아코디언의 내용입니다. 이 내용은 아코디언을 클릭하면 표시됩니다.',
        headerColor: '#e9501f',
      },
      {
        id: 'accordion2',
        title: '두 번째 아코디언',
        content: '두 번째 아코디언의 내용입니다. 여러 아코디언을 동시에 열 수 있습니다.',
        headerColor: '#313131',
      },
      {
        id: 'accordion3',
        title: '세 번째 아코디언',
        content: '세 번째 아코디언의 내용입니다. 이 컴포넌트는 여러 아코디언을 그룹으로 관리합니다.',
        headerColor: '#ffc107',
      },
    ],
    singleExpansion: false,
    defaultExpandedIds: [],
  },
};

// 단일 확장 모드 스토리
export const SingleExpansion: Story = {
  args: {
    ...Default.args,
    singleExpansion: true,
    defaultExpandedIds: ['accordion1'],
  },
};

// 기본적으로 확장된 아코디언 스토리
export const DefaultExpanded: Story = {
  args: {
    ...Default.args,
    defaultExpandedIds: ['accordion1', 'accordion3'],
  },
};

// 아이콘이 있는 아코디언 그룹 스토리
export const WithIcons: Story = {
  args: {
    items: [
      {
        id: 'info',
        title: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <InfoIcon color="primary" />
            <span>정보 섹션</span>
          </div>
        ),
        content: '중요한 정보를 표시하는 섹션입니다.',
        headerColor: '#2196f3',
      },
      {
        id: 'settings',
        title: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SettingsIcon color="action" />
            <span>설정 섹션</span>
          </div>
        ),
        content: '애플리케이션 설정을 변경할 수 있는 섹션입니다.',
        headerColor: '#757575',
      },
      {
        id: 'help',
        title: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpIcon color="secondary" />
            <span>도움말 섹션</span>
          </div>
        ),
        content: '컴포넌트 사용 방법에 대한 도움말입니다.',
        headerColor: '#9c27b0',
      },
    ],
    singleExpansion: true,
    defaultExpandedIds: [],
  },
};

// 다양한 크기의 아코디언 그룹 스토리
export const MixedSizes: Story = {
  args: {
    items: [
      {
        id: 'small',
        title: '작은 아코디언',
        content: '작은 크기의 아코디언입니다.',
        size: 'small',
        headerColor: '#e9501f',
      },
      {
        id: 'medium',
        title: '중간 아코디언',
        content: '중간 크기의 아코디언입니다.',
        size: 'medium',
        headerColor: '#313131',
      },
      {
        id: 'large',
        title: '큰 아코디언',
        content: '큰 크기의 아코디언입니다.',
        size: 'large',
        headerColor: '#ffc107',
      },
    ],
    singleExpansion: false,
    defaultExpandedIds: [],
  },
};

// FAQ 형태의 아코디언 그룹 예시
export const FAQExample: Story = {
  args: {
    items: [
      {
        id: 'faq1',
        title: '이 컴포넌트 라이브러리는 무엇인가요?',
        content: 'Claude Custom UI는 Material UI를 기반으로 한 커스텀 컴포넌트 라이브러리입니다. 다양한 컴포넌트를 제공하며 스타일링과 기능을 확장했습니다.',
        headerColor: '#e9501f',
      },
      {
        id: 'faq2',
        title: '어떻게 설치하나요?',
        content: 'yarn add claude-custom-ui 또는 npm install claude-custom-ui 명령으로 설치할 수 있습니다.',
        headerColor: '#e9501f',
      },
      {
        id: 'faq3',
        title: '어떤 컴포넌트를 제공하나요?',
        content: 'Autocomplete, Avatar, Alert, Accordion 등 다양한 컴포넌트를 제공하며 계속해서 확장 중입니다.',
        headerColor: '#e9501f',
      },
      {
        id: 'faq4',
        title: '라이선스는 어떻게 되나요?',
        content: 'MIT 라이선스로 제공됩니다.',
        headerColor: '#e9501f',
      },
    ],
    singleExpansion: true,
    defaultExpandedIds: [],
  },
};