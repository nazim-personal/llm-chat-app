interface SettingsItemProps {
  label: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}

export function SettingsItem({
  label,
  description,
  children,
}: SettingsItemProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <h3 className="font-medium">{label}</h3>
        {description && (
          <div className="max-w-md text-sm text-muted-foreground">
            {description}
          </div>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
