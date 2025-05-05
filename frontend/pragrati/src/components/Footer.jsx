function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Pragrati Mitar</h2>
              <p>Connecting service providers with customers</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p>Email: support@pragatimitar.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:text-blue-400">Facebook</a>
                <a href="#" className="hover:text-blue-400">Twitter</a>
                <a href="#" className="hover:text-blue-400">Instagram</a>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700 text-center">
            <p>© 2025 Pragrati Mitar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer