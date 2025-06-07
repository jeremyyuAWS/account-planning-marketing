import React, { useState } from 'react';
import { Mail, Users, MessageSquare, Zap, HelpCircle, Download, BarChart3 } from 'lucide-react';
import { InputForm } from './components/InputForm';
import { EmailDisplay } from './components/EmailDisplay';
import { EmailGenerator } from './components/EmailGenerator';
import { InfoModal } from './components/InfoModal';
import { WelcomeModal } from './components/WelcomeModal';
import simulatedData from './data/simulated-data.json';

interface EmailData {
  subject: string;
  body: string;
}

interface FormData {
  customerName: string;
  contactName: string;
  designation: string;
  context: string;
  goal: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('default');
  const [isGenerating, setIsGenerating] = useState(false);
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    contactName: '',
    designation: '',
    context: '',
    goal: ''
  });

  const tabs = [
    { id: 'default', label: 'Default Flow', icon: Mail, color: 'blue', borderColor: 'border-blue-600', textColor: 'text-blue-600' },
    { id: 'persona-sensitive', label: 'Persona-Sensitive', icon: Users, color: 'purple', borderColor: 'border-purple-600', textColor: 'text-purple-600' },
    { id: 'conversational', label: 'Conversational', icon: MessageSquare, color: 'green', borderColor: 'border-green-600', textColor: 'text-green-600' },
    { id: 'competitive', label: 'Competitive', icon: Zap, color: 'orange', borderColor: 'border-orange-600', textColor: 'text-orange-600' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const loadSampleData = () => {
    const sampleDeal = simulatedData.mockDeals[0];
    setFormData(sampleDeal);
  };

  const generateEmails = async () => {
    console.log('Generating emails with variant:', activeTab);
    setIsGenerating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedEmails = EmailGenerator.generateEmails(formData, activeTab);
    console.log('Generated emails:', generatedEmails);
    setEmails(generatedEmails);
    setIsGenerating(false);
  };

  const handleEmailEdit = (index: number, field: 'subject' | 'body', value: string) => {
    setEmails(prev => prev.map((email, i) => 
      i === index ? { ...email, [field]: value } : email
    ));
  };

  const exportCampaign = () => {
    const campaignData = {
      account: formData.customerName,
      contact: formData.contactName,
      designation: formData.designation,
      variant: activeTab,
      emails: emails.map((email, index) => ({
        sequence: index + 1,
        subject: email.subject,
        body: email.body,
        timing: ['Immediate', 'Day 3', 'Day 5', 'Day 7'][index]
      }))
    };

    const blob = new Blob([JSON.stringify(campaignData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.customerName.replace(/\s+/g, '_')}_email_campaign.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getActiveTabInfo = () => {
    const currentTab = tabs.find(tab => tab.id === activeTab);
    return currentTab || tabs[0];
  };

  const handleWelcomeGetStarted = () => {
    loadSampleData();
    setShowWelcomeModal(false);
  };

  const activeTabInfo = getActiveTabInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ABM Email Generator</h1>
                <p className="text-sm text-gray-600">AI-powered personalized email sequences</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowWelcomeModal(true)}
                className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-all"
              >
                Welcome Guide
              </button>
              <button
                onClick={loadSampleData}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all"
              >
                Load Sample Data
              </button>
              {emails.length > 0 && (
                <>
                  <button
                    onClick={exportCampaign}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Export Campaign
                  </button>
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-md text-sm">
                    <BarChart3 className="w-4 h-4" />
                    4 emails generated
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    console.log('Switching to tab:', tab.id);
                    setActiveTab(tab.id);
                    // Clear emails when switching tabs to show the change
                    setEmails([]);
                  }}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-all ${
                    isActive
                      ? `${tab.borderColor} ${tab.textColor}`
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
            <button
              onClick={() => setShowInfoModal(true)}
              className="ml-auto p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Learn more about this workflow"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Tab Indicator */}
      {activeTab !== 'default' && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2">
              <activeTabInfo.icon className={`w-5 h-5 ${activeTabInfo.textColor}`} />
              <span className="text-sm font-medium text-gray-900">
                Active Mode: <span className={activeTabInfo.textColor}>{activeTabInfo.label}</span>
              </span>
              {activeTab === 'competitive' && (
                <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                  Competitive Intelligence Enabled
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2">
            <InputForm
              formData={formData}
              onInputChange={handleInputChange}
              onGenerate={generateEmails}
              isGenerating={isGenerating}
              designations={simulatedData.designations}
            />
          </div>

          {/* Email Display */}
          <div className="lg:col-span-3">
            <EmailDisplay
              emails={emails}
              onEmailEdit={handleEmailEdit}
            />
          </div>
        </div>
      </div>

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        onGetStarted={handleWelcomeGetStarted}
      />

      {/* Info Modal */}
      <InfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        variant={activeTab}
      />
    </div>
  );
}

export default App;