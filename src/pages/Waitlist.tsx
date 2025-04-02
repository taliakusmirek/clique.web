import { motion } from 'framer-motion';
import { useState } from 'react';

const Waitlist = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    preferredBrands: [] as string[],
    stylePreferences: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const brands = [
    'Nike', 'Zara', 'H&M', 'Gucci', 'Adidas', 'Uniqlo', 'Levi\'s'
  ];

  const styles = [
    'Casual', 'Formal', 'Streetwear', 'Athletic', 'Business', 'Bohemian'
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleBrand = (brand: string) => {
    setFormData(prev => ({
      ...prev,
      preferredBrands: prev.preferredBrands.includes(brand)
        ? prev.preferredBrands.filter(b => b !== brand)
        : [...prev.preferredBrands, brand]
    }));
  };

  const toggleStyle = (style: string) => {
    setFormData(prev => ({
      ...prev,
      stylePreferences: prev.stylePreferences.includes(style)
        ? prev.stylePreferences.filter(s => s !== style)
        : [...prev.stylePreferences, style]
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-obsidian via-ai-purple-dark/20 to-obsidian">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-obsidian/30 p-8 rounded-lg border border-ai-purple/20"
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-ai-purple/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">✨</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to the Future!</h2>
            <p className="text-cool-gray">
              Thanks for joining our waitlist. We'll keep you updated on our launch and early access opportunities.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-obsidian via-ai-purple-dark/20 to-obsidian">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Future of Fashion
          </h1>
          <p className="text-xl text-cool-gray">
            Be among the first to experience Vault's revolutionary smart wardrobe technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-obsidian/30 p-6 rounded-lg border border-ai-purple/20 hover:shadow-[0_0_15px_rgba(160,32,240,0.2)] transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-ai-purple/20 text-ai-purple mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Sign Up</h3>
            <p className="text-cool-gray">
              Fill out our quick form to reserve your spot in line.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-obsidian/30 p-6 rounded-lg border border-ai-purple/20 hover:shadow-[0_0_15px_rgba(160,32,240,0.2)] transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-ai-purple/20 text-ai-purple mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Stay Updated</h3>
            <p className="text-cool-gray">
              Receive exclusive updates about our launch and early access opportunities.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-obsidian/30 p-6 rounded-lg border border-ai-purple/20 hover:shadow-[0_0_15px_rgba(160,32,240,0.2)] transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-ai-purple/20 text-ai-purple mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Get Priority</h3>
            <p className="text-cool-gray">
              Early subscribers get priority access and special launch pricing.
            </p>
          </motion.div>
        </div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-obsidian/30 p-8 rounded-lg border border-ai-purple/20"
        >
          <form
            onSubmit={handleSubmit}
            name="waitlist"
            method="POST"
            data-netlify="true"
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="waitlist" />
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-cool-gray mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-obsidian/50 border border-ai-purple/20 rounded-lg text-white placeholder-cool-gray/50 focus:outline-none focus:border-ai-purple/50 focus:ring-1 focus:ring-ai-purple/50"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cool-gray mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-obsidian/50 border border-ai-purple/20 rounded-lg text-white placeholder-cool-gray/50 focus:outline-none focus:border-ai-purple/50 focus:ring-1 focus:ring-ai-purple/50"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-cool-gray mb-2">
                I'm interested in Vault for
              </label>
              <select
                id="type"
                name="type"
                required
                className="w-full px-4 py-3 bg-obsidian/50 border border-ai-purple/20 rounded-lg text-white focus:outline-none focus:border-ai-purple/50 focus:ring-1 focus:ring-ai-purple/50"
              >
                <option value="home">Personal Use (Home)</option>
                <option value="retail">Business Use (Retail)</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn-primary py-4 text-lg font-semibold ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Waitlist; 