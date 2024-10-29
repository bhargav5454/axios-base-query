"use client";
import * as React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { logOut } from "@/redux/slices/authSlice";
import { persistor } from "@/redux/store/store";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", to: "/user/home" },
  { name: "Product Form", to: "/user/form" },
  { name: "Product List", to: "/user/list" },
];

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch<Dispatch>();

  const handleLogout = () => {
    dispatch(logOut());
    persistor.purge();
  };

  return (
    <header className="bg-background shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary">Logo</span>
          </div>

          <div className="hidden md:flex flex-grow justify-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="destructive"
              className="w-full mt-2"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
