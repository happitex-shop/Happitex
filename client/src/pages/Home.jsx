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
             <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
               <div className="absolute left-[2%] sm:left-[5%] top-0 bottom-0 flex w-[55%] h-full pt-3 pb-3 sm:pt-8 sm:pb-8 pl-1 sm:pl-4">
                 
                 {/* Left Image */}
                 <div className="w-[36%] h-[75%] mt-[15%] relative z-10" style={{ filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.3))' }}>
                    <div className="w-full h-full bg-black" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                        <div className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px]" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                            <img src="/assets/HS1_p1.jpg" className="w-full h-full object-cover" alt="Saree 1" />
                        </div>
                    </div>
                 </div>
                 
                 {/* Middle Image */}
                 <div className="w-[42%] h-[90%] mt-[2%] relative z-30 -ml-4 sm:-ml-8 lg:-ml-12" style={{ filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))' }}>
                    <div className="w-full h-full bg-black" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                        <div className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px]" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                            <img src="/assets/HS1_p2.jpg" className="w-full h-full object-cover" alt="Saree 2" />
                        </div>
                    </div>
                 </div>
                 
                 {/* Right Image */}
                 <div className="w-[36%] h-[75%] mt-[0%] relative z-10 -ml-4 sm:-ml-8 lg:-ml-12" style={{ filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.3))' }}>
                    <div className="w-full h-full bg-black" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                        <div className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px]" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                            <img src="/assets/HS1_p3.jpg" className="w-full h-full object-cover" alt="Saree 3" />
                        </div>
                    </div>
                 </div>
               </div>
               
               <div className="absolute right-[3%] sm:right-[5%] top-0 bottom-0 w-[42%] sm:w-[40%] flex flex-col justify-center items-end text-right pr-2 sm:pr-0">
                 <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[6.5rem] font-kapakana text-black mb-1 sm:mb-2 leading-none">Happitex</h1>
                 <p className="text-[11px] sm:text-lg md:text-xl lg:text-3xl font-poppins text-black font-semibold mb-0.5">বিশ্বস্ত অনলাইন</p>
                 <p className="text-[11px] sm:text-lg md:text-xl lg:text-3xl font-poppins text-black font-semibold">গিফট শপ</p>
               </div>
             </div>

             {/* Slide 2 */}
             <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
               <div className="absolute left-[2%] sm:left-[5%] top-0 bottom-0 flex w-[50%] sm:w-[55%] h-full pt-3 pb-3 sm:pt-8 sm:pb-8 pl-1 sm:pl-4">
                 
                 {/* Left Image */}
                 <div className="w-[36%] h-[75%] mt-[20%] relative z-10" style={{ filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.3))' }}>
                    <div className="w-full h-full bg-black" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                        <div className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px]" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                            <img src="/assets/HS2_p1.jpg" className="w-full h-full object-cover" alt="Saree 1" />
                        </div>
                    </div>
                 </div>
                 
                 {/* Middle Image */}
                 <div className="w-[36%] h-[80%] mt-[10%] relative z-30 -ml-4 sm:-ml-8 lg:-ml-12" style={{ filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))' }}>
                    <div className="w-full h-full bg-black" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                        <div className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px]" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                            <img src="/assets/HS2_p2.jpg" className="w-full h-full object-cover" alt="Saree 2" />
                        </div>
                    </div>
                 </div>
                 
                 {/* Right Image */}
                 <div className="w-[42%] h-[90%] mt-[0%] relative z-10 -ml-4 sm:-ml-8 lg:-ml-12" style={{ filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.3))' }}>
                    <div className="w-full h-full bg-black" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                        <div className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px]" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                            <img src="/assets/HS2_p3.jpg" className="w-full h-full object-cover" alt="Saree 3" />
                        </div>
                    </div>
                 </div>
               </div>
               
               <div className="absolute right-[2%] top-0 bottom-0 w-[46%] sm:w-[40%] flex flex-col justify-center items-end text-right pr-2 sm:pr-0">
                 <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-[5.5rem] font-alkalami text-black mb-1 sm:mb-4 leading-none italic">Tradition</h1>
                 <div className="font-poppins text-black text-[8px] sm:text-xs lg:text-[13px] font-medium space-y-0.5 sm:space-y-1.5 leading-tight sm:leading-snug">
                   <p className="font-bold text-[9px] sm:text-[14px]">জন্মদিন, বিবাহ বার্ষিকী, সারপ্রাইজ কিংবা</p>
                   <p className="font-bold text-[9px] sm:text-[14px]">বিশেষ দিনের জন্য</p>
                   <p className="hidden sm:block">&gt;বিভিন্ন কম্বো প্যাকেজ</p>
                   <p>&gt;কাস্টমাইজ গিফট কম্বো সুবিধা</p>
                   <p>&gt;ক্যাশ অন ডেলিভারি</p>
                   <p>&gt;হোম ডেলিভারি (২/৩) দিন</p>
                 </div>
               </div>
             </div>

             {/* Slide 3 */}
             <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'} flex flex-col pt-3 sm:pt-8 pb-6 sm:pb-10 px-2 sm:px-8`}>
               <h1 className="text-base sm:text-3xl lg:text-[3rem] font-poppins text-black text-center mb-2 sm:mb-6 font-medium tracking-wide">Our Collections</h1>
               <div className="flex-1 flex justify-between gap-1 sm:gap-3 lg:gap-5 w-full overflow-hidden pb-4 sm:pb-0">
                 
                 <div className="flex-1 h-full overflow-hidden rounded shadow-sm">
                    <img src="/assets/HS3_p1.jpg" className="w-full h-full object-cover" alt="Collection 1" />
                 </div>
                 
                 <div className="flex-1 h-full overflow-hidden rounded shadow-sm">
                    <img src="/assets/HS3_p2.jpg" className="w-full h-full object-cover" alt="Collection 2" />
                 </div>
                 
                 <div className="flex-1 h-full overflow-hidden rounded shadow-sm">
                    <img src="/assets/HS3_p3.jpg" className="w-full h-full object-cover" alt="Collection 3" />
                 </div>
                 
                 <div className="flex-1 h-full overflow-hidden rounded shadow-sm">
                    <img src="/assets/HS3_p4.jpg" className="w-full h-full object-cover" alt="Collection 4" />
                 </div>
                 
                 <div className="flex-1 h-full overflow-hidden rounded shadow-sm">
                    <img src="/assets/HS3_p5.jpg" className="w-full h-full object-cover" alt="Collection 5" />
                 </div>
                 
               </div>
             </div>
             
             {/* Slide Indicators */}
             <div className="absolute bottom-2 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                <button onClick={() => setCurrentSlide(0)} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${currentSlide === 0 ? 'bg-gray-700' : 'bg-gray-300'}`}></button>
                <button onClick={() => setCurrentSlide(1)} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${currentSlide === 1 ? 'bg-gray-700' : 'bg-gray-300'}`}></button>
                <button onClick={() => setCurrentSlide(2)} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${currentSlide === 2 ? 'bg-gray-700' : 'bg-gray-300'}`}></button>
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
