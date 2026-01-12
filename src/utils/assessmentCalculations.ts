import type { AssessmentFormData, CalculationResults, YearCalculation } from '../types/assessment';
import { STATES_ARRAY } from '../data/stateRDCredits';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

function calculateYearCredit(
  revenue: number,
  wages: number,
  rdWagePercentage: number,
  federalFeeRate: number,
  stateFeeRate: number,
  stateCode: string,
  year: string
): YearCalculation {
  const qualifyingWages = wages * (rdWagePercentage / 100);

  const federalCredit = qualifyingWages * 0.14;

  const stateInfo = STATES_ARRAY.find(s => s.code === stateCode);
  const stateCreditRate = stateInfo?.creditRate || 0;
  const stateCredit = qualifyingWages * (stateCreditRate / 100);

  const totalCredit = federalCredit + stateCredit;

  const federalFee = federalCredit * federalFeeRate;
  const stateFee = stateCredit * stateFeeRate;
  const totalFee = federalFee + stateFee;

  const netBenefit = totalCredit - totalFee;
  const roi = totalFee > 0 ? (netBenefit / totalFee) * 100 : 0;

  return {
    year,
    revenue,
    wages,
    qualifyingWages,
    federalCredit,
    stateCredit,
    totalCredit,
    federalFee,
    stateFee,
    totalFee,
    netBenefit,
    roi
  };
}

export function calculateAssessmentResults(
  formData: Partial<AssessmentFormData>
): CalculationResults {
  const recommendations: string[] = [];
  const warnings: string[] = [];

  const hasDisqualifyingFactors = (formData.disqualifying_factors?.length || 0) > 0;

  if (hasDisqualifyingFactors) {
    warnings.push('Your business may have disqualifying factors that need to be addressed.');
  }

  const currentTaxYear = parseInt(formData.tax_year || '2024');
  const revenue = formData.annual_revenue || 0;
  const wages = formData.total_annual_wages || 0;
  const rdWagePercentage = formData.rd_wage_percentage || 20;
  const federalFeeRate = formData.federal_fee_rate || 0.75;
  const stateFeeRate = formData.state_fee_rate || 0.25;
  const stateCode = formData.business_state || 'CA';

  const currentYear = calculateYearCredit(
    revenue,
    wages,
    rdWagePercentage,
    federalFeeRate,
    stateFeeRate,
    stateCode,
    currentTaxYear.toString()
  );

  const futureYears: YearCalculation[] = [];
  const growthRate = (formData.annual_growth_rate || 5) / 100;

  for (let i = 1; i <= 3; i++) {
    const year = currentTaxYear + i;
    const projectedRevenue = revenue * Math.pow(1 + growthRate, i);
    const projectedWages = wages * Math.pow(1 + growthRate, i);

    futureYears.push(
      calculateYearCredit(
        projectedRevenue,
        projectedWages,
        rdWagePercentage,
        federalFeeRate,
        stateFeeRate,
        stateCode,
        year.toString()
      )
    );
  }

  const lookbackYears: YearCalculation[] = [];
  const priorYearData = [
    { revenue: formData.prior_year_1_revenue || 0, wages: formData.prior_year_1_wages || 0 },
    { revenue: formData.prior_year_2_revenue || 0, wages: formData.prior_year_2_wages || 0 },
    { revenue: formData.prior_year_3_revenue || 0, wages: formData.prior_year_3_wages || 0 },
    { revenue: formData.prior_year_4_revenue || 0, wages: formData.prior_year_4_wages || 0 },
  ];

  for (let i = 0; i < 4; i++) {
    if (priorYearData[i].revenue > 0 || priorYearData[i].wages > 0) {
      const year = currentTaxYear - (i + 1);
      lookbackYears.push(
        calculateYearCredit(
          priorYearData[i].revenue,
          priorYearData[i].wages,
          rdWagePercentage,
          federalFeeRate,
          stateFeeRate,
          stateCode,
          year.toString()
        )
      );
    }
  }

  const allYears = [currentYear, ...futureYears, ...lookbackYears];
  const totalFederalCredit = allYears.reduce((sum, y) => sum + y.federalCredit, 0);
  const totalStateCredit = allYears.reduce((sum, y) => sum + y.stateCredit, 0);
  const totalCredit = allYears.reduce((sum, y) => sum + y.totalCredit, 0);
  const totalFees = allYears.reduce((sum, y) => sum + y.totalFee, 0);
  const totalNetBenefit = allYears.reduce((sum, y) => sum + y.netBenefit, 0);
  const overallROI = totalFees > 0 ? (totalNetBenefit / totalFees) * 100 : 0;

  let qualificationScore = 0;
  if (!hasDisqualifyingFactors) qualificationScore += 20;
  if ((formData.tech_activities?.length || 0) > 0) qualificationScore += 20;
  if ((formData.clinical_activities?.length || 0) > 0) qualificationScore += 20;
  if (rdWagePercentage >= 15) qualificationScore += 20;
  if (currentYear.totalCredit > 10000) qualificationScore += 20;

  const isQualified = qualificationScore >= 60 && !hasDisqualifyingFactors;

  if (isQualified) {
    recommendations.push('Your business appears to qualify for R&D tax credits.');
  } else {
    recommendations.push('Consider documenting more qualifying activities to improve eligibility.');
  }

  if (rdWagePercentage < 15) {
    recommendations.push('Increasing R&D wage allocation could significantly increase your credit.');
  }

  if (lookbackYears.length === 0) {
    recommendations.push('Consider claiming prior year credits if you had qualifying activities.');
  }

  return {
    isQualified,
    currentYear,
    futureYears,
    lookbackYears,
    totalFederalCredit,
    totalStateCredit,
    totalCredit,
    totalFees,
    totalNetBenefit,
    overallROI,
    qualificationScore,
    recommendations,
    warnings
  };
}
