import React, { useState } from 'react';
import { Copy, Edit3, Send, Check, ExternalLink } from 'lucide-react';

interface EmailData {
  subject: string;
  body: string;
}

interface EmailDisplayProps {
  emails: EmailData[];
  onEmailEdit: (index: number, field: 'subject' | 'body', value: string) => void;
}

export const EmailDisplay: React.FC<EmailDisplayProps> = ({ emails, onEmailEdit }) => {
  const [copiedEmail, setCopiedEmail] = useState<number | null>(null);
  const [editingEmail, setEditingEmail] = useState<{ index: number; field: 'subject' | 'body' } | null>(null);

  const copyToClipboard = async (text: string, emailIndex: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEmail(emailIndex);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleEdit = (index: number, field: 'subject' | 'body') => {
    setEditingEmail({ index, field });
  };

  const handleSaveEdit = (index: number, field: 'subject' | 'body', value: string) => {
    onEmailEdit(index, field, value);
    setEditingEmail(null);
  };

  if (emails.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate</h3>
        <p className="text-gray-600">
          Fill out the form and click "Generate Email Sequence" to create your personalized 4-email campaign.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Generated Email Sequence</h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-all text-sm font-medium">
              <ExternalLink className="w-4 h-4" />
              Send via Instantly
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all text-sm font-medium">
              <ExternalLink className="w-4 h-4" />
              Export to Jazon
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {emails.map((email, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Email {index + 1} - {getEmailType(index)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(index, 'subject')}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all"
                    title="Edit email"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => copyToClipboard(`Subject: ${email.subject}\n\n${email.body}`, index)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all"
                    title="Copy email"
                  >
                    {copiedEmail === index ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Subject</label>
                  {editingEmail?.index === index && editingEmail?.field === 'subject' ? (
                    <input
                      type="text"
                      defaultValue={email.subject}
                      onBlur={(e) => handleSaveEdit(index, 'subject', e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSaveEdit(index, 'subject', e.currentTarget.value);
                        }
                      }}
                      className="w-full mt-1 px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      autoFocus
                    />
                  ) : (
                    <p
                      className="mt-1 text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => handleEdit(index, 'subject')}
                    >
                      {email.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Body</label>
                  {editingEmail?.index === index && editingEmail?.field === 'body' ? (
                    <textarea
                      defaultValue={email.body}
                      onBlur={(e) => handleSaveEdit(index, 'body', e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          setEditingEmail(null);
                        }
                      }}
                      rows={8}
                      className="w-full mt-1 px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                      autoFocus
                    />
                  ) : (
                    <div
                      className="mt-1 text-sm text-gray-700 whitespace-pre-wrap cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                      onClick={() => handleEdit(index, 'body')}
                    >
                      {email.body}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                <span>Click to edit • {getEmailTiming(index)}</span>
                <button
                  onClick={() => copyToClipboard(`Subject: ${email.subject}\n\n${email.body}`, index)}
                  className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                >
                  {copiedEmail === index ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getEmailType = (index: number): string => {
  const types = ['Initial Outreach', 'Value Proposition', 'Social Proof', 'Final CTA'];
  return types[index] || 'Follow-up';
};

const getEmailTiming = (index: number): string => {
  const timings = ['Send immediately', 'Wait 3 days', 'Wait 5 days', 'Wait 7 days'];
  return timings[index] || 'Custom timing';
};