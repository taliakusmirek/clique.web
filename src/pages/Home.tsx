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
    title: 'Your AI Wardrobe Mirror <br /> <span class="text-ai-purple/80">is here.</span>',
    subtitle: 'Store. Style. Share. Shop.',
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

  const icons = getFloatingIcons();

  const getHeroContent = (): ContentSection => {
    return activeToggle === 'home' ? pageContent.home : pageContent.retail;
  };

  const currentContent = getHeroContent();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-ai-purple-dark/30 to-ai-purple-dark/50 z-10" />
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-b from-obsidian via-ai-purple-dark/20 to-ai-purple-dark/40" />
          {/* Mirror reflection effect */}
          <div className="w-full h-full bg-mirror-reflection animate-pulse" />
        </div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0 z-20">
          {icons.map((item, index) => {
            // Calculate positions in a circle around the header
            const radius = 35; // Radius for circle
            const angle = (index * (360 / icons.length)) * (Math.PI / 180);
            const x = 50 + Math.cos(angle) * radius; // 50% is center
            const y = 50 + Math.sin(angle) * radius; // Center vertically
            
            return (
              <motion.div
                key={item.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  zIndex: 40
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.3,
                  rotate: 0,
                  filter: 'drop-shadow(0 0 10px rgba(160,32,240,0.5))'
                }}
              >
                <div className="text-6xl select-none">
                  {item.icon}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="relative z-30 text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8"
            dangerouslySetInnerHTML={{ __html: currentContent.title }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.p
            className="text-xl sm:text-2xl text-cool-gray mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {currentContent.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <Link to="/waitlist" className="btn-primary text-lg animate-glow">
              Join the Future
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-ai-purple-dark/30 to-obsidian">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="section-title text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose Vault?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {currentContent.benefits.map((benefit: Benefit, index: number) => (
              <motion.div 
                key={index}
                className="bg-obsidian/50 p-6 rounded-lg border border-ai-purple/20 hover:shadow-[0_0_15px_rgba(160,32,240,0.3)] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-ai-purple/20 rounded-full flex items-center justify-center mb-4">
                  <div className="text-ai-purple text-2xl">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-cool-gray">{benefit.description}</p>
                <motion.button 
                  className="mt-4 text-ai-purple hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  View Demo →
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Specs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-obsidian via-ai-purple-dark/20 to-ai-purple-dark/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="section-title text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Technical Specifications
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Hardware Specs */}
            <motion.div
              className="bg-obsidian/50 p-8 rounded-lg border border-ai-purple/20 hover:shadow-[0_0_15px_rgba(160,32,240,0.2)]"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Hardware</h3>
              <ul className="space-y-4 text-cool-gray">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>4K Ultra HD Display with Anti-Glare Coating</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced Depth-Sensing Cameras</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Built-in LED Lighting System</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Motion and Gesture Sensors</span>
                </li>
              </ul>
            </motion.div>

            {/* Software Features */}
            <motion.div
              className="bg-obsidian/50 p-8 rounded-lg border border-ai-purple/20 hover:shadow-[0_0_15px_rgba(160,32,240,0.2)]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Software</h3>
              <ul className="space-y-4 text-cool-gray">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Real-time Body Measurements</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>AI-Powered Style Recommendations</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Virtual Try-On Technology</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Cloud-Based Wardrobe Management</span>
                </li>
              </ul>
            </motion.div>

            {/* Integration Features */}
            <motion.div
              className="bg-obsidian/50 p-8 rounded-lg border border-ai-purple/20 hover:shadow-[0_0_15px_rgba(160,32,240,0.2)]"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Integrations</h3>
              <ul className="space-y-4 text-cool-gray">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>E-commerce Platform Connectivity</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Social Media Sharing</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Calendar and Event Sync</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Weather Integration</span>
                </li>
              </ul>
            </motion.div>

            {/* Security Features */}
            <motion.div
              className="bg-obsidian/50 p-8 rounded-lg border border-ai-purple/20 hover:shadow-[0_0_15px_rgba(160,32,240,0.2)]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Security</h3>
              <ul className="space-y-4 text-cool-gray">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>End-to-End Encryption</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Biometric Authentication</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Privacy Controls</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-ai-purple mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Regular Security Updates</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Waitlist Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-ai-purple-dark/30 to-obsidian">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Style Experience?
          </motion.h2>
          <motion.p
            className="text-xl text-cool-gray mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join our waitlist to be among the first to experience the future of fashion.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/waitlist" className="btn-primary text-lg px-12 py-4 animate-glow">
              Join the Waitlist
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 