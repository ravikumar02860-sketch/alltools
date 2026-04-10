import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { Copy, RefreshCw, Check, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = React.useState('');
  const [length, setLength] = React.useState(16);
  const [options, setOptions] = React.useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = React.useState(false);

  const generatePassword = React.useCallback(() => {
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };

    let characters = '';
    if (options.uppercase) characters += charset.uppercase;
    if (options.lowercase) characters += charset.lowercase;
    if (options.numbers) characters += charset.numbers;
    if (options.symbols) characters += charset.symbols;

    if (!characters) {
      setPassword('');
      return;
    }

    let result = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      result += characters.charAt(array[i] % characters.length);
    }
    setPassword(result);
  }, [length, options]);

  React.useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (password.length < 8) return { label: 'Weak', color: 'text-red-500', icon: ShieldAlert };
    if (password.length < 12) return { label: 'Medium', color: 'text-amber-500', icon: Shield };
    return { label: 'Strong', color: 'text-emerald-500', icon: ShieldCheck };
  };

  const strength = getStrength();

  return (
    <ToolPage
      toolId="password-generator"
      category="generator"
      title="Secure Password Generator"
      description="Create strong, random, and secure passwords instantly. Customize length and character types to meet any security requirement."
      longDescription={`A strong password is your first line of defense against cyber threats. Our Secure Password Generator uses cryptographically secure random number generation (window.crypto) to ensure your passwords are truly unpredictable.

Key Features:
- Custom Length: Generate passwords from 4 to 128 characters.
- Character Sets: Include uppercase, lowercase, numbers, and special symbols.
- Instant Strength Check: Visual feedback on your password's complexity.
- Browser-Based: Your passwords are generated locally and never sent to our servers.

Best Practices:
- Aim for at least 16 characters for critical accounts.
- Use a mix of all character types.
- Use a unique password for every service.`}
      faqs={[
        { question: "Is it safe to generate passwords online?", answer: "Yes, because our tool runs entirely in your browser. The 'randomness' is generated on your computer, and the result is never transmitted over the internet." },
        { question: "What makes a password 'strong'?", answer: "Strength comes from entropy. A combination of length (12+ characters) and a mix of uppercase, lowercase, numbers, and symbols makes a password exponentially harder to crack." },
        { question: "How long should my password be?", answer: "For most personal accounts, 12-16 characters is sufficient. For highly sensitive data, consider 20+ characters." }
      ]}
    >
      <div className="space-y-8">
        <div className="relative group">
          <div className="w-full p-6 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-2xl text-slate-800 break-all min-h-[80px] flex items-center justify-center text-center">
            {password || <span className="text-slate-300">Select options...</span>}
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <button 
              onClick={generatePassword}
              className="p-2 bg-white text-slate-400 hover:text-indigo-600 border border-slate-200 rounded-lg shadow-sm transition-all"
              title="Regenerate"
            >
              <RefreshCw size={18} />
            </button>
            <button 
              onClick={handleCopy}
              className="px-4 py-2 bg-white text-slate-700 hover:text-indigo-600 border border-slate-200 rounded-lg shadow-sm transition-all flex items-center gap-2 font-medium"
            >
              {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Password Length: {length}</label>
              </div>
              <input 
                type="range" 
                min="4" 
                max="64" 
                value={length} 
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <strength.icon className={strength.color} size={20} />
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Strength</div>
                <div className={cn("font-bold", strength.color)}>{strength.label}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'uppercase', label: 'Uppercase (A-Z)' },
              { id: 'lowercase', label: 'Lowercase (a-z)' },
              { id: 'numbers', label: 'Numbers (0-9)' },
              { id: 'symbols', label: 'Symbols (!@#$)' },
            ].map((opt) => (
              <label key={opt.id} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all">
                <input 
                  type="checkbox" 
                  checked={options[opt.id as keyof typeof options]} 
                  onChange={() => setOptions(prev => ({ ...prev, [opt.id]: !prev[opt.id as keyof typeof options] }))}
                  className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-slate-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </ToolPage>
  );
};
