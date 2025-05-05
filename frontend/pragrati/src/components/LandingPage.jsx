import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Pragrati Mitar</h1>
          <p className="text-xl mb-8">Connecting skilled service providers with customers</p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold">
              Get Started
            </Link>
            <Link to="/login" className="px-6 py-3 border-2 border-white text-white rounded-lg font-bold">
              Login
            </Link>
          </div>
        </div>
      </section>

      <section className="features py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">For Service Providers</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Create a professional profile</li>
                <li>Showcase your experience and skills</li>
                <li>Set your own pricing</li>
                <li>Manage customer requests</li>
                <li>Build your reputation with reviews</li>
              </ul>
            </div>
            
            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">For Customers</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Find skilled professionals near you</li>
                <li>Browse profiles and reviews</li>
                <li>Book services with ease</li>
                <li>Rate and review your experience</li>
                <li>Save trusted providers for future needs</li>
              </ul>
            </div>
            
            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Our Guarantees</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Verified service providers</li>
                <li>Secure payment process</li>
                <li>Customer satisfaction guarantee</li>
                <li>24/7 customer support</li>
                <li>Privacy protection</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="services py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Services</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="service-card text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-3">
                <span className="text-3xl">👨‍🍳</span>
              </div>
              <h3 className="font-semibold">Chefs</h3>
            </div>
            
            <div className="service-card text-center">
              <div className="bg-green-100 p-4 rounded-full inline-block mb-3">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="font-semibold">Gardeners</h3>
            </div>
            
            <div className="service-card text-center">
              <div className="bg-yellow-100 p-4 rounded-full inline-block mb-3">
                <span className="text-3xl">🔧</span>
              </div>
              <h3 className="font-semibold">Plumbers</h3>
            </div>
            
            <div className="service-card text-center">
              <div className="bg-red-100 p-4 rounded-full inline-block mb-3">
                <span className="text-3xl">🧹</span>
              </div>
              <h3 className="font-semibold">House Cleaners</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="cta bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join our growing community of service providers and customers today!</p>
          <Link to="/register" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage