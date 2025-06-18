// MissionList.stories.tsx
//
// 스토리북에서도 완료 기한 관련 부분 제거
// MissionList.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MissionList } from './MissionList';
import type { Mission } from './MissionList.types';

const meta: Meta<typeof MissionList> = {
  title: 'Components/MissionList',
  component: MissionList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '미션 목록을 표시하는 컴포넌트입니다. 진행률과 보상을 깔끔하게 보여줍니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'spacious'],
    },
    spacing: {
      control: 'select',
      options: ['tight', 'normal', 'loose'],
    },
    iconSize: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    interactive: {
      control: 'boolean',
    },
    showTypeTag: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MissionList>;

// 실제 이미지처럼 보이는 미션 데이터
const mockMissions: Mission[] = [
  {
    id: 1,
    name: 'MoonoZ 친구와 함께하기',
    description: '친구를 초대하고 함께 앱을 사용해보세요',
    type: 'INVITE',
    target_count: 10,
    reward_point: 1000,
    completed_at: '2024-12-31',
    image_url: '',
    current_progress: 3,
    is_completed: false,
  },
  {
    id: 2,
    name: 'Hot플 컨텐츠 친구에게 공유',
    description: '인기 있는 콘텐츠를 SNS나 메신저로 공유해보세요',
    type: 'SHARE',
    target_count: 5,
    reward_point: 500,
    completed_at: '2024-11-30',
    image_url: '',
    current_progress: 4,
    is_completed: false,
  },
  {
    id: 3,
    name: '통신MBTI 결과 친구에게 공유',
    description: '나의 통신 습관 분석 결과를 친구들과 공유해보세요',
    type: 'SHARE',
    target_count: 3,
    reward_point: 300,
    completed_at: '2024-11-25',
    image_url: '',
    current_progress: 0,
    is_completed: false,
  },
  {
    id: 4,
    name: '출석 연속 25일 달성',
    description: '매일 앱에 접속하여 연속 출석 기록을 달성해보세요',
    type: 'ATTENDANCE',
    target_count: 25,
    reward_point: 2500,
    completed_at: '2024-12-15',
    image_url: '',
    current_progress: 25,
    is_completed: true,
  },
];

export const Playground: Story = {
  args: {
    missions: mockMissions,
    variant: 'default',
    spacing: 'normal',
    iconSize: 'default',
    interactive: true,
    showTypeTag: true,
  },
};

export const Default: Story = {
  args: {
    missions: mockMissions,
    spacing: 'normal',
  },
};

export const WithoutTypeTag: Story = {
  name: '타입 태그 없는 버전',
  args: {
    missions: mockMissions,
    showTypeTag: false,
  },
};

export const Interactive: Story = {
  args: {
    missions: mockMissions,
    interactive: true,
    onMissionClick: (mission) => {
      console.log('클릭된 미션:', mission);
      alert(`미션 클릭: ${mission.name}`);
    },
  },
};

// 스토리북에서 spacing 옵션들을 더 명확하게 보여주는 스토리 추가
export const SpacingVariants: Story = {
  name: '간격 옵션들',
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-3">Tight Spacing</h3>
        <MissionList missions={mockMissions.slice(0, 3)} spacing="tight" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Normal Spacing (기본)</h3>
        <MissionList missions={mockMissions.slice(0, 3)} spacing="normal" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Loose Spacing</h3>
        <MissionList missions={mockMissions.slice(0, 3)} spacing="loose" />
      </div>
    </div>
  ),
};
