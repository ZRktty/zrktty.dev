"use client"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import Nav from "./Nav"
import ThemeSelector from "./ThemeSelector"
import Logo from "./Logo"
import {Button} from "./ui/button"
import {Menu} from "lucide-react"
import {Separator} from "@/components/ui/separator";

export default function Header() {
  return (
    <header className="w-full p-4 flex justify-between items-center">
      <Logo/>
      <Nav className="hidden md:flex gap-6"/>
      <div className="flex items-center gap-4">
        <ThemeSelector/>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-[1.2rem] w-[1.2rem]"/>
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full">
            <SheetHeader>
              <SheetTitle className="text-center">Navigation</SheetTitle>
            </SheetHeader>
            <div>
              <Nav className="flex flex-col gap-8 mt-10 text-lg"/>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}