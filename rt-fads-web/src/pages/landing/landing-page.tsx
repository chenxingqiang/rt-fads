import React from 'react';
import { Activity, AlertCircle, CircuitBoard, Network, Shield, Settings } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold">RT-FADS</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white">Features</a>
              <a href="#architecture" className="text-gray-300 hover:text-white">Architecture</a>
              <a href="#docs" className="text-gray-300 hover:text-white">Docs</a>
              <a href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</a>
            </div>
            <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700">
              Start Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Real-time Financial 
              <span className="text-blue-500"> Anti-fraud </span>
              Detection System
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              An open-source, enterprise-grade fraud detection platform powered by advanced machine learning and graph neural networks.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button className="px-8 py-3 rounded-md bg-blue-600 hover:bg-blue-700">
                Get Started
              </button>
              <button className="px-8 py-3 rounded-md border border-gray-700 hover:border-gray-600">
                View on GitHub
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
            <p className="text-gray-400">Comprehensive tools for real-time fraud detection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity className="h-8 w-8 text-blue-500" />,
                title: "Real-time Detection",
                description: "Process and analyze transactions in real-time with sub-100ms latency."
              },
              {
                icon: <CircuitBoard className="h-8 w-8 text-green-500" />,
                title: "Multi-source Data",
                description: "Integrate and analyze data from various sources using graph structures."
              },
              {
                icon: <Shield className="h-8 w-8 text-purple-500" />,
                title: "Privacy Computing",
                description: "Secure multi-party computation with differential privacy guarantees."
              },
              {
                icon: <Settings className="h-8 w-8 text-yellow-500" />,
                title: "Flexible Rules",
                description: "Customizable rule engine with visual rule builder interface."
              },
              {
                icon: <Network className="h-8 w-8 text-red-500" />,
                title: "ML-powered",
                description: "Advanced machine learning models with automated retraining."
              },
              {
                icon: <AlertCircle className="h-8 w-8 text-indigo-500" />,
                title: "Enterprise Ready",
                description: "Production-grade security and scalability built-in."
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-lg border border-gray-800 hover:border-gray-700">
                <div className="p-3 bg-gray-800 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Transactions/Day", value: "10M+" },
              { label: "Detection Accuracy", value: "99.8%" },
              { label: "Response Time", value: "<100ms" },
              { label: "Cost Saved", value: "¥100M+" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Technology Stack</h2>
            <p className="text-gray-400">Built with modern technologies and best practices</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "MT-HGNN Model",
              "PyTorch Framework",
              "SecretFlow",
              "FastAPI",
              "React",
              "PostgreSQL",
              "Redis",
              "Kubernetes"
            ].map((tech, index) => (
              <div key={index} className="p-4 text-center border border-gray-800 rounded-lg">
                <span className="text-gray-300">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join the community of organizations using RT-FADS to protect their financial systems.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button className="px-8 py-3 rounded-md bg-blue-600 hover:bg-blue-700">
              Start Free Trial
            </button>
            <button className="px-8 py-3 rounded-md border border-gray-700 hover:border-gray-600">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-blue-500" />
                <span className="font-bold">RT-FADS</span>
              </div>
              <p className="text-gray-400 text-sm">
                Real-time Financial Anti-fraud Detection System
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API Reference</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Guides</a></li>
                <li><a href="#" className="hover:text-white">Case Studies</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 RT-FADS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;