"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Menu } from "lucide-react";
import Image from "next/image";
import React from "react";

export const HeaderMenuDesktop = () => {

    const session = useSession();

    return <div>
        <div className="hidden md:flex items-center space-x-8">
    <a href="#features" className="text-gray-300 hover:text-white">Features</a>
    <a href="#how-it-works" className="text-gray-300 hover:text-white">How It Works</a>
    <a href="#testimonials" className="text-gray-300 hover:text-white">Reviews</a>
    {session?.status === "authenticated" && session.data?.user?.image ? (
      <div className="flex items-center space-x-4">
        <Button variant="outline" className="border-purple-500 text-purple-400">
          <Link href='/api/auth/signout'>Sign Out</Link>
        </Button>
        <Image
          src={session.data.user.image}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full border-2 border-purple-500"
        />
      </div>
    ) : (
      <Button variant="outline" className="border-purple-500 text-purple-400">
        <Link href='/api/auth/signin'>Sign In</Link>
      </Button>
    )}
  </div>

  
    </div>
}

export const HeaderMenuMobile = () => {
    const session = useSession();
    return(
        <div className="md:hidden">
            <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border border-gray-700 text-white">
                <DialogTitle className="text-lg mb-4">Menu</DialogTitle>
                <a href="#features" className="block py-2 hover:text-purple-400">Features</a>
                <a href="#how-it-works" className="block py-2 hover:text-purple-400">How It Works</a>
                <a href="#testimonials" className="block py-2 hover:text-purple-400">Reviews</a>
                {session.status === "authenticated" ? (
                <>
                    <div className="flex items-center space-x-3 mt-4">
                    <Image
                        src={session.data?.user?.image || "/placeholder.png"}
                        alt="Avatar"
                        width={32}
                        height={32}
                        className="rounded-full border border-purple-500"
                    />
                    <span>{session.data?.user?.name || "User"}</span>
                    </div>
                    <Button variant="outline" className="mt-4 w-full">
                    <Link href='/api/auth/signout'>Sign Out</Link>
                    </Button>
                </>
                ) : (
                <Button variant="outline" className="mt-4 w-full">
                    <Link href='/api/auth/signin'>Sign In</Link>
                </Button>
                )}
            </DialogContent>
            </Dialog>
        </div>
    )
        
}