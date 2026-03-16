import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SettingsItem } from '@/components/settings/SettingsItem';
import { ChevronRight, Sparkles, MessageSquare, Image, BrainCircuit, WandSparkles, Grid3x3, Globe, Linkedin, Github, X, Mail, Box } from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export default function AccountPanel() {
  const features = [
    { icon: Sparkles, text: 'Explore topics in depth' },
    { icon: MessageSquare, text: 'Chat longer and upload more content' },
    { icon: Image, text: 'Make more images for your projects' },
    { icon: BrainCircuit, text: 'Get more memory for smarter replies' },
    { icon: WandSparkles, text: 'Get help with planning and tasks' },
    { icon: Grid3x3, text: 'Explore projects, tasks, and custom GPTs' },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Account</h1>
      <div className="flex flex-col gap-8">
        
        <SettingsItem label="Delete account">
            <Button variant="destructive">Delete</Button>
        </SettingsItem>

        <Separator />
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">GPT builder profile</h2>
          <p className="text-sm text-muted-foreground -mt-4">
            Personalize your builder profile to connect with users of your GPTs. These settings apply to publicly shared GPTs.
          </p>
          <div className="rounded-lg border bg-secondary/50 p-4">
            <div className="text-right mb-2">
                <span className="text-xs text-muted-foreground">Preview</span>
            </div>
            <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-lg border-2 border-dashed border-muted-foreground/50 mb-3">
                    <Box className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold">PlaceholderGPT</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>By abdul-nazim-github</span>
                    <Github className="h-4 w-4" />
                </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Links</h2>
            <SettingsItem label={<div className="flex items-center gap-2"><Globe className="h-5 w-5 text-muted-foreground" /> Website</div>}>
                <Select>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select a domain" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="domain1">domain1.com</SelectItem>
                        <SelectItem value="domain2">domain2.com</SelectItem>
                    </SelectContent>
                </Select>
            </SettingsItem>
            <SettingsItem label={<div className="flex items-center gap-2"><Linkedin className="h-5 w-5 text-muted-foreground" /> LinkedIn</div>}>
                <Button variant="outline">Add</Button>
            </SettingsItem>
             <SettingsItem label={<div className="flex items-center gap-2"><Github className="h-5 w-5 text-muted-foreground" /> GitHub</div>}>
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">abdul-nazim-github</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </SettingsItem>
        </div>

        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Email</h2>
             <div className="flex items-center gap-3 text-sm pt-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>abdul.nazim@codeclouds.com</span>
             </div>
             <div className="flex items-center space-x-3 pt-4 pl-1">
                <Checkbox id="feedback-emails" />
                <label
                    htmlFor="feedback-emails"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Receive feedback emails
                </label>
            </div>
        </div>

        <Separator />

        <SettingsItem label="Name">
          <span className="text-muted-foreground">Sk Abdul Nazim</span>
        </SettingsItem>

        <SettingsItem label="Email">
          <Button variant="ghost" className="flex items-center gap-2 pr-0 text-muted-foreground hover:bg-transparent hover:text-foreground">
            abdul.nazim@codeclouds.com <ChevronRight className="h-4 w-4" />
          </Button>
        </SettingsItem>

        <Separator />

        <SettingsItem label="Get ChatGPT Go">
          <Button>Upgrade</Button>
        </SettingsItem>

        <div className="space-y-4">
            <h3 className="font-semibold">Get everything in Free, and more.</h3>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                        <feature.icon className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">{feature.text}</span>
                    </li>
                ))}
            </ul>
        </div>
        
        <Separator />

        <SettingsItem 
            label="Payment"
            description={
                <Link href="#" className="text-primary hover:underline">
                    Need help with billing?
                </Link>
            }
        >
          <Button variant="outline">Manage</Button>
        </SettingsItem>
      </div>
    </div>
  );
}
