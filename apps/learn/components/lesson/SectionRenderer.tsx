"use client";

import { AnySection } from "@/lib/lessons/types";
import { IntroSectionComponent } from "./IntroSection";
import { ConceptSectionComponent } from "./ConceptSection";
import { ExerciseSectionComponent } from "./ExerciseSection";
import { FormSectionComponent } from "./FormSection";
import { CodeSectionComponent } from "./CodeSection";
import { CalloutSectionComponent } from "./CalloutSection";
import { ComparisonSectionComponent } from "./ComparisonSection";
import { BonusSectionComponent } from "./BonusSection";
import { ModeToggleSectionComponent } from "./ModeToggleSection";
import { ProjectIdeasSectionComponent } from "./ProjectIdeasSection";
import { DetailsSectionComponent } from "./DetailsSection";
import { NavLinksSectionComponent } from "./NavLinksSection";
import { ParadigmSectionComponent } from "./ParadigmSection";
import { AffirmationSectionComponent } from "./AffirmationSection";
import { SocialFollowSectionComponent } from "./SocialFollowSection";
import { ReferralSectionComponent } from "./ReferralSection";
import { SectionDivider } from "./SectionDivider";

export { SectionDivider };

interface SectionRendererProps {
  section: AnySection;
  isPreview: boolean;
  day: number;
}

export function SectionRenderer({
  section,
  isPreview,
  day,
}: SectionRendererProps) {
  const renderSection = () => {
    switch (section.type) {
      case "intro":
        return <IntroSectionComponent section={section} />;
      case "concept":
        return <ConceptSectionComponent section={section} />;
      case "exercise":
        return <ExerciseSectionComponent section={section} />;
      case "form":
        return (
          <FormSectionComponent
            section={section}
            isPreview={isPreview}
            day={day}
          />
        );
      case "code":
        return <CodeSectionComponent section={section} />;
      case "callout":
        return <CalloutSectionComponent section={section} />;
      case "comparison":
        return <ComparisonSectionComponent section={section} />;
      case "bonus":
        return <BonusSectionComponent section={section} />;
      case "mode-toggle":
        return <ModeToggleSectionComponent section={section} />;
      case "project-ideas":
        return <ProjectIdeasSectionComponent section={section} />;
      case "details":
        return <DetailsSectionComponent section={section} />;
      case "nav-links":
        return <NavLinksSectionComponent section={section} />;
      case "paradigm":
        return <ParadigmSectionComponent section={section} />;
      case "affirmation":
        return <AffirmationSectionComponent section={section} />;
      case "social-follow":
        return <SocialFollowSectionComponent section={section} />;
      case "referral":
        return <ReferralSectionComponent section={section} />;
      default:
        return null;
    }
  };

  // Wrap with an element that has the section ID for anchor navigation
  return (
    <div id={section.id} className="scroll-mt-24">
      {renderSection()}
    </div>
  );
}
