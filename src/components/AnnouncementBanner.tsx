
import { useState } from "react";
import { X } from "lucide-react";

interface AnnouncementBannerProps {
  message: string;
  linkText?: string;
  linkUrl?: string;
}

const AnnouncementBanner = ({
  message,
  linkText,
  linkUrl,
}: AnnouncementBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-accent1-500 text-white py-2 relative">
      <div className="container mx-auto px-4 text-center text-sm md:text-base">
        <p>
          {message}{" "}
          {linkText && linkUrl && (
            <a
              href={linkUrl}
              className="font-semibold underline hover:text-white/90 transition-colors"
            >
              {linkText}
            </a>
          )}
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
