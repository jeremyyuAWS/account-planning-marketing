import React from 'react';
import { User, Building, Target, FileText } from 'lucide-react';

interface InputFormProps {
  formData: {
    customerName: string;
    contactName: string;
    designation: string;
    context: string;
    goal: string;
  };
  onInputChange: (field: string, value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  designations: string[];
}

export const InputForm: React.FC<InputFormProps> = ({
  formData,
  onInputChange,
  onGenerate,
  isGenerating,
  designations
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Building className="w-5 h-5 text-blue-600" />
          Account & Contact Information
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Enter details about the account and primary contact for personalized email generation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Name *
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => onInputChange('customerName', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g., Acme Corp"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={formData.contactName}
              onChange={(e) => onInputChange('contactName', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g., Sarah Thompson"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Designation *
        </label>
        <select
          value={formData.designation}
          onChange={(e) => onInputChange('designation', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="">Select designation...</option>
          {designations.map((designation) => (
            <option key={designation} value={designation}>
              {designation}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Context & Background
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            value={formData.context}
            onChange={(e) => onInputChange('context', e.target.value)}
            rows={3}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="What do we know about this account? Recent developments, initiatives, challenges..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Campaign Goal
        </label>
        <div className="relative">
          <Target className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            value={formData.goal}
            onChange={(e) => onInputChange('goal', e.target.value)}
            rows={2}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="What specific outcome are we trying to achieve with this email sequence?"
          />
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating || !formData.customerName || !formData.contactName || !formData.designation}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating Email Sequence...
          </>
        ) : (
          "Generate Email Sequence"
        )}
      </button>
    </div>
  );
};