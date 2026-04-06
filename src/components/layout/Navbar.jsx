import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Services', path: '/services',
    children: [
      { label: 'Interior', path: '/services/interior' },
      { label: 'Exterior', path: '/services/exterior' },
      { label: 'Architecture', path: '/services/architecture' },
      { label: 'Vastu Consultancy', path: '/services/vastu' },
      { label: 'Green Building', path: '/services/green-building' },
    ]
  },
  {
    label: 'Spaces', path: '/spaces',
    children: [
      { label: 'Residential', path: '/spaces/residential' },
      { label: 'Commercial', path: '/spaces/commercial' },
      { label: 'Industrial', path: '/spaces/industrial' },
      { label: 'Hospitality', path: '/spaces/hospitality' },
      { label: 'Healthcare', path: '/spaces/healthcare' },
    ]
  },
  { label: 'Process', path: '/process' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex-shrink-0">
            <img
              src={scrolled
                ? "https://media.base44.com/images/public/user_69bf8f0482d83e3867d98bbb/580701ef2_FinalLogoTransparent_1.png"
                : "https://media.base44.com/images/public/user_69bf8f0482d83e3867d98bbb/260efcddc_FinalLogoTransparentwhitetext.png"
              }
              alt="INTEXA"
              className="h-8 lg:h-10"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                <Link
                  to={link.path}
                  className={`px-3 py-2 text-[13px] font-medium transition-colors flex items-center gap-1 ${
                    scrolled ? 'text-foreground hover:text-accent' : 'text-white/80 hover:text-white'
                  } ${(location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))) ? (scrolled ? 'text-accent font-semibold' : 'text-white font-semibold') : ''}`}
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3 h-3" />}
                </Link>
                {link.children && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-lg shadow-lg border border-border py-2 min-w-[200px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-accent transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-3">
            <Link to="/contact">
              <Button variant="outline" size="sm" className={`text-xs ${
                scrolled ? 'border-primary text-primary hover:bg-primary hover:text-white' : 'border-white/40 bg-transparent text-white hover:bg-white/10'
              }`}>
                Talk to Us First
              </Button>
            </Link>
            <Link to="/contact?service=studio_matching">
              <Button size="sm" className="text-xs bg-accent text-accent-foreground hover:bg-accent/90">
                Start Brand Matching
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`xl:hidden p-2 ${scrolled ? 'text-foreground' : 'text-white'}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.path}>
                  <div className="flex items-center justify-between">
                    <Link
                      to={link.path}
                      className={`block py-2.5 text-sm font-medium ${
                        location.pathname === link.path ? 'text-accent' : 'text-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.path ? null : link.path)}
                        className="p-2"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.path ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {link.children && openDropdown === link.path && (
                    <div className="pl-4 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block py-2 text-sm text-muted-foreground hover:text-accent"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2 border-t border-border">
                <Link to="/contact" className="block">
                  <Button variant="outline" className="w-full text-sm">Talk to Us First</Button>
                </Link>
                <Link to="/contact?service=studio_matching" className="block">
                  <Button className="w-full text-sm bg-accent text-accent-foreground hover:bg-accent/90">
                    Start Brand Matching
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}