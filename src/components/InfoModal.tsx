import React from 'react';
import { X, Target, Users, MessageSquare, Zap } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: string;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, variant }) => {
  if (!isOpen) return null;

  const getModalContent = () => {
    switch (variant) {
      case 'default':
        return {
          title: "Default Email Sequence",
          icon: <Target className="w-6 h-6 text-blue-600" />,
          description: "Generate a balanced 4-email sequence optimized for general B2B outreach.",
          features: [
            "Warm introduction with pain point alignment",
            "Value proposition with ROI calculations", 
            "Social proof through case studies",
            "Compelling call-to-action with urgency"
          ],
          businessValue: "Ideal for most sales scenarios, providing a proven framework that converts prospects into meetings."
        };
      case 'persona-sensitive':
        return {
          title: "Persona-Sensitive Flow",
          icon: <Users className="w-6 h-6 text-purple-600" />,
          description: "Adapts messaging based on the contact's role and seniority level.",
          features: [
            "Executive-focused strategic messaging",
            "Technical depth for engineering roles",
            "ROI emphasis for marketing leaders",
            "Tailored call-to-action by persona"
          ],
          businessValue: "Increases engagement rates by 35% through role-specific personalization."
        };
      case 'conversational':
        return {
          title: "Conversational Tone",
          icon: <MessageSquare className="w-6 h-6 text-green-600" />,
          description: "Friendly, approachable messaging that builds rapport quickly.",
          features: [
            "Casual, friendly language style",
            "Shorter, more digestible messages",
            "Emphasis on relationship building",
            "Lower-pressure call-to-actions"
          ],
          businessValue: "Perfect for relationship-focused sales where trust-building is crucial."
        };
      case 'competitive':
        return {
          title: "Competitive Intelligence Flow",
          icon: <Zap className="w-6 h-6 text-orange-600" />,
          description: "Leverage competitive intelligence to create urgency and drive faster decision-making.",
          features: [
            "Direct competitor comparison messaging",
            "Risk mitigation and failure case studies",
            "Market positioning and trend analysis",
            "Urgency through competitive deadlines",
            "Differentiation-focused value propositions",
            "Time-sensitive offers and guarantees"
          ],
          businessValue: "Ideal when prospects are actively evaluating competitors - accelerates sales cycles by 40% through strategic urgency and clear differentiation."
        };
      default:
        return {
          title: "Email Sequence Generator",
          icon: <Target className="w-6 h-6 text-blue-600" />,
          description: "Generate personalized email sequences for your ABM campaigns.",
          features: [],
          businessValue: ""
        };
    }
  };

  const content = getModalContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {content.icon}
              <h2 className="text-xl font-semibold text-gray-900">{content.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">{content.description}</p>

          {content.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Key Features</h3>
              <ul className="space-y-2">
                {content.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {content.businessValue && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-orange-900 mb-2 uppercase tracking-wide">Business Value</h3>
              <p className="text-sm text-orange-800">{content.businessValue}</p>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full mt-6 bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};