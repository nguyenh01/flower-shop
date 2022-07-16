export interface DashboardResponse {
  total_day: number;
  total_week: number;
  total_month: number;
  total_year: number;
  total_employee: number;
  total_customer: number;
  total_product: number;
  last_and_currentYear: {
    last_year: number[];
    current_year: number[];
  };
}
