type SectionLabelProps = {
  code: string;
  title: string;
};

export default function SectionLabel({ code, title }: SectionLabelProps) {
  return (
    <div className="mb-7 flex items-center gap-3">
      <span className="h-2 w-2 animate-pulseSoft rounded-full bg-freq-ai" />
      <p className="font-heading text-xs uppercase tracking-[0.24em] text-secondaryText md:text-sm">
        {code} - {title}
      </p>
    </div>
  );
}
