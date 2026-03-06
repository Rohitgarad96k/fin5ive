import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, Mail, Key, ShieldCheck, ArrowLeft, Loader2, Server, 
  LayoutDashboard, Briefcase, FileText, Settings, LogOut, 
  TrendingUp, Download, Bell, User as UserIcon, Activity, 
  CheckCircle, Search, Clock, PieChart, Landmark, ArrowRight, Globe2
} from 'lucide-react';
import toast from 'react-hot-toast';

const ClientPortal = () => {
  // --- AUTHENTICATION STATE (Now using LocalStorage for persistence) ---
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('fin5ive_auth') === 'true';
  });
  const [view, setView] = useState('LOGIN'); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- LOGIN FORM STATE ---
  const [email, setEmail] = useState(() => {
    return localStorage.getItem('fin5ive_user') || '';
  });
  const [password, setPassword] = useState('');

  // --- DASHBOARD STATE ---
  const [activeTab, setActiveTab] = useState('OVERVIEW'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Settings State
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  // --- LIVE CLOCK ---
  useEffect(() => {
    let timer;
    if (isLoggedIn) {
      timer = setInterval(() => setCurrentTime(new Date()), 1000);
    }
    return () => clearInterval(timer);
  }, [isLoggedIn]);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // --- HANDLERS ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsLoggedIn(true);
      
      // Save session to browser so it persists across pages!
      localStorage.setItem('fin5ive_auth', 'true');
      localStorage.setItem('fin5ive_user', email);

      toast.success('Authentication successful. Welcome back!', {
        iconTheme: { primary: '#10B981', secondary: 'white' }
      });
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
    setView('LOGIN');
    setActiveTab('OVERVIEW');
    
    // Clear the session from the browser
    localStorage.removeItem('fin5ive_auth');
    localStorage.removeItem('fin5ive_user');
    
    toast('Securely logged out.', { icon: '🔒' });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your registered email address.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setView('LOGIN');
      toast.success('Password reset link sent to your corporate email.');
    }, 1500);
  };

  const handleDownload = (fileName) => {
    const promise = new Promise((resolve) => setTimeout(resolve, 800));
    toast.promise(promise, {
      loading: 'Decrypting file...',
      success: `${fileName} downloaded securely.`,
      error: 'Download failed.',
    });
  };

  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  // --- MOCK DATA ---
  const documents = [
    { id: 1, name: "Q2 FY25 Portfolio Valuation Report.pdf", type: "Report", size: "1.2 MB", date: "Nov 01, 2024" },
    { id: 2, name: "HDFC Bank CC Sanction Letter.pdf", type: "Credit", size: "3.5 MB", date: "Sep 15, 2024" },
    { id: 3, name: "Form 15CB - CA Certificate.pdf", type: "Tax", size: "800 KB", date: "Oct 05, 2024" },
    { id: 4, name: "ZED Gold Certificate.pdf", type: "Compliance", size: "2.1 MB", date: "Oct 12, 2024" },
    { id: 5, name: "Offshore Fund Structure Draft.docx", type: "Legal", size: "4.2 MB", date: "Aug 22, 2024" }
  ];

  const filteredDocs = documents.filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const portalTabs = [
    { id: 'OVERVIEW', icon: LayoutDashboard, label: 'Overview' },
    { id: 'PORTFOLIO', icon: Briefcase, label: 'Wealth Portfolio' },
    { id: 'DOCUMENTS', icon: FileText, label: 'Document Vault' },
    { id: 'SETTINGS', icon: Settings, label: 'Settings' }
  ];

  // ==========================================
  // RENDER: SECURE DASHBOARD (POST-LOGIN)
  // ==========================================
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative z-[60] font-sans">
        
        {/* Responsive Sidebar */}
        <aside className="w-full md:w-72 bg-finBlue text-white flex flex-col shadow-2xl z-40 md:h-screen md:sticky top-0 flex-shrink-0">
          
          {/* Brand Logo Area */}
          <div className="p-5 md:p-8 border-b border-white/10 flex items-center justify-between">
            <Link to="/" className="flex flex-col group">
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-white leading-none group-hover:text-finOrange transition-colors">
                FIN<span className="text-finOrange group-hover:text-white transition-colors">5</span>IVE
              </span>
              <span className="text-[0.6rem] md:text-xs font-bold text-finOrange tracking-[0.2em] uppercase mt-1">
                Client Portal
              </span>
            </Link>
          </div>
          
          {/* Navigation Tabs (Swipeable on Mobile, Vertical on Desktop) */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <nav className="flex md:flex-col gap-2 p-4 md:p-6 overflow-x-auto md:overflow-y-auto scrollbar-hide">
              {portalTabs.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)} 
                  className={`flex items-center flex-shrink-0 w-auto md:w-full px-5 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === item.id 
                    ? 'bg-finOrange text-white shadow-lg shadow-finOrange/20 md:translate-x-2 font-bold' 
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${activeTab === item.id ? 'animate-pulse' : 'opacity-70'}`} /> 
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Logout Area (Hidden on mobile scrolling tab bar, moved to header for mobile) */}
          <div className="hidden md:block p-6 border-t border-white/10 mt-auto bg-finBlue/50">
            <button 
              onClick={handleLogout} 
              className="flex items-center w-full px-5 py-3.5 rounded-xl font-bold text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors group"
            >
              <LogOut className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" /> 
              Secure Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
          
          {/* Top Header */}
          <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm flex-shrink-0">
            <div className="flex flex-col">
              <h2 className="text-lg md:text-2xl font-extrabold text-finBlue">
                {getGreeting()}<span className="hidden sm:inline">, Director</span>
              </h2>
              <div className="hidden md:flex items-center text-xs text-gray-500 mt-1 font-medium">
                <Clock className="w-3.5 h-3.5 mr-1.5" /> 
                {currentTime.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })} | {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
            
            <div className="flex items-center space-x-3 md:space-x-5 ml-auto">
              
              {/* Mobile Logout (Visible only on small screens) */}
              <button onClick={handleLogout} className="md:hidden text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors">
                <LogOut className="w-5 h-5" />
              </button>

              {/* Notifications Toggle */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-400 hover:text-finBlue hover:bg-slate-50 rounded-full transition-colors"
                >
                  <Bell className="w-6 h-6 md:w-7 md:h-7" />
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-72 md:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-[fadeIn_0.2s_ease-out]">
                    <div className="px-5 py-3 border-b border-gray-100 font-extrabold text-finBlue">Recent Alerts</div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="px-5 py-3.5 border-b border-gray-50 hover:bg-slate-50 cursor-pointer transition-colors">
                        <p className="text-sm font-bold text-gray-800">New Document Available</p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">Q2 Valuation Report has been uploaded to your vault.</p>
                      </div>
                      <div className="px-5 py-3.5 border-b border-gray-50 hover:bg-slate-50 cursor-pointer transition-colors">
                        <p className="text-sm font-bold text-gray-800">Compliance Reminder</p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">Advance Tax payment due in 5 days.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-3 pl-3 md:pl-5 border-l border-gray-200 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-finBlue leading-tight">{email || "client@fin5ive.com"}</p>
                  <p className="text-xs text-finOrange font-bold tracking-wider uppercase mt-0.5">Corporate</p>
                </div>
                <div className="w-10 h-10 md:w-11 md:h-11 bg-slate-100 border border-gray-200 text-finBlue rounded-full flex items-center justify-center shadow-sm">
                  <UserIcon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Body (Scrollable Content Area) */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
            <div className="max-w-7xl mx-auto pb-20 md:pb-0">
              
              {/* --- OVERVIEW TAB --- */}
              {activeTab === 'OVERVIEW' && (
                <div className="animate-[fadeIn_0.4s_ease-out] space-y-6 md:space-y-8">
                  
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
                      <div className="flex justify-between items-start mb-6">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Credit Line</p>
                        <div className="bg-blue-50 p-3 rounded-xl text-finBlue group-hover:bg-finBlue group-hover:text-white transition-colors"><Activity className="w-5 h-5" /></div>
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-finBlue mb-2">{formatINR(15000000)}</h3>
                        <p className="text-sm text-green-600 font-bold flex items-center"><CheckCircle className="w-4 h-4 mr-1.5"/> Limit healthy (40% utilized)</p>
                      </div>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
                      <div className="flex justify-between items-start mb-6">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Wealth AUM</p>
                        <div className="bg-orange-50 p-3 rounded-xl text-finOrange group-hover:bg-finOrange group-hover:text-white transition-colors"><TrendingUp className="w-5 h-5" /></div>
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-finBlue mb-2">{formatINR(42500000)}</h3>
                        <p className="text-sm text-green-600 font-bold flex items-center"><TrendingUp className="w-4 h-4 mr-1.5"/> +12.4% YTD Returns</p>
                      </div>
                    </div>

                    <div className="bg-finBlue p-6 md:p-8 rounded-3xl shadow-xl flex flex-col justify-between text-white relative overflow-hidden group hover:bg-[#002244] transition-colors md:col-span-2 xl:col-span-1">
                      <Server className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                      <div className="relative z-10">
                        <p className="text-xs font-bold text-finOrange uppercase tracking-widest mb-6">IPO Execution Status</p>
                        <h3 className="text-2xl md:text-3xl font-extrabold mb-2">Phase 2: Due Diligence</h3>
                        <p className="text-sm text-gray-300 mb-6">DRHP Drafting in progress</p>
                        <div className="w-full bg-white/10 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
                          <div className="bg-finOrange h-full rounded-full relative overflow-hidden" style={{width: '45%'}}>
                             <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-[pulse_2s_ease-in-out_infinite]"></div>
                          </div>
                        </div>
                        <p className="text-xs text-right text-finOrange font-bold">45% Complete</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 md:px-8 md:py-6 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
                      <h3 className="text-lg font-extrabold text-finBlue">Recent Ledger Activity</h3>
                      <button className="text-xs font-bold text-finOrange hover:text-finBlue transition-colors uppercase tracking-wider bg-orange-50 px-3 py-1.5 rounded-lg">View All</button>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {[
                        { title: "Monthly Interest Debited (CC A/c)", date: "Today, 10:00 AM", amt: "- ₹1,25,000", status: "Processed" },
                        { title: "Mutual Fund SIP Executed (Equity)", date: "Yesterday, 09:30 AM", amt: "₹5,00,000", status: "Invested" },
                        { title: "ZED Certification Audit Cleared", date: "Oct 12, 2024", amt: "N/A", status: "Approved", isGreen: true },
                        { title: "Form 15CA/CB Issued for Repatriation", date: "Oct 05, 2024", amt: "$50,000", status: "Completed" }
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col sm:flex-row justify-between sm:items-center p-6 md:px-8 hover:bg-slate-50 transition-colors group cursor-default gap-3 sm:gap-0">
                          <div className="flex items-start sm:items-center">
                            <div className={`w-2.5 h-2.5 rounded-full mr-4 mt-1.5 sm:mt-0 flex-shrink-0 ${item.isGreen ? 'bg-green-500' : 'bg-finOrange'}`}></div>
                            <div>
                              <p className="font-bold text-gray-800 group-hover:text-finBlue transition-colors text-sm md:text-base">{item.title}</p>
                              <p className="text-xs text-gray-500 mt-1 font-medium">{item.date}</p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right pl-6 sm:pl-0">
                            <p className={`font-extrabold text-base md:text-lg ${item.isGreen ? 'text-green-500' : 'text-gray-800'}`}>{item.amt}</p>
                            <p className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-wider">{item.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- PORTFOLIO TAB --- */}
              {activeTab === 'PORTFOLIO' && (
                <div className="animate-[fadeIn_0.4s_ease-out] space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-finBlue mb-1">Wealth Analytics</h3>
                      <p className="text-gray-500 text-sm">Real-time breakdown of your managed assets.</p>
                    </div>
                    <button className="bg-white border border-gray-200 text-finBlue hover:border-finOrange font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center sm:justify-start">
                      <Download className="w-4 h-4 mr-2" /> Export Report
                    </button>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Allocation Chart */}
                    <div className="xl:col-span-1 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
                      <h4 className="font-extrabold text-finBlue w-full text-left mb-8 text-lg">Asset Allocation</h4>
                      <div className="relative w-52 h-52 rounded-full flex items-center justify-center shadow-inner" style={{ background: 'conic-gradient(#FF6600 0% 60%, #003366 60% 85%, #94a3b8 85% 100%)' }}>
                        <div className="w-36 h-36 bg-white rounded-full flex flex-col items-center justify-center shadow-lg">
                          <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Total AUM</span>
                          <span className="text-xl font-black text-finBlue">₹4.25 Cr</span>
                        </div>
                      </div>
                      <div className="w-full mt-10 space-y-4">
                        <div className="flex justify-between text-sm items-center"><span className="flex items-center text-gray-600 font-medium"><span className="w-3 h-3 bg-finOrange rounded-full mr-3 shadow-sm"></span>Equity (60%)</span><span className="font-extrabold text-gray-800">₹2.55 Cr</span></div>
                        <div className="flex justify-between text-sm items-center"><span className="flex items-center text-gray-600 font-medium"><span className="w-3 h-3 bg-finBlue rounded-full mr-3 shadow-sm"></span>Debt (25%)</span><span className="font-extrabold text-gray-800">₹1.06 Cr</span></div>
                        <div className="flex justify-between text-sm items-center"><span className="flex items-center text-gray-600 font-medium"><span className="w-3 h-3 bg-slate-400 rounded-full mr-3 shadow-sm"></span>AIF/Alts (15%)</span><span className="font-extrabold text-gray-800">₹0.64 Cr</span></div>
                      </div>
                    </div>

                    {/* Top Holdings */}
                    <div className="xl:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                      <h4 className="font-extrabold text-finBlue mb-6 text-lg">Top Performing Funds</h4>
                      <div className="space-y-4">
                        {[
                          { name: "HDFC Flexi Cap Fund", type: "Equity", value: "₹85,00,000", return: "+18.2%", icon: PieChart },
                          { name: "ICICI Pru Corporate Bond Fund", type: "Debt", value: "₹60,00,000", return: "+7.5%", icon: Landmark },
                          { name: "Global Innovation AIF Cat III", type: "Alternate", value: "₹50,00,000", return: "+24.1%", icon: Globe2 },
                          { name: "SBI Magnum Midcap Fund", type: "Equity", value: "₹45,00,000", return: "+22.4%", icon: PieChart }
                        ].map((fund, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-gray-100 rounded-2xl hover:shadow-md hover:border-finOrange/30 transition-all gap-4 sm:gap-0">
                            <div className="flex items-center">
                              <div className="bg-slate-50 p-3.5 rounded-xl mr-5 text-finBlue border border-gray-100 shadow-sm">
                                <fund.icon className="w-6 h-6" />
                              </div>
                              <div>
                                <p className="font-extrabold text-gray-800">{fund.name}</p>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">{fund.type}</p>
                              </div>
                            </div>
                            <div className="text-left sm:text-right pl-16 sm:pl-0">
                              <p className="font-extrabold text-finBlue text-lg">{fund.value}</p>
                              <p className="text-sm font-bold text-green-500 mt-0.5">{fund.return} <span className="text-gray-400 text-xs font-medium ml-1">1Y</span></p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- DOCUMENTS TAB --- */}
              {activeTab === 'DOCUMENTS' && (
                <div className="animate-[fadeIn_0.4s_ease-out] h-full flex flex-col">
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-8 gap-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-finBlue mb-1">Document Vault</h3>
                      <p className="text-gray-500 text-sm">Securely encrypted compliance and financial reports.</p>
                    </div>
                    
                    {/* Functional Search Bar */}
                    <div className="relative w-full lg:w-80">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="text" 
                        placeholder="Search files..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-finOrange text-sm transition-all shadow-sm font-medium"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {filteredDocs.length > 0 ? (
                      filteredDocs.map((doc) => (
                        <div key={doc.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-finOrange hover:shadow-md transition-all">
                          <div className="flex items-center overflow-hidden pr-4">
                            <div className="bg-red-50 p-4 rounded-2xl text-red-500 mr-5 flex-shrink-0">
                              <FileText className="w-7 h-7" />
                            </div>
                            <div className="truncate">
                              <p className="font-bold text-finBlue text-base truncate mb-1">{doc.name}</p>
                              <div className="flex items-center text-xs text-gray-500 font-medium">
                                <span className="bg-slate-100 px-2 py-1 rounded-md text-gray-700 font-bold mr-3">{doc.type}</span>
                                {doc.size} <span className="mx-2">•</span> {doc.date}
                              </div>
                            </div>
                          </div>
                          <button onClick={() => handleDownload(doc.name)} className="bg-slate-50 p-3.5 rounded-xl text-finBlue hover:bg-finOrange hover:text-white transition-colors shadow-sm flex-shrink-0">
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-1 lg:col-span-2 text-center py-20 bg-white rounded-3xl border-2 border-gray-100 border-dashed">
                        <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-bold text-lg">No documents found matching "{searchQuery}"</p>
                        <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* --- SETTINGS TAB --- */}
              {activeTab === 'SETTINGS' && (
                <div className="animate-[fadeIn_0.4s_ease-out] max-w-4xl">
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-finBlue mb-1">Account Settings</h3>
                    <p className="text-gray-500 text-sm">Manage your security preferences and profile.</p>
                  </div>
                  
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
                    <div className="p-6 md:p-8 border-b border-gray-50 bg-slate-50/50">
                      <h4 className="font-extrabold text-gray-800 text-lg">Security Preferences</h4>
                    </div>
                    <div className="p-6 md:p-8 space-y-8">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-finBlue text-base">Two-Factor Authentication (2FA)</p>
                          <p className="text-sm text-gray-500 mt-1 leading-relaxed">Require an OTP sent to your registered mobile device when logging in.</p>
                        </div>
                        <button onClick={() => setTwoFactorAuth(!twoFactorAuth)} className={`w-14 h-7 rounded-full transition-colors relative flex-shrink-0 shadow-inner ${twoFactorAuth ? 'bg-green-500' : 'bg-gray-300'}`}>
                          <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${twoFactorAuth ? 'left-8' : 'left-1'}`}></div>
                        </button>
                      </div>
                      <div className="w-full h-px bg-gray-100"></div>
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-finBlue text-base">Email Login Alerts</p>
                          <p className="text-sm text-gray-500 mt-1 leading-relaxed">Receive an email notification every time a new device accesses your portal.</p>
                        </div>
                        <button onClick={() => setEmailAlerts(!emailAlerts)} className={`w-14 h-7 rounded-full transition-colors relative flex-shrink-0 shadow-inner ${emailAlerts ? 'bg-green-500' : 'bg-gray-300'}`}>
                          <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${emailAlerts ? 'left-8' : 'left-1'}`}></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50/50 rounded-3xl border border-red-100 shadow-sm overflow-hidden">
                    <div className="p-6 md:p-8">
                      <h4 className="font-extrabold text-red-600 mb-2 text-lg">Danger Zone</h4>
                      <p className="text-sm text-red-400 mb-6 font-medium">Actions here are irreversible and require Relationship Manager approval.</p>
                      <button className="text-sm font-bold text-red-600 bg-white border border-red-200 px-6 py-3 rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors shadow-sm">
                        Request Account Deactivation
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // RENDER: LOGIN & AUTHENTICATION SCREEN
  // ==========================================
  return (
    <div className="min-h-screen flex bg-slate-50 relative z-50">
      
      {/* Left Side: Security & Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-finBlue text-white p-16 flex-col justify-between relative overflow-hidden">
        <Server className="absolute -bottom-20 -left-20 w-[500px] h-[500px] opacity-5 pointer-events-none" />
        
        <div className="relative z-10 max-w-lg mt-10">
          <div className="bg-white/10 w-24 h-24 rounded-3xl flex items-center justify-center backdrop-blur-md mb-10 border border-white/20 shadow-2xl">
            <ShieldCheck className="w-12 h-12 text-finOrange" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
            Secure Client <br/><span className="text-finOrange">Portal.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed font-medium">
            Access your investment portfolios, track IPO execution progress, and securely manage your cross-border documentation in one encrypted environment.
          </p>
          
          <div className="space-y-5">
            <div className="flex items-center text-sm font-bold text-white bg-white/5 p-4 rounded-xl border border-white/10 w-max shadow-sm">
              <Lock className="w-5 h-5 mr-3 text-finOrange" /> 256-bit AES Encryption
            </div>
            <div className="flex items-center text-sm font-bold text-white bg-white/5 p-4 rounded-xl border border-white/10 w-max shadow-sm">
              <ShieldCheck className="w-5 h-5 mr-3 text-finOrange" /> Two-Factor Authentication Ready
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-gray-400 font-medium">© {new Date().getFullYear()} FIN5IVE Advisory. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side: Dynamic Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative bg-slate-50">
        
        {/* Mobile Logo Fallback */}
        <div className="absolute top-8 left-8 lg:hidden">
          <Link to="/" className="text-xl font-black tracking-tighter text-finBlue">
            FIN<span className="text-finOrange">5</span>IVE
          </Link>
        </div>

        <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-gray-100">
          
          {view === 'LOGIN' ? (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-finBlue mb-3 tracking-tight">Welcome Back</h2>
                <p className="text-gray-500 text-sm font-medium">Enter your credentials to access your secure dashboard.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-extrabold text-gray-800 mb-2">Corporate Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-finOrange focus:bg-white focus:border-finOrange outline-none transition-all font-medium text-gray-800"
                      placeholder="director@company.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-extrabold text-gray-800">Password</label>
                    <button type="button" onClick={() => setView('FORGOT_PASSWORD')} className="text-xs font-bold text-finOrange hover:text-finBlue transition-colors">Forgot password?</button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-finOrange focus:bg-white focus:border-finOrange outline-none transition-all font-medium text-gray-800"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full text-white font-bold py-4.5 p-4 rounded-xl transition-all duration-300 shadow-xl flex justify-center items-center text-lg mt-4 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-finBlue hover:bg-[#002244] hover:-translate-y-1'}`}
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-6 h-6 mr-2 animate-spin" /> Authenticating...</>
                  ) : (
                    <>Secure Sign In <ArrowRight className="w-5 h-5 ml-2" /></>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <div className="mb-8">
                <button onClick={() => setView('LOGIN')} className="flex items-center text-sm font-bold text-gray-500 hover:text-finBlue transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Login
                </button>
              </div>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-finBlue mb-3 tracking-tight">Reset Password</h2>
                <p className="text-gray-500 text-sm font-medium">Enter your registered email and we'll send you secure instructions.</p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-extrabold text-gray-800 mb-2">Corporate Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-finOrange focus:bg-white focus:border-finOrange outline-none transition-all font-medium text-gray-800"
                      placeholder="director@company.com"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full text-white font-bold py-4.5 rounded-xl transition-all duration-300 shadow-xl flex justify-center items-center text-lg mt-4 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-finOrange hover:bg-orange-600 hover:-translate-y-1'}`}
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-6 h-6 mr-2 animate-spin" /> Processing...</>
                  ) : (
                    <>Send Reset Link</>
                  )}
                </button>
              </form>
            </div>
          )}

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm font-medium mb-4">
              Not a client yet? <Link to="/contact" className="font-extrabold text-[#003366] hover:text-[#FF6600] transition-colors ml-1">Request Access</Link>
            </p>
            <p className="text-gray-400 text-xs font-medium">
              Internal Team: <Link to="/admin" className="hover:text-[#003366] underline decoration-gray-300 underline-offset-2 transition-colors ml-1">Access Admin Console</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;