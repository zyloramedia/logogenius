import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, Settings, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";

export default function LandingPage() {
  const { user, signOut } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Apple-style navigation */}
      <header className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-[#f5f5f7]/30">
        <div className="max-w-[980px] mx-auto flex h-12 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="font-medium text-xl">
              LogoGenius
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-sm font-light hover:text-gray-500"
                  >
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 hover:cursor-pointer">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.email || ""}
                      />
                      <AvatarFallback>
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl border-none shadow-lg"
                  >
                    <DropdownMenuLabel className="text-xs text-gray-500">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => signOut()}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-light hover:text-gray-500"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="rounded-full bg-black text-white hover:bg-gray-800 text-sm px-4">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-12">
        {/* Hero section */}
        <section className="py-20 text-center">
          <h2 className="text-5xl font-semibold tracking-tight mb-1">
            LogoGenius
          </h2>
          <h3 className="text-2xl font-medium text-gray-500 mb-4">
            AI-Powered Logo Generation for Your Business
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Create professional logos in minutes with our advanced AI
            technology. Perfect for small businesses, startups, and
            entrepreneurs.
          </p>
          <div className="flex justify-center space-x-6 text-xl text-blue-600">
            <Link to="/dashboard" className="flex items-center hover:underline">
              Start Creating <ChevronRight className="h-4 w-4" />
            </Link>
            <Link to="#features" className="flex items-center hover:underline">
              Learn more <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Features section */}
        <section id="features" className="py-20 bg-[#f5f5f7] text-center">
          <h2 className="text-5xl font-semibold tracking-tight mb-1">
            Powerful Logo Creation
          </h2>
          <h3 className="text-2xl font-medium text-gray-500 mb-4">
            Everything you need to create professional logos
          </h3>
          <div className="flex justify-center space-x-6 text-xl text-blue-600">
            <Link to="/dashboard" className="flex items-center hover:underline">
              Start Creating <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              to="#how-it-works"
              className="flex items-center hover:underline"
            >
              How it works <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-medium mb-2">
                AI-Powered Generation
              </h4>
              <p className="text-gray-500">
                Advanced AI creates 3 unique logo variations based on your brand
                description and preferences.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-medium mb-2">
                High-Resolution Output
              </h4>
              <p className="text-gray-500">
                Download professional 1024x1024 logos ready for web, print, and
                marketing materials.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-medium mb-2">Complete Brand Guide</h4>
              <p className="text-gray-500">
                Get color palettes, font suggestions, and tone recommendations
                for your brand.
              </p>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section id="how-it-works" className="py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-5xl font-semibold tracking-tight mb-1">
              How It Works
            </h2>
            <h3 className="text-2xl font-medium text-gray-500 mb-12">
              Create your perfect logo in 3 simple steps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="text-xl font-medium mb-2">
                  Describe Your Brand
                </h4>
                <p className="text-gray-500">
                  Enter your brand name, slogan, business description, and style
                  preferences
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h4 className="text-xl font-medium mb-2">AI Generates Logos</h4>
                <p className="text-gray-500">
                  Our AI creates 3 unique, professional logo variations based on
                  your input
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h4 className="text-xl font-medium mb-2">Download & Use</h4>
                <p className="text-gray-500">
                  Choose your favorite, download in high resolution, and get
                  your brand guide
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Grid section for features */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
          <div className="bg-[#f5f5f7] rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-semibold tracking-tight mb-1">
              Logo Generation Form
            </h2>
            <h3 className="text-xl font-medium text-gray-500 mb-4">
              Simple and intuitive design process
            </h3>
            <div className="flex justify-center space-x-6 text-lg text-blue-600">
              <Link
                to="/dashboard"
                className="flex items-center hover:underline"
              >
                Try it now <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-4 bg-white p-6 rounded-xl shadow-sm max-w-sm mx-auto">
              <div className="space-y-4">
                <div className="h-10 bg-gray-100 rounded-md w-full flex items-center px-3">
                  <span className="text-xs text-gray-400">Brand Name</span>
                </div>
                <div className="h-10 bg-gray-100 rounded-md w-full flex items-center px-3">
                  <span className="text-xs text-gray-400">Slogan/Tagline</span>
                </div>
                <div className="h-16 bg-gray-100 rounded-md w-full flex items-start px-3 pt-3">
                  <span className="text-xs text-gray-400">
                    Business Description
                  </span>
                </div>
                <div className="flex space-x-2">
                  <div className="h-8 w-8 bg-blue-500 rounded-full"></div>
                  <div className="h-8 w-8 bg-red-500 rounded-full"></div>
                  <div className="h-8 w-8 bg-green-500 rounded-full"></div>
                </div>
                <div className="h-10 bg-black text-white rounded-md w-full flex items-center justify-center">
                  <span className="text-xs">Generate Logos</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#f5f5f7] rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-semibold tracking-tight mb-1">
              Credit System
            </h2>
            <h3 className="text-xl font-medium text-gray-500 mb-4">
              Pay per generation, no subscriptions
            </h3>
            <div className="flex justify-center space-x-6 text-lg text-blue-600">
              <Link
                to="/dashboard"
                className="flex items-center hover:underline"
              >
                View pricing <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-4 bg-white p-6 rounded-xl shadow-sm max-w-sm mx-auto text-left">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Available Credits</span>
                  <span className="text-2xl font-bold text-green-600">5</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="text-xs text-gray-500">
                  <p>• 1 credit = 3 logo variations</p>
                  <p>• High-resolution downloads</p>
                  <p>• Brand guide included</p>
                </div>
                <button className="w-full bg-blue-600 text-white text-sm py-2 rounded-md">
                  Buy More Credits
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f5f5f7] py-12 text-xs text-gray-500">
        <div className="max-w-[980px] mx-auto px-4">
          <div className="border-b border-gray-300 pb-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-4">
                LogoGenius
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="#features" className="hover:underline">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#how-it-works" className="hover:underline">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:underline">
                    Create Logo
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Examples
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Logo Guidelines
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Brand Guide Tips
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-4">
                Support
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Tutorials
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-4">
            <p>Copyright © 2025 LogoGenius. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
