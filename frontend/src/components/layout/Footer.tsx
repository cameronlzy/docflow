import React, { memo } from "react"
import { FileText } from "lucide-react"

export const Footer = memo(() => (
  <footer className="border-t border-gray-800 px-6 py-12">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold text-white">DocFlow</span>
        </div>
        <div className="flex space-x-8 text-gray-400">
          <a
            href="mailto:docflow-admin@docflow-app.com"
            className="hover:text-white transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2025 DocFlow. All rights reserved.</p>
        <p className="text-xs mt-1">
          Not really, I just added this to make it look professional. - Cameron
          Loh
        </p>
      </div>
    </div>
  </footer>
))

Footer.displayName = "Footer"
