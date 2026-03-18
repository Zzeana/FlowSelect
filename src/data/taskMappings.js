// Keyword-to-tool mappings for the recommendation engine.
// Each entry has keywords (matched against user query) and a tool relevance map.
// relevance: 100 = perfect match, 60 = secondary match

export const taskMappings = [
  {
    id: 'interview-analysis',
    label: 'Analyze user interviews',
    keywords: ['interview', 'transcri', 'qualitative', 'analyze', 'analysis', 'user research', 'participant', 'quote'],
    tools: {
      'dovetail': 95,
      'chatgpt': 75,
      'claude': 78,
      'otter-ai': 70,
      'grain': 65,
      'notion-ai': 55,
      'descript': 60,
    },
    matchExplanation: {
      'dovetail': 'Best for qualitative data analysis — purpose-built for coding and synthesizing interviews',
      'chatgpt': 'Good for synthesizing 5-10 transcripts with manual prompting',
      'claude': 'Strong for analyzing long transcripts with nuanced reasoning',
      'otter-ai': 'Handles transcription; limited synthesis',
      'grain': 'Great for creating highlight clips from interview recordings',
    },
  },
  {
    id: 'many-interviews',
    label: 'Synthesize many interviews (20+)',
    keywords: ['many interviews', 'bulk', 'large scale', '20 interview', '30 interview', '40 interview', '50 interview', 'multiple interviews', 'batch'],
    tools: {
      'dovetail': 98,
      'condens': 85,
      'chatgpt': 60,
      'claude': 65,
    },
    matchExplanation: {
      'dovetail': 'Gold standard for synthesizing 20+ interviews — automated coding and theme detection',
      'condens': 'Solid Dovetail alternative with AI tagging across large datasets',
      'chatgpt': 'Possible for 20+ but requires manual chunking and iteration',
    },
  },
  {
    id: 'usability-testing',
    label: 'Run a usability test',
    keywords: ['usability', 'usability test', 'test prototype', 'test design', 'user test', 'task test', 'navigation test', 'prototype test'],
    tools: {
      'maze': 90,
      'lyssna': 85,
      'usertesting': 80,
      'lookback': 82,
      'loop11': 70,
      'userbrain': 68,
      'optimal-workshop': 65,
    },
    matchExplanation: {
      'maze': 'Best for fast unmoderated prototype testing with Figma integration',
      'lyssna': 'Affordable option for preference and task-based tests',
      'lookback': 'Best for moderated sessions requiring real-time follow-up',
      'usertesting': 'Enterprise-grade moderated and unmoderated testing',
    },
  },
  {
    id: 'card-sort',
    label: 'Card sort or tree test',
    keywords: ['card sort', 'card sorting', 'tree test', 'navigation', 'information architecture', 'taxonomy', 'menu structure', 'ia test'],
    tools: {
      'optimal-workshop': 98,
      'maze': 65,
      'lyssna': 60,
    },
    matchExplanation: {
      'optimal-workshop': 'Gold standard for card sorting and tree testing — purpose-built for IA research',
      'maze': 'Supports some IA testing but less specialized',
    },
  },
  {
    id: 'competitive-research',
    label: 'Competitive research / market analysis',
    keywords: ['competitive', 'competitor', 'market research', 'landscape', 'benchmark', 'industry', 'secondary research'],
    tools: {
      'perplexity': 92,
      'chatgpt': 80,
      'claude': 78,
      'gemini': 75,
      'notion-ai': 55,
    },
    matchExplanation: {
      'perplexity': 'Best for cited competitive research with real-time web access',
      'chatgpt': 'Good for structuring competitive analysis with known context',
      'gemini': 'Strong when needing current web data with Google integration',
    },
  },
  {
    id: 'persona-creation',
    label: 'Create user personas',
    keywords: ['persona', 'user persona', 'character', 'archetype', 'user profile', 'customer profile'],
    tools: {
      'chatgpt': 88,
      'claude': 85,
      'dovetail': 80,
      'miro-ai': 65,
      'figjam-ai': 60,
      'notion-ai': 55,
    },
    matchExplanation: {
      'chatgpt': 'Excellent for generating structured persona documents from research data',
      'claude': 'Strong for nuanced, evidence-based persona development',
      'dovetail': 'Synthesizes research data into insights that inform personas',
    },
  },
  {
    id: 'mood-board',
    label: 'Create mood board / visual direction',
    keywords: ['mood board', 'moodboard', 'visual direction', 'visual style', 'aesthetic', 'look and feel', 'brand direction', 'inspiration'],
    tools: {
      'midjourney': 95,
      'adobe-firefly': 80,
      'dall-e': 72,
      'chatgpt': 45,
    },
    matchExplanation: {
      'midjourney': 'Best quality for artistic mood boards and visual direction',
      'adobe-firefly': 'Commercially safe alternative with Creative Cloud integration',
      'dall-e': 'Quick concept images accessible directly in ChatGPT',
    },
  },
  {
    id: 'wireframing',
    label: 'Create wireframes',
    keywords: ['wireframe', 'wireframing', 'sketch', 'low fidelity', 'lo-fi', 'layout', 'rough design', 'mockup draft'],
    tools: {
      'uizard': 90,
      'visily': 85,
      'whimsical-ai': 80,
      'figma-ai': 70,
      'galileo-ai': 65,
    },
    matchExplanation: {
      'uizard': 'Best for converting sketches and generating wireframes from text',
      'visily': 'Strong template library and screenshot-to-wireframe conversion',
      'whimsical-ai': 'Great for user flows and diagram-style wireframes',
      'figma-ai': 'Best for experienced Figma users who want AI assistance within existing workflow',
    },
  },
  {
    id: 'ui-design',
    label: 'Design UI screens / mockups',
    keywords: ['ui design', 'screen design', 'high fidelity', 'hi-fi', 'mockup', 'interface design', 'app design', 'product design'],
    tools: {
      'figma-ai': 95,
      'galileo-ai': 85,
      'uizard': 72,
      'framer': 65,
      'v0': 60,
    },
    matchExplanation: {
      'figma-ai': 'Best for designers already in Figma who need AI-assisted UI work',
      'galileo-ai': 'Generates high-fidelity screens from prompts, exports to Figma',
      'uizard': 'Good for non-designers needing first-pass UI quickly',
    },
  },
  {
    id: 'design-to-code',
    label: 'Convert design to code',
    keywords: ['code', 'developer handoff', 'design to code', 'react component', 'frontend code', 'html', 'css', 'implementation', 'export code'],
    tools: {
      'locofy': 92,
      'anima': 88,
      'v0': 85,
      'framer': 75,
    },
    matchExplanation: {
      'locofy': 'Best for converting Figma designs to React/Vue production code',
      'anima': 'Strong Figma-to-code conversion with browser prototype preview',
      'v0': 'Generates deployable React components from descriptions — ideal with dev skills',
    },
  },
  {
    id: 'website-prototype',
    label: 'Build a website prototype',
    keywords: ['website', 'landing page', 'web prototype', 'web design', 'site design', 'portfolio site', 'marketing page'],
    tools: {
      'framer': 95,
      'v0': 80,
      'uizard': 65,
      'figma-ai': 60,
    },
    matchExplanation: {
      'framer': 'Best for responsive website prototypes that can go live quickly',
      'v0': 'Generates deployable website code — ideal for technically proficient designers',
    },
  },
  {
    id: 'brainstorm',
    label: 'Brainstorm ideas / concepts',
    keywords: ['brainstorm', 'ideas', 'concept', 'ideate', 'generate ideas', 'think of', 'explore', 'possibilities', 'alternatives'],
    tools: {
      'chatgpt': 88,
      'claude': 85,
      'miro-ai': 80,
      'figjam-ai': 75,
      'whimsical-ai': 70,
      'tome': 60,
    },
    matchExplanation: {
      'chatgpt': 'Fast idea generation across any topic with conversational iteration',
      'claude': 'More structured brainstorming with careful consideration of trade-offs',
      'miro-ai': 'Best for collaborative team brainstorming on a shared visual canvas',
    },
  },
  {
    id: 'user-flows',
    label: 'Map user flows / journeys',
    keywords: ['user flow', 'flow diagram', 'user journey', 'journey map', 'flowchart', 'process map', 'task flow', 'interaction flow'],
    tools: {
      'whimsical-ai': 92,
      'miro-ai': 85,
      'figjam-ai': 82,
      'chatgpt': 70,
      'figma-ai': 65,
    },
    matchExplanation: {
      'whimsical-ai': 'Best for generating clean user flow diagrams from text descriptions',
      'miro-ai': 'Strong for collaborative journey mapping workshops',
      'figjam-ai': 'Ideal for Figma teams needing flows alongside design files',
    },
  },
  {
    id: 'transcription',
    label: 'Transcribe interviews / meetings',
    keywords: ['transcript', 'transcribe', 'meeting notes', 'record', 'note-taking', 'caption', 'audio to text'],
    tools: {
      'otter-ai': 95,
      'grain': 88,
      'descript': 80,
      'chatgpt': 40,
    },
    matchExplanation: {
      'otter-ai': 'Best real-time transcription with speaker identification',
      'grain': 'Best for interview recordings with shareable highlights',
      'descript': 'Best for editing recordings alongside transcripts',
    },
  },
  {
    id: 'presentation',
    label: 'Create a design presentation',
    keywords: ['presentation', 'deck', 'slides', 'present', 'pitch', 'stakeholder', 'showcase', 'share findings'],
    tools: {
      'tome': 90,
      'beautiful-ai': 85,
      'chatgpt': 70,
      'notion-ai': 60,
      'microsoft-copilot': 65,
    },
    matchExplanation: {
      'tome': 'Generates full AI presentation decks from a prompt — fastest option',
      'beautiful-ai': 'Smart layouts ensure professional look without manual formatting',
      'chatgpt': 'Generate outline and content to paste into any presentation tool',
    },
  },
  {
    id: 'heatmaps-analytics',
    label: 'Analyze user behavior on live product',
    keywords: ['heatmap', 'analytics', 'click map', 'session recording', 'rage click', 'drop off', 'funnel', 'conversion', 'live product'],
    tools: {
      'hotjar': 95,
      'microsoft-copilot': 30,
      'usertesting': 55,
    },
    matchExplanation: {
      'hotjar': 'Industry standard for heatmaps, session recordings, and behavior analytics on live products',
    },
  },
  {
    id: 'ux-copy',
    label: 'Write UX copy / microcopy',
    keywords: ['ux copy', 'microcopy', 'copy', 'writing', 'button text', 'cta', 'onboarding', 'error message', 'tooltip', 'empty state'],
    tools: {
      'chatgpt': 88,
      'claude': 85,
      'copy-ai': 82,
      'jasper': 70,
    },
    matchExplanation: {
      'chatgpt': 'Excellent for generating and iterating on UX microcopy variations',
      'claude': 'Strong for nuanced copy with consideration of tone and context',
      'copy-ai': 'Purpose-built templates for UX copy patterns',
    },
  },
  {
    id: 'affinity-mapping',
    label: 'Affinity mapping / cluster data',
    keywords: ['affinity map', 'affinity', 'cluster', 'group', 'sticky notes', 'sort', 'categorize', 'themes'],
    tools: {
      'miro-ai': 92,
      'figjam-ai': 88,
      'dovetail': 85,
      'chatgpt': 70,
    },
    matchExplanation: {
      'miro-ai': 'AI-powered affinity clustering on a collaborative canvas',
      'figjam-ai': 'Sticky note sorting within the Figma ecosystem',
      'dovetail': 'Best for affinity mapping of research data with traceability to sources',
    },
  },
  {
    id: 'voice-prototype',
    label: 'Prototype a voice or audio interface',
    keywords: ['voice', 'voice ui', 'audio', 'narration', 'voice over', 'speech', 'ivr', 'conversational', 'voice interface'],
    tools: {
      'elevenlabs': 95,
      'descript': 70,
      'chatgpt': 55,
    },
    matchExplanation: {
      'elevenlabs': 'Best for creating realistic voice prototypes and narrations',
      'descript': 'Edit audio recordings and generate voiceovers for prototype videos',
    },
  },
]

// Example prompts shown on the homepage task input
export const examplePrompts = [
  'Synthesize 30 user interview transcripts into themes',
  'Create user personas from qualitative research data',
  'Run a usability test on a Figma prototype',
  'Generate wireframe variations for a mobile onboarding flow',
  'Analyze competitor products for a redesign',
  'Write UX copy for an empty state and error messages',
  'Build a clickable website prototype quickly',
  'Map the user journey for a checkout flow',
]

// Core recommendation engine
export function recommendTools(query, allTools) {
  if (!query || query.trim().length < 2) return []

  const lowerQuery = query.toLowerCase()
  const scores = {}
  const explanations = {}

  taskMappings.forEach(mapping => {
    const matchCount = mapping.keywords.filter(k => lowerQuery.includes(k.toLowerCase())).length
    if (matchCount > 0) {
      const weight = matchCount / Math.max(mapping.keywords.length * 0.3, 1)
      Object.entries(mapping.tools).forEach(([toolId, relevance]) => {
        const contribution = weight * relevance
        scores[toolId] = (scores[toolId] || 0) + contribution
        if (mapping.matchExplanation?.[toolId] && !explanations[toolId]) {
          explanations[toolId] = mapping.matchExplanation[toolId]
        }
      })
    }
  })

  if (Object.keys(scores).length === 0) {
    // Fallback: partial word match
    taskMappings.forEach(mapping => {
      const words = lowerQuery.split(/\s+/).filter(w => w.length > 3)
      words.forEach(word => {
        const partialMatch = mapping.keywords.some(k => k.toLowerCase().includes(word) || word.includes(k.toLowerCase()))
        if (partialMatch) {
          Object.entries(mapping.tools).forEach(([toolId, relevance]) => {
            scores[toolId] = (scores[toolId] || 0) + relevance * 0.4
          })
        }
      })
    })
  }

  const ranked = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id]) => {
      const tool = allTools.find(t => t.id === id)
      if (!tool) return null
      return {
        ...tool,
        matchExplanation: explanations[id] || `Useful for "${lowerQuery}" tasks`,
      }
    })
    .filter(Boolean)

  return ranked
}
