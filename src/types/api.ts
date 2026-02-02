export interface CompanyOwner {
  name: string;
  designation: string;
  ic: string;
  address: string;
  date_of_appointment: string;
}

export interface Shareholder {
  name: string;
  ic: string;
  share: string;
}

export interface Litigation {
  case_no: string;
  court: string;
  city: string;
  state: string;
  amount: number;
}

export interface ApiResponse {
  applicant_name: string;
  registration_no: string;
  country_of_registration: string;
  type_of_entity: string;
  type_of_business: string;
  company_owners: CompanyOwner[];
  shareholders: Shareholder[];
  contact_person_name: string;
  contact_email: string;
  contact_phone_number: string;
  loan_amount: number;
  loan_tenure: string;
  type_of_loan: string;
  security_provided_type: string;
  security_value: number;
  issued_capital: number;
  credit_scoring: number;
  percentile: number;
  litigation_information: Litigation[];
  // Issue flags
  entity_type_issue: boolean;
  ownership_issue: boolean;
  issued_capital_issue: boolean;
  litigation_issue: boolean;
}

export interface AnalyzeApplicationRequest {
  application_form: File;
  credit_report: File;
}
