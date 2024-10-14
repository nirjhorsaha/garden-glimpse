/* eslint-disable prettier/prettier */
"use client";

import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { button as buttonStyles } from "@nextui-org/theme";
import { Spinner } from "@nextui-org/react";


import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/UI/theme-switch";
import {
    // TwitterIcon,
    // GithubIcon,
    // DiscordIcon,
    // Logo,
    SearchIcon,
} from "@/src/components/icons";
import { useUser } from "@/src/context/user.provider";

import NavbarDropdown from "../NavbarDropDown";


export const Navbar = () => {
    const { user, isLoading } = useUser();

    // console.log(user)


    const searchInput = (
        <Input
            aria-label="Search"
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
            }}
            // endContent={
            //   <Kbd className="hidden lg:inline-block" keys={["command"]}>
            //     K
            //   </Kbd>
            // }
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
        />
    );

    return (
        <NextUINavbar isBordered maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit ">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        {/* <Logo /> */}
                        <p className="font-bold text-inheritn text-2xl 
                        bg-gradient-to-r from-sky-500 from-30% to-green-500 to-70% inline-block text-transparent bg-clip-text">
                            Gargen Glimpse
                        </p>
                    </NextLink>
                </NavbarBrand>
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <NextLink
                                className={clsx(
                                    linkStyles({ color: "foreground" }),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                                )}
                                color="foreground"
                                href={item.href}
                            >
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>

            
            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                {/* <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
          <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
          <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
          </Link>
          </NavbarItem> */}
                <ThemeSwitch />
                <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
                {isLoading ? (
                    <NavbarItem>
                        <Spinner size="sm" />
                    </NavbarItem>
                ) : user?.email ? (
                    <NavbarItem className="hidden sm:flex gap-2">
                        <NavbarDropdown />
                    </NavbarItem>
                ) : (
                    <NavbarItem className="hidden md:flex">
                        <Link
                            className={buttonStyles({
                                color: "primary",
                                radius: "full",
                                variant: "shadow",
                            })}
                            href="/login"
                        >
                            Login
                        </Link>
                    </NavbarItem>
                )}
            </NavbarContent>


            {/* for small device */}
            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <Link isExternal aria-label="Github" href={siteConfig.links.github} />
                <ThemeSwitch />
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                {searchInput}
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2
                                        ? "primary"
                                        : index === siteConfig.navMenuItems.length - 1
                                            ? "danger"
                                            : "foreground"
                                }
                                href="#"
                                size="lg"
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};
