'use client';

import {
  Bell,
  Cog,
  Grid3x3,
  HardDrive,
  Lock,
  Palette,
  Shield,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const settingsNav = [
  { name: 'General', href: '/settings', icon: Cog },
  { name: 'Notifications', href: '/settings/notifications', icon: Bell },
  { name: 'Personalization', href: '/settings/personalization', icon: Palette },
  { name: 'Apps', href: '/settings/apps', icon: Grid3x3 },
  { name: 'Data controls', href: '/settings/data-controls', icon: HardDrive },
  { name: 'Security', href: '/settings/security', icon: Lock },
  { name: 'Parental controls', href: '/settings/parental-controls', icon: Shield },
  { name: 'Account', href: '/settings/account', icon: User },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-1/2 top-1/2 z-50 grid h-[90vh] w-[90vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr] gap-4 rounded-lg border bg-background shadow-lg md:grid-cols-4 md:grid-rows-1">
        <div className="flex flex-col border-b p-4 md:col-span-1 md:border-r md:border-b-0">
          <h2 className="mb-4 px-2 text-2xl font-bold">Settings</h2>
          <nav className="flex flex-row gap-1 overflow-x-auto pb-2 md:flex-col md:overflow-x-visible md:pb-0">
            {settingsNav.map((item) => (
              <Link href={item.href} key={item.name} className="shrink-0">
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-3 px-3',
                    pathname === item.href && 'bg-accent'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
        <div className="h-full overflow-y-auto p-6 md:col-span-3">
          {children}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          onClick={() => router.back()}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  );
}
