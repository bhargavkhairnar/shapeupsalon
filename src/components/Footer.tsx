export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-800">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 border-b border-stone-800 pb-12">
          
          <div className="md:col-span-2">
            <h3 className="text-2xl font-playfair text-white mb-2">Shape Up <span className="italic text-purple-400">Beauty</span></h3>
            <p className="text-pink-400 font-playfair italic text-xl mb-4">By Shraddha Katkar</p>
            <p className="text-sm leading-relaxed max-w-sm">
              Premium unisex salon providing expert styling, professional makeup, and rejuvenating spa treatments. Experience luxury and perfection in every visit.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#home" className="hover:text-purple-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-purple-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-purple-400 transition-colors">Services</a></li>
              <li><a href="#gallery" className="hover:text-purple-400 transition-colors">Gallery</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="https://instagram.com/shape_upbeauty" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Instagram</a></li>
              <li><a href="https://wa.me/9199156791336" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">WhatsApp</a></li>
              <li><a href="mailto:surveshraddha006@gmail.com" className="hover:text-white transition-colors">Email</a></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Shape Up Beauty. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed with elegance.</p>
        </div>
      </div>
    </footer>
  );
}
