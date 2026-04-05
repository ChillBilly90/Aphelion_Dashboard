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
    <div className="h-[250px] overflow-hidden rounded-xl border border-white/5" style={{ height }}>
      <iframe
        src={src}
        title={title}
        className="h-full w-full"
      />
    </div>
  );
}