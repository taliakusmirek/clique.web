import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
    title: 'Wear the Future. <br /> <span class="text-ai-purple/80">The Vault Mirror</span>',
    subtitle: 'For those who dare to redefine style.',
    benefits: [
      {
        icon: '✨',
        title: 'Smart Organization',
        description: 'AI-powered wardrobe management that learns your style and keeps your clothes perfectly organized.'
      },
      {
        icon: '🎯',
        title: 'Perfect Outfits',
        description: 'Get personalized outfit recommendations based on your style, occasion, and weather.'
      },
      {
        icon: '🔄',
        title: 'Virtual Try-On',
        description: 'See how clothes will look on you before you buy with our advanced AR technology.'
      },
      {
        icon: '🤖',
        title: 'AI Stylist',
        description: 'Your personal AI fashion advisor available 24/7, learning and evolving with your style preferences.'
      }
    ]
  },
  retail: {
    title: 'Transform Your <br /> <span class="text-ai-purple/80">Retail Experience.</span>',
    subtitle: 'Engage. Convert. Grow. Scale.',
    benefits: [
      {
        icon: '📊',
        title: 'Data Insights',
        description: 'Get real-time analytics on customer preferences and shopping behavior.'
      },
      {
        icon: '🎯',
        title: 'Smart Inventory',
        description: 'AI-powered inventory management that predicts trends and optimizes stock levels.'
      },
      {
        icon: '🌟',
        title: 'Customer Experience',
        description: 'Provide personalized shopping experiences with virtual try-on and style recommendations.'
      }
    ]
  }
};

const Home = () => {
  const location = useLocation();
  const [activeToggle, setActiveToggle] = useState('home');

  useEffect(() => {
    // Get the active toggle from URL params or localStorage
    const params = new URLSearchParams(location.search);
    const toggle = params.get('view') || localStorage.getItem('activeToggle') || 'home';
    setActiveToggle(toggle);
  }, [location]);

  const getFloatingIcons = () => {
    if (activeToggle === 'retail') {
      return [
        { 
          id: 1, 
          name: 'Store', 
          icon: '🏪'
        },
        { 
          id: 2, 
          name: 'Shopping', 
          icon: '🛍️'
        },
        { 
          id: 3, 
          name: 'Analytics', 
          icon: '📊'
        },
        { 
          id: 4, 
          name: 'Growth', 
          icon: '📈'
        },
        { 
          id: 5, 
          name: 'Mobile', 
          icon: '📱'
        },
        { 
          id: 6, 
          name: 'Success', 
          icon: '🎯'
        }
      ];
    }

    return [
      { 
        id: 1, 
        name: 'T-Shirt', 
        icon: '👕'
      },
      { 
        id: 2, 
        name: 'Jeans', 
        icon: '👖'
      },
      { 
        id: 3, 
        name: 'Jacket', 
        icon: '🧥'
      },
      { 
        id: 4, 
        name: 'Shoes', 
        icon: '👟'
      },
      { 
        id: 5, 
        name: 'Dress', 
        icon: '👗'
      },
      { 
        id: 6, 
        name: 'Suit', 
        icon: '🤵'
      }
    ];
  };

  const getHeroContent = (): ContentSection => {
    return activeToggle === 'home' ? pageContent.home : pageContent.retail;
  };

  const currentContent = getHeroContent();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/landing.png" 
            alt="Fashion Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#66909E]/20 to-[#344B53]/40" />
        </div>

        {/* Center Text */}
        <div className="relative z-30 text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl font-bold text-white tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Style has evolved.
          </motion.h1>
          <motion.div
            className="mt-4 text-xl sm:text-2xl text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform Your Wardrobe with AI
          </motion.div>
        </div>

        {/* Corner Elements */}
        <div className="absolute top-32 left-8 text-white/80 text-sm">
          Innovate
        </div>
        <div className="absolute top-32 right-8 text-white/80 text-sm">
          Elevate
        </div>
        
        {/* Binary Code */}
        <div className="absolute top-[40%] left-8 text-white/60 text-2xl font-mono">
          (01)
        </div>
        <div className="absolute top-[40%] right-8 text-white/60 text-xl font-mono">
          0101110001
        </div>

        {/* Bottom Taglines */}
        <div className="absolute bottom-32 left-8 text-white/80 text-sm max-w-[200px]">
          Where AI meets your wardrobe
        </div>
        <div className="absolute bottom-32 right-8 text-white/80 text-sm text-right max-w-[200px]">
          The future of personal styling
        </div>
      </section>

      {/* Promise Statement Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white text-obsidian relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column */}
            <div>
              <motion.p 
                className="text-sm text-obsidian/60 mb-6 font-mono tracking-widest"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                (02) THE FUTURE OF STYLE
              </motion.p>
              <motion.h2 
                className="text-4xl md:text-5xl font-display font-bold leading-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Not just a mirror.<br />An AI stylist.<br />Your future self.
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
                Where artificial intelligence meets personal style. The Vault Mirror transforms your daily routine into a curated fashion experience, powered by advanced AI that learns and evolves with you.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-obsidian text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p 
              className="text-sm text-white/60 mb-4 font-mono tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              (03) KEY FEATURES
            </motion.p>
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              AI-powered innovation
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column - Image */}
            <div className="relative overflow-hidden rounded-lg h-[600px]">
              <img 
                src="/chatgpt.png" 
                alt="Vault Mirror Technology" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#66909E]/20 to-[#344B53]/40" />
              
              {/* Overlay Text */}
              <div className="absolute bottom-8 left-8">
                <motion.h2 
                  className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  AI-powered.<br />
                  Style redefined.
                </motion.h2>
              </div>


            </div>
            
            {/* Right Column - Tech Features */}
            <div className="flex flex-col justify-center">
              <motion.p 
                className="text-sm text-white/60 mb-6 font-mono tracking-widest"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                REVOLUTIONARY SMART MIRROR
              </motion.p>
              
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-lg text-white/80 leading-relaxed">
                  The Vault Mirror integrates cutting-edge AI technology to transform your daily styling experience. Our advanced computer vision system provides real-time outfit recommendations, virtual try-ons, and intelligent wardrobe management. Experience the future of personal styling, powered by artificial intelligence.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mt-8">
                  {currentContent.benefits.map((benefit: Benefit, index: number) => (
                    <motion.div 
                      key={index}
                      className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/5 hover:-translate-y-1 pixel-corner"
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
        </div>
      </section>

      {/* Tech Specs Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white text-obsidian" id="tech-specs">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p 
              className="text-sm text-obsidian/60 mb-4 font-mono tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              (04) TECHNICAL SPECIFICATIONS
            </motion.p>
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Built for performance
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Hardware Specs */}
            <motion.div
              className="bg-obsidian/5 backdrop-blur-sm p-8 rounded-lg border border-obsidian/10 hover:border-obsidian/20 transition-all duration-300 hover:shadow-lg hover:shadow-obsidian/5 hover:-translate-y-1 pixel-border"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-display font-bold text-obsidian mb-6">Mirror Hardware</h3>
              <ul className="space-y-4 text-obsidian/80">
                <li className="flex items-start">
                  <span className="text-ai-purple mr-3">01.</span>
                  <span>4K Anti-glare Display with True Color</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ai-purple mr-3">02.</span>
                  <span>Depth-sensing Camera Array</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ai-purple mr-3">03.</span>
                  <span>Ambient Light Sensors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ai-purple mr-3">04.</span>
                  <span>Gesture Recognition System</span>
                </li>
              </ul>
            </motion.div>

            {/* Software Specs */}
            <motion.div
              className="bg-obsidian/5 backdrop-blur-sm p-8 rounded-lg border border-obsidian/10 hover:border-obsidian/20 transition-all duration-300 hover:shadow-lg hover:shadow-obsidian/5 hover:-translate-y-1 pixel-border"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-display font-bold text-obsidian mb-6">AI Features</h3>
              <ul className="space-y-4 text-obsidian/80">
                <li className="flex items-start">
                  <span className="text-ai-purple mr-3">01.</span>
                  <span>Real-time Style Analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ai-purple mr-3">02.</span>
                  <span>Personalized Outfit Generation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ai-purple mr-3">03.</span>
                  <span>Virtual Wardrobe Management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ai-purple mr-3">04.</span>
                  <span>Smart Shopping Integration</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Waitlist Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-obsidian text-white" id="waitlist">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            className="text-sm text-white/60 mb-4 font-mono tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            (05) JOIN THE MOVEMENT
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold mb-8"
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
            <Link to="/waitlist" className="bg-white text-obsidian px-12 py-4 rounded-lg hover:bg-white/90 transition-all duration-300 font-semibold hover:shadow-lg hover:shadow-white/20 hover:-translate-y-1 relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/0 after:via-white/50 after:to-white/0 after:opacity-0 hover:after:opacity-100 after:transition-opacity overflow-hidden">
              Join Waitlist
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 