import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Globe,
  HardDrive,
  LifeBuoy,
  Lock,
  Mail,
  MapPin,
  Menu,
  Phone,
  RefreshCw,
  Search,
  Server,
  Shield,
  Sparkles,
  Star,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useCheckDomain, useSignUpNewsletter } from "./hooks/useQueries";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Fast NVMe SSD Storage",
    desc: "Blazing-fast NVMe SSD drives delivering up to 10x faster load times than traditional hosting.",
  },
  {
    icon: Lock,
    title: "Free SSL Certificate",
    desc: "Every hosting plan includes a free wildcard SSL certificate with automatic renewal.",
  },
  {
    icon: RefreshCw,
    title: "Daily Backups",
    desc: "Automated daily backups with one-click restore, so your data is always safe and recoverable.",
  },
  {
    icon: LifeBuoy,
    title: "24/7 Live Support",
    desc: "Our expert support team is available around the clock via live chat, email, and phone.",
  },
  {
    icon: Globe,
    title: "Free Domain Name",
    desc: "Get a free domain for the first year with any annual hosting plan. 200+ TLD options.",
  },
  {
    icon: Server,
    title: "Easy Migration",
    desc: "Move your existing website to HostPro for free with our assisted migration service.",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$2.99",
    period: "/mo",
    tagline: "Perfect for personal sites",
    features: [
      "1 Website",
      "10 GB NVMe SSD",
      "Free SSL Certificate",
      "Weekly Backups",
      "Email Accounts",
    ],
    popular: false,
    color: "border-hero",
  },
  {
    name: "Business",
    price: "$5.99",
    period: "/mo",
    tagline: "Best for growing businesses",
    features: [
      "100 Websites",
      "200 GB NVMe SSD",
      "Free Domain Name",
      "Daily Backups",
      "Priority Support",
      "Free CDN",
    ],
    popular: true,
    color: "border-violet",
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/mo",
    tagline: "For power users & agencies",
    features: [
      "Unlimited Websites",
      "Unlimited NVMe SSD",
      "Free Domain Name",
      "Daily Backups",
      "Priority Support",
      "Dedicated IP",
    ],
    popular: false,
    color: "border-hero",
  },
];

const TESTIMONIALS = [
  {
    initials: "SM",
    name: "Sarah Mitchell",
    role: "E-commerce Founder",
    text: "HostPro completely transformed our online store. Page load times dropped by 60% and our conversion rate jumped immediately. The support team is outstanding.",
    stars: 5,
  },
  {
    initials: "JR",
    name: "James Rodriguez",
    role: "Full-Stack Developer",
    text: "I've hosted 30+ client sites on HostPro. The uptime is genuinely rock-solid, the control panel is intuitive, and migrations are painless. It's my go-to recommendation.",
    stars: 5,
  },
  {
    initials: "AL",
    name: "Amara Lee",
    role: "Digital Marketing Agency",
    text: "Switched from a well-known competitor and haven't looked back. The speed improvements alone justify the cost. Our clients notice the difference immediately.",
    stars: 5,
  },
];

const FAQS = [
  {
    q: "What is web hosting?",
    a: "Web hosting is a service that stores your website's files on servers connected to the internet, making your site accessible to visitors worldwide. When someone types your domain, their browser connects to our servers and loads your website.",
  },
  {
    q: "How do I get started?",
    a: "Getting started is simple: choose a plan, register or transfer your domain, and set up your website using our one-click installer or website builder. Our onboarding wizard walks you through every step — most customers are live within 30 minutes.",
  },
  {
    q: "Can I transfer my existing website?",
    a: "Yes! We offer free website migration for all new customers. Our expert team handles the entire process — files, databases, emails — with zero downtime. Just submit a migration request after signup and we'll take care of the rest.",
  },
  {
    q: "Do you offer a money-back guarantee?",
    a: "Absolutely. All plans come with a 30-day money-back guarantee. If you're not completely satisfied within the first 30 days, contact our support team for a full refund — no questions asked.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, Google Pay, Apple Pay, and cryptocurrency (Bitcoin, Ethereum). All payments are processed securely with 256-bit encryption.",
  },
];

const STATS = [
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "2M+", label: "Happy Customers" },
  { value: "150+", label: "Countries Served" },
  { value: "24/7", label: "Expert Support" },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, i) => i + 1).map((star) => (
        <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [domainQuery, setDomainQuery] = useState("");
  const [domainResult, setDomainResult] = useState<{
    domain: string;
    available: boolean;
  } | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const checkDomain = useCheckDomain();
  const signUpNewsletter = useSignUpNewsletter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDomainSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainQuery.trim()) return;
    setDomainResult(null);
    try {
      const result = await checkDomain.mutateAsync(
        domainQuery.trim().toLowerCase(),
      );
      setDomainResult(result);
    } catch {
      toast.error("Could not check domain. Please try again.");
    }
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    try {
      await signUpNewsletter.mutateAsync(newsletterEmail);
      setNewsletterStatus("success");
      setNewsletterEmail("");
    } catch {
      setNewsletterStatus("error");
    }
  };

  return (
    <div className="min-h-screen font-body">
      <Toaster />

      {/* ===== STICKY NAV ===== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-nav border-b border-white/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/generated/hostpro-logo-transparent.dim_300x80.png"
              alt="HostPro"
              className="h-9 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid={`nav.link.${i + 1}`}
                className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              data-ocid="nav.primary_button"
              className="gradient-violet text-white border-0 hover:opacity-90 font-semibold glow-violet-sm transition-all duration-200"
            >
              Get Started
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-nav border-t border-white/10"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    data-ocid={`nav.link.${i + 1}`}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  data-ocid="nav.primary_button"
                  className="gradient-violet text-white border-0 mt-2"
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col justify-center bg-hero overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/assets/generated/hero-datacenter.dim_1200x700.jpg')`,
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-hero/95 via-hero/80 to-hero/98" />
        {/* Mesh gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-violet/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-violet/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-accent/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 container mx-auto max-w-5xl px-4 pt-24 pb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Badge className="bg-violet/20 text-violet-light border border-violet/30 px-4 py-1.5 text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Trusted by 2 Million+ websites worldwide
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-center text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
          >
            Host Your Website
            <span className="block gradient-text mt-1">with Confidence</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-lg sm:text-xl text-white/65 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Lightning-fast NVMe SSD hosting with 99.9% uptime, free SSL, and
            24/7 expert support. Launch your website today starting at just
            $2.99/month.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          >
            <Button
              size="lg"
              data-ocid="hero.primary_button"
              className="gradient-violet text-white border-0 glow-violet text-base font-semibold px-8 py-6 h-auto hover:opacity-90 transition-opacity"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-ocid="hero.secondary_button"
              className="border-white/30 text-white bg-white/10 hover:bg-white/20 text-base px-8 py-6 h-auto transition-all"
            >
              View Plans
            </Button>
          </motion.div>

          {/* Domain Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-card border border-white/15 rounded-2xl p-6">
              <p className="text-white/60 text-sm font-medium mb-3 text-center uppercase tracking-wider">
                Check Domain Availability
              </p>
              <form onSubmit={handleDomainSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    data-ocid="domain.search_input"
                    value={domainQuery}
                    onChange={(e) => {
                      setDomainQuery(e.target.value);
                      setDomainResult(null);
                    }}
                    placeholder="yourdomain.com"
                    className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-violet/60 focus:ring-violet/30 h-11"
                  />
                </div>
                <Button
                  type="submit"
                  data-ocid="domain.submit_button"
                  disabled={checkDomain.isPending || !domainQuery.trim()}
                  className="gradient-violet text-white border-0 h-11 px-6 font-semibold hover:opacity-90 shrink-0"
                >
                  {checkDomain.isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Checking
                    </span>
                  ) : (
                    "Search"
                  )}
                </Button>
              </form>

              {/* Domain Result */}
              <AnimatePresence mode="wait">
                {domainResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3"
                  >
                    {domainResult.available ? (
                      <div
                        data-ocid="domain.success_state"
                        className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 rounded-lg px-4 py-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span className="text-emerald-300 font-medium">
                          <strong className="text-white">
                            {domainResult.domain}
                          </strong>{" "}
                          is available!
                        </span>
                        <Button
                          size="sm"
                          className="ml-auto bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
                        >
                          Register Now
                        </Button>
                      </div>
                    ) : (
                      <div
                        data-ocid="domain.error_state"
                        className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 rounded-lg px-4 py-3"
                      >
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                        <span className="text-red-300 font-medium">
                          <strong className="text-white">
                            {domainResult.domain}
                          </strong>{" "}
                          is already taken
                        </span>
                        <Button
                          size="sm"
                          className="ml-auto bg-white/10 hover:bg-white/20 text-white/70 border border-white/20"
                        >
                          Try Another
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-hero border-y border-white/10">
        <div className="container mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-3 py-1">
              Why HostPro
            </Badge>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground mb-4">
              Everything you need to
              <span className="text-violet block">succeed online</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Premium infrastructure, enterprise-grade security, and tools that
              scale with your ambitions.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-violet/40 hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl gradient-violet flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200">
                  <feat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feat.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="py-24 bg-hero relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet/10 blur-3xl rounded-full" />
        </div>
        <div className="relative container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-violet/20 text-violet-light border-violet/30 mb-4 px-3 py-1">
              Simple Pricing
            </Badge>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">
              Plans that fit
              <span className="gradient-text"> every budget</span>
            </h2>
            <p className="text-white/55 text-lg max-w-xl mx-auto">
              All plans include free migration, 99.9% uptime SLA, and 30-day
              money-back guarantee.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PRICING.map((plan, i) => (
              <motion.div
                key={plan.name}
                data-ocid={`pricing.item.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`relative rounded-2xl border p-7 ${
                  plan.popular
                    ? "border-violet/60 bg-hero-card glow-violet scale-105"
                    : "border-hero bg-hero-card/50"
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="gradient-violet text-white border-0 px-4 py-1 text-xs font-bold shadow-lg">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-white/45 text-sm">{plan.tagline}</p>
                </div>

                <div className="flex items-end gap-1 mb-6">
                  <span className="font-display text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-white/45 mb-1 text-sm">
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-white/70 text-sm"
                    >
                      <Check className="w-4 h-4 text-violet-light shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  data-ocid={`pricing.button.${i + 1}`}
                  className={`w-full font-semibold ${
                    plan.popular
                      ? "gradient-violet text-white border-0 glow-violet-sm hover:opacity-90"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                >
                  Choose {plan.name}
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/35 text-sm mt-10"
          >
            All prices shown in USD. Billed annually. 30-day money-back
            guarantee on all plans.
          </motion.p>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="py-24 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-3 py-1">
              Customer Stories
            </Badge>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground mb-4">
              Loved by
              <span className="text-violet"> 2 million+ customers</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Real experiences from real businesses. See why customers choose
              HostPro.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-violet/30 hover:shadow-card-hover transition-all duration-300"
              >
                <StarRating count={t.stars} />
                <p className="text-muted-foreground text-sm leading-relaxed mt-4 mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-violet flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {t.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-24 bg-secondary/30">
        <div className="container mx-auto max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-3 py-1">
              FAQs
            </Badge>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground mb-4">
              Common questions,
              <span className="text-violet block"> answered</span>
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <AccordionItem
                  data-ocid={`faq.item.${i + 1}`}
                  value={`faq-${i}`}
                  className="border border-border bg-card rounded-xl px-2 mb-0"
                >
                  <AccordionTrigger className="font-semibold text-foreground hover:no-underline py-5 px-3 text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed px-3 pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-20 bg-hero relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet/15 blur-3xl rounded-full" />
          <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-accent/10 blur-3xl rounded-full" />
        </div>
        <div className="relative container mx-auto max-w-2xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 rounded-2xl gradient-violet flex items-center justify-center mx-auto mb-6 glow-violet-sm">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              Stay in the loop
            </h2>
            <p className="text-white/55 text-lg mb-8">
              Get exclusive deals, hosting tips, and product updates delivered
              to your inbox.
            </p>

            <AnimatePresence mode="wait">
              {newsletterStatus === "success" ? (
                <motion.div
                  key="success"
                  data-ocid="newsletter.success_state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-5"
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">
                    You're subscribed! Check your inbox for a welcome message.
                  </span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleNewsletter}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Input
                    data-ocid="newsletter.input"
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      setNewsletterStatus("idle");
                    }}
                    placeholder="Enter your email address"
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-violet/60 h-12"
                  />
                  <Button
                    type="submit"
                    data-ocid="newsletter.submit_button"
                    disabled={signUpNewsletter.isPending}
                    className="gradient-violet text-white border-0 h-12 px-7 font-semibold hover:opacity-90 shrink-0"
                  >
                    {signUpNewsletter.isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Subscribing
                      </span>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            {newsletterStatus === "error" && (
              <p
                data-ocid="newsletter.error_state"
                className="text-red-400 text-sm mt-3 text-center"
              >
                Something went wrong. Please try again.
              </p>
            )}

            <p className="text-white/30 text-xs mt-4">
              No spam, ever. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-hero border-t border-white/10 pt-16 pb-8">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <img
                src="/assets/generated/hostpro-logo-transparent.dim_300x80.png"
                alt="HostPro"
                className="h-9 w-auto object-contain mb-4"
              />
              <p className="text-white/45 text-sm leading-relaxed max-w-xs">
                Premium web hosting built for performance, security, and
                reliability. Powering 2M+ websites worldwide.
              </p>
              <div className="flex gap-3 mt-5">
                <div className="w-8 h-8 rounded-lg bg-white/10 hover:bg-violet/30 flex items-center justify-center cursor-pointer transition-colors">
                  <Globe className="w-4 h-4 text-white/60" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/10 hover:bg-violet/30 flex items-center justify-center cursor-pointer transition-colors">
                  <Mail className="w-4 h-4 text-white/60" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/10 hover:bg-violet/30 flex items-center justify-center cursor-pointer transition-colors">
                  <Phone className="w-4 h-4 text-white/60" />
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Products
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Web Hosting",
                  "VPS Hosting",
                  "Cloud Hosting",
                  "Dedicated Servers",
                  "Domain Names",
                  "SSL Certificates",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="/"
                      className="text-white/45 text-sm hover:text-white/80 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-2.5">
                {[
                  "About Us",
                  "Blog",
                  "Careers",
                  "Press",
                  "Partners",
                  "Affiliate Program",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="/"
                      className="text-white/45 text-sm hover:text-white/80 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Support
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Help Center",
                  "Live Chat",
                  "System Status",
                  "Migration Help",
                  "Community Forum",
                  "Contact Us",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="/"
                      className="text-white/45 text-sm hover:text-white/80 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} HostPro. All rights reserved.
            </p>
            <p className="text-white/25 text-sm">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-light/60 hover:text-violet-light transition-colors"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex gap-5">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <a
                    key={item}
                    href="/"
                    className="text-white/30 text-xs hover:text-white/60 transition-colors"
                  >
                    {item}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
