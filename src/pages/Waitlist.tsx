import { motion } from 'framer-motion';
import waitlistVideo from '../assets/boldred.mp4';
import { useState, useRef, useEffect } from 'react';

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 9;

      const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.currentTime >= 12) {
          videoRef.current.currentTime = 9;
        }
      };

      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        }
      };
    }
  }, []);

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

  const VideoBackground = () => (
    <div className="absolute inset-0 bg-obsidian">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      >
        <source src={waitlistVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative">
        <VideoBackground />

        {/* Success Message */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-lg border border-white/20 max-w-md w-full text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-purple-500/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">✨</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-4">Welcome to the Future!</h2>
            <p className="text-white/80">
              Thanks for joining our waitlist. We'll keep you updated on our launch and early access opportunities.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <VideoBackground />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Join the Waitlist
            </h2>
            <p className="text-xl text-white/90 mb-8 font-display">
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
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              />
              {error && (
                <p className="mt-2 text-red-400 text-sm">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-red-400 to-orange-500 text-white px-8 py-4 rounded-lg transition-all duration-300 font-semibold relative overflow-hidden ${
                isSubmitting 
                  ? 'opacity-75 cursor-not-allowed'
                  : 'hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-1 after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/0 after:via-white/50 after:to-white/0 after:opacity-0 hover:after:opacity-100 after:transition-opacity'
              }`}
            >
              {isSubmitting ? 'Joining...' : 'Join Now'}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Waitlist; 