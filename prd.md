Product Requirements Document (PRD)


Term Loan Application Demo Dashboard (Updated Flow)

Hong Leong Bank Malaysia
---

1. Overview

This demo showcases how an AI-assisted workflow processes Business Term Loan (BTL) applications for Hong Leong Bank Malaysia.
The demo focuses on:
- Uploading application documents
- Running automated checks via AI
- Highlighting critical eligibility issues
- Displaying results in a clear, professional, bank-grade UI
This version uses a single API (account_manager) and a simplified decision flow suitable for stakeholder demos.
---

2. Updated Demo Flow


Step 1: Document Upload

- User uploads two documents sequentially:
	1. Loan Application Form (PDF)
	2. Credit Bureau / Company Report (PDF)
After both documents are uploaded:
- System calls
  
  POST https://dev-genie.001.gs/api/v1/smart-api/account_manager
---

Step 2: AI Processing (Async)

- API processing may take a few minutes
- UI must show a processing / loading screen, e.g.:
	- Spinner
	- “Processing application…”
	- Optional progress indicators (Extracting → Checking → Verifying)
User cannot proceed until processing completes.
---

Step 3: Result Handling

Once API response is received:
- System evaluates 4 critical issue flags
- UI branches into:
	- Error / Issue Display, or
	- Successful Application Display
---

3. Critical Eligibility Issues

The following boolean fields determine application outcome:
Field
Meaning
entity_type_issue
Entity type not eligible
ownership_issue
Ownership mismatch / unclear
issued_capital_issue
Loan exceeds paid-up capital
litigation_issue
Litigation > RM30,000 detected

---

4. Error Handling Rules (Very Important)


If ANY of the following is true:

- entity_type_issue
- ownership_issue
- issued_capital_issue
- litigation_issue
Then:

UI Behavior

- Application is marked as FAILED
- Display error banner at top
- Highlight affected sections
- Show corresponding error messages

Error Messages Mapping

Issue Flag
Error Message
entity_type_issue
The applying entity type is not eligible for this product.
ownership_issue
Ownership of company is not clear – company owners are not found in shareholders list.
issued_capital_issue
The loan application amount exceeds the company’s paid-up capital.
litigation_issue
Litigation case(s) with an involved amount exceeding RM30,000 have been identified.
Multiple errors may be shown together if multiple flags are true.
---

5. Success Handling Rules


If ALL issue flags are false:

- Application is marked as SUCCESS
- Display confirmation banner:
  “Application passed initial checks”
- Display all response data in a structured, readable format
No error banners are shown.
---

6. Displayed Data (Post-Processing)


6.1 Company Overview

- Applicant Name
- Registration Number
- Country of Registration
- Type of Entity
- Type of Business
---

6.2 Key Company Roles


Company Owners

For each owner:
- Name
- Designation (Director / Secretary)
- IC / ID
- Address
- Date of Appointment
---

6.3 Shareholding Structure

For each shareholder:
- Name
- IC / ID
- Share Amount
---

6.4 Contact Information

- Contact Person Name
- Contact Email
- Contact Phone Number
---

6.5 Loan Application Details

- Type of Loan
- Loan Amount
- Loan Tenure
- Security Provided Type
- Security Value
---

6.6 Financial & Credit Indicators

- Issued / Paid-Up Capital
- Credit Scoring
- Percentile Ranking
---

6.7 Litigation Information (if any)

For each case:
- Case Number
- Court
- City
- State
- Involved Amount
If litigation_issue = true, this section must be visually highlighted.
---

7. Visual Highlighting Rules

- Sections related to failed checks must be:
	- Highlighted in red or warning color
	- Clearly labeled (e.g. “Issue Detected”)
- Passed sections may be shown normally or with subtle success indicators
---

8. Decision Summary Banner

At the top of the results page:

Failure Case

- ❌ Application Failed Initial Checks
- List of detected issues

Success Case

- ✅ Application Passed Initial Checks
- Ready for next stage (Credit Assessment)
---

9. Non-Goals (Out of Scope)

- Final credit approval / rejection
- Credit Risk Officer assessment
- Scoring model explanations
- Document OCR tuning
---

10. Design Principles

- Explainability over automation
- Clear failure reasons
- Minimal cognitive load
- Professional banking UX
- Demo-first, extensible later
---

11. Success Criteria for Demo

- Stakeholders can clearly see:
	- Why an application failed or passed
	- Which rule caused the failure
- Errors are immediately understandable
- Flow feels realistic and bank-grade
- No technical knowledge required to follow the demo
---
