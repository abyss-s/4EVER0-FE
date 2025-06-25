import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import React from 'react';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'brand', 'positive', 'cautionary', 'negative', 'red', 'yellow'],
      description: '스위치의 색상 변형을 선택합니다',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: '스위치의 크기를 선택합니다',
    },
    label: {
      control: { type: 'text' },
      description: '스위치 옆에 표시될 라벨',
    },
    description: {
      control: { type: 'text' },
      description: '스위치 아래에 표시될 설명',
    },
    error: {
      control: { type: 'text' },
      description: '에러 메시지',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '스위치 비활성화 여부',
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: '초기 체크 상태',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 상태
export const Default: Story = {
  args: {
    label: '기본 스위치',
  },
};

// Playground
export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'default',
    label: '스위치 라벨',
    description: '이것은 설명입니다.',
    defaultChecked: false,
    disabled: false,
  },
};

// 다양한 컬러
export const ColorVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <Switch variant="default" label="기본 스위치" defaultChecked />
      <Switch variant="brand" label="브랜드 컬러 (다크블루)" defaultChecked />
      <Switch variant="positive" label="성공 상태 (초록)" defaultChecked />
      <Switch variant="cautionary" label="주의 상태 (노랑)" defaultChecked />
      <Switch variant="negative" label="오류 상태 (빨강)" defaultChecked />
      <Switch variant="red" label="브랜드 빨강" defaultChecked />
      <Switch variant="yellow" label="브랜드 노랑" defaultChecked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 색상의 스위치를 보여줍니다. 각 색상은 용도에 맞게 사용할 수 있습니다.',
      },
    },
  },
};

// 다양한 크기
export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 items-start">
      <Switch size="sm" label="작은 크기" defaultChecked variant="brand" />
      <Switch size="default" label="기본 크기" defaultChecked variant="brand" />
      <Switch size="lg" label="큰 크기" defaultChecked variant="brand" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '세 가지 크기의 스위치입니다: sm, default, lg',
      },
    },
  },
};

// 모든 크기와 색상 조합
export const AllSizes: Story = {
  render: () => (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="font-semibold">크기 / 색상</div>
        <div className="font-semibold text-center">Small</div>
        <div className="font-semibold text-center">Default</div>
        <div className="font-semibold text-center">Large</div>

        <div className="font-medium">Brand</div>
        <Switch size="sm" variant="brand" defaultChecked />
        <Switch size="default" variant="brand" defaultChecked />
        <Switch size="lg" variant="brand" defaultChecked />

        <div className="font-medium">Positive</div>
        <Switch size="sm" variant="positive" defaultChecked />
        <Switch size="default" variant="positive" defaultChecked />
        <Switch size="lg" variant="positive" defaultChecked />

        <div className="font-medium">Cautionary</div>
        <Switch size="sm" variant="cautionary" defaultChecked />
        <Switch size="default" variant="cautionary" defaultChecked />
        <Switch size="lg" variant="cautionary" defaultChecked />

        <div className="font-medium">Negative</div>
        <Switch size="sm" variant="negative" defaultChecked />
        <Switch size="default" variant="negative" defaultChecked />
        <Switch size="lg" variant="negative" defaultChecked />
      </div>
    </div>
  ),
};

// 상태별 예시
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <Switch label="체크된 상태" defaultChecked variant="brand" />
      <Switch label="체크되지 않은 상태" variant="brand" />
      <Switch label="비활성화 - 체크됨" defaultChecked disabled variant="brand" />
      <Switch label="비활성화 - 체크 안됨" disabled variant="brand" />
    </div>
  ),
};

// 설명과 함께
export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4 max-w-md">
      <Switch
        variant="brand"
        label="푸시 알림 받기"
        description="새로운 메시지가 도착하면 푸시 알림을 받습니다."
        defaultChecked
      />
      <Switch
        variant="positive"
        label="자동 저장"
        description="작업 중인 내용을 5분마다 자동으로 저장합니다."
      />
      <Switch
        variant="cautionary"
        label="실험적 기능 사용"
        description="아직 테스트 중인 기능을 활성화합니다. 예상치 못한 오류가 발생할 수 있습니다."
      />
      <Switch
        variant="negative"
        label="위험한 작업 허용"
        description="데이터 삭제 등 위험한 작업을 허용합니다."
      />
    </div>
  ),
};

// 에러 상태
export const WithError: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 max-w-md">
      <Switch
        variant="negative"
        label="필수 설정"
        description="서비스 이용을 위해 필수로 동의해야 하는 항목입니다."
        error="이 옵션을 반드시 활성화해야 합니다."
      />
      <Switch
        variant="cautionary"
        label="네트워크 연결"
        description="인터넷 연결 상태를 확인합니다."
        error="네트워크 연결에 실패했습니다."
        disabled
      />
    </div>
  ),
};

// 사용 예시 - 개인 정보 설정 패널
export const PrivacySettings: Story = {
  render: () => (
    <div className="bg-white p-6 rounded-lg border max-w-md shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-[#25394b]">개인정보 설정</h3>
      <div className="space-y-6">
        <Switch
          variant="brand"
          size="default"
          label="프로필 공개"
          description="다른 사용자가 내 프로필을 볼 수 있습니다."
          defaultChecked
        />
        <Switch
          variant="positive"
          label="활동 기록 저장"
          description="서비스 개선을 위해 활동 기록을 저장합니다."
          defaultChecked
        />
        <Switch
          variant="cautionary"
          label="위치 정보 사용"
          description="위치 기반 서비스를 제공받습니다."
        />
        <Switch
          variant="negative"
          label="데이터 수집 허용"
          description="마케팅 목적의 데이터 수집을 허용합니다."
        />
      </div>
    </div>
  ),
};

// 알림 설정 패널
export const NotificationSettings: Story = {
  render: () => (
    <div className="bg-white p-6 rounded-lg border max-w-md shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-[#25394b]">알림 설정</h3>
      <div className="space-y-6">
        <Switch
          variant="brand"
          label="이메일 알림"
          description="중요한 업데이트를 이메일로 받습니다."
          defaultChecked
        />
        <Switch
          variant="positive"
          label="보안 알림"
          description="계정 보안 관련 알림을 받습니다."
          defaultChecked
        />
        <Switch
          variant="cautionary"
          label="마케팅 알림"
          description="프로모션 및 마케팅 소식을 받습니다."
        />
        <Switch
          variant="red"
          label="긴급 알림"
          description="시스템 장애 등 긴급 상황 알림을 받습니다."
          defaultChecked
        />
      </div>
    </div>
  ),
};

// 인터랙티브 예시
export const Interactive: Story = {
  render: () => {
    const [settings, setSettings] = React.useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      location: false,
    });

    const updateSetting = (key: keyof typeof settings) => (checked: boolean) => {
      setSettings((prev) => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="bg-white p-6 rounded-lg border max-w-md shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-[#25394b]">앱 설정</h3>
        <div className="space-y-6">
          <Switch
            variant="brand"
            label="알림 허용"
            description="푸시 알림을 받습니다."
            checked={settings.notifications}
            onCheckedChange={updateSetting('notifications')}
          />
          <Switch
            variant="default"
            label="다크 모드"
            description="어두운 테마를 사용합니다."
            checked={settings.darkMode}
            onCheckedChange={updateSetting('darkMode')}
          />
          <Switch
            variant="positive"
            label="자동 저장"
            description="작업을 자동으로 저장합니다."
            checked={settings.autoSave}
            onCheckedChange={updateSetting('autoSave')}
          />
          <Switch
            variant="cautionary"
            label="위치 서비스"
            description="현재 위치를 사용합니다."
            checked={settings.location}
            onCheckedChange={updateSetting('location')}
          />
        </div>

        <div className="mt-6 pt-4 border-t text-sm text-gray-600">
          <h4 className="font-medium mb-2">현재 설정:</h4>
          <pre className="bg-gray-50 p-2 rounded text-xs">{JSON.stringify(settings, null, 2)}</pre>
        </div>
      </div>
    );
  },
};
