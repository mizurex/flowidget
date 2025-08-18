export default function Footer() {
  return (
    <footer className=" bg-black text-white px-6 pt-25 pb-3.5" >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo Section */}
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-mono font-bold">⌘</span>
            <h2 className="text-lg font-semibold">flowidget</h2>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Build smarter, ship faster. Custom AI widgets for modern teams.
          </p>
        </div>

        {/* Site Links */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Site</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><a href="#">Home</a></li>
            <li><a href="#">Docs</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Usage</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Legal</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Community</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><a href="#">Discord</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">GitHub</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-6 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} flowidget. No rights reserved. ;P</p>
        <p className="mt-2">Made with ❤️ by Turf</p>
      </div>
    </footer>
  );
}
