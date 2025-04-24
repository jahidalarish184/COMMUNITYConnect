
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  index?: number;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon,
  className,
  index = 0
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "feature-card opacity-0",
        className
      )}
      style={{
        animationName: 'slideUp',
        animationDuration: '0.6s',
        animationFillMode: 'forwards',
        animationDelay: `${0.1 + index * 0.1}s`
      }}
    >
      <div className="relative z-10">
        <div className="mb-5 inline-flex p-3 rounded-2xl bg-accent1-50 text-accent1-500">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-community-600">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
