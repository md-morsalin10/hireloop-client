"use client"
import { authClient } from "@/lib/auth-client";
import { ArrowRightFromSquare, } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";



const NavbarProfileDropdown = () => {
    const router = useRouter()
    const { data: session } = authClient.useSession();
    const user = session?.user

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/")
    }

    return (
        <div>
            <Dropdown>
                <Dropdown.Trigger className="rounded-full">
                    <Avatar>
                        <Avatar.Image
                            referrerPolicy="no-referrer"
                            alt={user?.name}
                            src={user?.image}
                            
                        />
                        <Avatar.Fallback delayMs={600}>{user?.name[0]}</Avatar.Fallback>
                    </Avatar>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                    <div className="px-3 pt-3 pb-1">
                        <div className="flex items-center gap-2">
                            <Avatar size="sm">
                                <Avatar.Image
                                    alt={user?.name}
                                    src={user?.image}
                                />
                                <Avatar.Fallback delayMs={600}>{user?.name[0]}</Avatar.Fallback>
                            </Avatar>
                            <div className="flex flex-col gap-0">
                                <p className="text-sm leading-5 font-medium">{user?.name}</p>
                                <p className="text-xs leading-none text-muted">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                    <Dropdown.Menu>
                        <Dropdown.Item id="dashboard" textValue="Dashboard">
                            <Link href={'/'}>
                                <Label>Company</Label>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item id="profile" textValue="Profile">
                            <Link href={'/my-profile'}>
                                <Label>Profile</Label>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item id="settings" textValue="Settings">
                            <div className="flex w-full items-center justify-between gap-2">
                                <Link href={'/'}>
                                    <Label>Jobs</Label>
                                </Link>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={handleSignOut}
                            id="logout" textValue="Logout" variant="danger">
                            <div className="flex w-full items-center justify-between gap-2">
                                <Label>Log Out</Label>
                                <ArrowRightFromSquare className="size-3.5 text-danger" />
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
        </div>
    );
};

export default NavbarProfileDropdown;