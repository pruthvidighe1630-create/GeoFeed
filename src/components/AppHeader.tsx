import geoFeedLogo from "@/assets/geofeed-logo.jpeg";

interface AppHeaderProps {
  subtitle: string;
  title: string;
  children?: React.ReactNode;
}

const AppHeader = ({ subtitle, title, children }: AppHeaderProps) => (
  <div className="bg-primary px-4 pb-6 pt-8">
    <div className="flex items-center gap-3 mb-2">
      <img src={geoFeedLogo} alt="GeoFeed" className="h-10 w-10 rounded-lg object-contain bg-primary-foreground/90" />
      <span className="font-display text-sm font-semibold text-primary-foreground/80">GeoFeed</span>
    </div>
    <p className="text-sm text-primary-foreground/70">{subtitle}</p>
    <h1 className="font-display text-2xl font-bold text-primary-foreground">{title}</h1>
    {children}
  </div>
);

export default AppHeader;
