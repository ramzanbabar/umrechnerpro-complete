'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { categories, categoryList } from '@/lib/categories';

// Custom hook for mounted state without useEffect
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  const popularConversions = [
    { label: 'cm → Zoll', href: '/umrechnung/cm-in-zoll' },
    { label: 'kg → Pfund', href: '/umrechnung/kg-in-pfund' },
    { label: '°C → °F', href: '/umrechnung/celsius-in-fahrenheit' },
    { label: 'km/h → mph', href: '/umrechnung/kmh-in-mph' },
    { label: 'kW → PS', href: '/umrechnung/kw-in-ps' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">📏</span>
            <span className="font-bold text-xl">
              UmrechnerPro<span className="text-primary">.de</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  Alle Umrechner
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {categoryList.map((cat) => (
                  <DropdownMenuItem key={cat.slug} asChild>
                    <Link href={`/kategorie/${cat.slug}`} className="flex items-center">
                      <span className="mr-2">{cat.icon}</span>
                      {cat.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Popular quick links */}
            <div className="hidden lg:flex items-center space-x-1 text-sm">
              <span className="text-muted-foreground">Beliebt:</span>
              {popularConversions.slice(0, 3).map((conv) => (
                <Link
                  key={conv.href}
                  href={conv.href}
                  className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {conv.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Suche"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label={theme === 'dark' ? 'Helles Design' : 'Dunkles Design'}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menü öffnen"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="py-4 border-t">
            <Input
              type="search"
              placeholder="Umrechner suchen..."
              className="w-full"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">Kategorien</p>
              {categoryList.slice(0, 8).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/kategorie/${cat.slug}`}
                  className="flex items-center py-2 text-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">Beliebt</p>
              {popularConversions.map((conv) => (
                <Link
                  key={conv.href}
                  href={conv.href}
                  className="block py-2 text-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {conv.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
