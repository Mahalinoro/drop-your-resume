'use client'

import { ThemeSwitcher } from "@/components/theme-switcher";
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Toaster } from 'sonner'
import { LogOut, Wallet } from 'lucide-react'
import Link from 'next/link'
import Image from "next/image"
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export default function MenuBar() {
    const { address, isConnected } = useAccount()
    const { connectors, connect } = useConnect()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

    // Find the injected (MetaMask, Rabby, etc.) connector
    const injectedConnector = connectors.find(
        (c) => c.name === "Injected" || c.name === "MetaMask"
    );

    return (
        <div className="bg-white dark:bg-black mx-6">
            <Toaster position="top-center" richColors/>
            <div className="flex justify-between items-center">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                                <Link href="/">
                                    <Item className="gap-2">
                                        <ItemMedia>
                                            <Image
                                                src="/logo.png"
                                                alt="Logo Icon"
                                                width={24}
                                                height={24}
                                            />
                                        </ItemMedia>
                                        <ItemContent>
                                            <ItemTitle className="font-light text-xl tracking-tighter">DROP<span className="text-[#5AB1BB] font-bold">-</span>YOUR<span className="text-[#5AB1BB] font-bold">-</span>RESUME</ItemTitle>
                                        </ItemContent>
                                    </Item>
                                </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-2">
                    {isConnected ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex items-center gap-2">
                                    {ensAvatar ? (
                                        <Avatar>
                                            <AvatarImage src={ensAvatar} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    ) : (
                                        <Avatar>
                                            <AvatarImage src="https://www.profilebakery.com/wp-content/uploads/2025/05/Profile-Picture-before-796x1024.jpg" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <span className="text-sm font-medium">
                                        {ensName ? ensName : `${address?.slice(0, 4)}...${address?.slice(-4)}`}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => disconnect()}
                                    className="text-red-500 focus:text-red-500" // Make it red for danger
                                >
                                    <LogOut strokeWidth={1} />
                                    Disconnect
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    ) : (
                        <Button
                            className="bg-[#E43651] text-white hover:bg-[#c32c43] focus:ring-4 focus:ring-red-300 font-light"
                            disabled={!injectedConnector}
                            onClick={() => injectedConnector && connect({ connector: injectedConnector })}
                        >
                            <Wallet strokeWidth={1}/>
                            Connect Wallet
                        </Button>
                    )}
                    <ThemeSwitcher />
                </div>
            </div>
        </div>
    )
}