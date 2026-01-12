export interface QuickBooksConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  sandbox: boolean;
  companyId: string;
  accessToken: string;
  refreshToken: string;
}

export interface QuickBooksSyncResult {
  success: boolean;
  message: string;
  timestamp: string;
  syncedRecords: number;
  errors?: string[];
  data?: {
    customers?: number;
    invoices?: number;
    payments?: number;
    employees?: number;
    expenses?: number;
    [key: string]: number | undefined;
  };
}

export interface QuickBooksCustomer {
  id: string;
  displayName: string;
  companyName?: string;
  email?: string;
  phone?: string;
  billingAddress?: string;
  active: boolean;
}

export interface QuickBooksInvoice {
  id: string;
  customerId: string;
  customerName: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  balance: number;
  status: 'paid' | 'unpaid' | 'partial';
}

export interface QuickBooksEmployee {
  id: string;
  displayName: string;
  email?: string;
  phone?: string;
  hireDate?: string;
  active: boolean;
}

export interface QuickBooksExpense {
  id: string;
  date: string;
  amount: number;
  vendor: string;
  category: string;
  description?: string;
  accountRef?: string;
}
