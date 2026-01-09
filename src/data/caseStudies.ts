export interface CaseStudy {
      id: string;
      client: string;
      description: string;
      year: string;
      category: string;
      image?: string;
      sections: {
            context: string;
            strategicQuestion: string;
            constraintsAndTradeoffs: string;
            theSystem: string;
            outcome: string;
            reflection: string;
      };
      relatedInsights: string[];
}

export const caseStudies: CaseStudy[] = [
      {
            id: "meridien",
            client: "Meridien Ventures",
            description: "Repositioning a legacy investment firm for a new generation of founders.",
            year: "2025",
            category: "Strategic Positioning",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200",
            sections: {
                  context: "Meridien Ventures had operated for fifteen years as a respected middle-market investment firm. Their reputation was built on quiet competence and long-term relationships.",
                  strategicQuestion: "How do you modernize a 15-year-old brand without abandoning the qualities that made it trustworthy?",
                  constraintsAndTradeoffs: "The existing visual identity would remain. Speed mattered more than perfection. We needed visible change within 90 days.",
                  theSystem: "We built a content-first digital presence designed to demonstrate thinking rather than claim expertise.",
                  outcome: "Qualified inbound leads increased by three times. The sales cycle shortened by approximately 60%.",
                  reflection: "Perception problems are rarely solved by visual changes alone. Constraints forced more creative thinking."
            },
            relatedInsights: []
      },
      {
            id: "atelier-noire",
            client: "Atelier Noire",
            description: "Building editorial authority for a luxury interior studio.",
            year: "2025",
            category: "Editorial Strategy",
            image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
            sections: {
                  context: "Atelier Noire had spent a decade building a reputation through word of mouth, but had no digital presence. Larger firms were capturing search traffic.",
                  strategicQuestion: "How do you build digital presence without compromising exclusivity?",
                  constraintsAndTradeoffs: "Principals were uncomfortable with promotional language. Resources were limited. SEO would be the primary lever.",
                  theSystem: "We developed an editorial strategy that treated the website as a design publication rather than a marketing property.",
                  outcome: "Organic search traffic increased by 85%. Ranked on page one for all primary keywords.",
                  reflection: "Editorial quality can compete with marketing volume, but requires patience and consistency."
            },
            relatedInsights: []
      },
      {
            id: "commonwealth",
            client: "Commonwealth Capital",
            description: "Establishing trust through restraint for a boutique advisory.",
            year: "2024",
            category: "Experience Design",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
            sections: {
                  context: "Commonwealth Capital received a steady stream of inquiries, but 60% were unqualified, draining partner resources.",
                  strategicQuestion: "How do you design a digital presence that actively discourages the wrong prospects?",
                  constraintsAndTradeoffs: "Partners wanted to maintain approachability. We could not use traditional pre-qualification forms.",
                  theSystem: "We rebuilt the digital presence around clarity: who they serve and how they think, using friction as a tool.",
                  outcome: "Unqualified inquiries dropped by 70%. Deal size for new clients increased by 25%.",
                  reflection: "Clarity is a filter, and filters create value. Sophisticated clients respect precision."
            },
            relatedInsights: []
      }
];

export function getCaseStudy(id: string): CaseStudy | undefined {
      return caseStudies.find(study => study.id === id);
}

export function getRelatedCaseStudies(currentId: string, limit: number = 2): CaseStudy[] {
      return caseStudies.filter(study => study.id !== currentId).slice(0, limit);
}
