import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { ArrowRightLeft, RefreshCw } from 'lucide-react';

const units = {
  length: {
    meters: 1,
    kilometers: 1000,
    centimeters: 0.01,
    millimeters: 0.001,
    miles: 1609.34,
    yards: 0.9144,
    feet: 0.3048,
    inches: 0.0254
  },
  weight: {
    kilograms: 1,
    grams: 0.001,
    milligrams: 0.000001,
    pounds: 0.453592,
    ounces: 0.0283495
  },
  temperature: {
    celsius: 'C',
    fahrenheit: 'F',
    kelvin: 'K'
  }
};

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = React.useState<keyof typeof units>('length');
  const [value, setValue] = React.useState('1');
  const [fromUnit, setFromUnit] = React.useState('meters');
  const [toUnit, setToUnit] = React.useState('kilometers');
  const [result, setResult] = React.useState('0.001');

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult('0');
      return;
    }

    if (category === 'temperature') {
      let celsius = val;
      if (fromUnit === 'fahrenheit') celsius = (val - 32) * 5/9;
      if (fromUnit === 'kelvin') celsius = val - 273.15;

      let final = celsius;
      if (toUnit === 'fahrenheit') final = (celsius * 9/5) + 32;
      if (toUnit === 'kelvin') final = celsius + 273.15;
      
      setResult(final.toFixed(4));
    } else {
      const catUnits = units[category] as Record<string, number>;
      const baseValue = val * catUnits[fromUnit];
      const finalValue = baseValue / catUnits[toUnit];
      setResult(finalValue.toLocaleString(undefined, { maximumFractionDigits: 6 }));
    }
  };

  React.useEffect(convert, [value, fromUnit, toUnit, category]);

  const handleCategoryChange = (cat: keyof typeof units) => {
    setCategory(cat);
    const unitKeys = Object.keys(units[cat]);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1]);
  };

  return (
    <ToolPage
      toolId="unit-converter"
      category="converter"
      title="Unit Converter"
      description="Convert between various units of length, weight, and temperature instantly. Accurate and easy to use."
      longDescription={`Our Unit Converter is a versatile tool for everyday calculations. Whether you're a student working on physics problems, a traveler converting miles to kilometers, or a cook converting pounds to kilograms, we've got you covered.

Supported Categories:
- Length: Meters, Kilometers, Miles, Feet, Inches, and more.
- Weight: Kilograms, Grams, Pounds, Ounces.
- Temperature: Celsius, Fahrenheit, Kelvin.

All conversions are performed with high precision using standard conversion factors.`}
      faqs={[
        { question: "How accurate are the conversions?", answer: "We use standard international conversion factors to ensure high accuracy for all scientific and everyday use cases." },
        { question: "Can I convert volume or area?", answer: "Currently we support length, weight, and temperature. We are working on adding volume, area, and speed soon." },
        { question: "Is this tool mobile-friendly?", answer: "Yes, like all Tooolify utilities, the Unit Converter is fully responsive and works perfectly on smartphones and tablets." }
      ]}
    >
      <div className="space-y-8">
        <div className="flex bg-slate-100 p-1 rounded-2xl w-fit mx-auto">
          {Object.keys(units).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat as any)}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${category === cat ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">From</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="flex-1 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-xl font-bold"
                />
                <select 
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-40 px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-sm"
                >
                  {Object.keys(units[category]).map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={() => { const tmp = fromUnit; setFromUnit(toUnit); setToUnit(tmp); }}
                className="p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-all shadow-sm"
              >
                <ArrowRightLeft size={24} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">To</label>
              <div className="flex gap-2">
                <div className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-2xl text-xl font-bold flex items-center">
                  {result}
                </div>
                <select 
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-40 px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-sm"
                >
                  {Object.keys(units[category]).map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="hidden md:block p-8 bg-slate-50 rounded-[40px] border border-slate-100 space-y-4">
            <h4 className="font-bold text-slate-900">Conversion Formula</h4>
            <div className="p-4 bg-white rounded-2xl border border-slate-100 font-mono text-sm text-indigo-600">
              {category === 'temperature' ? (
                fromUnit === 'celsius' && toUnit === 'fahrenheit' ? '(°C * 9/5) + 32' :
                fromUnit === 'fahrenheit' && toUnit === 'celsius' ? '(°F - 32) * 5/9' :
                'Standard scientific formula'
              ) : (
                `1 ${fromUnit} = ${( (units[category] as any)[fromUnit] / (units[category] as any)[toUnit] ).toFixed(6)} ${toUnit}`
              )}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our converter uses real-time calculation to ensure you get the most accurate results for your measurements.
            </p>
          </div>
        </div>
      </div>
    </ToolPage>
  );
};
