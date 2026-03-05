import { useState } from 'react';
import { Send, User, Mail, MessageSquare, CheckCircle, FileText } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const inputBaseClasses = "w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/5 border rounded-xl text-white placeholder:text-white/30 text-sm sm:text-base transition-all duration-300 focus:outline-none";
  
  const getInputClasses = (fieldName: string) => {
    const isFocused = focusedField === fieldName;
    return `${inputBaseClasses} ${isFocused 
      ? 'border-[var(--bronze)] shadow-[0_0_15px_rgba(176,137,104,0.3)]' 
      : 'border-white/10 hover:border-white/20'
    }`;
  };

  if (isSubmitted) {
    return (
      <RevealOnScroll direction="up" delay={0}>
        <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-green-500" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2">Message Sent!</h3>
          <p className="text-white/60 text-sm sm:text-base">Thank you for reaching out. I&apos;ll get back to you soon.</p>
        </div>
      </RevealOnScroll>
    );
  }

  return (
    <RevealOnScroll direction="up" delay={0}>
      <div className="bg-white/5 rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--bronze)]/20 flex items-center justify-center flex-shrink-0">
            <FileText size={16} className="text-[var(--bronze)]" />
          </div>
          <h3 
            className="text-lg sm:text-xl lg:text-2xl font-normal"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Send a Message
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Name */}
            <div className="relative">
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40">
                <User size={16} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="Your Name"
                className={`${getInputClasses('name')} pl-10 sm:pl-12`}
                required
              />
            </div>
            
            {/* Email */}
            <div className="relative">
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40">
                <Mail size={16} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="Your Email"
                className={`${getInputClasses('email')} pl-10 sm:pl-12`}
                required
              />
            </div>
          </div>
          
          {/* Subject */}
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40">
              <MessageSquare size={16} />
            </div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              placeholder="Subject"
              className={`${getInputClasses('subject')} pl-10 sm:pl-12`}
              required
            />
          </div>
          
          {/* Message */}
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              placeholder="Your Message"
              rows={4}
              className={`${getInputClasses('message')} resize-none`}
              required
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 sm:py-4 bg-[var(--bronze)] hover:bg-[var(--orange-accent)] rounded-xl text-white font-medium text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>
    </RevealOnScroll>
  );
};

export default ContactForm;
