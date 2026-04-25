import React, { useState } from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { Calculator, IndianRupee, Calendar, Percent } from 'lucide-react';

export const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(10);

  const calculateEMI = () => {
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - loanAmount;
    
    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  };

  const results = calculateEMI();

  return (
    <ToolPage
      title="EMI Calculator - Home, Car & Personal Loan"
      description="Calculate your monthly EMI instantly for Home, Car, or Personal loans. Get detailed breakups of interest and total payable amounts."
      toolId="emi-calculator"
      category="math"
      keywords={['emi calculator india', 'home loan emi calculator', 'car loan calculator', 'personal loan emi', 'monthly loan payment calculator', 'loan repayment scheduler']}
      faqs={[
        {
          question: "What is EMI and how is it calculated?",
          answer: "EMI stands for Equated Monthly Installment. It is calculated using the formula: [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal, R is Rate of Interest per month, and N is the number of months."
        },
        {
          question: "Does prepayment affect my EMI?",
          answer: "Yes, making prepayments usually reduces either your loan tenure or your monthly EMI, depending on your bank's policy."
        },
        {
          question: "Is this EMI calculator accurate for all Indian banks?",
          answer: "Yes, this calculator uses the standard reducing balance method used by HDFC, SBI, ICICI, and most other major Indian banks."
        }
      ]}
      longDescription={`
## Why Use an EMI Calculator?

Planning a major purchase or taking a loan is a significant financial decision. Our **EMI Calculator** helps you visualize your monthly commitments before you even talk to a bank. Whether it's a **Home Loan**, **Car Loan**, or **Personal Loan**, knowing your EMI helps you manage your monthly budget effectively.

### Benefits of our Loan Calculator:
- **Instant Results**: Get your EMI within seconds.
- **Detailed Breakup**: See exactly how much interest you'll be paying over the loan tenure.
- **Financial Planning**: Adjust principal and tenure to find a monthly payment that fits your salary.

### How to use:
1. Enter the **Loan Amount** you wish to borrow.
2. Provide the **Annual Interest Rate** (usually ranges from 7% to 15%).
3. Select the **Loan Tenure** in years.
4. View your **Monthly EMI** and total interest instantly below.
      `}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <IndianRupee size={16} />
                Loan Amount (₹)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 transition-all font-mono text-xl"
              />
              <input 
                type="range" 
                min="10000" 
                max="10000000" 
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Percent size={16} />
                Interest Rate (% p.a.)
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 transition-all font-mono text-xl"
              />
              <input 
                type="range" 
                min="1" 
                max="25" 
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Calculator size={16} />
                Loan Tenure (Years)
              </label>
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 transition-all font-mono text-xl"
              />
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl space-y-6 border border-slate-100">
            <div className="space-y-1">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Your Monthly EMI</span>
              <div className="text-4xl font-black text-indigo-600">₹{results.emi.toLocaleString('en-IN')}</div>
            </div>

            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Interest</span>
                <div className="text-lg font-bold text-slate-900">₹{results.totalInterest.toLocaleString('en-IN')}</div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Payable</span>
                <div className="text-lg font-bold text-slate-900">₹{results.totalPayment.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                <span>Principal</span>
                <span>Interest</span>
              </div>
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-500" 
                  style={{ width: `${(loanAmount / results.totalPayment) * 100}%` }}
                />
                <div 
                  className="h-full bg-indigo-200 transition-all duration-500" 
                  style={{ width: `${(results.totalInterest / results.totalPayment) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPage>
  );
};
