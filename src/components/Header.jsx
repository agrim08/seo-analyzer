const Header = () => {
  return (
   <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">SEO Analyzer</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Reports
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Tools
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Help
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
