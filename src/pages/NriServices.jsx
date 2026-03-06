import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, AlertCircle, CheckCircle, FileText, Landmark, 
  ShieldCheck, Briefcase, Building2, Calculator, X, Send, 
  ChevronDown, ChevronUp, Download, Plane, Activity, Mail, PieChart, ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const NriServices = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('TAX'); // TAX, REAL_ESTATE, GIFT_CITY, WEALTH, FEMA

  // NRE vs NRO Calculator State
  const [accountType, setAccountType] = useState('NRE'); // NRE (Tax-Free) or NRO (Taxable)
  const [investment, setInvestment] = useState(5000000); // 50 Lakhs INR
  const [returnRate, setReturnRate] = useState(12); // 12%
  const [years, setYears] = useState(10); // 10 Years

  // --- CALCULATOR MATH ---
  const calculateGrowth = () => {
    const r = returnRate / 100;
    const effectiveRate = accountType === 'NRE' ? r : r * 0.70; // 30% tax drag on NRO gains
    const maturityValue = investment * Math.pow(1 + effectiveRate, years);
    const wealthGained = maturityValue - investment;
    const estimatedTaxDrag = accountType === 'NRO' ? (investment * Math.pow(1 + r, years)) - maturityValue : 0;
    
    return { maturityValue, wealthGained, estimatedTaxDrag };
  };

  const { maturityValue, wealthGained, estimatedTaxDrag } = calculateGrowth();
  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  // --- DATA ARRAYS ---
  const servicePillars = {
    TAX: {
      title: "Taxation & Compliance",
      icon: <FileText className="w-6 h-6" />,
      desc: "Navigate complex double taxation scenarios. We ensure strict compliance with the Indian Income Tax Department while optimizing your tax liabilities.",
      points: ["Income Tax Return (ITR) Filing", "Tax Planning and Optimization", "TDS Refund & Lower Deduction Certificates", "Responding to IT Notices & Scrutiny"]
    },
    REAL_ESTATE: {
      title: "Real Estate Advisory",
      icon: <Building2 className="w-6 h-6" />,
      desc: "India's booming real estate market offers NRIs a golden opportunity. We manage the entire lifecycle from finding properties to tax-optimized repatriation.",
      points: ["Property Consultation & Selection", "Home Loan & Financing Assistance", "Legal & Documentation Support", "Property Management & Resale Assistance"]
    },
    GIFT_CITY: {
      title: "GIFT City Investments",
      icon: <Landmark className="w-6 h-6" />,
      desc: "Designed to compete with global financial hubs, GIFT City presents unmatched, tax-efficient offshore investment opportunities for NRIs.",
      points: ["Offshore Portfolio Management", "Structured Financial Planning", "Company Setup & Licensing Support", "Zero-Tax Investment Strategies"]
    },
    WEALTH: {
      title: "Portfolio Management",
      icon: <PieChart className="w-6 h-6" />,
      desc: "Manage your Indian wealth remotely. From Mutual Funds to exclusive AIFs and PMS strategies, we build inflation-beating portfolios in INR.",
      points: ["NRE/NRO Demat & Trading Setup", "Unbiased Mutual Fund & PMS Allocation", "Category III AIFs (India Growth Funds)", "Consolidation of scattered legacy assets"]
    },
    FEMA: {
      title: "FEMA & Repatriation",
      icon: <Globe className="w-6 h-6" />,
      desc: "Repatriating funds requires strict adherence to RBI guidelines. We provide end-to-end CA certification and banking liaison for seamless transfers.",
      points: ["Form 15CA & 15CB Issuance", "Navigating the $1 Million USD Repatriation Limit", "RBI Compliance & Compounding of Offences", "NRE / NRO / FCNR Bank Account Operations"]
    }
  };

  const faqs = [
    { question: "How much money can an NRI repatriate from India?", answer: "Under the Liberalised Remittance Scheme (LRS) and FEMA guidelines, NRIs can repatriate up to USD 1 Million per financial year from their NRO account, subject to proper tax payments and CA certification (Form 15CA/CB). Balances in NRE accounts are fully repatriable without limits." },
    { question: "Do I need to pay tax on property sale in India?", answer: "Yes. When an NRI sells property in India, the buyer is required to deduct TDS at 20% (plus surcharge and cess) on the entire sale value, not just the profit. We help NRIs apply for a Lower TDS Certificate to significantly reduce this upfront deduction." },
    { question: "Do I need to travel to India to open accounts or sell property?", answer: "No. With digital KYC, video verifications, and legally drafted Specific Powers of Attorney (POA) adjudicated in your country of residence, we can manage 99% of transactions, account setups, and property sales remotely." },
    { question: "What is the difference between NRE and NRO accounts?", answer: "NRE (Non-Resident External) accounts are for parking foreign income in India; the interest earned is tax-free and fully repatriable. NRO (Non-Resident Ordinary) accounts are for managing income earned within India (rent, dividends); the interest is taxable, and repatriation is subject to limits." }
  ];

  return (
    // FIXED: Removed the top padding (pt-20) from this wrapper
    <div className="bg-white relative font-sans">

      {/* --- NRI CONSULTATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-[#003366] p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><Globe className="w-5 h-5 mr-2"/> Speak to an NRI Advisor</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-[#FF6600] transition"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={(e) => { 
              e.preventDefault(); 
              setIsModalOpen(false); 
              toast.success("Request Received. Our cross-border team will contact you shortly."); 
            }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="First Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="Last Name" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="you@email.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country of Residence</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="e.g., USA, UAE, UK" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="+1 234 567 8900" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Requirement</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none bg-white">
                  <option>Repatriation & Form 15CA/CB</option>
                  <option>Property Sale & Lower TDS</option>
                  <option>Income Tax Filing & Planning</option>
                  <option>Wealth Management & GIFT City</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 rounded-lg mt-4 flex justify-center items-center transition shadow-lg">
                Request Callback <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Epic Hero Section - FIXED: Added pt-36 and lg:pt-48 so it starts under the navbar and pushes content down */}
      <div className="bg-[#003366] text-white pt-36 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Globe className="w-96 h-96 -mt-10 -mr-10 animate-[spin_120s_linear_infinite]" />
        </div>
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF6600]/20 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-4">
              <Briefcase className="w-5 h-5" />
              <span>Cross-Border Wealth Management</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Your Wealth in India, <span className="text-[#FF6600]">Managed Globally.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              A premium, one-stop solution for Non-Resident Indians. We navigate the complexities of FEMA, real estate capital gains, and cross-border taxation so you can invest and repatriate with absolute confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setIsModalOpen(true)} className="bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 px-8 rounded-lg transition duration-300 shadow-lg shadow-[#FF6600]/30 flex justify-center items-center text-lg">
                Speak to an NRI Advisor <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Stats / Trust Bar */}
      <div className="bg-slate-900 text-white py-6 border-b-4 border-[#FF6600]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-gray-700 items-center">
          <div className="p-2"><p className="text-2xl font-extrabold text-[#FF6600]">Zero</p><p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Travel Required</p></div>
          <div className="p-2"><p className="text-2xl font-extrabold text-[#FF6600]">15CA/CB</p><p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Repatriation Experts</p></div>
          <div className="p-2"><p className="text-2xl font-extrabold text-[#FF6600]">DTAA</p><p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Tax Optimized</p></div>
          <div className="p-2"><p className="text-2xl font-extrabold text-[#FF6600]">100%</p><p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Digital Execution</p></div>
        </div>
      </div>

      {/* 3. The Challenges vs. Solutions Split */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-4 block">The Friction</span>
            <h2 className="text-3xl font-bold text-[#003366] mb-4">Managing Indian Assets Shouldn't Be Stressful</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Distance and complex regulatory frameworks create massive hurdles for NRIs. We bridge that gap.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* NRI Pain Points */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-8">
                <AlertCircle className="w-10 h-10 text-red-500 mr-4" />
                <h2 className="text-2xl font-bold text-[#003366]">Are You Facing These Challenges?</h2>
              </div>
              <div className="space-y-5">
                {[
                  "Unsure about Indian tax filing requirements.",
                  "Property sale capital gains complications.",
                  "TDS deductions but no refund clarity.",
                  "Double taxation concerns across borders.",
                  "FEMA & RBI compliance uncertainty.",
                  "Notices from the Indian Income Tax Department.",
                  "Confused about Optimum Investment Solutions."
                ].map((challenge, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-2.5 h-2.5 mt-2 bg-red-500 rounded-full mr-4 flex-shrink-0 shadow-sm"></div>
                    <p className="text-gray-700 font-medium leading-relaxed">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FIN5IVE Solutions */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#003366] text-white p-8 rounded-2xl shadow-xl transform hover:-translate-y-2 transition duration-300">
                  <FileText className="w-10 h-10 text-[#FF6600] mb-4" />
                  <h3 className="font-bold text-lg mb-2">Tax & ITR</h3>
                  <p className="text-sm text-gray-300">Seamless income tax filing, planning, and optimization.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 transform hover:-translate-y-2 transition duration-300">
                  <Building2 className="w-10 h-10 text-[#003366] mb-4" />
                  <h3 className="font-bold text-[#003366] text-lg mb-2">Real Estate</h3>
                  <p className="text-sm text-gray-600">End-to-end property investment, documentation, and advisory.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 transform hover:-translate-y-2 transition duration-300">
                  <Landmark className="w-10 h-10 text-[#003366] mb-4" />
                  <h3 className="font-bold text-[#003366] text-lg mb-2">Repatriation</h3>
                  <p className="text-sm text-gray-600">Form 15CA/CB support and NRE/NRO account setup.</p>
                </div>
                <div className="bg-[#003366] text-white p-8 rounded-2xl shadow-xl transform hover:-translate-y-2 transition duration-300">
                  <Globe className="w-10 h-10 text-[#FF6600] mb-4" />
                  <h3 className="font-bold text-lg mb-2">GIFT City</h3>
                  <p className="text-sm text-gray-300">Access tax-efficient offshore investments and financial planning.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NRE vs NRO Wealth Simulator */}
      <section className="py-24 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-4 block">Tax Impact Simulator</span>
            <h2 className="text-3xl font-bold text-[#003366] mb-4">NRE vs. NRO Wealth Calculator</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Visualize how Indian taxation impacts your portfolio. Toggling between Tax-Free NRE routing and Taxable NRO routing.</p>
          </div>

          <div className="bg-slate-50 rounded-3xl shadow-xl border border-gray-200 overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
            
            {/* Input Side */}
            <div className="p-8 md:p-12 md:w-3/5 border-b md:border-b-0 md:border-r border-gray-200">
              
              {/* Account Toggle */}
              <div className="flex bg-gray-200 rounded-lg p-1 mb-8">
                <button 
                  onClick={() => setAccountType('NRE')}
                  className={`flex-1 py-3 rounded-md font-bold text-sm transition-all ${accountType === 'NRE' ? 'bg-[#003366] text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  NRE Account (Tax-Free)
                </button>
                <button 
                  onClick={() => setAccountType('NRO')}
                  className={`flex-1 py-3 rounded-md font-bold text-sm transition-all ${accountType === 'NRO' ? 'bg-[#FF6600] text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  NRO Account (Taxable)
                </button>
              </div>

              {/* Investment Amount Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-[#003366]">Investment Amount (INR)</label>
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#003366] shadow-sm">
                    {formatINR(investment)}
                  </div>
                </div>
                <input 
                  type="range" min="1000000" max="100000000" step="1000000" 
                  value={investment} onChange={(e) => setInvestment(Number(e.target.value))}
                  className={`w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer ${accountType === 'NRE' ? 'accent-[#003366]' : 'accent-[#FF6600]'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Expected Return Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold text-gray-600 text-sm">Est. Return</label>
                    <span className="font-bold text-[#003366] bg-white px-2 py-1 border rounded">{returnRate}%</span>
                  </div>
                  <input 
                    type="range" min="5" max="20" step="1" 
                    value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))}
                    className={`w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer ${accountType === 'NRE' ? 'accent-[#003366]' : 'accent-[#FF6600]'}`}
                  />
                </div>

                {/* Tenure Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold text-gray-600 text-sm">Tenure</label>
                    <span className="font-bold text-[#003366] bg-white px-2 py-1 border rounded">{years} Yrs</span>
                  </div>
                  <input 
                    type="range" min="1" max="25" step="1" 
                    value={years} onChange={(e) => setYears(Number(e.target.value))}
                    className={`w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer ${accountType === 'NRE' ? 'accent-[#003366]' : 'accent-[#FF6600]'}`}
                  />
                </div>
              </div>
            </div>

            {/* Output Side */}
            <div className={`p-8 md:p-12 md:w-2/5 text-white relative flex flex-col justify-center transition-colors duration-500 ${accountType === 'NRE' ? 'bg-[#003366]' : 'bg-slate-900'}`}>
              <Calculator className="absolute bottom-0 right-0 w-48 h-48 opacity-5 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-300 font-bold text-sm tracking-widest uppercase mb-1">Total Invested</p>
                    <p className="text-2xl font-bold text-white">{formatINR(investment)}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-white/20">
                    <div className="flex justify-between text-sm mb-2 text-green-400 font-bold">
                      <span>Gross Wealth Gained</span>
                      <span>+{formatINR(wealthGained + estimatedTaxDrag)}</span>
                    </div>
                    {accountType === 'NRO' && (
                      <div className="flex justify-between text-sm mb-4 text-red-400 font-bold">
                        <span>Est. Tax Drag (~30%)</span>
                        <span>- {formatINR(estimatedTaxDrag)}</span>
                      </div>
                    )}
                    
                    <p className="text-[#FF6600] font-bold text-sm tracking-widest uppercase mb-1 mt-6">Net Maturity Value</p>
                    <p className="text-4xl font-extrabold text-white">{formatINR(maturityValue)}</p>
                    <p className="text-xs text-gray-400 mt-2 italic">*Illustration based on standard NRO TDS rates. Actuals may vary based on DTAA.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive "NRI Services Hub" Tabs */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#003366] mb-4">The 360° NRI Services Hub</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our specialized advisory verticals designed exclusively for global Indians.</p>
          </div>

          <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-md">
            <div className="flex flex-wrap md:flex-nowrap border-b border-gray-200 bg-slate-50 overflow-x-auto custom-scrollbar">
              {Object.keys(servicePillars).map((key) => (
                <button 
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 py-5 px-4 text-center font-bold text-sm md:text-base transition-colors flex flex-col items-center justify-center gap-2 min-w-[120px] ${activeTab === key ? 'border-b-4 border-[#FF6600] text-[#003366] bg-white shadow-sm' : 'text-gray-400 hover:bg-gray-100 border-b-4 border-transparent'}`}
                >
                  <div className={`${activeTab === key ? 'text-[#FF6600]' : 'text-gray-400'}`}>
                    {servicePillars[key].icon}
                  </div>
                  <span className="whitespace-nowrap">{servicePillars[key].title}</span>
                </button>
              ))}
            </div>

            <div className="p-8 md:p-14">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-3xl font-bold text-[#003366] mb-4">{servicePillars[activeTab].title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-8">{servicePillars[activeTab].desc}</p>
                  <button onClick={() => setIsModalOpen(true)} className="text-[#FF6600] font-bold flex items-center hover:text-[#e55c00] transition">
                    Consult our Experts <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
                
                <div className="md:w-1/2 bg-slate-50 p-8 rounded-2xl border border-gray-100 w-full">
                  <h4 className="font-bold text-[#003366] mb-6 text-lg">Key Deliverables:</h4>
                  <ul className="space-y-4">
                    {servicePillars[activeTab].points.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 mr-4 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Digital Onboarding Timeline */}
      <section className="py-24 bg-[#003366] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-4 block">Zero Travel Execution</span>
            <h2 className="text-3xl font-bold mb-4">How We Work Across Borders</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">We've built a robust, legally compliant framework to execute complex Indian financial tasks entirely remotely.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Horizontal Line for Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {[
                { step: 1, title: "Virtual Discovery", desc: "Initial Zoom consultation to assess your assets, tax residency, and financial goals." },
                { step: 2, title: "Secure KYC", desc: "Digital onboarding and document verification complying with RBI/SEBI standards." },
                { step: 3, title: "Drafting & POA", desc: "If required, we draft Specific Powers of Attorney for local execution of property or banking." },
                { step: 4, title: "Execution & Reporting", desc: "We execute trades, tax filings, and repatriations, updating you via a digital dashboard." }
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#FF6600] rounded-full flex items-center justify-center font-extrabold text-2xl shadow-[0_0_15px_rgba(255,102,0,0.5)] mb-6">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-lg mb-2 leading-tight">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Accordion */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#003366] mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Clarity on FEMA, Taxation, and NRI banking.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className={`w-full flex justify-between items-center p-6 hover:bg-gray-50 transition text-left`}
                >
                  <span className={`font-bold text-lg pr-4 ${activeFaq === index ? 'text-[#FF6600]' : 'text-[#003366]'}`}>{faq.question}</span>
                  <div className={`p-2 rounded-full transition-transform duration-300 flex-shrink-0 ${activeFaq === index ? 'bg-orange-100 rotate-180' : 'bg-slate-100 rotate-0'}`}>
                    <ChevronDown className={`w-5 h-5 ${activeFaq === index ? 'text-[#FF6600]' : 'text-gray-500'}`} />
                  </div>
                </button>
                <div 
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{ maxHeight: activeFaq === index ? '200px' : '0', opacity: activeFaq === index ? 1 : 0 }}
                >
                  <p className="text-gray-600 font-medium leading-relaxed p-6 md:p-8 pt-0 border-t border-gray-100">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Lead Magnet: Download Brochure */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#003366] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <Plane className="absolute top-0 right-0 w-64 h-64 text-white opacity-5 -mr-10 -mt-10 pointer-events-none" />
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Get The Fin5ive NRI Tax Filing Brochure</h3>
              <p className="text-gray-300">Download our comprehensive guide detailing ITR filing, Double Taxation concerns, and tailored investment solutions.</p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0 relative z-10">
              <form className="flex w-full shadow-lg rounded-lg overflow-hidden" onSubmit={(e) => {
                e.preventDefault();
                toast.success('Brochure sent to your email!', { icon: '📄' });
              }}>
                <input 
                  type="email" 
                  required
                  placeholder="Your Email Address" 
                  className="w-full md:w-64 px-6 py-4 border-none focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-gray-800"
                />
                <button type="submit" className="bg-[#FF6600] hover:bg-[#e55c00] text-white px-8 py-4 font-bold transition flex items-center whitespace-nowrap">
                  <Download className="w-5 h-5 mr-2" /> Get PDF
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default NriServices;