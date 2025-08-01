"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions";
import type { UserRole } from "@/lib/types";
import { LogOut } from "lucide-react";

export function UserNav({ role }: { role: UserRole }) {
    const getInitials = (role: string) => {
        return role.split('-').map(n => n[0]).join('').toUpperCase();
    }
    const roleName = role.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${role}`} alt={`@${role}`} />
                        <AvatarFallback>{getInitials(role)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{roleName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {role}@example.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {/* Add other menu items here if needed */}
                </DropdownMenuGroup>
                <form action={logout}>
                    <DropdownMenuItem asChild>
                        <button type="submit" className="w-full">
                           <LogOut className="mr-2 h-4 w-4" />
                           <span>Log out</span>
                        </button>
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
