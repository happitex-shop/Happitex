import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get('/api/products'),
          axios.get('/api/categories')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory || p.category?._id === selectedCategory) 
    : products;

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero Section */}
      <div className="w-full px-2 sm:px-4 lg:px-8 mt-2 sm:mt-4 mb-8 sm:mb-10 mx-auto max-w-[1600px]">
        <div className="flex flex-col lg:flex-row shadow-xl bg-white border border-gray-200 overflow-hidden rounded-xl">
          
          {/* Banner Slider */}
          <div className="w-full lg:flex-[3] relative h-[250px] sm:h-[380px] md:h-[460px] lg:h-[550px] min-h-[250px] bg-cream overflow-hidden shrink-0"
               style={{ 
                 backgroundImage: "url('/assets/BackGround_HS.png')", 
                 backgroundSize: 'cover', 
                 backgroundPosition: 'center',
               }}>
             
             {/* Slide 1 */}
             <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
               <div className="absolute left-[2%] sm:left-[3%] lg:left-[4%] top-0 bottom-0 flex items-start justify-start gap-1 sm:gap-1.5 lg:gap-2.5 w-[56%] sm:w-[58%] lg:w-[60%] h-full pt-2 sm:pt-4">
                 
                 {/* Left Image */}
                 <div className="flex-1 h-[74%] sm:h-[76%] lg:h-[78%] mt-[16%] sm:mt-[18%] lg:mt-[20%] relative" style={{ filter: 'drop-shadow(2px 3px 6px rgba(0,0,0,0.35))' }}>
                    <div className="w-full h-full bg-black relative" style={{ clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)' }}>
                        <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] bottom-[1.5px]" style={{ clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)' }}>
                            <img src="/assets/HS1_p1.jpg" className="w-full h-full object-cover" alt="Saree 1" />
                        </div>
                    </div>
                 </div>
                 
                 {/* Middle Image */}
                 <div className="flex-1 h-[74%] sm:h-[76%] lg:h-[78%] mt-[8%] sm:mt-[9%] lg:mt-[10%] relative" style={{ filter: 'drop-shadow(2px 3px 6px rgba(0,0,0,0.35))' }}>
                    <div className="w-full h-full bg-black relative" style={{ clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)' }}>
                        <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] bottom-[1.5px]" style={{ clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)' }}>
                            <img src="/assets/HS1_p2.jpg" className="w-full h-full object-cover" alt="Saree 2" />
                        </div>
                    </div>
                 </div>
                 
                 {/* Right Image */}
                 <div className="flex-1 h-[74%] sm:h-[76%] lg:h-[78%] mt-[0%] relative" style={{ filter: 'drop-shadow(2px 3px 6px rgba(0,0,0,0.35))' }}>
                    <div className="w-full h-full bg-black relative" style={{ clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)' }}>
                        <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] bottom-[1.5px]" style={{ clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)' }}>
                            <img src="/assets/HS1_p3.jpg" className="w-full h-full object-cover" alt="Saree 3" />
                        </div>
                    </div>
                 </div>
               </div>
               
               <div className="absolute left-[62%] sm:left-[64%] lg:left-[66%] right-[2%] sm:right-[3%] lg:right-[4%] top-0 bottom-0 flex flex-col justify-center items-start text-left z-20">
                 <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[6.5rem] font-great-vibes text-black mb-1 sm:mb-2 lg:mb-4 leading-none tracking-normal">Happitex</h1>
                 <p className="text-[11px] sm:text-base md:text-xl lg:text-3xl font-poppins text-black font-bold leading-tight">বিশ্বস্ত অনলাইন</p>
                 <p className="text-[11px] sm:text-base md:text-xl lg:text-3xl font-poppins text-black font-bold leading-tight mt-0.5 sm:mt-1">গিফট শপ</p>
               </div>
             </div>

             {/* Slide 2 */}
             <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
               <div className="absolute left-[2%] sm:left-[3%] lg:left-[4%] top-0 bottom-0 flex items-start justify-start gap-1 sm:gap-1.5 lg:gap-2.5 w-[56%] sm:w-[58%] lg:w-[60%] h-full pt-2 sm:pt-4">
                 
                 {/* Left Image */}
                 <div className="flex-1 h-[74%] sm:h-[76%] lg:h-[78%] mt-[16%] sm:mt-[18%] lg:mt-[20%] relative" style={{ filter: 'drop-shadow(2px 3px 6px rgba(0,0,0,0.35))' }}>
                    <div className="w-full h-full bg-black relative" style={{ clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)' }}>
                        <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] bottom-[1.5px]" style={{ clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)' }}>
                            <img src="/assets/HS2_p1.jpg" className="w-full h-full object-cover" alt="Saree 1" />
                        </div>
                    </div>
                 </div>
                 
                 {/* Middle Image */}
                 <div className="flex-1 h-[74%] sm:h-[76%] lg:h-[78%] mt-[8%] sm:mt-[9%] lg:mt-[10%] relative" style={{ filter: 'drop-shadow(2px 3px 6px rgba(0,0,0,0.35))' }}>
                    <div className="w-full h-full bg-black relative" style={{ clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)' }}>
                        <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] bottom-[1.5px]" style={{ clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)' }}>
                            <img src="/assets/HS2_p2.jpg" className="w-full h-full object-cover" alt="Saree 2" />
                        </div>
                    </div>
                 </div>
                 
                 {/* Right Image */}
                 <div className="flex-1 h-[74%] sm:h-[76%] lg:h-[78%] mt-[0%] relative" style={{ filter: 'drop-shadow(2px 3px 6px rgba(0,0,0,0.35))' }}>
                    <div className="w-full h-full bg-black relative" style={{ clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)' }}>
                        <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] bottom-[1.5px]" style={{ clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)' }}>
                            <img src="/assets/HS2_p3.jpg" className="w-full h-full object-cover" alt="Saree 3" />
                        </div>
                    </div>
                 </div>
               </div>
               
               <div className="absolute left-[62%] sm:left-[64%] lg:left-[66%] right-[2%] sm:right-[3%] lg:right-[4%] top-0 bottom-0 flex flex-col justify-center items-start text-left z-20">
                 <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[5.8rem] font-great-vibes text-black mb-1 sm:mb-2 leading-none">Tradition</h1>
                 <div className="font-poppins text-black text-[7.5px] sm:text-[11px] md:text-xs lg:text-[13.5px] font-medium space-y-0.5 sm:space-y-1 leading-tight sm:leading-snug">
                   <p className="font-bold text-[8.5px] sm:text-xs md:text-[13px] lg:text-[14.5px]">জন্মদিন, বিবাহ বার্ষিকী, সারপ্রাইজ কিংবা</p>
                   <p className="font-bold text-[8.5px] sm:text-xs md:text-[13px] lg:text-[14.5px] mb-0.5 sm:mb-1">বিশেষ দিনের জন্য</p>
                   <p>&gt;বিভিন্ন কম্বো প্যাকেজ</p>
                   <p>&gt;শাড়ি</p>
                   <p>&gt;কাস্টমাইজ গিফট কম্বো সুবিধা</p>
                   <p>&gt;ক্যাশ অন ডেলিভারি</p>
                   <p>&gt;হোম ডেলিভারি (২/৩) দিন সারা বাংলাদেশ।</p>
                 </div>
               </div>
             </div>

             {/* Slide 3 */}
             <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'} flex flex-col pt-3 sm:pt-6 pb-6 sm:pb-8 px-3 sm:px-6 lg:px-10`}>
               <h1 className="text-xl sm:text-3xl lg:text-[2.6rem] font-poppins text-black text-center mb-2 sm:mb-5 font-normal tracking-wide">Our Collections</h1>
               <div className="flex-1 flex justify-between gap-1.5 sm:gap-3 lg:gap-5 w-full overflow-hidden">
                 
                 <div className="flex-1 h-full overflow-hidden shadow-sm">
                    <img src="/assets/HS3_p1.jpg" className="w-full h-full object-cover" alt="Collection 1" />
                 </div>
                 
                 <div className="flex-1 h-full overflow-hidden shadow-sm">
                    <img src="/assets/HS3_p2.jpg" className="w-full h-full object-cover" alt="Collection 2" />
                 </div>
                 
                 <div className="flex-1 h-full overflow-hidden shadow-sm">
                    <img src="/assets/HS3_p3.jpg" className="w-full h-full object-cover" alt="Collection 3" />
                 </div>
                 
                 <div className="flex-1 h-full overflow-hidden shadow-sm">
                    <img src="/assets/HS3_p4.jpg" className="w-full h-full object-cover" alt="Collection 4" />
                 </div>
                 
                 <div className="flex-1 h-full overflow-hidden shadow-sm">
                    <img src="/assets/HS3_p5.jpg" className="w-full h-full object-cover" alt="Collection 5" />
                 </div>
                 
               </div>
             </div>
             
             {/* Slide Indicators */}
             <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                <button onClick={() => setCurrentSlide(0)} className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${currentSlide === 0 ? 'bg-gray-700' : 'bg-gray-300'}`}></button>
                <button onClick={() => setCurrentSlide(1)} className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${currentSlide === 1 ? 'bg-gray-700' : 'bg-gray-300'}`}></button>
                <button onClick={() => setCurrentSlide(2)} className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${currentSlide === 2 ? 'bg-gray-700' : 'bg-gray-300'}`}></button>
             </div>
          </div>

          {/* Categories Sidebar */}
          <div className="w-full lg:flex-1 lg:max-w-[320px] flex flex-col bg-white border-t lg:border-t-0 lg:border-l border-gray-200 shrink-0 z-20">
            <div className="bg-[#004D3D] text-white text-center py-3 sm:py-4 lg:py-5 font-poppins font-bold text-base sm:text-lg lg:text-xl tracking-wide flex justify-between px-6">
              <span className="flex-1 text-center">Categories</span>
              {selectedCategory && (
                <button onClick={() => setSelectedCategory(null)} className="text-xs sm:text-sm font-normal underline hover:text-gray-200">Clear</button>
              )}
            </div>
            <div className="flex flex-col overflow-y-auto max-h-[260px] sm:max-h-[350px] lg:max-h-[500px]">
              {categories.map((cat, index) => (
                <div 
                  key={cat._id} 
                  onClick={() => setSelectedCategory(selectedCategory === cat._id ? null : cat._id)}
                  className={`flex justify-between items-center px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 border-b border-gray-300 cursor-pointer font-poppins font-bold text-sm sm:text-base lg:text-lg transition-colors ${selectedCategory === cat._id ? 'bg-[#E5DFD3] text-primary' : 'text-black hover:bg-gray-50'}`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs sm:text-sm">▼</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Products Area */}
      <div className="max-w-7xl mx-auto px-4 mt-8 pb-16">
        <h2 className="text-center text-xl md:text-2xl font-bold text-primary mb-8 font-poppins">
          {selectedCategory ? 'আপনার নির্বাচিত শাড়ি' : 'আপনার পছন্দের শাড়িটি বেছে নিন,'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10 font-bold text-lg">No products found in this category.</div>
          ) : (
            filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
