'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: '/', label: 'Acasă' },
    { href: '/despre-noi', label: 'Despre noi' },
    { href: '/asculta-live', label: 'Ascultă Live' },
    { href: '/alatura-te-ca-artist', label: 'Alătură-te Ca Artist' },
    { href: '/artisti', label: 'Artiști' },
    { href: 'https://blog.muzicamea.ro', label: 'Blog', external: true },
    { href: '/contact', label: 'Contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`sticky ${isScrolled ? 'top-4' : 'top-0'} z-50 backdrop-blur-sm transition-all duration-300 ${isScrolled ? 'px-4' : ''}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isScrolled ? 'bg-[#000] rounded-3xl' : 'bg-transparent'} transition-all duration-300`}>
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="MuzicaMea Logo"
                width={120}
                height={40}
                className="w-auto h-35"
                priority
              />
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {menuItems.map((item) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f0f0f0] hover:text-[#d62828] px-3 py-2 text-sm font-medium transition-colors duration-300 relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d62828] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[#f0f0f0] hover:text-[#d62828] px-3 py-2 text-sm font-medium transition-colors duration-300 relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d62828] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )
              ))}
            </div>
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#f0f0f0] hover:text-[#d62828] transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 backdrop-blur-sm bg-[#0D0D0D]/95 transition-all duration-300">
              {menuItems.map((item) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#f0f0f0] hover:text-[#d62828] block px-3 py-2 text-base font-medium transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#f0f0f0] hover:text-[#d62828] block px-3 py-2 text-base font-medium transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 