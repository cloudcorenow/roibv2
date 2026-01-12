export interface Client {
  id: string;
  name: string;
  industry: string;
  contactPerson: string;
  email: string;
  phone?: string;
  taxYear: string;
  estimatedCredit: number;
  status: 'active' | 'pending' | 'inactive';
  createdAt?: string;
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'on-hold';
  budget?: number;
}

export interface TimeEntry {
  id: string;
  clientId: string;
  projectId: string;
  employeeId: string;
  employeeName?: string;
  date: string;
  hours: number;
  description: string;
  isRnD?: boolean;
  taskId?: string;
}

export interface TechnicalNote {
  id: string;
  clientId: string;
  projectId: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  version: number;
  changeLog: ChangeLogEntry[];
}

export interface ChangeLogEntry {
  id: string;
  userId: string;
  userName?: string;
  changes: string;
  timestamp: string;
}

export interface Employee {
  id: string;
  clientId: string;
  name: string;
  email: string;
  role: string;
  hourlyRate: number;
  isRnD?: boolean;
}

export interface Expense {
  id: string;
  clientId: string;
  projectId: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  vendor?: string;
  isRnD?: boolean;
}

export interface Document {
  id: string;
  clientId: string;
  projectId?: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy?: string;
  url?: string;
  tags?: string[];
}

export interface Contractor {
  id: string;
  clientId: string;
  name: string;
  company: string;
  email: string;
  specialization: string;
  hourlyRate: number;
  isRnD?: boolean;
}

export interface ContractorTimeEntry {
  id: string;
  clientId: string;
  contractorId: string;
  projectId: string;
  date: string;
  hours: number;
  description: string;
  isRnD?: boolean;
}

export interface KnowledgeBaseEntry {
  id: string;
  clientId: string;
  projectId?: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export interface Milestone {
  id: string;
  clientId: string;
  projectId: string;
  title: string;
  description?: string;
  date: string;
  status: 'pending' | 'completed';
  type: 'deadline' | 'delivery' | 'review' | 'other';
}

export interface ClientCompliance {
  clientId: string;
  completedItems: string[];
  lastUpdated: string;
  overallScore: number;
}

export interface Experiment {
  id: string;
  clientId: string;
  projectId: string;
  title: string;
  hypothesis: string;
  methodology: string;
  results?: string;
  status: 'planning' | 'in-progress' | 'completed' | 'failed';
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AutoTimeEntry {
  id: string;
  clientId: string;
  projectId: string;
  employeeId: string;
  date: string;
  hours: number;
  description: string;
  source: string;
  confidence: number;
  metadata: {
    approved?: boolean;
    rejected?: boolean;
    [key: string]: any;
  };
}

export interface RnDAIAnalysis {
  id: string;
  taskDescription: string;
  analysisDate: string;
  isQualified: boolean;
  confidence: number;
  reasoning: string;
  suggestedCategory: string;
  technicalUncertainties: string[];
  recommendations: string[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  roleId?: string;
  department?: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  permissions?: string[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount?: number;
  createdAt: string;
  updatedAt: string;
  isSystem?: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  resource: string;
  action: string;
}

export interface UserInvitation {
  id: string;
  email: string;
  roleId: string;
  roleName?: string;
  invitedBy: string;
  invitedByName?: string;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  token: string;
}

export interface Task {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  projectId: string;
  projectName?: string;
  parentTaskId?: string;
  dependsOn: string[];
  subtasks: string[];
  assignedTo: string[];
  assignedNames: string[];
  createdBy: string;
  createdByName?: string;
  isRnD: boolean;
  technicalUncertainty: string;
  experimentationRequired: boolean;
  rndJustification: string;
  estimatedHours: number;
  actualHours: number;
  progress: number;
  startDate: string;
  dueDate: string;
  completedDate?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  attachments: TaskAttachment[];
  comments: TaskComment[];
  templateId?: string;
  isTemplate: boolean;
}

export interface TaskAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
}

export interface TaskComment {
  id: string;
  taskId: string;
  author: string;
  authorName: string;
  content: string;
  timestamp: string;
  isInternal: boolean;
}

export interface TaskTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tasks: Omit<Task, 'id' | 'projectId' | 'assignedTo' | 'createdAt' | 'updatedAt'>[];
  createdBy: string;
  createdAt: string;
}
