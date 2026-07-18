export interface TeamMember {
  name: string;
  title: string;
  department: string;
  status: string;
  reportsTo: string;
  hireDate: string;
  email: string;
  phone: string;
}

export const departments = [
  "Executive & Leadership",
  "HR & Administration",
  "Billing & Accounting",
  "Sales & Production",
  "Policy Services",
  "Front Desk & Client Support",
];

export const team: TeamMember[] = [
  { name: "Milen Milev", title: "Managing Principal", department: "Executive & Leadership", status: "Full-Time", reportsTo: "—", hireDate: "05/10/2017", email: "milen@truxins.com", phone: "331-707-4040" },
  { name: "Boryana Mileva", title: "HR & Compliance Manager", department: "HR & Administration", status: "Intl FT Contractor", reportsTo: "Milen Milev", hireDate: "12/17/2018", email: "boryana@truxins.com", phone: "" },
  { name: "Valeriya Karaivanova", title: "Billing & Accounting Manager", department: "Billing & Accounting", status: "Intl FT Contractor", reportsTo: "Milen Milev", hireDate: "01/21/2022", email: "valeriya@truxins.com", phone: "" },
  { name: "Margarita Karaivanova", title: "Billing Specialist", department: "Billing & Accounting", status: "Intl FT Contractor", reportsTo: "Valeriya Karaivanova", hireDate: "01/04/2019", email: "margarita@truxins.com", phone: "" },
  { name: "Petya Vasilev", title: "Independent Producer", department: "Sales & Production", status: "Contractor", reportsTo: "Milen Milev", hireDate: "05/17/2021", email: "petya@truxins.com", phone: "331-300-0144" },
  { name: "Sevdelina Vasileva", title: "Independent Producer", department: "Sales & Production", status: "Contractor", reportsTo: "Milen Milev", hireDate: "03/04/2019", email: "sevi@truxins.com", phone: "" },
  { name: "Snezhina Georgieva", title: "Licensed Commercial Lines Assistant", department: "Sales & Production", status: "Full-Time", reportsTo: "Sevdelina Vasileva", hireDate: "03/01/2021", email: "sneji@truxins.com", phone: "331-240-1101 ext 105" },
  { name: "Silviya Borisova", title: "Commercial Lines Administrative Assistant", department: "Sales & Production", status: "Full-Time Hourly", reportsTo: "Petya Vasilev", hireDate: "06/10/2023", email: "silviya@truxins.com", phone: "" },
  { name: "Stefan Vasilev", title: "Licensed Commercial Lines Assistant", department: "Sales & Production", status: "Full-Time Hourly", reportsTo: "Milen Milev", hireDate: "09/16/2024", email: "stefan@truxins.com", phone: "" },
  { name: "Elena Dimitrova", title: "Policy Services Specialist", department: "Policy Services", status: "Full-Time", reportsTo: "Milen Milev", hireDate: "08/16/2021", email: "eli@truxins.com", phone: "" },
  { name: "Ivelina Dimitrova", title: "Policy Services Specialist", department: "Policy Services", status: "Intl FT Contractor", reportsTo: "Margarita Karaivanova", hireDate: "07/03/2023", email: "ivelina@truxins.com", phone: "" },
  { name: "Nadya Bangova", title: "Customer Service Representative", department: "Front Desk & Client Support", status: "Full-Time", reportsTo: "Milen Milev", hireDate: "11/22/2021", email: "nadya@truxins.com", phone: "" },
];
