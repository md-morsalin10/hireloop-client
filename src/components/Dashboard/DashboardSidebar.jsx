
import { Bars,  CirclePlus,  Envelope, Gear, House, Magnifier } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { div } from "motion/react-client";
import Link from "next/link";
import { RiProfileLine } from "react-icons/ri";

export function DashboardSidebar() {
    const navItems = [
        { icon: House, href: "/dashboard/recruiter", label: "Home" },
        { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: CirclePlus, href: "/dashboard/recruiter/jobs/new", label: "Post a Job" },
        { icon: RiProfileLine, href: "/dashboard/recruiter/company", label: "Company Profile" },
        { icon: Envelope, href: "/dashboard/recruiter/messages", label: "Messages" },
        { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
    ];

    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>
           <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-divider" >
               {navContent}
           </aside>
            <Drawer>
                <Button className={'lg:hidden'} variant="secondary">
                    <Bars />
                    sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}