# JotForm Field Mapping Reference

## Contact Form (ID: 261981423817059)
| Our Field | QID | Type |
|-----------|-----|------|
| Name | 2 | control_textbox |
| Email | 3 | control_email |
| Phone | 4 | control_phone (masked: (###) ###-####) |
| Message | 5 | control_textarea |

## Fast Quote Form (ID: 261982089328065)
| Our Field | QID | Type |
|-----------|-----|------|
| First Name | 2 | control_textbox |
| Last Name | 3 | control_textbox |
| Email | 4 | control_email |
| Phone | 5 | control_phone |
| Company Name | 6 | control_textbox |
| DOT Number | 7 | control_textbox |
| State | 8 | control_dropdown |
| Notes | 9 | control_textarea |
| Upload documents | 10 | control_fileupload |

## Quote Form (ID: 261982064993066)
| Our Field | QID | Type | Notes |
|-----------|-----|------|-------|
| Full Name | 3 | control_fullname | sublabels: prefix, first, middle, last, suffix |
| Company Name | 4 | control_textbox | |
| Email | 5 | control_email | |
| Phone | 6 | control_phone | sublabels: full (masked) |
| DOT / MC Number | 7 | control_textbox | |
| Primary State | 8 | control_dropdown | |
| Number of Power Units | 9 | control_number | |
| Vehicle Type | 10 | control_textbox | |
| FMCSA Authority Type | 12 | control_dropdown | |
| EIN | 13 | control_textbox | |
| Years in Business | 14 | control_number | |
| Target Effective Date | 15 | control_datetime | sublabels: month, day, year |
| Estimated Annual Mileage | 16 | control_number | |
| Radius of Operation | 17 | control_checkbox | |
| Estimated Annual Revenue | 18 | control_textbox | |
| Primary Commodities Hauled | 19 | control_textbox | |
| Average Load Value | 20 | control_textbox | |
| Maximum Load Value | 21 | control_textbox | |
| Coverages Needed | 22 | control_checkbox | |
| Desired Limits | 23 | control_textbox | |
| Deductible | 24 | control_textbox | |
| Equipment Details | 26 | control_textarea | |
| Driver Details | 27 | control_textarea | |
| Upload Loss Runs, IFTA, etc. | 28 | control_fileupload | |

## API Notes
- Submission endpoint: PUT/POST https://api.jotform.com/form/{FORM_ID}/submissions
- Body format: submission[QID]=value (for simple fields)
- Composite fields: submission[QID_first], submission[QID_last] (for fullname)
- Phone (masked): submission[QID_full]=value
- Date: submission[QID_month], submission[QID_day], submission[QID_year]
- Checkbox: submission[QID]=value1\nvalue2 (newline separated)
- File uploads: NOT supported via API submission endpoint (store on our side, pass URL in text field)
