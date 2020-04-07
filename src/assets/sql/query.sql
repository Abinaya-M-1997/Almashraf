CREATE TABLE IF NOT EXISTS ORIG_APPLICATION(
refId TEXT,
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT,
firstName TEXT,
lastName TEXT,
gender TEXT,
dob TEXT,
phone TEXT,
email TEXT,
middleName TEXT,
address TEXT,
address2 TEXT,
district TEXT,
permaddress1 TEXT,
permaddress2 TEXT,
permdistrict TEXT,
permpincode TEXT,
relationship TEXT,
company TEXT,
pincode TEXT,
custCategory TEXT,
nationality TEXT,
stlCust TEXT,
CustType TEXT,
bankingWith TEXT,
vipFlag TEXT,
incomeAssg TEXT,
cbrbRes TEXT,
alEthiadBureau TEXT,
accNo TEXT,
passportNo TEXT,
eidaNo TEXT,
rimNo TEXT,
poBoxNo TEXT,
imagepath TEXT,
userType TEXT,
sameValue TEXT,
filled TEXT DEFAULT N
);

CREATE TABLE IF NOT EXISTS ORIG_LOAN_DETAILS(
refId TEXT,
id TEXT,
loanid INTEGER PRIMARY KEY AUTOINCREMENT,
product TEXT,
producttype TEXT,
amount TEXT,
tenure TEXT,
moratorium TEXT,
interesttype TEXT,
mclr TEXT,
loan_purpose TEXT,
loan_amount_range TEXT,
repaymentMode TEXT,
repaymentType TEXT,
proposalType TEXT,
amortization TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_KYC_DETAILS(
refId TEXT,
id TEXT,
kycid INTEGER PRIMARY KEY AUTOINCREMENT,
doctype TEXT,
kycNum TEXT,
kycDesc TEXT,
imgadd TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_PAN_DETAILS(
refId TEXT,
id TEXT,
panId INTEGER PRIMARY KEY AUTOINCREMENT,
pancard TEXT,
aadhaar TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_PROOFIMG_DETAILS(
refId TEXT,
id TEXT,
kycid TEXT,
proofimgid INTEGER PRIMARY KEY AUTOINCREMENT,
proofimgpath TEXT


);

CREATE TABLE IF NOT EXISTS ORIG_PANIMG_DETAILS(
refId TEXT,
id TEXT,
panId TEXT,
panImgId INTEGER PRIMARY KEY AUTOINCREMENT,
panImageName TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_AADHARIMG_DETAILS(
refId TEXT,
id TEXT,
panId TEXT,
aadharImgId INTEGER PRIMARY KEY AUTOINCREMENT,
aadharImageName TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_INCOME_DETAILS(
refId TEXT,
id TEXT,
incomeid INTEGER PRIMARY KEY AUTOINCREMENT,
category TEXT,
incometype TEXT,
grossincome TEXT,
statutory TEXT,
other TEXT,
netincome TEXT,
incomeyesno TEXT,
employname TEXT,
doj TEXT,
esob TEXT,
lengthinservice TEXT,
userType TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_EXPENSE_DETAILS(
refId TEXT,
id TEXT,
incomeid INTEGER PRIMARY KEY AUTOINCREMENT,
description TEXT,
expense TEXT,
totalexpences TEXT,
overallexpences TEXT
);


CREATE TABLE IF NOT EXISTS ORIG_OTHERDOC_DETAILS(
refId TEXT,
id TEXT,
otherid INTEGER PRIMARY KEY AUTOINCREMENT,
otherdes TEXT,
otherdoctype TEXT,
otherdocid TEXT,
loan_product TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_OTHERDOCIMG_DETAILS(
refId TEXT,
id TEXT,
otherdocid TEXT,
otherimgid INTEGER PRIMARY KEY AUTOINCREMENT,
otherimgpath TEXT,
loan_product TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_OTHERINCOME_DETAILS(
refId TEXT,
id TEXT,
otherincomeid INTEGER PRIMARY KEY AUTOINCREMENT,
otherincome TEXT,
amount TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_BANK_DETAILS(
refId TEXT,
id TEXT,
bankid INTEGER PRIMARY KEY AUTOINCREMENT,
bname TEXT,
emiamount TEXT,
userType TEXT
);
CREATE TABLE IF NOT EXISTS ORIG_OTHEREXPENCES_DETAILS(
refId TEXT,
id TEXT,
otherexpenceid INTEGER PRIMARY KEY AUTOINCREMENT,
otherexpence TEXT,
amount INTEGER
);

CREATE TABLE IF NOT EXISTS ORIG_APP_DETAILS(
id INTEGER PRIMARY KEY AUTOINCREMENT,
createddate TEXT,
deviceid TEXT,
createduser TEXT,
/* new */
app_reference_number TEXT,
app_submit_status TEXT,
app_submit_date TEXT
/*app_branch_name TEXT,
app_assigned_user TEXT*/
);
CREATE TABLE IF NOT EXISTS SUBMIT_TIMESTAMP(
id INTEGER PRIMARY KEY AUTOINCREMENT,
app_refid TEXT,
app_reference_number TEXT,
app_submit_date TEXT,
app_submit_time TEXT
);

CREATE TABLE IF NOT EXISTS STATE_MASTER(
id INTEGER PRIMARY KEY AUTOINCREMENT,
sgmStateCode TEXT,
sgmStateName TEXT
);

CREATE TABLE IF NOT EXISTS PRODUCT_LIST(
id INTEGER PRIMARY KEY AUTOINCREMENT,
lpdProdNewId TEXT,
lpdAmtFrom TEXT,
lpdAmtTo TEXT,
lpdPrdDesc TEXT,
lpdTenorFrom TEXT,
lpdTenorTo TEXT,
lpdMoratoriumMax TEXT,
lpdPrdType TEXT
);
CREATE TABLE IF NOT EXISTS RATE_INTERESTIN_MOBILE(
id INTEGER PRIMARY KEY AUTOINCREMENT,
lirProdId TEXT,
lirAmtFrom TEXT,
lirAmtTo TEXT,
lirMclrPrefr TEXT,
lirIntType TEXT,
lirTrPrefr TEXT,
lirPriority TEXT
);

CREATE TABLE IF NOT EXISTS STATIC_DATA(
id INTEGER PRIMARY KEY AUTOINCREMENT,
llvHeader TEXT,
llvOptionDesc TEXT,
llvOptionVal TEXT
);


CREATE TABLE IF NOT EXISTS CITY_MASTER(
id INTEGER PRIMARY KEY AUTOINCREMENT,
sgmStateCode TEXT,
sgmCityCode TEXT,
sgmCityName TEXT
);

CREATE TABLE IF NOT EXISTS LOGIN_DETAILS(
seqid INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT,
userid TEXT,
password TEXT,
branchcode TEXT,
empId TEXT,
organisationLevel TEXT,
organisationcode TEXT,
organisationName TEXT,
city TEXT,
districtCode TEXT,
publickey TEXT
);

CREATE TABLE IF NOT EXISTS DOCUMENT_LIST(
id INTEGER PRIMARY KEY AUTOINCREMENT,
doc_product_id TEXT,
doc_ldDocActive TEXT,
doc_docId TEXT,
doc_description TEXT,
doc_ldDocType TEXT,
doc_ldLegalDocActive TEXT
);

CREATE TABLE IF NOT EXISTS BRANCH(
id INTEGER PRIMARY KEY AUTOINCREMENT,
userid TEXT,
rolelocation TEXT,
rolelocationname TEXT
);
CREATE TABLE IF NOT EXISTS BRANCH_USER(
id INTEGER PRIMARY KEY AUTOINCREMENT,
branchCode TEXT,
UserId TEXT,
UserFirstName TEXT,
UserDesignation TEXT
);



