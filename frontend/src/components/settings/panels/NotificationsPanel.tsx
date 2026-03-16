import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SettingsItem } from '@/components/settings/SettingsItem';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function NotificationsPanel() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Notifications</h1>
      <div className="flex flex-col gap-6">
        <SettingsItem 
          label="Responses" 
          description="Get notified when ChatGPT responds to requests that take time, like research or image generation."
        >
          <Select defaultValue="push">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="push">Push</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </SettingsItem>

        <Separator />

        <SettingsItem 
          label="Group chats" 
          description="You'll receive notifications for new messages from group chats."
        >
          <Select defaultValue="push">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="push">Push</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </SettingsItem>

        <Separator />

        <SettingsItem 
          label="Tasks"
          description={
            <>
              Get notified when tasks you&apos;ve created have updates.
              <br />
              <Link href="#" className="text-primary hover:underline">
                Manage tasks
              </Link>
            </>
          }
        >
          <Select defaultValue="push">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="push">Push</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </SettingsItem>

        <Separator />

        <SettingsItem 
          label="Projects" 
          description="Get notified when you receive an email invitation to a shared project."
        >
          <Select defaultValue="email">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </SettingsItem>

        <Separator />

        <SettingsItem 
          label="Recommendations" 
          description="Stay in the loop on new tools, tips, and features from ChatGPT."
        >
          <Select defaultValue="push">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="push">Push</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </SettingsItem>

        <Separator />

        <SettingsItem 
          label="Usage"
          description="We'll notify you when limits reset for features like image creation."
        >
          <Select defaultValue="push-email">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="push-email">Push, Email</SelectItem>
              <SelectItem value="push">Push</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </SettingsItem>
      </div>
    </div>
  );
}
