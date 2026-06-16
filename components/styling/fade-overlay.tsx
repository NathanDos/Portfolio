interface FadeOverlayProps {
  show: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-8",
  md: "h-16",
  lg: "h-32",
};

export function FadeOverlay({ show, size = "md" }: FadeOverlayProps) {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 ${sizeMap[size]} bg-gradient-to-t from-white dark:from-neutral-900 to-transparent pointer-events-none transition-opacity duration-500`}
      style={{ opacity: show ? 1 : 0 }}
    />
  );
}