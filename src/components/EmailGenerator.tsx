import React from 'react';
import simulatedData from '../data/simulated-data.json';

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

export class EmailGenerator {
  static generateEmails(formData: FormData, variant: string = 'default'): EmailData[] {
    const emails: EmailData[] = [];

    // Extract industry from context or default to "business"
    const industry = this.extractIndustry(formData.context) || "business";

    // Use competitive templates for competitive variant
    if (variant === 'competitive') {
      return this.generateCompetitiveEmails(formData, industry);
    }

    // Use default templates for other variants
    const templates = simulatedData.emailTemplates.default;

    for (let i = 1; i <= 4; i++) {
      const templateKey = `email${i}` as keyof typeof templates;
      const template = templates[templateKey];
      
      let subject = this.personalizeText(template.subject, formData, industry, variant);
      let body = this.personalizeText(template.body, formData, industry, variant);

      // Apply variant-specific modifications
      if (variant === 'persona-sensitive') {
        ({ subject, body } = this.applyPersonaModifications(subject, body, formData.designation, i));
      } else if (variant === 'conversational') {
        ({ subject, body } = this.applyToneModifications(subject, body, 'conversational'));
      } else if (variant === 'formal') {
        ({ subject, body } = this.applyToneModifications(subject, body, 'formal'));
      }

      emails.push({ subject, body });
    }

    return emails;
  }

  private static generateCompetitiveEmails(formData: FormData, industry: string): EmailData[] {
    const templates = simulatedData.emailTemplates.competitive;
    const emails: EmailData[] = [];
    
    // Get competitive intelligence
    const competitiveData = simulatedData.competitiveIntelligence;
    const primaryCompetitor = competitiveData.primaryCompetitors[0]; // Use first competitor as primary
    
    for (let i = 1; i <= 4; i++) {
      const templateKey = `email${i}` as keyof typeof templates;
      const template = templates[templateKey];
      
      let subject = this.personalizeCompetitiveText(template.subject, formData, industry, primaryCompetitor);
      let body = this.personalizeCompetitiveText(template.body, formData, industry, primaryCompetitor);

      // Add specific competitive intelligence based on email sequence
      if (i === 1) {
        // First email: Focus on direct comparison
        body = body.replace('[Competitor]', primaryCompetitor.name);
      } else if (i === 2) {
        // Second email: Add case studies and proof points
        body = body.replace('[Competitor]', primaryCompetitor.name);
      } else if (i === 3) {
        // Third email: Market intelligence and urgency
        body = body.replace('[Competitor]', primaryCompetitor.name);
        const marketTrend = competitiveData.marketTrends[0];
        body = body.replace('83% of {industry} companies', marketTrend);
      } else if (i === 4) {
        // Fourth email: Final urgency with specific risks
        body = body.replace('[Competitor]', primaryCompetitor.name);
        body = body.replace('6-9 month implementations', primaryCompetitor.implementationTime);
      }

      emails.push({ subject, body });
    }

    return emails;
  }

  private static personalizeText(text: string, formData: FormData, industry: string, variant: string): string {
    return text
      .replace(/{customerName}/g, formData.customerName)
      .replace(/{contactName}/g, formData.contactName)
      .replace(/{designation}/g, formData.designation)
      .replace(/{context}/g, formData.context)
      .replace(/{goal}/g, formData.goal)
      .replace(/{industry}/g, industry);
  }

  private static personalizeCompetitiveText(text: string, formData: FormData, industry: string, competitor: any): string {
    return text
      .replace(/{customerName}/g, formData.customerName)
      .replace(/{contactName}/g, formData.contactName)
      .replace(/{designation}/g, formData.designation)
      .replace(/{context}/g, formData.context)
      .replace(/{goal}/g, formData.goal)
      .replace(/{industry}/g, industry)
      .replace(/\[Competitor\]/g, competitor.name);
  }

  private static extractIndustry(context: string): string {
    const industryKeywords = {
      'fintech': ['financial', 'banking', 'payment', 'fintech'],
      'healthcare': ['healthcare', 'medical', 'hospital', 'patient'],
      'retail': ['retail', 'e-commerce', 'shopping', 'consumer'],
      'technology': ['tech', 'software', 'platform', 'digital', 'analytics', 'data'],
      'manufacturing': ['manufacturing', 'production', 'industrial'],
      'education': ['education', 'learning', 'academic', 'university'],
    };

    const lowerContext = context.toLowerCase();
    
    for (const [industry, keywords] of Object.entries(industryKeywords)) {
      if (keywords.some(keyword => lowerContext.includes(keyword))) {
        return industry;
      }
    }
    
    return 'technology';
  }

  private static applyPersonaModifications(subject: string, body: string, designation: string, emailIndex: number) {
    const isExecutive = ['CEO', 'CTO', 'VP of Product', 'VP of Engineering', 'VP of Sales', 'CMO', 'VP of Marketing'].includes(designation);
    const isTechnical = ['CTO', 'VP of Engineering', 'Engineering Manager', 'Director of Analytics'].includes(designation);
    const isMarketing = ['Head of Marketing', 'VP of Marketing', 'CMO'].includes(designation);

    if (isExecutive) {
      subject = subject.replace(/Quick/, 'Strategic').replace(/Show you/, 'Present to your team');
      body = body.replace(/15-minute call/, '30-minute strategic discussion');
    }

    if (isTechnical && emailIndex === 1) {
      body = body.replace(/Our AI platform/, 'Our enterprise-grade AI infrastructure');
      body += "\n\nTechnical highlights:\n• API-first architecture\n• 99.9% uptime SLA\n• SOC 2 Type II compliant";
    }

    if (isMarketing) {
      body = body.replace(/operational efficiency/, 'marketing ROI and customer acquisition');
    }

    return { subject, body };
  }

  private static applyToneModifications(subject: string, body: string, tone: 'conversational' | 'formal') {
    if (tone === 'conversational') {
      subject = subject.replace(/Helping/, 'Quick question about').replace(/Re:/, 'Hey,');
      body = body
        .replace(/Hi ([^,]+),/, 'Hey $1!')
        .replace(/Best regards,/, 'Cheers,')
        .replace(/Would it make sense/, 'Want to')
        .replace(/I hope you've had a chance/, 'Hope you got a chance');
    } else if (tone === 'formal') {
      body = body
        .replace(/Hi ([^,]+),/, 'Dear $1,')
        .replace(/Cheers,/, 'Sincerely,')
        .replace(/Want to/, 'I would be pleased to')
        .replace(/Hope you got/, 'I trust you have had the opportunity to');
    }

    return { subject, body };
  }

  // Legacy method kept for compatibility - now routes to generateCompetitiveEmails
  private static applyCompetitiveModifications(subject: string, body: string, emailIndex: number) {
    // This method is now deprecated in favor of the full competitive email templates
    return { subject, body };
  }
}