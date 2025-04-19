import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import clothingVideo from '../assets/clothing.mp4';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface ContentSection {
  title: string;
  subtitle: string;
  benefits: Benefit[];
}

interface ContentType {
  home: ContentSection;
  retail: ContentSection;
}

const pageContent: ContentType = {
  home: {
    title: 'Your AI-Powered Thrift Shopping Assistant',
    subtitle: 'Try on thrifted clothes instantly, check quality, and never miss the perfect find.',
    benefits: [
      {
        icon: '📏',
        title: '1-Click Thrift Scan',
        description: 'Point your camera at any item to see how it fits your body - no fitting room needed. AI predicts fit using your personal size data.'
      },
      {
        icon: '🔍',
        title: 'Fabric Detective',
        description: 'Instantly analyze fabric quality and wear. Get a detailed grade (A-F) on item condition before you buy.'
      },
      {
        icon: '👥',
        title: 'Thrift Squad',
        description: 'Shop with friends virtually, share finds, and rotate items monthly with your squad using smart NFC tags.'
      },
      {
        icon: '✂️',
        title: 'Tailor or Trash?',
        description: 'See instant alteration previews and costs. Know exactly how that vintage find could fit you perfectly.'
      }
    ]
  },
  retail: {
    title: 'Transform Your Thrift Store',
    subtitle: 'Boost Sales. Reduce Returns. Build Community.',
    benefits: [
      {
        icon: '📊',
        title: 'Virtual Rack System',
        description: 'Upload inventory via 3D scans, let shoppers browse and reserve items for 24 hours.'
      },
      {
        icon: '💰',
        title: 'Dynamic Pricing AI',
        description: 'Price items fairly and reduce unsold inventory by 20% with our smart pricing algorithm.'
      },
      {
        icon: '🎯',
        title: 'Customer Insights',
        description: 'Track what sells, why it sells, and build a loyal community of regular thrifters.'
      }
    ]
  }
};

const Home = () => {
  const location = useLocation();
  const [activeToggle, setActiveToggle] = useState('home');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Get the active toggle from URL params or localStorage
    const params = new URLSearchParams(location.search);
    const toggle = params.get('view') || localStorage.getItem('activeToggle') || 'home';
    setActiveToggle(toggle);

    if (videoRef.current) {
      // Set initial time to 1 second
      videoRef.current.currentTime = 1;

      // Add timeupdate event listener to handle the 5-second end time
      const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.currentTime >= 5) {
          videoRef.current.currentTime = 1;
        }
      };

      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

      // Cleanup listener on component unmount
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        }
      };
    }
  }, [location]);

  const getHeroContent = (): ContentSection => {
    return activeToggle === 'home' ? pageContent.home : pageContent.retail;
  };

  const currentContent = getHeroContent();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with subtle overlay */}
        <div className="absolute inset-0 bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
            style={{
              objectPosition: 'center',
              transform: 'scale(1.2)',
              transformOrigin: 'center center'
            }}
          >
            <source src={clothingVideo} type="video/mp4" />
          </video>
          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Try Before You Thrift,{' '}
            <br />
            Right From Your Phone
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-12 font-display"
          >
            Turn any thrift store into your fitting room with AI-powered <span className="hidden md:inline"><br /></span>
            try-on, quality checks, and price comparisons.
          </motion.p>
          
          {/* Waitlist Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              to="/waitlist" 
              className="inline-block border-2 border-white/30 text-white px-8 py-3 rounded-full text-base font-medium 
              transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
            >
              <span className="relative z-10">Join the Waitlist</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/60 to-orange-500/60 opacity-0 
                group-hover:opacity-80 transition-opacity duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hide other sections but preserve them */}
      <div className="hidden">
        {/* Promise Statement Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-purple-50 to-white text-obsidian relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Left Column */}
              <div>
                <motion.p 
                  className="text-sm text-purple-600/60 mb-6 font-mono tracking-widest"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  (02) THE FUTURE OF STYLE
                </motion.p>
                <motion.h2 
                  className="text-4xl md:text-5xl font-display font-bold leading-tight mb-8 bg-gradient-to-r from-obsidian to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Say goodbye to<br />"I have nothing to wear"
                </motion.h2>
              </div>
              
              {/* Right Column */}
              <div className="flex items-center">
                <motion.p 
                  className="text-xl md:text-2xl text-obsidian/80 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Tired of staring at a full closet with nothing to wear? The Vault app transforms your wardrobe into a digital collection, instantly showing you all possible outfit combinations. With body-accurate virtual try-on and AI-powered style recommendations, you'll save time, reduce returns, and always know exactly what to wear.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-obsidian via-[#1A1A1A] to-[#2D1B3B] text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <motion.p 
                className="text-sm text-purple-300/60 mb-4 font-mono tracking-widest"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                (03) KEY FEATURES
              </motion.p>
              <motion.h2 
                className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                AI-powered innovation
              </motion.h2>
            </div>
              
            <div className="flex flex-col justify-center">
              <motion.p 
                className="text-sm text-purple-300/60 mb-6 font-mono tracking-widest text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                REVOLUTIONARY MOBILE APP
              </motion.p>
                
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-lg text-white/80 leading-relaxed text-center">
                  The Vault app integrates cutting-edge AI technology to transform your daily styling experience. Our advanced computer vision system provides real-time outfit recommendations, virtual try-ons, and intelligent wardrobe management. Experience the future of personal styling, powered by artificial intelligence.
                </p>

                {/* Metrics Section */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <motion.div 
                    className="bg-gradient-to-br from-white/5 to-purple-900/20 backdrop-blur-sm p-6 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl font-bold text-purple-300 mb-2">50%+</div>
                    <p className="text-white/80 text-sm">Reduction in returns with body-accurate virtual try-on</p>
                  </motion.div>
                  <motion.div 
                    className="bg-gradient-to-br from-white/5 to-purple-900/20 backdrop-blur-sm p-6 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl font-bold text-purple-300 mb-2">15+ min</div>
                    <p className="text-white/80 text-sm">Saved daily on outfit decisions</p>
                  </motion.div>
                </div>
                  
                <div className="grid grid-cols-2 gap-6 mt-8">
                  {currentContent.benefits.map((benefit: Benefit, index: number) => (
                    <motion.div 
                      key={index}
                      className="bg-gradient-to-br from-white/5 to-purple-900/20 backdrop-blur-sm p-6 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-1 pixel-corner"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                      <p className="text-white/60 text-sm">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tech Specs Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-purple-50 to-white text-obsidian" id="tech-specs">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.p 
                className="text-sm text-purple-600/60 mb-4 font-mono tracking-widest"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                (04) TECHNICAL SPECIFICATIONS
              </motion.p>
              <motion.h2 
                className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-obsidian to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Built for performance
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Mobile App Features */}
              <motion.div
                className="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm p-8 rounded-lg border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg hover:shadow-purple-200/20 hover:-translate-y-1 pixel-border"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-display font-bold text-obsidian mb-6">Mobile App Features</h3>
                <ul className="space-y-4 text-obsidian/80">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">01.</span>
                    <span>Clothing Scanner with ARKit/ARCore</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">02.</span>
                    <span>Virtual Try-On with Body Scanning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">03.</span>
                    <span>Store Integration with Partner Brands</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">04.</span>
                    <span>AI-Powered Style Recommendations</span>
                  </li>
                </ul>
              </motion.div>

              {/* AI Technology */}
              <motion.div
                className="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm p-8 rounded-lg border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg hover:shadow-purple-200/20 hover:-translate-y-1 pixel-border"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-display font-bold text-obsidian mb-6">AI Technology</h3>
                <ul className="space-y-4 text-obsidian/80">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">01.</span>
                    <span>CLIP + SAM for Image Recognition</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">02.</span>
                    <span>MediaPipe for Body Tracking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">03.</span>
                    <span>ONNX Runtime for Edge Processing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">04.</span>
                    <span>TensorFlow Graphics for 3D Rendering</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Join Waitlist Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-obsidian via-[#2D1B3B] to-[#1A1A1A] text-white" id="waitlist">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              className="text-sm text-purple-300/60 mb-4 font-mono tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              (05) JOIN THE MOVEMENT
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl font-display font-bold mb-8 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Experience the future<br />of personal styling
            </motion.h2>
            <motion.p
              className="text-lg text-white/80 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Be among the first to revolutionize your wardrobe with AI-powered styling.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/waitlist" className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-12 py-4 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 font-semibold hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/0 after:via-white/50 after:to-white/0 after:opacity-0 hover:after:opacity-100 after:transition-opacity overflow-hidden">
                Join Waitlist
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 