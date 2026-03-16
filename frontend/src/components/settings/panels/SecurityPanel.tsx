import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SettingsItem } from '@/components/settings/SettingsItem';

export default function SecurityPanel() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Security</h1>
      <div className="flex flex-col gap-6">
        <SettingsItem
          label="Multi-factor authentication"
          description="Add an extra layer of security to your account. You'll need to enter a code from your authenticator app."
        >
          <Button variant="outline">Enable</Button>
        </SettingsItem>
        <Separator />
        <SettingsItem
          label="Active sessions"
          description="See where your account is currently signed in."
        >
          <Button variant="outline">Manage</Button>
        </SettingsItem>
        <Separator />
        <SettingsItem
          label="Log out of all other devices"
          description="This will sign you out of all other active sessions on all devices."
        >
          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive">
            Log out
          </Button>
        </SettingsItem>
      </div>
    </div>
  );
}
