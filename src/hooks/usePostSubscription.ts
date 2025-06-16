import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postSubscription, subscribeToService } from '@/apis/subscription/postSubscription';
import type { SubscribeResponse } from '@/types/subscription';

// 구독 가입 Mutation
interface UsePostSubscriptionOptions {
  onSuccess?: (data: SubscribeResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

export const usePostSubscription = (options?: UsePostSubscriptionOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSubscription,
    onSuccess: (data) => {
      // 구독 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['user', 'subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });

      options?.onSuccess?.(data);
    },
    onError: options?.onError,
    onSettled: options?.onSettled,
  });
};

//간편 구독 가입 Mutation
interface UseSubscribeToServiceOptions {
  onSuccess?: (data: SubscribeResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

export const useSubscribeToService = (options?: UseSubscribeToServiceOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ subscriptionId, brandId }: { subscriptionId: number; brandId: number }) =>
      subscribeToService(subscriptionId, brandId),
    onSuccess: (data) => {
      // 구독 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['user', 'subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });

      options?.onSuccess?.(data);
    },
    onError: options?.onError,
    onSettled: options?.onSettled,
  });
};
