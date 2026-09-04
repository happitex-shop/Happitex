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
      <div className="w-full px-4 lg:px-8 mt-4 mb-10 mx-auto max-w-[1600px]">
        <div className="flex flex-col lg:flex-row shadow-xl bg-white border border-gray-200 overflow-hidden rounded-lg">
          
          {/* Banner Slider */}
          <div className="flex-[3] relative h-[450px] lg:h-[550px] bg-cream overflow-hidden"
               style={{ 
                 backgroundImage: "url('/assets/BackGround_HS.png')", 
                 backgroundSize: 'cover', 
                 backgroundPosition: 'center',
               }}>
             
             {/* Slide 1 */}
             <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
               <div className="absolute left-[5%] top-0 bottom-0 flex w-[55%] h-full pt-8 pb-8 pl-4">
                 
                 {/* Left Image */}
                 <div className="w-[36%] h-[75%] mt-[15%] relative z-10" style={{ filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.4))' }}>
                    <div className="w-full h-full bg-black" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                        <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] bottom-[1.5px]" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                            <img src="/assets/HS1_p1.jpg" className="w-full h-full object-cover" alt="Saree 1" />
                        </div>
                    </div>
                 </div>
                 
                 {/* Middle Image */}
                 <div className="w-[42%] h-[90%] mt-[2%] relative z-30 -ml-8 lg:-ml-12" style={{ filter: 'drop-shadow(8px 8px 15px rgba(0,0,0,0.6))' }}>
                    <div className="w-full h-full bg-black" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                        <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] bottom-[1.5px]" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                            <img src="/assets/HS1_p2.jpg" className="w-full h-full object-cover" alt="Saree 2" />
                        </div>
                    </div>
                 </div>
                 
                 {/* Right Image */}
                 <div className="w-[36%] h-[75%] mt-[0%] relative z-10 -ml-8 lg:-ml-12" style={{ filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.3))' }}>
                    <div className="w-full h-full bg-black" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                        <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] bottom-[1.5px]" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                            <img src="/assets/HS1_p3.jpg" className="w-full h-full object-cover" alt="Saree 3" />
                        </div>
                    </div>
                 </div>
               </div>
               
               <div className="absolute right-[5%] top-0 bottom-0 w-[40%] flex flex-col justify-center items-end text-right">
                 <h1 className="text-[5rem] lg:text-[6.5rem] font-kapakana text-black mb-2 leading-none">Happitex</h1>
                 <p className="text-xl lg:text-3xl font-poppins text-black font-semibold mb-1">বিশ্বস্ত অনলাইন</p>
                 <p className="text-xl lg:text-3xl font-poppins text-black font-semibold">গিফট শপ</p>
               </div>
             </div>

             {/* Slide 2 */}
             <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
               <div className="absolute left-[5%] top-0 bottom-0 flex w-[55%] h-full pt-8 pb-8 pl-4">
                 
                 {/* Left Image */}
                 <div className="w-[36%] h-[75%] mt-[20%] relative z-10" style={{ filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.4))' }}>
                    <div className="w-full h-full bg-black" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                        <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] bottom-[1.5px]" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                            <img src="/assets/HS2_p1.jpg" className="w-full h-full object-cover" alt="Saree 1" />
                        </div>
                    </div>
                 </div>
                 
                 {/* Middle Image */}
                 <div className="w-[36%] h-[80%] mt-[10%] relative z-30 -ml-8 lg:-ml-12" style={{ filter: 'drop-shadow(8px 8px 15px rgba(0,0,0,0.6))' }}>
                    <div className="w-full h-full bg-black" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                        <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] bottom-[1.5px]" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                            <img src="/assets/HS2_p2.jpg" className="w-full h-full object-cover" alt="Saree 2" />
                        </div>
                    </div>
                 </div>
                 
                 {/* Right Image */}
                 <div className="w-[42%] h-[90%] mt-[0%] relative z-10 -ml-8 lg:-ml-12" style={{ filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.3))' }}>
                    <div className="w-full h-full bg-black" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                        <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] bottom-[1.5px]" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                            <img src="/assets/HS2_p3.jpg" className="w-full h-full object-cover" alt="Saree 3" />
                        </div>
                    </div>
                 </div>
               </div>
               
               <div className="absolute right-[2%] top-0 bottom-0 w-[40%] flex flex-col justify-center items-end text-right">
                 <h1 className="text-[4rem] lg:text-[5.5rem] font-alkalami text-black mb-4 leading-none italic">Tradition</h1>
                 <div className="font-poppins text-black text-xs lg:text-[13px] font-medium space-y-1.5 leading-snug">
                   <p className="font-bold text-[14px]">জন্মদিন, বিবাহ বার্ষিকী, সারপ্রাইজ কিংবা</p>
                   <p className="font-bold text-[14px]">বিশেষ দিনের জন্য</p>
                   <p>&gt;বিভিন্ন কম্বো প্যাকেজ</p>
                   <p>&gt;শাড়ি</p>
                   <p>&gt;কাস্টমাইজ গিফট কম্বো সুবিধা</p>
                   <p>&gt;ক্যাশ অন ডেলিভারি</p>
                   <p>&gt;হোম ডেলিভারি (২/৩) দিন সারা বাংলাদেশ।</p>
                 </div>
               </div>
             </div>

             {/* Slide 3 */}
             <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'} flex flex-col pt-8 pb-10 px-4 lg:px-8`}>
               <h1 className="text-4xl lg:text-[3rem] font-poppins text-black text-center mb-6 font-medium tracking-wide">Our Collections</h1>
               <div className="flex-1 flex justify-between gap-3 lg:gap-5 w-full">
                 
                 <div className="flex-1 h-full overflow-hidden shadow-md">
                    <img src="/assets/HS3_p1.jpg" className="w-full h-full object-cover" alt="Collection 1" />
                 </div>
                 
                 <div className="flex-1 h-full overflow-hidden shadow-md">
                    <img src="/assets/HS3_p2.jpg" className="w-full h-full object-cover" alt="Collection 2" />
                 </div>
                 
                 <div className="flex-1 h-full overflow-hidden shadow-md">
                    <img src="/assets/HS3_p3.jpg" className="w-full h-full object-cover" alt="Collection 3" />
                 </div>
                 
                 <div className="flex-1 h-full overflow-hidden shadow-md">
                    <img src="/assets/HS3_p4.jpg" className="w-full h-full object-cover" alt="Collection 4" />
                 </div>
                 
                 <div className="flex-1 h-full overflow-hidden shadow-md">
                    <img src="/assets/HS3_p5.jpg" className="w-full h-full object-cover" alt="Collection 5" />
                 </div>
                 
               </div>
             </div>
             
             {/* Slide Indicators */}
             <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                <button onClick={() => setCurrentSlide(0)} className={`w-3 h-3 rounded-full transition-colors ${currentSlide === 0 ? 'bg-gray-600' : 'bg-gray-300'}`}></button>
                <button onClick={() => setCurrentSlide(1)} className={`w-3 h-3 rounded-full transition-colors ${currentSlide === 1 ? 'bg-gray-600' : 'bg-gray-300'}`}></button>
                <button onClick={() => setCurrentSlide(2)} className={`w-3 h-3 rounded-full transition-colors ${currentSlide === 2 ? 'bg-gray-600' : 'bg-gray-300'}`}></button>
             </div>
          </div>

          {/* Categories Sidebar */}
          <div className="flex-1 lg:max-w-[320px] w-full flex flex-col bg-white border-l border-gray-200 shrink-0 z-20">
            <div className="bg-[#004D3D] text-white text-center py-4 lg:py-5 font-poppins font-bold text-lg lg:text-xl tracking-wide flex justify-between px-6">
              <span className="flex-1 text-center">Categories</span>
              {selectedCategory && (
                <button onClick={() => setSelectedCategory(null)} className="text-sm font-normal underline hover:text-gray-200">Clear</button>
              )}
            </div>
            <div className="flex flex-col overflow-y-auto" style={{ maxHeight: '500px' }}>
              {categories.map((cat, index) => (
                <div 
                  key={cat._id} 
                  onClick={() => setSelectedCategory(selectedCategory === cat._id ? null : cat._id)}
                  className={`flex justify-between items-center px-6 lg:px-8 py-3 lg:py-4 border-b border-black cursor-pointer font-poppins font-bold text-base lg:text-lg transition-colors ${selectedCategory === cat._id ? 'bg-[#E5DFD3] text-primary' : 'text-black hover:bg-gray-50'}`}
                >
                  <span>{cat.name}</span>
                  <span className="text-sm">▼</span>
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
