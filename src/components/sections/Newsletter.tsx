const Newsletter = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto bg-blue-600 rounded-[40px] px-8 py-16 lg:py-24 relative overflow-hidden">
        {/* Abstract circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Ready to start your next adventure?</h2>
          <p className="text-blue-100 text-lg mb-10">Subscribe to our newsletter and get the best travel deals delivered to your inbox.</p>
          
          <form className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-full">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-transparent px-6 py-4 outline-none text-white placeholder:text-blue-200 font-medium"
            />
            <button type="submit" className="bg-white text-blue-600 px-8 py-4 rounded-xl sm:rounded-full font-bold hover:bg-slate-100 transition-colors active:scale-95">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
