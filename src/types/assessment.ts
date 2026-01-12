export interface AssessmentFormData {
  disqualifying_factors: string[];
  contact_name: string;
  contact_title: string;
  contact_email: string;
  contact_phone: string;
  business_name: string;
  healthcare_type: string;
  business_state: string;
  business_age: number;
  number_of_locations: number;
  tax_entity_type: string;
  has_related_entities: string;
  tech_activities: string[];
  clinical_activities: string[];
  compliance_activities: string[];
  tax_year: string;
  accounting_method: string;
  annual_revenue: number;
  federal_fee_rate: number;
  state_fee_rate: number;
  prior_year_1_revenue: number;
  prior_year_1_wages: number;
  prior_year_2_revenue: number;
  prior_year_2_wages: number;
  prior_year_3_revenue: number;
  prior_year_3_wages: number;
  prior_year_4_revenue: number;
  prior_year_4_wages: number;
  rd_wage_percentage: number;
  total_annual_wages: number;
  total_w2_employees: number;
  supply_expenses: number;
  contract_research: number;
  prior_staff_change: string;
  rd_credit_years: number;
  qualifying_activity_years: string;
  annual_growth_rate: number;
  planned_initiatives: string[];
}

export interface YearCalculation {
  year: string;
  revenue: number;
  wages: number;
  qualifyingWages: number;
  federalCredit: number;
  stateCredit: number;
  totalCredit: number;
  federalFee: number;
  stateFee: number;
  totalFee: number;
  netBenefit: number;
  roi: number;
}

export interface CalculationResults {
  isQualified: boolean;
  currentYear: YearCalculation;
  futureYears: YearCalculation[];
  lookbackYears: YearCalculation[];
  totalFederalCredit: number;
  totalStateCredit: number;
  totalCredit: number;
  totalFees: number;
  totalNetBenefit: number;
  overallROI: number;
  qualificationScore: number;
  recommendations: string[];
  warnings: string[];
}
