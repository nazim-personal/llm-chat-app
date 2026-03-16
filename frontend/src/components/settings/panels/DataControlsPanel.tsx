import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SettingsItem } from '@/components/settings/SettingsItem';
import { ChevronRight } from 'lucide-react';

export default function DataControlsPanel() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Data controls</h1>
      <div className="flex flex-col gap-6">
        <SettingsItem
          label="Improve the model for everyone"
        >
          <Button variant="ghost" className="flex items-center gap-2">
            Off <ChevronRight className="h-4 w-4" />
          </Button>
        </SettingsItem>
        <Separator />
        <SettingsItem label="Shared links">
          <Button variant="outline">Manage</Button>
        </SettingsItem>
        <Separator />
        <SettingsItem label="Archived chats">
          <Button variant="outline">Manage</Button>
        </SettingsItem>
        <Separator />
        <SettingsItem label="Archive all chats">
          <Button variant="outline">Archive all</Button>
        </SettingsItem>
        <Separator />
        <SettingsItem label="Delete all chats">
          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive">
            Delete all
          </Button>
        </SettingsItem>
        <Separator />
        <SettingsItem label="Export data">
          <Button variant="outline">Export</Button>
        </SettingsItem>
      </div>
    </div>
  );
}
