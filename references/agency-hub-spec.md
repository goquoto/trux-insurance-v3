# TRUX Agency Hub — Build Spec Reference

## Design Tokens
| Token | Value | Usage |
|---|---|---|
| --navy | #1b1b2f | Sidebar, header gradient start, dark tiles |
| --indigo | #605e9e | Primary accent: active nav, pills, footer |
| --indigo-dark | #4b4a7d | Hover states, gradient ends |
| --blue | #2f6bff | Links, primary buttons, logo checkmark, avatar |
| --ink | #242424 | Body text |
| --muted | #616161 | Secondary text |
| --line | #e1e1e1 | Borders/dividers |
| --bg | #f4f5f8 | Page background |
| Cards | #ffffff | White cards, 10px radius, 1px --line border |
| Green badge | #1e8e5a on #e2f5ea | Verified content |
| Amber badge | #b96a00 on #fdf1e0 | Draft content |

Typography: 'Segoe UI', system-ui, sans-serif. Body 15px. Page titles ~20px semibold. Section headings 22px/650. Category pills: 10.5px uppercase, letter-spaced, white on indigo, 20px radius.

## Sidebar Navigation
```
MAIN
  Dashboard          → /portal
  Carrier Directory  → /portal/carriers
  Knowledge Base     → /portal/kb
  Workflows          → /portal/kb?cat=Workflow
PEOPLE & TRAINING
  Onboarding         → /portal/training
  Team Directory     → /portal/team
OPERATIONS
  Intake Forms       → /portal/forms
  Standards          → /portal/standards
  Payment Options    → /portal/kb/payment-options
```

## 73 Carrier Records (Company | LOB | Markets | AMS)
Accredited (FLPM)|Trucking|Commercial|Manual
Aegis|HO3-Home, DP3-Landlord|Personal|Download
Aegis Financial - Life & Annuities|Life, Annuities|Personal|—
AIG|HO3-Home, Personal Umbrella, Valuable Articles|Personal|Manual
All Risk|Brokers, E&S Personal Lines|Brokers|Manual
Amelia Underwriters|Vacant Property, Builders Risk|Personal|Manual
American Integrity|HO3-Home, HO6-Condo|Personal|Download
American Modern|Manufactured Homes, Collector Cars, Boat, RVs|Personal|Download
AmTrust|Workers Comp, BOP, General Liability|Commercial|Download
AmWins|Brokers, Commercial Property, Commercial Umbrella|Brokers|Manual
Apogee|Commercial Umbrella|Commercial|Manual
ASI|HO3, HO4, HO6, Flood|Personal|Download
Benchmark Insurance Company (FLPM)|Trucking|Commercial|Manual
Berkshire Hathaway Guard|Workers Comp, BOP, Commercial Auto, Commercial Umbrella|Commercial|Download, Manual
Better Agency|Non Insurance Services|—|—
BHHC|Trucking, Workers Comp|Commercial|Manual
Branch|HO3-Home, Auto|Personal|Download
Bristol West|Auto|Personal|Download
Canal (FLPM)|Trucking|Commercial|Manual
Capital Premium Finance|Finance Companies|Commercial|—
Chubb|HO3-Home, Valuable Articles, Personal Umbrella|Personal, Commercial|Manual
Coalition|Cyber Liability|Commercial|Manual
Continental Western Group|Commercial Property, GL, Commercial Auto|Commercial|Download
Corvus|Cyber Liability|Commercial|Manual
Cover Whale|Trucking, Commercial Auto|Commercial|Manual
CRC Group|Brokers, Commercial Umbrella, Liquor|Brokers|Manual
Dynamic Specialty|Trucking|Commercial|Manual
Erie Insurance - Commercial|BOP, GL, Commercial Auto, Workers Comp|Commercial|Download
Erie Insurance - Personal Lines|HO3-Home, Auto, Personal Umbrella, Boat|Personal|Download
Foremost|Manufactured Homes, Motorcycle, RVs, Vacant Property|Personal|Download
Foremost Flood|Flood|Personal|Manual
Gateway Underwriters|Trucking, Brokers|Brokers, Commercial|Manual
Hippo|HO3-Home|Personal|Download
Hiscox|GL, BOP, E&O, Cyber Liability|Commercial|Manual
Imperial Premium Finance (IPFS)|Finance Companies|Commercial|—
IVANS|Non Insurance Services|—|Download
Jewelers Mutual|Valuable Articles|Personal|Manual
Kemper Auto (Infinity)|Auto|Personal|Download
Lemonade|HO4-Renters, HO3-Home|Personal|Manual
Liberty Mutual|Auto, HO3-Home, BOP|Personal, Commercial|Download
LOOM|Non Insurance Services|—|—
Loss Runs|Non Insurance Services|—|—
Markel|GL, Inland Marine, Boat, Motorcycle|Commercial, Personal|Manual
National General|Auto, HO3-Home, RVs|Personal|Download
Nationwide|Auto, HO3-Home, BOP, Commercial Auto, Farm|Personal, Commercial|Download
Northland (CRC)|Trucking, Commercial Auto|Commercial|Manual
Nowcerts|Non Insurance Services|—|—
Openly|HO3-Home|Personal|Download
Personal Umbrella|Personal Umbrella, E&S Personal Lines|Personal|Manual
Pie|Workers Comp|Commercial|Manual
Plymouth Rock|Auto, HO3-Home|Personal|Download
Progressive|Auto, Commercial Auto, Trucking, Motorcycle, Boat|Personal, Commercial|Download
Risk Lookup|Non Insurance Services|—|—
Risk Placement Services (RPS)|Brokers, Commercial Property, Liquor|Brokers|Manual
RLI|Personal Umbrella, Home Business|Personal|Manual
Safeco|Auto, HO3, HO4, HO6, Boat, Personal Umbrella|Personal|Download
Scottish American|DP3-Landlord, Vacant Property|Personal|Manual
Simply Easier Payments|Non Insurance Services, Finance Companies|—|—
Southern Oak|HO3-Home|Personal|Manual
State Auto|Auto, HO3-Home, BOP, Commercial Auto|Personal, Commercial|Download
Steadily Insurance|DP3-Landlord, Vacation Rentals|Personal|Manual
Ten Four|Trucking|Commercial|Manual
Texas Insurance Company (Applied Underwriters)|Workers Comp|Commercial|Manual
The Hartford|BOP, Workers Comp, GL, Commercial Auto|Commercial|Download
Total CSR|Non Insurance Services|—|—
Travelers|Auto, HO3-Home, BOP, Commercial Property, Commercial Umbrella, Workers Comp|Personal, Commercial|Download
US Assure|Builders Risk|Commercial|Manual
USG Insurance Services|Brokers, Commercial Property|Brokers|Manual
USLI|GL, DP3-Landlord, Liquor, Miscellaneous Services|Commercial|Manual
Vacant Express|Vacant Property, Builders Risk|Personal|Manual
Vault|HO3-Home, Valuable Articles, Collector Cars|Personal|Manual
Worldwide Facilities / RIC General Agency|Brokers, Trucking|Brokers|Manual
Zapier|Non Insurance Services|—|—

## 12 Team Members
Milen Milev|Managing Principal|Executive & Leadership|Full-Time|—|05/10/2017|milen@truxins.com|331-707-4040
Boryana Mileva|HR & Compliance Manager|HR & Administration|Intl FT Contractor|Milen Milev|12/17/2018|boryana@truxins.com|
Valeriya Karaivanova|Billing & Accounting Manager|Billing & Accounting|Intl FT Contractor|Milen Milev|01/21/2022|valeriya@truxins.com|
Margarita Karaivanova|Billing Specialist|Billing & Accounting|Intl FT Contractor|Valeriya Karaivanova|01/04/2019|margarita@truxins.com|
Petya Vasilev|Independent Producer|Sales & Production|Contractor|Milen Milev|05/17/2021|petya@truxins.com|331-300-0144
Sevdelina Vasileva|Independent Producer|Sales & Production|Contractor|Milen Milev|03/04/2019|sevi@truxins.com|
Snezhina Georgieva|Licensed Commercial Lines Assistant|Sales & Production|Full-Time|Sevdelina Vasileva|03/01/2021|sneji@truxins.com|331-240-1101 ext 105
Silviya Borisova|Commercial Lines Administrative Assistant|Sales & Production|Full-Time Hourly|Petya Vasilev|06/10/2023|silviya@truxins.com|
Stefan Vasilev|Licensed Commercial Lines Assistant|Sales & Production|Full-Time Hourly|Milen Milev|09/16/2024|stefan@truxins.com|
Elena Dimitrova|Policy Services Specialist|Policy Services|Full-Time|Milen Milev|08/16/2021|eli@truxins.com|
Ivelina Dimitrova|Policy Services Specialist|Policy Services|Intl FT Contractor|Margarita Karaivanova|07/03/2023|ivelina@truxins.com|
Nadya Bangova|Customer Service Representative|Front Desk & Client Support|Full-Time|Milen Milev|11/22/2021|nadya@truxins.com|

## 20 KB Articles (slug|title|categories|status)
payment-options|Payment Options|Agency Standards, Billing|VERIFIED
code-of-ethics|Code of Ethics|Agency Standards|draft
claim-intake|Claim Intake Questions & Procedures|Claims, Scripts|draft
change-request-pipeline|Change Request Pipeline Overview|Workflow, Endorsements|draft
claims-pipeline-az|Claims Pipeline in AgencyZoom|Workflow, Claims|draft
past-due-payments|Past Due Payments in AgencyZoom|Workflow, Billing|draft
renewals-workflow|Renewals Workflow|Workflow, New Business|draft
add-delete-vehicle|Adding or Deleting a Vehicle — Workflow|Workflow, Endorsements, How Tos|draft
garaging-mailing-address|Change to Garaging or Mailing Address|Workflow, Endorsements|draft
reinstatements|Processing Reinstatements|Workflow, Reinstatements|draft
voicemail-scripts|Voicemail Scripts & Out-of-Office Email Scripts|Scripts, Emails|draft
carrier-websites|Carrier Websites|Carriers, Links|draft
coi-issuance|Issuing Certificates of Insurance (COIs)|COIs, How Tos|draft
aor-processing|Processing AOR (Agent of Record) Changes|AORs, How Tos|draft
new-business-checklist|New Business Submission Checklist (Trucking)|New Business, Commercial Resources|draft
company-guidelines|Company Guidelines|Agency Standards|draft
quality-standards|Quality Standards|Agency Standards|draft
data-security|Data Security Practices|Agency Standards|draft
binding-procedures|Binding Procedures|Binding, New Business|draft
email-standards|Client Email Standards & Templates|Emails, Scripts|draft

## Quick Links (Dashboard)
### Quick Links column
- FMCSA SAFER Company Snapshot — safer.fmcsa.dot.gov/CompanySnapshot.aspx
- FEMA Flood Property Search — msc.fema.gov/portal/home
- IL Surplus Lines Association — slai.org

### Lookups column
- IL Business Name Search (SOS) — apps.ilsos.gov/businessentitysearch/
- Contractor License Search (IDFPR) — idfpr.illinois.gov/licenselookup/
- FMCSA Licensing & Insurance (Filings) — li-public.fmcsa.dot.gov

### Forms & Records column
- IL Workers Comp Commission Forms — iwcc.illinois.gov
- Pay Online — truxins.com/pay
- Trux Website — truxins.com

## Agency Constants
- Office: 1 Tiffany Pointe #7-G2, Bloomingdale, IL 60108
- Phone: 331-240-1101 · Fax: 331-240-1055
- Web: truxins.com · Payments: truxins.com/pay · Zelle/AP: ap@truxins.com
- Hours: Monday–Friday, 9:00 AM–5:00 PM CT
