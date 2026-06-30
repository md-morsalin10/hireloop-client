
import { getUserSeason } from "@/lib/core/session";
import { Bars, Bookmark, BriefcaseFill, CirclePlus, CreditCard, Envelope, FileText, Gear, House, LayoutCells, Magnifier } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { BiBuilding } from "react-icons/bi";
import { FaPeopleArrows } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdDashboardCustomize } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";

export async function DashboardSidebar() {

    const user = await getUserSeason()

    const recruiterItems = [
        { icon: House, href: "/dashboard/recruiter", label: "Home" },
        { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: CirclePlus, href: "/dashboard/recruiter/jobs/new", label: "Post a Job" },
        { icon: RiProfileLine, href: "/dashboard/recruiter/company", label: "Company Profile" },
        { icon: Envelope, href: "/dashboard/recruiter/messages", label: "Messages" },
        { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
    ];

    const adminItems = [
        { icon: LayoutCells, href: "/dashboard/admin", label: "Dashboard" },
        { icon: FaPeopleArrows, href: "/dashboard/admin/users", label: "Users" },
        { icon: BiBuilding, href: "/dashboard/admin/companies", label: "Companies" },
        { icon: BriefcaseFill, href: "/dashboard/admin/jobs", label: "Jobs" },
        { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
        { icon: FiSettings, href: "/dashboard/admin/settings", label: "Settings" }
    ];

    const seekerNavItems = [
        {
            icon: MdDashboardCustomize, // বা আপনার প্রজেক্টের গ্রিড আইকনটি (যেমন: Grid, Squares2x2)
            href: "/dashboard/seeker",
            label: "Dashboard"
        },
        {
            icon: Magnifier, // অথবা Search আইকন
            href: "/dashboard/seeker/jobs",
            label: "Jobs"
        },
        {
            icon: Bookmark, // অথবা Ribbon, BookMarked আইকনটি Saved Jobs এর জন্য
            href: "/dashboard/seeker/saved-jobs",
            label: "Saved Jobs"
        },
        {
            icon: FileText, 
            href: "/dashboard/seeker/applications",
            label: "Applications"
        },
        {
            icon: CreditCard, // অথবা Wallet / Banknotes আইকন Billing এর জন্য
            href: "/dashboard/seeker/billing",
            label: "Billing"
        },
        {
            icon: Gear, // অথবা Settings/Sun আইকন 
            href: "/dashboard/seeker/settings",
            label: "Settings"
        }
    ];

    const navLinksMap = {
        seeker: seekerNavItems,
        recruiter: recruiterItems,
        admin: adminItems
    }

    const navItems = navLinksMap[user?.role]


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