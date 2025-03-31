"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { LogOutIcon, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ModeToggle from "./mode-toggle";

export function Appbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = useAuth();
  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div className="flex backdrop-blur-lg bg-white/80 dark:bg-black/50 mx-4 md:mx-24 justify-between items-center px-4 md:px-6 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 sticky top-4 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-tight">
        <Link href="/">Wakey-Wakey</Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-800 dark:text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="destructive" onClick={logout}>
              <LogOutIcon className="mr-2 h-4 w-4" /> Logout
            </Button>
          </>
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
        <ModeToggle />
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-black shadow-lg p-4 flex flex-col items-center gap-3 md:hidden">
          <ModeToggle />
          {isLoggedIn ? (
            <>
              <Button asChild className="w-full">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="destructive" className="w-full" onClick={logout}>
                <LogOutIcon className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <Button asChild className="w-full">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
