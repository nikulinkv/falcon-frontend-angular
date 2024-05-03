export type Company = {
  "exchange": string,
  "persons": [],
  "_id": string,
  "code": string,
  "currency": string,
  "industry": string,
  "isin": string,
  "name": string,
  "name_short": string,
  "code_alt": string,
  "groups": [],
  "finreport_last_period": string,
  "finreport_last_year": number,
  "finreport_currency": string,
  "preferred": boolean,
  "about": string,
  "about_short": string,
  "type": string,
  "finreport_base_year": number
}

export type Indicator = {
  "_id": string,
  "code": string,
  "code_alt": string,
  "name": string,
  "short_name": string,
  "aggregation": string,
  "colors": string[],
  "forgroups": [],
  "hint": string,
  "indicators": string[],
  "isactive": boolean,
  "order": number,
  "path": string,
  "type": string,
  "created_at": Date,
  "updated_at": Date,
  "__v": number,
  "comments": [],
  "result_type": string
}
