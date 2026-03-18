export const stages = [
  {
    id: 'research',
    name: 'Research',
    icon: '🔍',
    color: '#3B82F6',
    lightColor: '#EFF6FF',
    description: 'Understand your users, discover problems, and gather evidence to guide design decisions.',
    subcategories: [
      'Interview Analysis',
      'Survey Creation',
      'Usability Testing',
      'Secondary Research',
    ],
    toolCount: null, // computed dynamically
  },
  {
    id: 'synthesis',
    name: 'Synthesis',
    icon: '🧩',
    color: '#8B5CF6',
    lightColor: '#F5F3FF',
    description: 'Make sense of your research. Identify themes, define insights, and build a shared understanding.',
    subcategories: [
      'Research Repository',
      'Affinity Mapping',
      'Insight Generation',
    ],
    toolCount: null,
  },
  {
    id: 'ideation',
    name: 'Ideation',
    icon: '💡',
    color: '#F59E0B',
    lightColor: '#FFFBEB',
    description: 'Generate concepts, explore visual directions, and brainstorm solutions before committing to one.',
    subcategories: [
      'Concept Generation',
      'Visual Ideation',
      'Brainstorming',
    ],
    toolCount: null,
  },
  {
    id: 'prototyping',
    name: 'Prototyping',
    icon: '⚡',
    color: '#10B981',
    lightColor: '#ECFDF5',
    description: 'Build testable representations of your ideas — from rough wireframes to functional UI.',
    subcategories: [
      'UI Generation',
      'Wireframing',
      'Design to Code',
      'Prototyping',
    ],
    toolCount: null,
  },
  {
    id: 'testing',
    name: 'Testing',
    icon: '✅',
    color: '#EF4444',
    lightColor: '#FEF2F2',
    description: 'Validate your designs with real users. Measure usability, gather feedback, and identify issues.',
    subcategories: [
      'Usability Testing',
      'Analytics',
      'Feedback Collection',
    ],
    toolCount: null,
  },
]

export const getStageById = (id) => stages.find(s => s.id === id)
