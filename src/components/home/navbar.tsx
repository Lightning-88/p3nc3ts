"use client";

import { Bell, Home, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type UserData = {
  id: string;
  username: string;
  email: string;
  name: string;
  password: string;
  bio: string | null;
  location: string | null;
  photo: string | null;
  createdAt: Date;
  updatedAt: Date;
} | null;

export default function Navbar({ user }: { user: UserData }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen)
      return () => {
        setIsOpen(false);
      };
  }, [location, isOpen]);

  return (
    <>
      <header className="fixed w-full shadow-sm bg-secondary text-primary h-14 flex items-center px-4">
        <nav className="container mx-auto flex justify-between">
          <Link href="/">
            <h1 className="leading-relaxed font-dancing-script font-medium text-xl">
              p3nc3ts
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <button
              className="ring ring-border-primary p-2 rounded-md"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={18} />
            </button>
            {user ? (
              <Link href="/profile">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.photo ? user.photo : user.username
                  )}`}
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="secondary">Login</Button>
              </Link>
            )}
          </div>
        </nav>
      </header>
      <SidebarMobile
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLogged={user ? true : false}
        user={user}
      />
      {isOpen && <Overlay setIsOpen={setIsOpen} />}
    </>
  );
}

const sidebarsMobileMenu = [
  {
    title: "Home",
    link: "/",
    className: "flex gap-3 items-center",
    icon: <Home size={20} />,
  },
  {
    title: "Post",
    link: "/post",
    className: "flex gap-3 items-center",
    icon: <Bell size={20} />,
  },
];

function SidebarMobile({
  isOpen,
  setIsOpen,
  isLogged,
  user,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLogged: boolean;
  user: UserData;
}) {
  return (
    <div
      className={`flex-col h-full w-64 fixed right-0 top-0 bg-secondary pt-2.5 p-4 z-50 text-primary ${
        isOpen ? "translate-x-0 flex" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center mb-8">
        <Link href="/">
          <h1 className="leading-relaxed font-dancing-script font-medium text-xl">
            p3nc3ts
          </h1>
        </Link>
        <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
          <X size={22} />
        </button>
      </div>
      <div className="flex flex-col gap-4 h-full">
        {sidebarsMobileMenu.map((sidebar) => (
          <Link
            href={sidebar.link}
            key={sidebar.title}
            className={sidebar.className}
          >
            {sidebar.icon} {sidebar.title}
          </Link>
        ))}
        {isLogged ? (
          <Link href="/profile" className="flex gap-3 items-center mt-auto">
            <User /> {user?.username}
          </Link>
        ) : (
          <Link href="/login" className="mt-auto">
            <Button variant="secondary">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

function Overlay({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.5)] z-10"
      onClick={() => setIsOpen(false)}
    />
  );
}
