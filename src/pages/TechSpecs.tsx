import { motion } from 'framer-motion';
import { useState } from 'react';

const TechSpecs = () => {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'hardware',
      title: 'Hardware Specs',
      color: 'text-holographic',
      items: [
        {
          title: 'Display',
          spec: '43" 4K OLED Display',
          description: 'Crystal clear resolution for perfect outfit visualization'
        },
        {
          title: 'Processor',
          spec: 'NVIDIA Jetson AGX Orin',
          description: 'Edge computing powerhouse for real-time cloth simulation'
        },
        {
          title: 'Sensors',
          spec: 'Intel RealSense D455',
          description: 'Advanced depth sensing for precise body measurements'
        }
      ]
    },
    {
      id: 'ai',
      title: 'AI Features',
      color: 'text-ai-cyan',
      items: [
        {
          title: 'Cloth Physics',
          spec: 'NVIDIA Omniverse',
          description: 'Real-time fabric simulation with accurate drape and movement'
        },
        {
          title: 'Body Scanning',
          spec: '98% Accuracy',
          description: 'Precise measurements for perfect fit recommendations'
        },
        {
          title: 'Style AI',
          spec: 'Personalized Recommendations',
          description: 'AI-powered outfit suggestions based on your preferences'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      color: 'text-soft-lavender',
      items: [
        {
          title: 'Data Encryption',
          spec: 'End-to-End',
          description: 'Your measurements and preferences are always secure'
        },
        {
          title: 'Privacy Shield',
          spec: 'Automatic Activation',
          description: 'Instant privacy mode when not in use'
        },
        {
          title: 'Data Control',
          spec: 'Full Ownership',
          description: 'Complete control over your data and sharing preferences'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="section-title text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Technical Specifications
        </motion.h1>

        <motion.p 
          className="section-subtitle text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover how Vault transforms your wardrobe experience
        </motion.p>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((category) => (
            <motion.div
              key={category.id}
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-2xl font-bold ${category.color}`}>
                {category.title}
              </h2>
              
              <div className="space-y-6">
                {category.items.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="bg-obsidian/50 p-6 rounded-lg border border-ai-cyan/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    onHoverStart={() => setHoveredFeature(item.title)}
                    onHoverEnd={() => setHoveredFeature(null)}
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-ai-cyan font-medium mb-2">
                      {item.spec}
                    </p>
                    <p className="text-cool-gray">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Diagram */}
        <motion.div 
          className="mt-20 relative h-[400px] bg-obsidian/50 rounded-lg border border-ai-cyan/20 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-cool-gray text-center">
              <p className="text-lg mb-4">Your Digital Closet Experience</p>
              <p className="text-sm">Explore how Vault organizes and enhances your wardrobe</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TechSpecs; 