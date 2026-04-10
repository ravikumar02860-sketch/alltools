import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { Calculator, Percent } from 'lucide-react';

export const PercentageCalculator: React.FC = () => {
  const [val1, setVal1] = React.useState('10');
  const [val2, setVal2] = React.useState('100');
  const [result1, setResult1] = React.useState('10');

  const [val3, setVal3] = React.useState('50');
  const [val4, setVal4] = React.useState('200');
  const [result2, setResult2] = React.useState('25');

  const [val5, setVal5] = React.useState('100');
  const [val6, setVal6] = React.useState('10');
  const [result3, setResult3] = React.useState('110');

  React.useEffect(() => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    if (!isNaN(v1) && !isNaN(v2)) setResult1(((v1 / 100) * v2).toFixed(2));

    const v3 = parseFloat(val3);
    const v4 = parseFloat(val4);
    if (!isNaN(v3) && !isNaN(v4)) setResult2(((v3 / v4) * 100).toFixed(2));

    const v5 = parseFloat(val5);
    const v6 = parseFloat(val6);
    if (!isNaN(v5) && !isNaN(v6)) setResult3((v5 * (1 + v6 / 100)).toFixed(2));
  }, [val1, val2, val3, val4, val5, val6]);

  return (
    <ToolPage
      toolId="percentage-calculator"
      category="math"
      title="Percentage Calculator"
      description="Calculate percentages, percentage increases, and decreases instantly. Perfect for finance, shopping, and math problems."
      longDescription={`Percentages are used everywhere—from calculating discounts while shopping to analyzing financial growth in business. Our Percentage Calculator provides three common calculation modes to cover all your needs.

Calculations Supported:
1. What is X% of Y? (e.g., What is 15% of 80?)
2. X is what percentage of Y? (e.g., 20 is what percentage of 50?)
3. What is X increased by Y%? (e.g., What is 100 increased by 10%?)

Whether you're calculating a tip, a sales tax, or a salary increase, this tool provides instant and accurate results.`}
      faqs={[
        { question: "How do I calculate a discount?", answer: "To calculate a 20% discount on $100, use the 'What is X% of Y' mode. 20% of 100 is 20. Subtract 20 from 100 to get the final price: $80." },
        { question: "What is percentage increase?", answer: "It's the amount of growth expressed as a percentage of the original value. Use our third mode to calculate this easily." },
        { question: "Is this tool useful for business?", answer: "Absolutely. It's great for calculating profit margins, growth rates, and tax amounts quickly." }
      ]}
    >
      <div className="space-y-12">
        {/* Mode 1 */}
        <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Percent size={20} className="text-indigo-600" />
            What is X% of Y?
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-500 font-medium">What is</span>
            <input 
              type="number" 
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              className="w-24 px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
            />
            <span className="text-slate-500 font-medium">% of</span>
            <input 
              type="number" 
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
              className="w-32 px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
            />
            <span className="text-slate-500 font-medium">?</span>
            <div className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-lg">
              {result1}
            </div>
          </div>
        </div>

        {/* Mode 2 */}
        <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Calculator size={20} className="text-indigo-600" />
            X is what % of Y?
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <input 
              type="number" 
              value={val3}
              onChange={(e) => setVal3(e.target.value)}
              className="w-32 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
            />
            <span className="text-slate-500 font-medium">is what % of</span>
            <input 
              type="number" 
              value={val4}
              onChange={(e) => setVal4(e.target.value)}
              className="w-32 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
            />
            <span className="text-slate-500 font-medium">?</span>
            <div className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-lg">
              {result2}%
            </div>
          </div>
        </div>

        {/* Mode 3 */}
        <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Percent size={20} className="text-indigo-600" />
            X increased by Y%
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-500 font-medium">What is</span>
            <input 
              type="number" 
              value={val5}
              onChange={(e) => setVal5(e.target.value)}
              className="w-32 px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
            />
            <span className="text-slate-500 font-medium">increased by</span>
            <input 
              type="number" 
              value={val6}
              onChange={(e) => setVal6(e.target.value)}
              className="w-24 px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
            />
            <span className="text-slate-500 font-medium">% ?</span>
            <div className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-lg">
              {result3}
            </div>
          </div>
        </div>
      </div>
    </ToolPage>
  );
};
