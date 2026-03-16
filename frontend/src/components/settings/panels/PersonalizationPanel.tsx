import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { SettingsItem } from '@/components/settings/SettingsItem';
import { HelpCircle, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PersonalizationPanel() {
  const characteristics = ['Warm', 'Enthusiastic', 'Headers & Lists', 'Emoji'];
  
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Personalization</h1>
      <div className="flex flex-col gap-8">
        
        <SettingsItem
          label="Base style and tone"
          description="Set the style and tone of how ChatGPT responds to you. This doesn't impact ChatGPT's capabilities."
        >
          <Select defaultValue="professional">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Professional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="direct">Direct</SelectItem>
            </SelectContent>
          </Select>
        </SettingsItem>

        <div className="space-y-4">
            <div>
                <h3 className="font-medium">Characteristics</h3>
                <p className="text-sm text-muted-foreground">
                    Choose additional customizations on top of your base style and tone.
                </p>
            </div>
            <div className="flex flex-col gap-6 pt-2">
                {characteristics.map((char) => (
                    <SettingsItem key={char} label={char}>
                        <Button variant="ghost" className="flex items-center gap-2 pr-0 text-muted-foreground hover:bg-transparent hover:text-foreground">
                        More <ChevronDown className="h-4 w-4" />
                        </Button>
                    </SettingsItem>
                ))}
            </div>
        </div>

        <div className="space-y-2">
            <p className="font-medium">Custom instructions</p>
            <Input defaultValue="Formal" />
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">About you</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium">Nickname</p>
              <Input defaultValue="Nazim" />
            </div>
            <div className="space-y-2">
              <p className="font-medium">Occupation</p>
              <Input defaultValue="Full-Stack Developer" />
            </div>
            <div className="space-y-2">
              <p className="font-medium">More about you</p>
              <Textarea
                defaultValue="I am a software developer in an IT company. My ambition is to become an AI Engineer."
                className="min-h-[80px]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">Memory</h2>
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
              </div>
              <Button variant="outline">Manage</Button>
          </div>
          <div className='flex flex-col gap-6'>
            <SettingsItem
                label="Reference saved memories"
                description="Let ChatGPT save and use memories when responding."
            >
                <Switch defaultChecked />
            </SettingsItem>
            <SettingsItem
                label="Reference chat history"
                description="Let ChatGPT reference recent conversations when responding."
            >
                <Switch defaultChecked />
            </SettingsItem>
          </div>
          <p className="text-xs text-muted-foreground">
            ChatGPT may use Memory to personalize queries to search providers.
          </p>
        </div>
      </div>
    </div>
  );
}
