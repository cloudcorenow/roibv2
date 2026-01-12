import type {
  Client,
  Project,
  TimeEntry,
  TechnicalNote,
  Employee,
  Expense,
  Document,
  Contractor,
  ContractorTimeEntry,
  KnowledgeBaseEntry,
  Milestone,
  ClientCompliance,
  Experiment,
  AutoTimeEntry,
  RnDAIAnalysis
} from '../types';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    industry: 'Software Development',
    contactPerson: 'John Smith',
    email: 'john@techcorp.com',
    phone: '555-0100',
    taxYear: '2024',
    estimatedCredit: 125000,
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'BioMed Innovations',
    industry: 'Biotechnology',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@biomed.com',
    phone: '555-0200',
    taxYear: '2024',
    estimatedCredit: 250000,
    status: 'active',
    createdAt: '2024-02-01T00:00:00Z'
  }
];

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    clientId: '1',
    name: 'AI Platform Development',
    description: 'Development of machine learning platform',
    startDate: '2024-01-01',
    status: 'active',
    budget: 500000
  },
  {
    id: 'proj-2',
    clientId: '2',
    name: 'Drug Discovery Platform',
    description: 'Research and development of new drug compounds',
    startDate: '2024-02-01',
    status: 'active',
    budget: 750000
  }
];

export const mockEmployees: Employee[] = [
  {
    id: 'emp-1',
    clientId: '1',
    name: 'Alice Developer',
    email: 'alice@techcorp.com',
    role: 'Senior Engineer',
    hourlyRate: 125,
    isRnD: true
  },
  {
    id: 'emp-2',
    clientId: '1',
    name: 'Bob Engineer',
    email: 'bob@techcorp.com',
    role: 'Software Engineer',
    hourlyRate: 100,
    isRnD: true
  },
  {
    id: 'emp-3',
    clientId: '2',
    name: 'Carol Scientist',
    email: 'carol@biomed.com',
    role: 'Research Scientist',
    hourlyRate: 150,
    isRnD: true
  }
];

export const mockTimeEntries: TimeEntry[] = [
  {
    id: 'time-1',
    clientId: '1',
    projectId: 'proj-1',
    employeeId: 'emp-1',
    employeeName: 'Alice Developer',
    date: '2024-01-15',
    hours: 8,
    description: 'ML model development',
    isRnD: true
  },
  {
    id: 'time-2',
    clientId: '1',
    projectId: 'proj-1',
    employeeId: 'emp-2',
    employeeName: 'Bob Engineer',
    date: '2024-01-15',
    hours: 6,
    description: 'API integration work',
    isRnD: true
  }
];

export const mockTechnicalNotes: TechnicalNote[] = [
  {
    id: 'note-1',
    clientId: '1',
    projectId: 'proj-1',
    title: 'ML Algorithm Research',
    content: 'Investigating new approaches to neural network optimization',
    category: 'Research',
    tags: ['machine-learning', 'optimization'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
    version: 1,
    changeLog: []
  }
];

export const mockExpenses: Expense[] = [
  {
    id: 'exp-1',
    clientId: '1',
    projectId: 'proj-1',
    date: '2024-01-20',
    amount: 5000,
    category: 'Software',
    description: 'Cloud computing services',
    vendor: 'AWS',
    isRnD: true
  }
];

export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    clientId: '1',
    projectId: 'proj-1',
    name: 'Technical Specification.pdf',
    type: 'application/pdf',
    size: 1024000,
    uploadedAt: '2024-01-15T00:00:00Z',
    tags: ['specification', 'technical']
  }
];

export const mockContractors: Contractor[] = [
  {
    id: 'cont-1',
    clientId: '1',
    name: 'David Consultant',
    company: 'Tech Consulting LLC',
    email: 'david@techconsulting.com',
    specialization: 'Machine Learning',
    hourlyRate: 200,
    isRnD: true
  }
];

export const mockContractorTimeEntries: ContractorTimeEntry[] = [
  {
    id: 'cont-time-1',
    clientId: '1',
    contractorId: 'cont-1',
    projectId: 'proj-1',
    date: '2024-01-18',
    hours: 4,
    description: 'ML architecture consultation',
    isRnD: true
  }
];

export const mockKnowledgeBaseEntries: KnowledgeBaseEntry[] = [
  {
    id: 'kb-1',
    clientId: '1',
    projectId: 'proj-1',
    title: 'R&D Tax Credit Best Practices',
    content: 'Guidelines for documenting R&D activities...',
    category: 'Compliance',
    tags: ['tax-credit', 'documentation'],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  }
];

export const mockMilestones: Milestone[] = [
  {
    id: 'mile-1',
    clientId: '1',
    projectId: 'proj-1',
    title: 'Phase 1 Completion',
    description: 'Complete initial ML model training',
    date: '2024-03-31',
    status: 'pending',
    type: 'deadline'
  }
];

export const mockClientCompliance: ClientCompliance[] = [
  {
    clientId: '1',
    completedItems: ['item1', 'item2', 'item3'],
    lastUpdated: '2024-01-15T00:00:00Z',
    overallScore: 60
  }
];

export const mockExperiments: Experiment[] = [
  {
    id: 'exp-1',
    clientId: '1',
    projectId: 'proj-1',
    title: 'Neural Network Architecture Test',
    hypothesis: 'New architecture will improve accuracy by 15%',
    methodology: 'A/B testing with control and test groups',
    status: 'in-progress',
    startDate: '2024-01-20',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  }
];

export const mockAutoTimeEntries: AutoTimeEntry[] = [
  {
    id: 'auto-1',
    clientId: '1',
    projectId: 'proj-1',
    employeeId: 'emp-1',
    date: '2024-01-22',
    hours: 7.5,
    description: 'Code commits and reviews',
    source: 'GitHub',
    confidence: 0.95,
    metadata: {
      approved: false,
      rejected: false
    }
  }
];

export const mockRnDAIAnalyses: RnDAIAnalysis[] = [
  {
    id: 'ai-1',
    taskDescription: 'Develop new machine learning algorithm',
    analysisDate: '2024-01-15T00:00:00Z',
    isQualified: true,
    confidence: 0.92,
    reasoning: 'Task involves significant technical uncertainty and experimentation',
    suggestedCategory: 'Research',
    technicalUncertainties: [
      'Algorithm convergence',
      'Performance optimization'
    ],
    recommendations: [
      'Document all experimental approaches',
      'Track failed attempts'
    ]
  }
];
