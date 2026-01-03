import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, Shield, Zap, Users, BarChart3, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10 transition-colors duration-300" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-primary dark:text-indigo-300 text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New: Smart Attendance Tracking
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8 leading-tight">
            Streamline Your <br />
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Workforce Management
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            Empower your team with a comprehensive HR system. Handle leave requests, 
            track attendance, and manage payroll effortlessly—all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-2"
            >
              Get Started
              <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              View Demo
            </button>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Users', value: '10K+' },
              { label: 'Leave Requests', value: '50K+' },
              { label: 'Hours Saved', value: '100%' },
              { label: 'Uptime', value: '99.9%' }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Features</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need for HR
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              A complete suite of tools designed to make human resource management simple and effective.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="text-amber-500" size={32} />,
                title: "Easy Leave Requests",
                desc: "Employees can submit leave requests in seconds. Managers get instant notifications for quick approvals."
              },
              {
                icon: <Clock className="text-blue-500" size={32} />,
                title: "Real-time Tracking",
                desc: "Monitor attendance and time-off balances in real-time. Say goodbye to spreadsheet chaos."
              },
              {
                icon: <Shield className="text-green-500" size={32} />,
                title: "Secure & Compliant",
                desc: "Enterprise-grade security ensures your employee data is safe and compliant with regulations."
              },
              {
                icon: <Users className="text-purple-500" size={32} />,
                title: "Team Management",
                desc: "Organize teams, assign roles, and manage hierarchies with an intuitive drag-and-drop interface."
              },
              {
                icon: <CheckCircle2 className="text-indigo-500" size={32} />,
                title: "Quick Approvals",
                desc: "One-click approval workflows for admins. Streamline the process and reduce bottlenecks."
              },
              {
                icon: <BarChart3 className="text-rose-500" size={32} />,
                title: "Insightful Reports",
                desc: "Generate detailed reports on attendance trends, leave balances, and workforce distribution."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 w-fit rounded-xl">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Transform Your HR?
              </h2>
              <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">
                Join thousands of companies using Dayflow to streamline their workforce management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Start Free Trial
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">D</div>
                <span className="text-2xl font-bold text-white">Dayflow</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Streamlining workforce management for modern enterprises. Simple, secure, and smart.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Product</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            © 2024 Dayflow Systems. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;