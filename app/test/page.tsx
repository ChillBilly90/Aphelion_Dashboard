"use client";

type PanelFrameProps = {
  src: string;
  title: string;
  height?: string;
};

export default function PanelFrame({
  src,
  title,
  height = "250px",
}: PanelFrameProps) {
  return (
    <div>
      <h3 className="mb-2 text-sm text-white/70">{title}</h3>
      <div
        className="overflow-hidden rounded-xl border border-white/5 bg-black/20"
        style={{ height }}
      >
        <iframe
          src={src}
          title={title}
          className="h-full w-full"
          frameBorder="0"
        />
      </div>
    </div>
  );
}