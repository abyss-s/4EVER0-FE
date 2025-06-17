// ✅ UplTuple.tsx - 페이지 구성만 담당
import { UplusCalendar } from './Uplus/UplusCalendar';
import { UplusBenefitPreview } from './Uplus/UplusBenefitPreview';
// import { UplusBenefitDetail } from './Uplus/UplusBenefitDetail';

const UplTuple = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">유플투쁠 혜택 캘린더</h1>
      <UplusCalendar />
      <UplusBenefitPreview />
      {/* <UplusBenefitDetail /> */}
    </div>
  );
};

export default UplTuple;
