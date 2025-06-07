import React from 'react';
import { X, Mail, Users, MessageSquare, Zap, Sparkles, TrendingUp, Clock, Target } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, onGetStarted }) => {
  if (!isOpen) return null;

  const workflows = [
    {
      id: 'default',
      title: 'Default Flow',
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      description: 'Balanced 4-email sequence optimized for general B2B outreach',
      features: ['Pain point alignment', 'ROI-focused messaging', 'Social proof integration', 'Compelling CTAs'],
      businessValue: 'Proven framework with 25% average response rates',
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'persona-sensitive',
      title: 'Persona-Sensitive Flow',
      icon: <Users className="w-6 h-6 text-purple-600" />,
      description: 'Adapts messaging based on contact role and seniority level',
      features: ['Executive strategic focus', 'Technical depth for engineers', 'ROI emphasis for marketing', 'Role-specific CTAs'],
      businessValue: 'Increases engagement rates by 35% through personalization',
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'conversational',
      title: 'Conversational Tone',
      icon: <MessageSquare className="w-6 h-6 text-green-600" />,
      description: 'Friendly, approachable messaging that builds rapport quickly',
      features: ['Casual language style', 'Shorter messages', 'Relationship building', 'Low-pressure approach'],
      businessValue: 'Perfect for trust-based sales with longer cycles',
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'competitive',
      title: 'Competitive Intelligence',
      icon: <Zap className="w-6 h-6 text-orange-600" />,
      description: 'Leverage competitive intelligence to create urgency and drive decisions',
      features: ['Direct competitor comparisons', 'Risk mitigation focus', 'Market trend analysis', 'Time-sensitive offers'],
      businessValue: 'Accelerates sales cycles by 40% when prospects evaluate multiple vendors',
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome to ABM Email Generator</h1>
              <p className="text-blue-100">AI-powered personalized email sequences for account-based marketing</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="text-sm">35% Higher Engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-300" />
              <span className="text-sm">90% Time Savings</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-red-300" />
              <span className="text-sm">4x Better Conversion</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* How it Works */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                <h3 className="font-medium text-gray-900 mb-1">Enter Account Details</h3>
                <p className="text-sm text-gray-600">Company name, contact info, context, and goals</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                <h3 className="font-medium text-gray-900 mb-1">Choose Your Strategy</h3>
                <p className="text-sm text-gray-600">Select the email approach that fits your situation</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                <h3 className="font-medium text-gray-900 mb-1">Generate & Deploy</h3>
                <p className="text-sm text-gray-600">Get 4 personalized emails ready for your campaign</p>
              </div>
            </div>
          </div>

          {/* Workflows */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Your Email Strategy</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {workflows.map((workflow) => (
                <div key={workflow.id} className={`${workflow.bgColor} ${workflow.borderColor} border rounded-lg p-6 hover:shadow-md transition-all`}>
                  <div className="flex items-start gap-3 mb-4">
                    {workflow.icon}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{workflow.title}</h3>
                      <p className="text-sm text-gray-600">{workflow.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {workflow.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className={`w-1.5 h-1.5 bg-${workflow.color}-600 rounded-full`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`bg-${workflow.color}-100 border border-${workflow.color}-200 rounded-lg p-3`}>
                    <p className={`text-sm text-${workflow.color}-800 font-medium`}>
                      💡 {workflow.businessValue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Pro Tips for Maximum Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">📊 Use Sample Data</h3>
                <p className="text-sm text-gray-600">Click "Load Sample Data" to see how each workflow performs with realistic account information.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">🎯 Match Strategy to Situation</h3>
                <p className="text-sm text-gray-600">Use competitive intelligence when prospects are evaluating multiple vendors.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">✏️ Customize Generated Emails</h3>
                <p className="text-sm text-gray-600">Click any email to edit and personalize further before sending.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">📤 Export & Deploy</h3>
                <p className="text-sm text-gray-600">Export campaigns or send directly through Instantly integration.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Get Started with Sample Data
            </button>
            <button
              onClick={onClose}
              className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-all font-medium"
            >
              Explore on My Own
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};