import { SettingsItem } from '../SettingsItem';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '../../ui/separator';

export default function GeneralPanel() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">General</h1>
      <div className="flex flex-col gap-6">
        <SettingsItem label="Appearance">
          <Select defaultValue="system">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </SettingsItem>
        <Separator />
        <SettingsItem label="Accent color">
          <Select defaultValue="default">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary" /> Default
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </SettingsItem>
        <Separator />
        <SettingsItem label="Language">
          <Select defaultValue="en-us">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-us">English (US)</SelectItem>
            </SelectContent>
          </Select>
        </SettingsItem>
        <Separator />
        <SettingsItem
          label="Spoken language"
          description="For best results, select the language you mainly speak. If it's not listed, it may still be supported via auto-detection."
        >
          <Select defaultValue="auto">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto-detect</SelectItem>
            </SelectContent>
          </Select>
        </SettingsItem>
        <Separator />
        <SettingsItem label="Voice">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Play className="mr-2 h-4 w-4" />
              Play
            </Button>
            <Select defaultValue="ember">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ember">Ember</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SettingsItem>
        <Separator />
        <SettingsItem
          label="Separate Voice"
          description="Keep ChatGPT Voice in a separate full screen, without real time transcripts and visuals."
        >
          <Switch />
        </SettingsItem>
      </div>
    </div>
  );
}
