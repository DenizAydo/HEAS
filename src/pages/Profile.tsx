import { Card } from "../components/ui/Card";
import { Chip } from "../components/ui/Chip";
import { Icon } from "../components/Icon";
import { PageHeader } from "../components/PageHeader";
import { AI_EXPERIENCE_OPTIONS, DOMAIN_OPTIONS } from "../data";
import type { Profile as ProfileT } from "../types";

interface Props {
  profile: ProfileT;
  setProfile: (p: ProfileT) => void;
}

export function Profile({ profile, setProfile }: Props) {
  return (
    <div>
      <PageHeader
        eyebrow="Profile & Context"
        title="Your Profile"
        description="These details help tailor recommendations more precisely to your area of responsibility and adjust confidence thresholds to your experience."
      />

      <div className="grid max-w-[880px] grid-cols-1 gap-[18px] md:grid-cols-2">
        <Card className="px-[26px] py-6">
          <div className="text-[11px] uppercase tracking-[0.16em] text-[#6b7280]">Experience</div>
          <div className="mb-[18px] mt-1 font-serif text-[20px]">Years in leadership</div>

          <div className="mb-3.5 flex items-baseline gap-2">
            <span className="font-serif text-[42px] font-medium tracking-[-0.03em]">
              {profile.years}
            </span>
            <span className="text-[#6b7280]">years</span>
          </div>
          <input
            type="range"
            min={0}
            max={30}
            step={1}
            value={profile.years}
            onChange={(e) => setProfile({ ...profile, years: parseInt(e.target.value, 10) })}
            className="range-slider"
          />
          <div className="mt-2 flex justify-between font-mono text-[11px] text-[#6b7280]">
            <span>0</span>
            <span>10</span>
            <span>20</span>
            <span>30+</span>
          </div>
        </Card>

        <Card className="px-[26px] py-6">
          <div className="text-[11px] uppercase tracking-[0.16em] text-[#6b7280]">Area</div>
          <div className="mb-[18px] mt-1 font-serif text-[20px]">Your domain</div>
          <select
            value={profile.domain}
            onChange={(e) => setProfile({ ...profile, domain: e.target.value })}
            className="w-full rounded-md border border-line-strong bg-bg-elev px-3 py-2.5 text-[13.5px] text-ink outline-none transition-[border-color,box-shadow] focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,168,83,0.2)]"
          >
            {DOMAIN_OPTIONS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <div className="mt-3 text-[12px] text-[#6b7280]">
            Controls which recommendation types are prioritized in your inbox.
          </div>
        </Card>

        <Card className="col-span-full px-[26px] py-6">
          <div className="text-[11px] uppercase tracking-[0.16em] text-[#6b7280]">
            AI experience
          </div>
          <div className="mb-[18px] mt-1 font-serif text-[20px]">
            How familiar are you with AI recommendations?
          </div>
          <div className="flex flex-wrap gap-2">
            {AI_EXPERIENCE_OPTIONS.map((o) => (
              <Chip
                key={o}
                active={profile.aiExp === o}
                onClick={() => setProfile({ ...profile, aiExp: o })}
              >
                {o}
              </Chip>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 flex max-w-[880px] items-start gap-3.5 rounded-[10px] border border-line bg-bg-elev px-[22px] py-[18px]">
        <Icon name="info" size={16} color="#6b5b95" />
        <div className="text-[13px] leading-[1.55] text-ink-soft">
          <strong className="text-ink">Privacy.</strong> Your profile details stay inside your
          instance and are not used in training data. You can adjust or reset them at any time.
        </div>
      </div>
    </div>
  );
}
