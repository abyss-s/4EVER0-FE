import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlanDetail } from '@/hooks/usePlanDetail';
import PlanCard from '@/components/PlanCard/PlanCard';
import { Share2, Heart, Wifi, Shield, Gift, Smartphone, Star, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlanResponse } from '@/types/plans';
import { Plan } from '@/types/plan';
import { cn } from '@/lib/utils';
import { changePlan } from '@/apis/plan/postPlan';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/useAuthStore';
import { useModalStore } from '@/stores/useModalStore';

const normalizePlan = (raw: PlanResponse): Plan => ({
  id: raw.id,
  name: raw.name,
  description: raw.description,
  price: raw.price,
  data: raw.data ?? '',
  voice: raw.voice ?? '',
  speed: raw.speed ?? '',
  sms: raw.sms ?? '',
});

const PlanDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { openModal } = useModalStore();
  const navigate = useNavigate();
  const { data: plan, isLoading, error } = usePlanDetail(id ?? '');
  const [isChanging, setIsChanging] = useState(false);
  const { isLoggedIn } = useAuthStore();

  const getThemeColor = (price: number) => {
    if (price <= 30000) return 'yellow';
    if (price <= 50000) return 'red';
    return 'blue';
  };

  const themeColor = plan ? getThemeColor(plan.price) : 'yellow';
  const themeColors = {
    yellow: 'bg-brand-yellow hover:bg-brand-yellow-hover',
    red: 'bg-brand-red hover:bg-brand-red-hover',
    blue: 'bg-brand-darkblue hover:bg-brand-darkblue-hover',
  };

  const handlePlanChange = async () => {
    if (!plan || !id) return;

    if (!isLoggedIn) {
      openModal({
        id: 'login-required-modal',
        title: '로그인이 필요합니다!',
        description: '요금제 변경을 위해서는 로그인이 필요합니다.\n로그인 후 이용해주세요.',
        variant: 'default',
        size: 'sm',
        showClose: false,
        showCancel: false,
        showConfirm: true,
        confirmText: '로그인하기',
        confirmVariant: 'default',
        closeOnOverlayClick: false,
        closeOnEscape: false,
        onConfirm: () => {
          navigate('/login');
        },
      });
      return;
    }

    openModal({
      id: 'plan-change-confirm-modal',
      title: '요금제 변경 확인',
      description: `${plan.name} 요금제로 변경하시겠습니까?\n월 ${plan.price.toLocaleString()}원이 청구됩니다.`,
      variant: 'default',
      size: 'sm',
      showClose: true,
      showCancel: true,
      showConfirm: true,
      cancelText: '취소',
      confirmText: '변경하기',
      confirmVariant: 'default',
      closeOnOverlayClick: true,
      closeOnEscape: true,
      onConfirm: async () => {
        await executePlanChange();
      },
    });
  };

  const executePlanChange = async () => {
    if (!plan || !id) return;

    setIsChanging(true);

    try {
      const result = await changePlan(Number(id));

      if (result.status === 200) {
        toast.success(result.data?.message || '요금제 변경이 완료되었습니다!', {
          description: result.data?.plan_name
            ? `${result.data.plan_name}으로 변경되었습니다. 마이페이지에서 확인하실 수 있습니다.`
            : '마이페이지에서 변경 내역을 확인하실 수 있습니다.',
        });

        // 성공 후 /me로 이동
        setTimeout(() => {
          navigate('/me');
        }, 2000);
      } else {
        toast.error(result.message || '요금제 변경에 실패했습니다.', {
          description:
            result.status === 409
              ? '이미 사용중인 요금제입니다.'
              : result.status === 404
                ? '존재하지 않는 요금제입니다.'
                : '다시 시도해주세요.',
        });
      }
    } catch (error) {
      const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
      const statusCode = axiosError?.response?.status;
      const errorMessage =
        axiosError?.response?.data?.message || '요청 처리 중 오류가 발생했습니다.';

      toast.error(errorMessage, {
        description:
          statusCode === 409
            ? '이미 사용중인 요금제입니다.'
            : statusCode === 404
              ? '존재하지 않는 요금제입니다.'
              : '잠시 후 다시 시도해주세요.',
      });
    } finally {
      setIsChanging(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg mx-4">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-600 font-medium mb-4">요금제를 불러올 수 없습니다.</p>
          <Button
            onClick={() => navigate('/plans')}
            className="bg-brand-red hover:bg-brand-red-hover text-white"
          >
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6 pb-6">
        <PlanCard plan={normalizePlan(plan)} />
        <div className="flex gap-3">
          <Button
            onClick={handlePlanChange}
            disabled={isChanging}
            className={cn(
              'flex-1 text-white py-3 rounded-xl font-medium transition-all',
              themeColors[themeColor],
              isChanging && 'opacity-70 cursor-not-allowed',
            )}
          >
            {isChanging ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                변경 중...
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 mr-2" />
                변경하기
              </>
            )}
          </Button>

          <Button variant="outline" className="p-3 border-gray-200 hover:bg-gray-50 rounded-xl">
            <Share2 className="w-5 h-5 text-gray-600" />
          </Button>

          <Button variant="outline" className="p-3 border-gray-200 hover:bg-gray-50 rounded-xl">
            <Heart className="w-5 h-5 text-gray-600" />
          </Button>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-brand-yellow" />
            주요 혜택
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Gift className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <div className="font-medium text-gray-900">넷플릭스 베이직 12개월 무료</div>
                <div className="text-xs text-gray-600">월 9,500원 상당</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Wifi className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <div className="font-medium text-gray-900">U+ zone 무료 Wi-Fi</div>
                <div className="text-xs text-gray-600">전국 22만개 AP 무제한 이용</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <div className="font-medium text-gray-900">U+안심폰 서비스</div>
                <div className="text-xs text-gray-600">스팸차단, 악성코드 방지</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">추가 서비스</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
              <span className="text-gray-700">U+ 포인트 적립</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
              <span className="text-gray-700">데이터 선물하기</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
              <span className="text-gray-700">해외로밍 30% 할인</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
              <span className="text-gray-700">U+tv 할인혜택</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">이용 안내</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex gap-3">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-gray-700 mb-1">5G 커버리지</div>
                <div>전국 85개 도시 5G 서비스 제공</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Shield className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-gray-700 mb-1">데이터 사용량 알림</div>
                <div>80%, 100% 도달시 문자 알림 서비스</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Gift className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-gray-700 mb-1">약정 혜택</div>
                <div>24개월 약정시 월 요금 추가 할인</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600">
          <div className="font-medium text-gray-700 mb-2">※ 유의사항</div>
          <ul className="space-y-1 leading-relaxed">
            <li>• 요금제 혜택은 가입일로부터 적용됩니다.</li>
            <li>• OTT 서비스는 신규 가입자에 한해 제공됩니다.</li>
            <li>• 데이터 사용량 초과시 속도 제한이 적용될 수 있습니다.</li>
            <li>• 부가서비스는 별도 신청이 필요할 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanDetail;
