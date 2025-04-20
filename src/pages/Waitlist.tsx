import { motion } from 'framer-motion';
import { useState } from 'react';

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(180deg, #A17BFF 0%, #6C4EE6 40%, #4C3398 90%)'
          }}
        />

        {/* Success Message */}
        <div className="relative z-10 w-full">
          <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-lg border border-[#f9ff81]/20 max-w-md w-full text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-[#f9ff81]/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-[#f9ff81] mb-4">Welcome to the Future!</h2>
              <p className="text-[#f9ff81]/80">
                Thanks for joining our waitlist. We'll keep you updated on our launch and early access opportunities.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, #A17BFF 0%, #6C4EE6 40%, #4C3398 90%)'
        }}
      />

      {/* Content container with proper scrolling */}
      <div className="relative z-10 w-full">
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl w-full space-y-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#f9ff81] mb-4">
                  Join the Waitlist
              </h2>
              <p className="text-lg md:text-xl text-[#f9ff81]/90 mb-8 font-display">
                Be the first to experience the future of thrift shopping
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-5 py-3 bg-white/10 border border-[#f9ff81]/20 rounded-lg text-[#f9ff81] text-base 
                    placeholder-[#f9ff81]/60 focus:outline-none focus:ring-2 focus:ring-[#f9ff81]/50 focus:border-transparent backdrop-blur-sm"
                />
                {error && (
                  <p className="mt-2 text-red-400 text-sm">{error}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full border-2 border-[#f9ff81]/30 text-[#f9ff81] px-7 py-3 rounded-lg text-base
                  transition-all duration-300 relative overflow-hidden group ${
                  isSubmitting 
                    ? 'opacity-75 cursor-not-allowed'
                    : 'hover:-translate-y-1'
                  }`}
              >
                <span className="relative z-10">{isSubmitting ? 'Joining...' : 'Join Now'}</span>
                <div className={`absolute inset-0 bg-gradient-to-r from-[#f9ff81]/20 to-[#f9ff81]/30 opacity-0 
                  ${isSubmitting ? '' : 'group-hover:opacity-80'} transition-opacity duration-300`} />
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;