import { useState, useRef, Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { motion, AnimatePresence, useScroll, useTransform, Variants } from "framer-motion";
import { RunningText } from "@/components/ui/RunningText";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { MorphingInput } from "@/components/ui/MorphingInput";

// Error boundary component for the form
class FormErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  declare state: { hasError: boolean };

  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: unknown) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Form Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-card p-8 text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl mb-4"
          >
            ⚠️
          </motion.div>
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const Proposal = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
    setFormData((prev: typeof formData) => ({
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  // Success State
  if (isSubmitted) {
    return (
      <section className="section-padding bg-section-primary min-h-[80vh] flex items-center relative overflow-hidden">
        <LiquidBackground variant="inquiry" />

        <div className="container-editorial relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Success Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center"
            >
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-4xl"
              >
                ✓
              </motion.span>
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/[0.03] mb-6"
            >
              <span className="caption text-muted-foreground">Inquiry Received</span>
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="headline-hero mb-8"
            >
              Thank you<span className="text-rose-500">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="body-large text-muted-foreground leading-relaxed mb-6"
            >
              We've received your inquiry and will review it carefully. If there's alignment, we'll be in touch within
              <span className="text-foreground font-medium"> 3–5 business days</span>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="body-base text-muted-foreground italic"
            >
              Strategy before scale.
            </motion.p>
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
      {/* Hero - Rose/Pink Theme */}
      <section ref={heroRef} className="section-padding bg-section-primary relative overflow-hidden min-h-[70vh] flex items-center">
        <LiquidBackground variant="inquiry" />

        {/* Decorative Elements */}
        <motion.div
          style={{ y, opacity }}
          className="absolute top-[20%] right-[10%] w-32 h-32 rounded-full border border-rose-500/15 hidden lg:block"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]), opacity }}
          className="absolute bottom-[25%] right-[15%] w-24 h-24 rounded-full bg-gradient-to-br from-rose-500/15 to-pink-500/10 blur-2xl hidden lg:block"
        />

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-32 right-8 hidden lg:block z-20"
        >
          <motion.div
            whileHover={{ scale: 1.05, x: -5 }}
            className="glass-card px-4 py-2 flex items-center gap-2 text-xs"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-muted-foreground">Limited Availability</span>
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 top-24 md:top-28 z-10">
          <RunningText text="START A CONVERSATION — INQUIRY" className="opacity-50" />
        </div>

        <div className="container-editorial relative z-20 will-change-transform">
          <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]), opacity }} className="max-w-4xl">
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/[0.03] backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 animate-pulse" />
                <span className="caption text-muted-foreground">Inquiry</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="headline-hero">
              <span className="block">Start a</span>
              <span className="block mt-2">
                <span className="relative inline-block">
                  conversation
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                    className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 origin-left"
                  />
                </span>
                <span className="text-foreground/30">.</span>
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="body-large text-muted-foreground mt-10 max-w-2xl leading-relaxed">
              We take on a{" "}
              <span className="text-foreground font-medium">limited number of engagements</span>{" "}
              each quarter. This form helps us understand whether there's potential alignment.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding-sm border-t border-border">
        <div className="container-editorial">
          <div className="max-w-2xl mx-auto">
            <FormErrorBoundary>
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-12"
                noValidate
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Honeypot */}
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }}>
                  <input
                    type="text"
                    tabIndex={-1}
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                {/* Form Header */}
                <div className="text-center pb-8 border-b border-border">
                  <span className="inline-block px-4 py-2 rounded-full border border-border bg-foreground/[0.02] mb-4">
                    <span className="caption text-muted-foreground">Project Details</span>
                  </span>
                  <p className="body-base text-muted-foreground">
                    Tell us about your project and goals
                  </p>
                </div>

                {/* Personal Info */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <MorphingInput
                    label="Your Name *"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={formErrors.name}
                    placeholder="Type your name here..."
                  />

                  <MorphingInput
                    label="Email Address *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={formErrors.email}
                    placeholder="email@example.com"
                  />

                  <MorphingInput
                    label="Company or Brand *"
                    name="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    error={formErrors.company}
                    placeholder="Company Name"
                  />
                </motion.div>

                {/* Challenge */}
                <motion.div variants={itemVariants} className="group relative pt-4">
                  <label className="block caption text-muted-foreground mb-4 uppercase tracking-widest transition-colors group-focus-within:text-foreground">
                    What is your challenge? *
                  </label>
                  <div className="relative">
                    <textarea
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      rows={5}
                      className="w-full glass-card px-6 py-6 body-base text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/30 transition-all duration-500 resize-none placeholder:text-foreground/20"
                      placeholder="Tell us about the problem you are solving..."
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-rose-500 to-pink-500"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: formData.challenge ? 1 : 0 }}
                      style={{ transformOrigin: "left" }}
                    />
                  </div>
                  {formErrors.challenge && <p className="mt-2 text-xs text-red-500">{formErrors.challenge}</p>}
                </motion.div>

                {/* Relevant Areas */}
                <motion.div variants={itemVariants} className="group">
                  <label className="block caption text-muted-foreground mb-8 uppercase tracking-widest text-center">
                    Relevant Areas *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relevantAreas.map((area, i) => (
                      <motion.button
                        key={area}
                        type="button"
                        onClick={() => handleAreaToggle(area)}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative px-6 py-4 text-center transition-all duration-500 rounded-xl overflow-hidden ${formData.areas.includes(area)
                          ? "bg-foreground text-background shadow-lg"
                          : "glass-card hover:border-foreground/20"
                          }`}
                      >
                        {formData.areas.includes(area) && (
                          <motion.div
                            layoutId="selectedArea"
                            className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500"
                            style={{ zIndex: -1 }}
                          />
                        )}
                        <span className="relative z-10 body-small uppercase tracking-wider">{area}</span>
                      </motion.button>
                    ))}
                  </div>
                  {formErrors.areas && <p className="mt-4 text-sm text-red-500 text-center">{formErrors.areas}</p>}
                </motion.div>

                {/* Submit */}
                <motion.div variants={itemVariants} className="pt-8 text-center">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center gap-3 bg-foreground text-background px-16 py-6 rounded-full overflow-hidden transition-all duration-500 disabled:opacity-50 hover:shadow-2xl hover:shadow-rose-500/20"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                    <span className="relative z-10 body-small uppercase tracking-[0.2em] font-bold">
                      {isSubmitting ? (
                        <span className="flex items-center gap-3">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                          />
                          Sending...
                        </span>
                      ) : (
                        "Submit Inquiry"
                      )}
                    </span>
                    {!isSubmitting && (
                      <motion.span
                        className="relative z-10"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    )}
                  </motion.button>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="body-small text-muted-foreground mt-8 italic"
                  >
                    We review every submission personally within 3-5 days.
                  </motion.p>
                </motion.div>
              </motion.form>
            </FormErrorBoundary>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Proposal;
