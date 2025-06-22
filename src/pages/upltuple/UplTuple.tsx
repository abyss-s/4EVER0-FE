import { UplusCalendar } from './Uplus/UplusCalendar';
import { UplusBenefitPreview } from './Uplus/UplusBenefitPreview';

const UplTuple = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold text-brand-darkblue mb-4">유플투쁠 혜택 캘린더</h1>
      <UplusCalendar />
      <UplusBenefitPreview />
    </div>
  );
};

export default UplTuple;
