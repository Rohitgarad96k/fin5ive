import React from 'react';
import { 
  BarChart3, Landmark, Globe2, ShieldCheck, 
  Coins, Briefcase, TrendingUp, Gem, ArrowRight,
  ChevronRight, Building
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const categories = [
    {
      title: "Corporate Finance & Capital",
      description: "Fueling business expansion through structured debt and equity instruments.",
      icon: <Landmark className="w-8 h-8 text-finOrange" />,
      services: [
        { name: "SME & Mainboard IPO", tag: "Public Listing", desc: "End-to-end listing advisory from DRHP filing to exchange bell ringing." },
        { name: "Working Capital & LAP", tag: "Liquid Capital", desc: "Securing ₹1Cr to ₹100Cr+ via strategic banking partnerships." },
        { name: "Project Financing", tag: "Capex Growth", desc: "Long-term debt structuring for new plants, machinery, and infrastructure." }
      ]
    },
    {
      title: "GIFT City & Global Advisory",
      description: "Unlocking international tax benefits and offshore fund structures.",
      icon: <Globe2 className="w-8 h-8 text-finOrange" />,
      services: [
        { name: "IFSC Unit Setup", tag: "10-Year Tax Holiday", desc: "Establishment of IT/ITeS and Financial units in GIFT City, Gujarat." },
        { name: "Offshore Fund Structuring", tag: "Foreign Capital", desc: "Setting up AIFs, VCs, and family offices in a tax-neutral zone." },
        { name: "Cross-Border Trade", tag: "FEMA Compliance", desc: "Inbound/Outbound investment advisory and FEMA regulatory filings." }
      ]
    },
    {
      title: "Private Wealth & NRI Services",
      description: "Tailored portfolio architecture for HNIs and the Global Indian diaspora.",
      icon: <Gem className="w-8 h-8 text-finOrange" />,
      services: [
        { name: "HNI Portfolio Management", tag: "Unbiased Growth", desc: "Open-architecture wealth management focused on risk-adjusted returns." },
        { name: "NRI Financial Desk", tag: "NRE/NRO Management", desc: "Comprehensive Indian investment and repatriation management for NRIs." },
        { name: "Estate Planning", tag: "Legacy Protection", desc: "Trust formation and succession planning to protect generational wealth." }
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-finBlue text-white py-24 relative">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Execution-First <span className="text-finOrange">Advisory.</span></h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From local MSME funding to global offshore structuring, we provide the technical mastery required to navigate complex financial landscapes.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="mb-20">
            <div className="flex items-center mb-10 gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl border border-gray-100 shadow-sm">
                {cat.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-finBlue">{cat.title}</h2>
                <p className="text-gray-500">{cat.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cat.services.map((service, sIdx) => (
                <div key={sIdx} className="group p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-finOrange/30 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-finOrange/10 text-finOrange text-xs font-bold rounded-full mb-4 uppercase tracking-widest">
                      {service.tag}
                    </span>
                    <h3 className="text-xl font-bold text-finBlue mb-3 group-hover:text-finOrange transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>
                  <Link to="/contact" className="flex items-center text-finBlue font-bold text-sm group-hover:gap-2 transition-all">
                    Inquire for Execution <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Integrated CTA */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Can't find the specific financial instrument you need?</h2>
          <p className="text-gray-400 mb-8 text-lg">Our partners specialize in custom financial engineering for complex corporate requirements.</p>
          <Link to="/contact" className="inline-flex items-center bg-finOrange hover:bg-white hover:text-finBlue text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg">
            Request Custom Consultation <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;