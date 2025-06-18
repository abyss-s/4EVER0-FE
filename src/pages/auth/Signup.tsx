import React, { useState, FormEvent } from 'react';
import { Alert } from '@/components/ui/alert';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiWithoutToken } from '@/lib/api/apiconfig';
import { loginViaProvider } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone } from 'lucide-react';
import { Calendar28 } from '@/pages/auth/Datepicker';

const Signup: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const provider = searchParams.get('provider') || '';
  const oauthId = searchParams.get('oauthId') || '';

  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    name: '',
    birthDate: '', // ISO yyyy-MM-dd 형식 문자열 저장
  });

  const [errors, setErrors] = useState<{
    email?: string;
    phoneNumber?: string;
    name?: string;
    birthDate?: string;
    server?: string;
  }>({});

  const [alert, setAlert] = useState<{
    variant: 'default' | 'destructive';
    title: string;
    description: string;
  } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
      server: undefined,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    const phoneRegex = /^01\d-\d{3,4}-\d{4}$/;

    if (!formData.email) newErrors.email = '이메일을 입력해주세요.';
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = '전화번호를 입력해주세요.';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = '전화번호 형식이 올바르지 않습니다. 예: 010-1234-5678';
    }
    if (!formData.name) newErrors.name = '이름을 입력해주세요.';
    if (!formData.birthDate) newErrors.birthDate = '생년월일을 선택해주세요.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // 오류 메시지 중 첫 번째만 Alert에 표시
      const firstErrorField = ['email', 'phoneNumber', 'name', 'birthDate'].find(
        (field) => newErrors[field as keyof typeof newErrors],
      );

      if (firstErrorField) {
        setAlert({
          variant: 'destructive',
          title: '입력 오류',
          description: newErrors[firstErrorField as keyof typeof newErrors] || '',
        });
      }

      return;
    }

    try {
      await apiWithoutToken.post('/users', {
        userId: oauthId,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        name: formData.name,
        birth: formData.birthDate,
      });

      setAlert({
        variant: 'default',
        title: '회원가입 완료',
        description: '환영합니다! 서비스 이용을 시작하세요.',
      });

      loginViaProvider(provider);
    } catch (error: unknown) {
      setAlert({
        variant: 'destructive',
        title: '회원가입 실패',
        description: '회원가입에 실패했습니다. 다시 시도해 주세요.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center pt-4">
      <div className="w-full max-w-lg">
        {/* Alert 표시 영역 */}
        {alert && (
          <Alert
            title={alert.title}
            description={alert.description}
            variant={alert.variant}
            className="mb-4"
          />
        )}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
          <CardHeader className="text-center pt-4 pb-6">
            <CardTitle className="text-xl font-bold text-slate-800">
              Moono<span className="text-pink-500">Z</span>에 오신 걸 환영해요!
            </CardTitle>
            <CardDescription className="text-slate-600">
              서비스 이용을 위해 필요한 정보를 입력해주세요!
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-700 font-medium flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="이메일을 입력해주세요"
                  className="h-12 border-slate-200 focus:border-yellow-400 focus:ring-yellow-400"
                  required
                  autoComplete="email"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-slate-700 font-medium flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-slate-500" />
                  전화번호
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="전화번호를 입력해주세요"
                  className="h-12 border-slate-200 focus:border-yellow-400 focus:ring-yellow-400"
                  required
                  autoComplete="tel"
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-slate-700 font-medium flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  이름
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="이름을 입력해주세요"
                  className="h-12 border-slate-200 focus:border-yellow-400 focus:ring-yellow-400"
                  required
                  autoComplete="name"
                />
              </div>

              {/* Birth Date */}
              <div className="space-y-2">
                <Calendar28
                  value={formData.birthDate ? new Date(formData.birthDate) : null}
                  onChange={(date) => {
                    handleInputChange('birthDate', date ? date.toISOString().substring(0, 10) : '');
                  }}
                  label="생년월일"
                  placeholder="YYYY-MM-DD"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 bg-slate-700 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors duration-200"
              >
                회원가입 완료
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center pt-4">
              <p className="text-sm text-slate-500">
                이미 계정이 있으신가요?{' '}
                <button
                  className="text-yellow-600 hover:text-yellow-700 font-medium"
                  type="button"
                  onClick={() => navigate('/login')}
                >
                  로그인하기
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Message */}
        <div className="text-center mt-6 text-sm text-slate-500">
          가입하시면 MoonoZ의{' '}
          <button className="text-yellow-600 hover:underline" type="button">
            이용약관
          </button>{' '}
          과{' '}
          <button className="text-yellow-600 hover:underline" type="button">
            개인정보처리방침
          </button>{' '}
          에 동의하게 됩니다.
        </div>
      </div>
    </div>
  );
};

export default Signup;
