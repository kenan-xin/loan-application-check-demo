---
name: HLB Loan Dashboard
overview: Build a professional loan application analysis dashboard for Hong Leong Bank with document upload, AI processing, and results display with eligibility checks, dark mode support, and PDF export functionality.
todos:
  - id: setup-env
    content: Create .env and .env.development files with API URL configuration
    status: pending
  - id: install-deps
    content: Install jspdf, html2canvas, and react-to-print packages
    status: pending
  - id: create-types
    content: Create TypeScript interfaces for API request/response in src/types/api.ts
    status: pending
  - id: create-store
    content: Create Zustand store for application state in src/stores/applicationStore.ts
    status: pending
  - id: create-api
    content: Create API client with React Query mutation in src/api/account-manager.ts
    status: pending
  - id: update-theme
    content: Update hlb-theme.ts to properly support dark mode
    status: pending
  - id: create-layout
    content: Create AppShell layout component with header, logo, and dark mode toggle
    status: pending
  - id: create-upload-page
    content: Build UploadPage with dual dropzones for PDF files
    status: pending
  - id: create-processing-page
    content: Build ProcessingPage with loading indicators and progress stepper
    status: pending
  - id: create-results-components
    content: Build all results display components (DecisionBanner, CompanyOverview, tables, etc.)
    status: pending
  - id: create-results-page
    content: Assemble ResultsPage with issue highlighting and all data sections
    status: pending
  - id: implement-export
    content: Implement PDF export and print functionality
    status: pending
  - id: update-router
    content: Update Router.tsx with new routes and AppShell wrapper
    status: pending
  - id: polish-ui
    content: Final UI polish, responsive design, and design guide compliance check
    status: pending
---

# Hong Leong Bank Loan Application Dashboard Implementation Plan

## Architecture Overview

```mermaid
flowchart TD
    subgraph upload [Upload Phase]
        A[Document Upload Page] --> B[Upload Application Form PDF]
        B --> C[Upload Credit Report PDF]
        C --> D[Submit to API]
    end
    
    subgraph processing [Processing Phase]
        D --> E[Loading Screen with Progress]
        E --> F{API Response}
    end
    
    subgraph results [Results Phase]
        F --> G{Check Issue Flags}
        G --> H[Results Page (Success or Issues)]
    end
    
    H --> J[Export/Print]
```

## Tech Stack

- **UI Framework**: Mantine 8.x (already installed)
- **State Management**: Zustand (already installed)
- **API Layer**: TanStack React Query (already installed)
- **Routing**: React Router DOM 7 (already installed)
- **File Upload**: @mantine/dropzone (already installed)
- **PDF Export**: `jspdf` + `html2canvas` (to install)
- **Print**: `react-to-print` (to install)

## File Structure

```
src/
├── api/
│   └── account-manager.ts       # API client for POST request
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx         # Main layout with header/dark mode toggle
│   │   └── Header.tsx           # Logo + color scheme toggle
│   ├── upload/
│   │   ├── DocumentDropzone.tsx # Reusable dropzone component
│   │   └── UploadProgress.tsx   # Upload status indicators
│   ├── results/
│   │   ├── DecisionBanner.tsx   # Success/Failure banner
│   │   ├── IssueAlert.tsx       # Individual issue alert
│   │   ├── CompanyOverview.tsx  # Company info card
│   │   ├── CompanyOwners.tsx    # Owners table
│   │   ├── Shareholders.tsx     # Shareholders table
│   │   ├── ContactInfo.tsx      # Contact details card
│   │   ├── LoanDetails.tsx      # Loan application info
│   │   ├── FinancialIndicators.tsx # Credit scoring display
│   │   └── LitigationInfo.tsx   # Litigation cases (with highlight)
│   └── common/
│       ├── ExportButton.tsx     # PDF export button
│       └── PrintButton.tsx      # Print button
├── hooks/
│   └── useAnalyzeApplication.ts # React Query mutation hook
├── pages/
│   ├── UploadPage.tsx           # Step 1: Document upload
│   ├── ProcessingPage.tsx       # Step 2: Loading/processing
│   └── ResultsPage.tsx          # Step 3: Results display
├── stores/
│   └── applicationStore.ts      # Zustand store for app state
├── types/
│   └── api.ts                   # TypeScript interfaces
└── utils/
    └── export.ts                # PDF export utilities
```

## Environment Configuration

Create `.env` file:

```
VITE_API_URL=https://dev-genie.001.gs
```

For development, use `.env.development`:

```
VITE_API_URL=https://dev-genie.001.gs
```

## API Integration

**Endpoint**: `POST https://dev-genie.001.gs/api/v1/smart-api/account_manager`

Request format (multipart/form-data):

- `application_form`: PDF file
- `credit_report`: PDF file

Response type based on provided sample (all fields required):

```typescript
interface ApiResponse {
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

interface CompanyOwner {
  name: string;
  designation: string;
  ic: string;
  address: string;
  date_of_appointment: string;
}

interface Shareholder {
  name: string;
  ic: string;
  share: string;
}

interface Litigation {
  case_no: string;
  court: string;
  city: string;
  state: string;
  amount: number;
}
```

## Key Implementation Details

### 1. Theme Updates for Dark Mode

Update `hlb-theme.ts` to support dark mode properly:

- Adjust Card background colors for dark mode
- Ensure Table styles work in both modes
- Use CSS variables for color switching

### 2. Upload Flow

- Use Mantine Dropzone with `accept={['application/pdf']}`
- Sequential upload: Application Form first, then Credit Report
- Visual indicators for each upload status
- "Analyze" button enabled only when both files uploaded

### 3. Processing Screen

- Full-screen centered loader using Mantine's Loader
- Optional: Stepper showing progress stages (Extracting → Checking → Verifying)
- Processing is blocking; user cannot proceed until completion
- Expected processing time is ~5 minutes; no timeout or cancel path
- On API error, retry silently while staying on the processing screen (no error copy)

### 4. Results Display

**Decision Summary Banner**:

- Success: Green Alert with "Application passed initial checks" and "Ready for next stage (Credit Assessment)"
- Failure: Red Alert with "Application Failed Initial Checks" and list of detected issues

**Issue Messages (exact copy)**:

- `entity_type_issue`: "The applying entity type is not eligible for this product."
- `ownership_issue`: "Ownership of company is not clear – company owners are not found in shareholders list."
- `issued_capital_issue`: "The loan application amount exceeds the company’s paid-up capital."
- `litigation_issue`: "Litigation case(s) with an involved amount exceeding RM30,000 have been identified."

Multiple errors may be shown together when multiple flags are true.
No specific ordering is required; list issues in a consistent order (e.g., flag list order).

**Issue-Linked Highlighting**:

- When `entity_type_issue` is true, highlight the company entity/type section.
- When `ownership_issue` is true, highlight the company owners and shareholders sections, and ensure `company_owners` data is visible alongside the issue flag.
- When `issued_capital_issue` is true, highlight the issued capital and loan amount section.
- When `litigation_issue` is true, highlight the litigation section and ensure `litigation_information` is visible alongside the issue flag.

**Issue Highlighting**:

- Sections with issues get a red left border + warning icon
- Use Mantine's Alert component with `color="red"` for issue messages
- Label failed sections with "Issue Detected"

**Data Cards Layout**:

- Use Grid with responsive columns
- Group related info in Card components
- Tables for owners, shareholders, litigation

**Formatting Rules**:

- Monetary values: format as `RM` with grouping and decimals (e.g., `RM 1,234.00`).
- Percentile: display as "Top X%" (e.g., `Top 3%`).

**Empty States**:

- If `litigation_information` is empty, show an explicit "No litigation cases" state.

**Success vs Failure Data Display**:

- Success: Show all response data in a structured format with no error banners.
- Failure: Show all response data, with affected sections highlighted and issue messages listed in the banner.

### 5. Export/Print

- **PDF Export**: Use `html2canvas` to capture the results container, then `jspdf` to create PDF
- **Print**: Use `react-to-print` for browser print dialog
- Both buttons in a sticky action bar at top of results

## Design System Alignment

Per [design-guide.md](design-guide.md):

- **Spacing**: Use Mantine's spacing scale consistently (already configured in hlb-theme)
- **Depth**: Subtle shadows approach (already configured: `shadow: 'xs'`)
- **Border Radius**: Sharp/technical feel with `radius: 'sm'` 
- **Colors**: Navy primary for brand, gray for structure, red for errors, green for success
- **States**: Ensure loading, empty, error states for all data displays
- **Animation**: Fast micro-interactions (~150ms) for hover/transitions

## Routes Configuration

```typescript
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <UploadPage /> },
      { path: 'processing', element: <ProcessingPage /> },
      { path: 'results', element: <ResultsPage /> },
    ],
  },
]);
```

## Zustand Store Structure

```typescript
interface ApplicationStore {
  applicationForm: File | null;
  creditReport: File | null;
  result: ApiResponse | null;
  setApplicationForm: (file: File | null) => void;
  setCreditReport: (file: File | null) => void;
  setResult: (result: ApiResponse | null) => void;
  reset: () => void;
}
```

## New Dependencies to Install

```bash
yarn add jspdf html2canvas react-to-print
yarn add -D @types/html2canvas
```

---

## Resolved Decisions

- Processing is blocking with a long-running loader (~5 minutes); no timeout or cancel path.
- Retry only on error, silently and in-place on the processing screen.
- Store results in-memory only; no persistence across refresh.
- Multipart field names are `application_form` and `credit_report`.
- Monetary values use RM formatting with grouping and decimals; percentile uses "Top X%".
- If `litigation_information` is empty, show "No litigation cases".
- Logo sizing follows the design guide: keep aspect ratio, align to header height, and use consistent padding/spacing.
- API does not require authentication headers.
- No file size limits are enforced for PDF uploads.

## Unresolved Questions

None.
