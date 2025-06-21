import React from 'react';
import { SubscriptionSteps } from './SubscriptionSteps/SubscriptionSteps';
import { Card, CardContent } from '@/components/Card';

const Subscription: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-brand-darkblue mb-4">유독Pick</h1>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">
              OTT, 뮤직, 웹툰, 게임에 라이프 혜택까지 더한 1+1 구독 조합을 만나보세요.
            </p>
          </CardContent>
        </Card>
      </div>
      <SubscriptionSteps />
    </div>
  );
};

export default Subscription;
