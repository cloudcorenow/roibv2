import type { User, Role, Permission, UserInvitation } from '../types';

export const mockPermissions: Permission[] = [
  {
    id: 'perm-1',
    name: 'View Clients',
    description: 'View client information',
    category: 'Clients',
    resource: 'clients',
    action: 'read'
  },
  {
    id: 'perm-2',
    name: 'Manage Clients',
    description: 'Create, update, and delete clients',
    category: 'Clients',
    resource: 'clients',
    action: 'write'
  },
  {
    id: 'perm-3',
    name: 'View Time Entries',
    description: 'View time tracking entries',
    category: 'Time Tracking',
    resource: 'time-entries',
    action: 'read'
  },
  {
    id: 'perm-4',
    name: 'Manage Time Entries',
    description: 'Create, update, and delete time entries',
    category: 'Time Tracking',
    resource: 'time-entries',
    action: 'write'
  },
  {
    id: 'perm-5',
    name: 'View Projects',
    description: 'View project information',
    category: 'Projects',
    resource: 'projects',
    action: 'read'
  },
  {
    id: 'perm-6',
    name: 'Manage Projects',
    description: 'Create, update, and delete projects',
    category: 'Projects',
    resource: 'projects',
    action: 'write'
  },
  {
    id: 'perm-7',
    name: 'View Documents',
    description: 'View documents',
    category: 'Documents',
    resource: 'documents',
    action: 'read'
  },
  {
    id: 'perm-8',
    name: 'Manage Documents',
    description: 'Upload and delete documents',
    category: 'Documents',
    resource: 'documents',
    action: 'write'
  },
  {
    id: 'perm-9',
    name: 'View Users',
    description: 'View user information',
    category: 'Administration',
    resource: 'users',
    action: 'read'
  },
  {
    id: 'perm-10',
    name: 'Manage Users',
    description: 'Create, update, and delete users',
    category: 'Administration',
    resource: 'users',
    action: 'write'
  },
  {
    id: 'perm-11',
    name: 'Manage Roles',
    description: 'Create, update, and delete roles',
    category: 'Administration',
    resource: 'roles',
    action: 'write'
  },
  {
    id: 'perm-12',
    name: 'View Reports',
    description: 'View analytics and reports',
    category: 'Reporting',
    resource: 'reports',
    action: 'read'
  }
];

export const mockRoles: Role[] = [
  {
    id: 'role-1',
    name: 'Administrator',
    description: 'Full system access with all permissions',
    permissions: mockPermissions.map(p => p.id),
    userCount: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isSystem: true
  },
  {
    id: 'role-2',
    name: 'Project Manager',
    description: 'Manage projects, clients, and view reports',
    permissions: ['perm-1', 'perm-2', 'perm-3', 'perm-4', 'perm-5', 'perm-6', 'perm-7', 'perm-8', 'perm-12'],
    userCount: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isSystem: false
  },
  {
    id: 'role-3',
    name: 'Team Member',
    description: 'View and manage own time entries and documents',
    permissions: ['perm-1', 'perm-3', 'perm-4', 'perm-5', 'perm-7'],
    userCount: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isSystem: false
  },
  {
    id: 'role-4',
    name: 'Viewer',
    description: 'Read-only access to clients and projects',
    permissions: ['perm-1', 'perm-3', 'perm-5', 'perm-7'],
    userCount: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isSystem: false
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@roiblueprint.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'Administrator',
    roleId: 'role-1',
    department: 'Management',
    phone: '555-0001',
    status: 'active',
    lastLogin: '2024-01-22T09:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-22T09:00:00Z',
    permissions: mockPermissions.map(p => p.id)
  },
  {
    id: '2',
    email: 'john.smith@roiblueprint.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'Project Manager',
    roleId: 'role-2',
    department: 'Operations',
    phone: '555-0002',
    status: 'active',
    lastLogin: '2024-01-21T14:30:00Z',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-21T14:30:00Z'
  },
  {
    id: '3',
    email: 'alice.dev@roiblueprint.com',
    firstName: 'Alice',
    lastName: 'Developer',
    role: 'Team Member',
    roleId: 'role-3',
    department: 'Engineering',
    phone: '555-0003',
    status: 'active',
    lastLogin: '2024-01-22T08:15:00Z',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-22T08:15:00Z'
  },
  {
    id: '4',
    email: 'bob.engineer@roiblueprint.com',
    firstName: 'Bob',
    lastName: 'Engineer',
    role: 'Team Member',
    roleId: 'role-3',
    department: 'Engineering',
    phone: '555-0004',
    status: 'active',
    lastLogin: '2024-01-20T10:00:00Z',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '5',
    email: 'carol.scientist@roiblueprint.com',
    firstName: 'Carol',
    lastName: 'Scientist',
    role: 'Project Manager',
    roleId: 'role-2',
    department: 'Research',
    phone: '555-0005',
    status: 'active',
    lastLogin: '2024-01-19T16:45:00Z',
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-19T16:45:00Z'
  }
];

export const mockUserInvitations: UserInvitation[] = [
  {
    id: 'inv-1',
    email: 'newuser@example.com',
    roleId: 'role-3',
    roleName: 'Team Member',
    invitedBy: '1',
    invitedByName: 'Admin User',
    invitedAt: '2024-01-20T00:00:00Z',
    expiresAt: '2024-01-27T00:00:00Z',
    status: 'pending',
    token: 'inv_abc123xyz'
  },
  {
    id: 'inv-2',
    email: 'contractor@example.com',
    roleId: 'role-4',
    roleName: 'Viewer',
    invitedBy: '2',
    invitedByName: 'John Smith',
    invitedAt: '2024-01-18T00:00:00Z',
    expiresAt: '2024-01-25T00:00:00Z',
    status: 'accepted',
    token: 'inv_def456uvw'
  }
];
