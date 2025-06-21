import { useQuery } from '@tanstack/react-query';
import { getUserMissions } from '@/apis/mission/getUserMissions';

export const useMissions = () => {
  return useQuery({
    queryKey: ['missions', 'me'],
    queryFn: getUserMissions,
  });
};
