import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories } from '@/src/lib/tools';
import { cn } from '@/src/lib/utils';
import { Home, Search, Menu, X, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { tools } from '@/src/lib/tools';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<typeof tools>([]);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = tools.filter(tool => 
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase()) ||
      tool.keywords.some(kw => kw.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(filtered.slice(0, 5));
  };

  // Close search results on navigation
  React.useEffect(() => {
    setSearchResults([]);
    setSearchQuery('');
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-slate-100 rounded-lg lg:hidden"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Zap size={18} fill="currentColor" />
              </div>
              <span>Tooolify</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search 100+ tools..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl transition-all outline-none text-sm"
              />
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-2">
                    {searchResults.map((tool) => (
                      <Link 
                        key={tool.id}
                        to={tool.path}
                        className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors group"
                      >
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                          <tool.icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-slate-900 truncate">{tool.name}</div>
                          <div className="text-xs text-slate-500 truncate">{tool.description}</div>
                        </div>
                        <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                      </Link>
                    ))}
                  </div>
                  <Link 
                    to={`/search?q=${searchQuery}`}
                    className="p-3 bg-slate-50 border-t block text-center text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                  >
                    View All Results
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">

            <Link 
              to="/contact"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
            >
              Submit Tool
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 container mx-auto px-4 py-8 gap-8">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:bg-transparent lg:border-none",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="h-full flex flex-col gap-6 p-4 lg:p-0">
            <div className="lg:hidden flex items-center justify-between mb-4">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={toggleSidebar}><X size={20} /></button>
            </div>

            <nav className="flex flex-col gap-1">
              <Link 
                to="/" 
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                  location.pathname === '/' ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <Home size={18} />
                Home
              </Link>

              <Link 
                to="/search" 
                className={cn(
                  "flex lg:hidden items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-600 hover:bg-slate-100"
                )}
              >
                <Search size={18} />
                Search Tools
              </Link>
              
              <div className="mt-4 mb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Categories
              </div>
              
              {categories.map((cat) => (
                <Link 
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                    location.pathname.startsWith(`/category/${cat.id}`) ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <cat.icon size={18} />
                  {cat.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto p-4 bg-indigo-600 rounded-2xl text-white">
              <h4 className="font-bold text-sm mb-1">Go Premium</h4>
              <p className="text-xs text-indigo-100 mb-3">Get API access and ad-free experience.</p>
              <button className="w-full py-2 bg-white text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <Zap size={18} fill="currentColor" />
                </div>
                <span>Tooolify</span>
              </Link>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                The ultimate collection of free online tools for developers, designers, and digital professionals. 
                Fast, secure, and always free.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Categories</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link to={`/category/${cat.id}`} className="hover:text-indigo-600 truncate block">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/about" className="hover:text-indigo-600">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-indigo-600">Contact</Link></li>
                <li><Link to="/changelog" className="hover:text-indigo-600">Changelog</Link></li>
                <li><Link to="/faq" className="hover:text-indigo-600">FAQ</Link></li>
                <li><Link to="/pricing" className="hover:text-indigo-600">Pricing</Link></li>
                <li><Link to="/terms" className="hover:text-indigo-600">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-indigo-600">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
            <p>© 2026 Tooolify. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-600">Twitter</a>
              <a href="#" className="hover:text-slate-600">LinkedIn</a>
              <a href="#" className="hover:text-slate-600">Product Hunt</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
