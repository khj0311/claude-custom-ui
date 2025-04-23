import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

// 스토리북 메타데이터 설정
const meta = {
  title: 'Components/Surfaces/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: '아코디언 크기',
    },
    rounded: {
      control: 'boolean',
      description: '모서리를 둥글게 표시',
    },
    headerColor: {
      control: 'color',
      description: '아코디언 헤더 배경 색상 (hex 코드)',
    },
    defaultExpanded: {
      control: 'boolean',
      description: '기본적으로 펼쳐진 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    title: {
      control: 'text',
      description: '아코디언 제목',
    },
    content: {
      control: 'text',
      description: '아코디언 내용',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    title: '아코디언 제목',
    content: '이것은 아코디언 내용입니다. 클릭하여 펼치고 접을 수 있습니다.',
    size: 'medium',
    rounded: false,
    defaultExpanded: false,
    disabled: false,
  },
};

// 작은 크기 스토리
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
    title: '작은 아코디언',
  },
};

// 큰 크기 스토리
export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
    title: '큰 아코디언',
  },
};

// 둥근 모서리 스토리
export const Rounded: Story = {
  args: {
    ...Default.args,
    rounded: true,
    title: '둥근 모서리 아코디언',
  },
};

// 기본 펼쳐짐 스토리
export const DefaultExpanded: Story = {
  args: {
    ...Default.args,
    defaultExpanded: true,
    title: '기본 펼쳐진 아코디언',
  },
};

// 커스텀 색상 스토리
export const CustomColor: Story = {
  args: {
    ...Default.args,
    headerColor: '#e9501f', // 프로젝트의 Primary Color
    title: '커스텀 색상 아코디언',
  },
};

// 비활성화 스토리
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    title: '비활성화된 아코디언',
  },
};

// 복잡한 콘텐츠 스토리
export const ComplexContent: Story = {
  args: {
    ...Default.args,
    title: '복잡한 콘텐츠 아코디언',
    content: (
      <div>
        <h3>복잡한 콘텐츠 예시</h3>
        <p>아코디언 내용에는 단순 텍스트뿐만 아니라 다양한 HTML 요소를 포함할 수 있습니다.</p>
        <ul>
          <li>목록 항목 1</li>
          <li>목록 항목 2</li>
          <li>목록 항목 3</li>
        </ul>
        <button style={{ padding: '8px 16px', backgroundColor: '#e9501f', color: 'white', border: 'none', borderRadius: '4px' }}>
          버튼 예시
        </button>
      </div>
    ),
  },
};

// 다중 아코디언 사용 예시
export const MultipleAccordions: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <Accordion 
        title="첫 번째 아코디언" 
        content="첫 번째 아코디언의 내용입니다."
        headerColor="#e9501f"
      />
      <Accordion 
        title="두 번째 아코디언" 
        content="두 번째 아코디언의 내용입니다."
        headerColor="#313131"
      />
      <Accordion 
        title="세 번째 아코디언" 
        content="세 번째 아코디언의 내용입니다."
        headerColor="#ffc107"
      />
    </div>
  ),
};