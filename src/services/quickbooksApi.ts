import type {
  QuickBooksConfig,
  QuickBooksSyncResult,
  QuickBooksCustomer,
  QuickBooksInvoice,
  QuickBooksEmployee,
  QuickBooksExpense
} from '../types/quickbooks';

class QuickBooksAPI {
  private config: QuickBooksConfig;
  private baseUrl: string;

  constructor(config: QuickBooksConfig) {
    this.config = config;
    this.baseUrl = config.sandbox
      ? 'https://sandbox-quickbooks.api.intuit.com'
      : 'https://quickbooks.api.intuit.com';
  }

  async refreshAccessToken(): Promise<boolean> {
    try {
      const response = await fetch('/api/quickbooks/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: this.config.refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh access token');
      }

      const data = await response.json();
      this.config.accessToken = data.accessToken;
      this.config.refreshToken = data.refreshToken;

      return true;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return false;
    }
  }

  async getAuthUrl(): Promise<string> {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: 'com.intuit.quickbooks.accounting',
      state: Math.random().toString(36).substring(7),
    });

    return `https://appcenter.intuit.com/connect/oauth2?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string, realmId: string): Promise<boolean> {
    try {
      const response = await fetch('/api/quickbooks/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          realmId,
          redirectUri: this.config.redirectUri,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange code for token');
      }

      const data = await response.json();
      this.config.accessToken = data.accessToken;
      this.config.refreshToken = data.refreshToken;
      this.config.companyId = realmId;

      return true;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      return false;
    }
  }

  async syncCustomers(): Promise<QuickBooksCustomer[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v3/company/${this.config.companyId}/query?query=SELECT * FROM Customer`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }

      const data = await response.json();
      return data.QueryResponse?.Customer || [];
    } catch (error) {
      console.error('Error syncing customers:', error);
      return [];
    }
  }

  async syncInvoices(): Promise<QuickBooksInvoice[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v3/company/${this.config.companyId}/query?query=SELECT * FROM Invoice`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }

      const data = await response.json();
      return data.QueryResponse?.Invoice || [];
    } catch (error) {
      console.error('Error syncing invoices:', error);
      return [];
    }
  }

  async syncEmployees(): Promise<QuickBooksEmployee[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v3/company/${this.config.companyId}/query?query=SELECT * FROM Employee`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data = await response.json();
      return data.QueryResponse?.Employee || [];
    } catch (error) {
      console.error('Error syncing employees:', error);
      return [];
    }
  }

  async syncExpenses(): Promise<QuickBooksExpense[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v3/company/${this.config.companyId}/query?query=SELECT * FROM Purchase WHERE PaymentType='Cash'`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const data = await response.json();
      return data.QueryResponse?.Purchase || [];
    } catch (error) {
      console.error('Error syncing expenses:', error);
      return [];
    }
  }

  async syncAll(): Promise<QuickBooksSyncResult> {
    try {
      const [customers, invoices, employees, expenses] = await Promise.all([
        this.syncCustomers(),
        this.syncInvoices(),
        this.syncEmployees(),
        this.syncExpenses(),
      ]);

      const syncedRecords =
        customers.length +
        invoices.length +
        employees.length +
        expenses.length;

      return {
        success: true,
        message: 'Sync completed successfully',
        timestamp: new Date().toISOString(),
        syncedRecords,
        data: {
          customers: customers.length,
          invoices: invoices.length,
          employees: employees.length,
          expenses: expenses.length,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Sync failed',
        timestamp: new Date().toISOString(),
        syncedRecords: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
      };
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v3/company/${this.config.companyId}/companyinfo/${this.config.companyId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Accept': 'application/json',
          },
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Error testing connection:', error);
      return false;
    }
  }
}

export default QuickBooksAPI;
