import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from './Card';
import { Badge } from '@/components/Badge';
import { Check, Heart } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'elevated',
        'outline',
        'ghost',
        'subscription',
        'selected',
        'success',
        'warning',
        'error',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    clickable: {
      control: 'boolean',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'default', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'default',
    clickable: false,
    padding: 'default',
    children: (
      <>
        <CardHeader>
          <CardTitle>카드 제목</CardTitle>
          <CardDescription>카드 설명입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">카드 내용이 여기에 들어갑니다.</p>
        </CardContent>
      </>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(
        [
          { variant: 'default', label: 'Default' },
          { variant: 'elevated', label: 'Elevated' },
          { variant: 'outline', label: 'Outline' },
          { variant: 'subscription', label: 'Subscription' },
          { variant: 'selected', label: 'Selected' },
          { variant: 'success', label: 'Success' },
        ] as {
          variant:
            | 'default'
            | 'elevated'
            | 'outline'
            | 'ghost'
            | 'subscription'
            | 'selected'
            | 'success'
            | 'warning'
            | 'error';
          label: string;
        }[]
      ).map((item) => (
        <Card key={item.variant} variant={item.variant}>
          <CardHeader>
            <CardTitle>{item.label}</CardTitle>
            <CardDescription>카드 variant 예시</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">카드 내용입니다.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const SubscriptionCard: Story = {
  name: '구독 상품 카드',
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-md">
      <Card variant="subscription" clickable className="relative">
        <CardAction>
          <Heart className="w-3 h-3 text-gray-400" />
        </CardAction>
        <CardContent className="pt-6">
          <div className="flex justify-center mb-3">
            <img
              src="https://www.lguplus.com/static-pogg/pc-contents/images/pogg/20221207-011122-103-U7ZZUkUo.png"
              alt="YouTube Premium"
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="flex justify-center mb-2">
            <Badge variant="ott" size="sm">
              OTT
            </Badge>
          </div>
          <h3 className="font-medium text-sm text-center mb-1">유튜브 프리미엄</h3>
          <p className="text-xs text-gray-600 text-center mb-2">+ 라이프 상품 구독혜택</p>
          <div className="text-center">
            <span className="text-pink-600 font-semibold text-sm">13,900원</span>
          </div>
        </CardContent>
      </Card>

      <Card variant="selected" clickable className="relative">
        <CardAction>
          <div className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        </CardAction>
        <CardContent className="pt-6">
          <div className="flex justify-center mb-3">
            <img
              src="https://www.lguplus.com/static-pogg/pc-contents/images/pogg/20240320-101606-303-BopNE2mf.jpg"
              alt="Disney+"
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="flex justify-center mb-2">
            <Badge variant="ott" size="sm">
              OTT
            </Badge>
          </div>
          <h3 className="font-medium text-sm text-center mb-1">디즈니+</h3>
          <p className="text-xs text-gray-600 text-center mb-2">+ 라이프 상품 구독혜택</p>
          <div className="text-center">
            <span className="text-pink-600 font-semibold text-sm">9,900원</span>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

export const PaymentSummary: Story = {
  name: '결제 요약 카드',
  render: () => (
    <Card variant="elevated" className="max-w-sm">
      <CardHeader border>
        <CardTitle className="text-base">선택한 상품</CardTitle>
      </CardHeader>
      <CardContent padding="lg" className="space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-2">메인 구독 상품</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
              <div className="flex items-center space-x-2">
                <img src="https://via.placeholder.com/24" alt="product" className="w-6 h-6" />
                <span>유튜브 프리미엄</span>
              </div>
              <span className="font-medium">13,900원</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-sm mb-2">라이프 혜택</h4>
          <div className="flex flex-wrap gap-1">
            <Badge variant="category" size="sm">
              스타벅스
            </Badge>
            <Badge variant="category" size="sm">
              배스킨라빈스
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter border justify="between" padding="lg">
        <span className="font-semibold">총 결제 금액</span>
        <span className="text-lg font-bold text-pink-600">9,730원</span>
      </CardFooter>
    </Card>
  ),
};
