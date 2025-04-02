import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const Gallery = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const moods = [
    'Boardroom', 'Date Night', 'Casual', 'Formal', 'Streetwear', 'Athletic'
  ];

  const brands = [
    'Nike', 'Zara', 'H&M', 'Gucci', 'Adidas', 'Uniqlo', 'Levi\'s'
  ];

  // Mock data for outfits
  const outfits = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/400/600?random=${i}`,
    title: `Outfit ${i + 1}`,
    mood: moods[Math.floor(Math.random() * moods.length)],
    brand: brands[Math.floor(Math.random() * brands.length)],
    likes: Math.floor(Math.random() * 1000),
    price: Math.floor(Math.random() * 500) + 50
  }));

  const filteredOutfits = outfits.filter(outfit => {
    if (selectedMood && outfit.mood !== selectedMood) return false;
    if (selectedBrand && outfit.brand !== selectedBrand) return false;
    return true;
  });

  // Infinite scroll effect
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      if (scrollLeft + clientWidth >= scrollWidth - 100) {
        // Load more outfits when reaching the end
        // This would typically involve fetching more data from an API
        console.log('Load more outfits');
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="section-title text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Style Gallery
        </motion.h1>

        <motion.p 
          className="section-subtitle text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore curated looks and get inspired
        </motion.p>

        {/* Filters */}
        <div className="mt-12 space-y-6">
          {/* Mood Filters */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Style Moods</h3>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <motion.button
                  key={mood}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${selectedMood === mood 
                      ? 'bg-soft-lavender text-obsidian' 
                      : 'bg-obsidian/50 text-cool-gray hover:text-white'}`}
                  onClick={() => setSelectedMood(selectedMood === mood ? null : mood)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {mood}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Brand Filters */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Featured Brands</h3>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <motion.button
                  key={brand}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${selectedBrand === brand 
                      ? 'bg-ai-cyan text-obsidian' 
                      : 'bg-obsidian/50 text-cool-gray hover:text-white'}`}
                  onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {brand}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Infinite Scroll Outfit Gallery */}
        <div 
          ref={scrollContainerRef}
          className="mt-12 overflow-x-auto scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex space-x-8 pb-8">
            {filteredOutfits.map((outfit, index) => (
              <motion.div
                key={outfit.id}
                className="flex-none w-[300px] bg-obsidian/50 rounded-lg overflow-hidden border border-ai-cyan/20 hover:shadow-mirror transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative aspect-[2/3]">
                  <img
                    src={outfit.image}
                    alt={outfit.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold">{outfit.title}</h3>
                      <p className="text-cool-gray text-sm">{outfit.mood}</p>
                      <p className="text-ai-cyan font-medium">${outfit.price}</p>
                      <div className="flex items-center mt-2">
                        <svg className="w-5 h-5 text-ai-cyan" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        <span className="ml-1 text-cool-gray">{outfit.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery; 