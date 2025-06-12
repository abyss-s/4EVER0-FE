import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiWithToken } from '@/lib/api/apiconfig';
import { useAuthStore } from '@/stores/useAuthStore';
import { UserResponse } from '@/types/user';

export const useUserProfile = () => {
  const userId = useAuthStore((s) => s.userId);
  const queryClient = useQueryClient();

  return useQuery<UserResponse>({
    queryKey: ['userProfile', userId],
    queryFn: () => apiWithToken.get('/users').then((res) => res.data),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    // 함수 대신 값으로
    initialData: queryClient.getQueryData<UserResponse>(['userProfile', userId]),
  });
};
