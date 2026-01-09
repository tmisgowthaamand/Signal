import React, { useState, useRef, Component, ErrorInfo, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidBackground } from "@/components/ui/LiquidBackground";

// Error boundary component for the form
class FormErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Form Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 border border-border bg-background text-center">
          <p className="text-foreground headline-card">Something went wrong.</p>
          <p className="text-muted-foreground mt-4">Please refresh the page and try again.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const relevantAreas = [
  "Brand Strategy & Positioning",
  "Visual Identity System",
  "Website Design & Development",
  "Digital Creatives & Content",
  "SEO Foundations",
];

const budgetRanges = [
  "Mid five figures",
  "High five figures",
  "Six figures",
  "Not defined yet",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  }
};

const Proposal = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    challenge: "",
    areas: [] as string[],
    budget: "",
    decisionMakers: "",
    successDefinition: "",
    website: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleAreaToggle = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      areas: prev.areas.includes(area)
        ? prev.areas.filter((a) => a !== area)
        : [...prev.areas, area],
    }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.company.trim()) errors.company = 'Company is required';
    if (!formData.challenge.trim()) errors.challenge = 'Please describe your challenge';
    if (formData.areas.length === 0) errors.areas = 'Please select at least one area';
    if (!formData.budget) errors.budget = 'Please select a budget range';
    if (!formData.decisionMakers.trim()) errors.decisionMakers = 'Please specify decision makers';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) {
      setIsSubmitted(true);
      return;
    }

    if (!validateForm()) {
      const firstError = Object.keys(formErrors)[0];
      if (firstError) {
        document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <section className="section-padding bg-section-primary min-h-[80vh] flex items-center">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl"
          >
            <span className="caption text-muted-foreground uppercase tracking-widest">
              Inquiry Received
            </span>
            <h1 className="headline-hero mt-6">
              Thank you.
            </h1>
            <p className="body-large text-muted-foreground mt-8 leading-relaxed">
              We've received your inquiry and will review it carefully. If there's alignment, we'll be in touch within 3–5 business days.
            </p>
            <p className="body-base text-muted-foreground mt-6 italic">
              Strategy before scale.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pb-24"
    >
      {/* Hero */}
      <section className="section-padding bg-section-primary relative overflow-hidden">
        <LiquidBackground variant="inquiry" />
        <div className="container-editorial">
          <div className="max-w-4xl">
            <motion.span variants={itemVariants} className="caption text-muted-foreground uppercase tracking-widest">
              Inquiry
            </motion.span>
            <motion.h1 variants={itemVariants} className="headline-hero mt-6">
              Start a conversation.
            </motion.h1>
            <motion.p variants={itemVariants} className="body-large text-muted-foreground mt-8 leading-relaxed">
              We take on a limited number of engagements each quarter. This form helps us understand whether there's potential alignment.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding-sm border-t border-border">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <FormErrorBoundary>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-16"
                noValidate
              >
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }}>
                  <input
                    type="text"
                    tabIndex={-1}
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <motion.div variants={itemVariants} className="space-y-12">
                  <div className="group">
                    <label className="block caption text-muted-foreground mb-3 uppercase tracking-widest transition-colors group-focus-within:text-foreground">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-border px-0 py-4 body-large focus:outline-none focus:border-foreground transition-all duration-500 placeholder:text-foreground/40"
                      placeholder="Type your name here..."
                    />
                    {formErrors.name && <p className="mt-2 text-sm text-error">{formErrors.name}</p>}
                  </div>

                  <div className="group">
                    <label className="block caption text-muted-foreground mb-3 uppercase tracking-widest transition-colors group-focus-within:text-foreground">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-border px-0 py-4 body-large focus:outline-none focus:border-foreground transition-all duration-500 placeholder:text-foreground/40"
                      placeholder="email@example.com"
                    />
                    {formErrors.email && <p className="mt-2 text-sm text-error">{formErrors.email}</p>}
                  </div>

                  <div className="group">
                    <label className="block caption text-muted-foreground mb-3 uppercase tracking-widest transition-colors group-focus-within:text-foreground">
                      Company or Brand *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-transparent border-b border-border px-0 py-4 body-large focus:outline-none focus:border-foreground transition-all duration-500 placeholder:text-foreground/40"
                      placeholder="Company Name"
                    />
                    {formErrors.company && <p className="mt-2 text-sm text-error">{formErrors.company}</p>}
                  </div>

                  <div className="group">
                    <label className="block caption text-muted-foreground mb-3 uppercase tracking-widest">
                      What is your challenge? *
                    </label>
                    <textarea
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      rows={5}
                      className="w-full bg-background border-2 border-border px-6 py-6 body-base text-foreground focus:outline-none focus:border-foreground transition-all duration-500 resize-none rounded-sm placeholder:text-foreground/40"
                      placeholder="Tell us about the problem you are solving..."
                    />
                    {formErrors.challenge && <p className="mt-2 text-sm text-error">{formErrors.challenge}</p>}
                  </div>

                  <div className="group">
                    <label className="block caption text-muted-foreground mb-8 uppercase tracking-widest text-center">
                      Relevant Areas *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {relevantAreas.map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => handleAreaToggle(area)}
                          className={`px-6 py-4 border text-center transition-all duration-500 rounded-sm ${formData.areas.includes(area)
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground bg-foreground/[0.02]"
                            }`}
                        >
                          <span className="body-small uppercase tracking-wider">{area}</span>
                        </button>
                      ))}
                    </div>
                    {formErrors.areas && <p className="mt-4 text-sm text-error text-center">{formErrors.areas}</p>}
                  </div>

                  <div className="pt-12 text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-block body-small uppercase tracking-[0.2em] font-black border-2 border-foreground px-16 py-6 hover:bg-foreground hover:text-background transition-all duration-500 disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Submit Inquiry"}
                    </button>
                    <p className="body-small text-muted-foreground mt-8 italic">
                      We review every submission personally within 3-5 days.
                    </p>
                  </div>
                </motion.div>
              </form>
            </FormErrorBoundary>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Proposal;
