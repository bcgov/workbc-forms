/* Recreates sample data in the tables. 
   WARNING: Removes all existing data */

/* FormTemplates */
TRUNCATE TABLE FormTemplates RESTART IDENTITY;

INSERT INTO FormTemplates VALUES (
  DEFAULT,
  'Sample Form',
  'XHR001',
  'This is a sample form.',
  1,
  'https://forms-dev.es.workbc.ca/app/form/submit?f=ce4db453-ae12-49af-ad02-299d960e7ff7',
  'https://forms-dev.es.workbc.ca/app/form/submit?f=a8cc0e8c-1d63-4022-bfa1-7b99fea4edc8 ',
  true,
  '{ "name": "Sample Form" }',
  current_timestamp
);

/* FormsCreated */
TRUNCATE TABLE FormsCreated RESTART IDENTITY;

INSERT INTO FormsCreated VALUES (
  DEFAULT,
  'a8cc0e8c-1d63-4022-bfa1-7b99fea4edc8',
  1, /* FormTemplateId */
  1, /* VersionNo */
  1, /* CatchmentNo */
  'Campbell River',
  false,
  false,
  false,
  '{   
    "confirmationId": "8E9501F1",
    "createdAt": "2022-04-22T21:39:52.379Z", 
    "formId": "a8cc0e8c-1d63-4022-bfa1-7b99fea4edc8",
    "formSubmissionStatusCode": "SUBMITTED",
    "submissionId": "8e9501f1-810a-4c2c-aed1-23e3bd31d8e2",
    "createdBy": "public",
    "formVersionId": "f8fa9357-bf26-4d09-8b38-ed500d4a5a3d",
    "firstName": "Test",
    "lastName": "Testlast",
    "token": "da9b09dd-db16-42bb-ba77-f4af93ac02d9"   
  }',
  'asmith',
  current_timestamp
)
