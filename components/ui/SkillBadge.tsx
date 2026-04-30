type SkillBadgeProps = {
  label: string;
};

export default function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="rounded-full border border-[rgba(0,212,255,0.2)] bg-[rgba(0,212,255,0.08)] px-3 py-1 text-xs text-[rgb(123,228,248)]">
      {label}
    </span>
  );
}
