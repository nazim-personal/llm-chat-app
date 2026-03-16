'use client';

import { useState } from 'react';
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
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import GeneralSettingsPanel from '@/components/settings/panels/GeneralPanel';
import NotificationsPanel from '@/components/settings/panels/NotificationsPanel';
import PersonalizationPanel from '@/components/settings/panels/PersonalizationPanel';
import AppsPanel from '@/components/settings/panels/AppsPanel';
import DataControlsPanel from '@/components/settings/panels/DataControlsPanel';
import SecurityPanel from '@/components/settings/panels/SecurityPanel';
import ParentalControlsPanel from '@/components/settings/panels/ParentalControlsPanel';
import AccountPanel from '@/components/settings/panels/AccountPanel';

const settingsNav = [
  { id: 'general', name: 'General', icon: Cog, component: GeneralSettingsPanel },
  { id: 'notifications', name: 'Notifications', icon: Bell, component: NotificationsPanel },
  { id: 'personalization', name: 'Personalization', icon: Palette, component: PersonalizationPanel },
  { id: 'apps', name: 'Apps', icon: Grid3x3, component: AppsPanel },
  { id: 'data-controls', name: 'Data controls', icon: HardDrive, component: DataControlsPanel },
  { id: 'security', name: 'Security', icon: Lock, component: SecurityPanel },
  { id: 'parental-controls', name: 'Parental controls', icon: Shield, component: ParentalControlsPanel },
  { id: 'account', name: 'Account', icon: User, component: AccountPanel },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activePanel, setActivePanel] = useState('general');
  const router = useRouter();

  const ActivePanelComponent = settingsNav.find(
    (item) => item.id === activePanel
  )?.component;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-1/2 top-1/2 z-50 grid h-[90vh] w-[90vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr] gap-4 rounded-lg border bg-background shadow-lg md:grid-cols-4 md:grid-rows-1">
        <div className="flex flex-col border-b p-4 md:col-span-1 md:border-r md:border-b-0">
          <h2 className="mb-4 px-2 text-2xl font-bold">Settings</h2>
          <nav className="flex flex-row gap-1 overflow-x-auto pb-2 md:flex-col md:overflow-x-visible md:pb-0">
            {settingsNav.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  'w-full shrink-0 justify-start gap-3 px-3',
                  activePanel === item.id && 'bg-accent'
                )}
                onClick={() => setActivePanel(item.id)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Button>
            ))}
          </nav>
        </div>
        <div className="h-full overflow-y-auto p-6 md:col-span-3">
          {ActivePanelComponent && <ActivePanelComponent />}
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
