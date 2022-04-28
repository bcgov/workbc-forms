TRUNCATE TABLE FormTemplates RESTART IDENTITY;

INSERT INTO FormTemplates VALUES (
  DEFAULT,
  'Sample Form',
  'XHR001',
  'This is a sample form.',
  1,
  'https://forms-dev.es.workbc.ca/app/form/submit?f=ce4db453-ae12-49af-ad02-299d960e7ff7',
  'ce4db453-ae12-49af-ad02-299d960e7ff7', /* ClientAPIKey */
  'https://forms-dev.es.workbc.ca/app/form/submit?f=a8cc0e8c-1d63-4022-bfa1-7b99fea4edc8 ',
  'a8cc0e8c-1d63-4022-bfa1-7b99fea4edc8', /* ProviderAPIKey */
  true,
  '{"display":"form","type":"form","components":[{"id":"emm3mrr","key":"token","tags":[],"type":"hidden","input":true,"label":"token","logic":[],"hidden":false,"prefix":"","suffix":"","unique":false,"widget":{"type":"input"},"dbIndex":true,"overlay":{"top":"","left":"","page":"","style":"","width":"","height":""},"tooltip":"","disabled":false,"multiple":false,"redrawOn":"","tabindex":"","validate":{"custom":"","unique":false,"multiple":false,"required":false,"customPrivate":false,"strictDateValidation":false},"autofocus":false,"encrypted":false,"hideLabel":false,"inputType":"hidden","modalEdit":false,"protected":false,"refreshOn":"","tableView":false,"attributes":{},"errorLabel":"","persistent":true,"properties":{},"validateOn":"change","clearOnHide":true,"conditional":{"eq":"","show":null,"when":null},"customClass":"","description":"","placeholder":"","defaultValue":"","dataGridLabel":false,"labelPosition":"top","showCharCount":false,"showWordCount":false,"calculateValue":"","calculateServer":false,"allowMultipleMasks":false,"customDefaultValue":"var url = window.location.href; // or window.location.href for current url\r\n\r\nvar captured = /token=([^&]+)/.exec(url); // Value is in [1]\r\n\r\nvar result = captured ? captured[1] : ''invalid'';\r\n\r\nvalue = result;","allowCalculateOverride":false},{"id":"e93lr1h","key":"firstName","case":"","mask":false,"tags":[],"type":"textfield","input":true,"label":"First Name","logic":[],"hidden":false,"prefix":"","suffix":"","unique":false,"widget":{"type":"input"},"dbIndex":false,"overlay":{"top":"","left":"","page":"","style":"","width":"","height":""},"tooltip":"","disabled":false,"multiple":false,"redrawOn":"","tabindex":"","validate":{"json":"","custom":"","unique":false,"pattern":"","multiple":false,"required":false,"maxLength":"","minLength":"","customMessage":"","customPrivate":false,"strictDateValidation":false},"autofocus":false,"encrypted":false,"hideLabel":false,"inputMask":"","inputType":"text","modalEdit":false,"protected":false,"refreshOn":"","tableView":true,"attributes":{},"errorLabel":"","persistent":true,"properties":{},"spellcheck":true,"validateOn":"change","clearOnHide":true,"conditional":{"eq":"","json":"","show":null,"when":null},"customClass":"","description":"","inputFormat":"plain","placeholder":"","autocomplete":"","defaultValue":"","dataGridLabel":false,"labelPosition":"top","showCharCount":false,"showWordCount":false,"calculateValue":"","calculateServer":false,"customConditional":"","allowMultipleMasks":false,"customDefaultValue":"","allowCalculateOverride":false},{"id":"eszkp6e","key":"lastName","case":"","mask":false,"tags":[],"type":"textfield","input":true,"label":"Last Name","logic":[],"hidden":false,"prefix":"","suffix":"","unique":false,"widget":{"type":"input"},"dbIndex":false,"overlay":{"top":"","left":"","page":"","style":"","width":"","height":""},"tooltip":"","disabled":false,"multiple":false,"redrawOn":"","tabindex":"","validate":{"json":"","custom":"","unique":false,"pattern":"","multiple":false,"required":false,"maxLength":"","minLength":"","customMessage":"","customPrivate":false,"strictDateValidation":false},"autofocus":false,"encrypted":false,"hideLabel":false,"inputMask":"","inputType":"text","modalEdit":false,"protected":false,"refreshOn":"","tableView":true,"attributes":{},"errorLabel":"","persistent":true,"properties":{},"spellcheck":true,"validateOn":"change","clearOnHide":true,"conditional":{"eq":"","json":"","show":null,"when":null},"customClass":"","description":"","inputFormat":"plain","placeholder":"","autocomplete":"","defaultValue":"","dataGridLabel":false,"labelPosition":"top","showCharCount":false,"showWordCount":false,"calculateValue":"","calculateServer":false,"customConditional":"","allowMultipleMasks":false,"customDefaultValue":"","allowCalculateOverride":false},{"id":"eblccy8","key":"caseNumber","case":"","mask":false,"tags":[],"type":"textfield","input":true,"label":"Case Number","logic":[],"hidden":false,"prefix":"","suffix":"","unique":false,"widget":{"type":"input"},"dbIndex":false,"overlay":{"top":"","left":"","page":"","style":"","width":"","height":""},"tooltip":"","disabled":false,"multiple":false,"redrawOn":"","tabindex":"","validate":{"json":"","custom":"","unique":false,"pattern":"","multiple":false,"required":false,"maxLength":"","minLength":"","customMessage":"","customPrivate":false,"strictDateValidation":false},"autofocus":false,"encrypted":false,"hideLabel":false,"inputMask":"","inputType":"text","modalEdit":false,"protected":false,"refreshOn":"","tableView":true,"attributes":{},"errorLabel":"","persistent":true,"properties":{},"spellcheck":true,"validateOn":"change","clearOnHide":true,"conditional":{"eq":"","json":"","show":null,"when":null},"customClass":"","description":"","inputFormat":"plain","placeholder":"","autocomplete":"","defaultValue":"","dataGridLabel":false,"labelPosition":"top","showCharCount":false,"showWordCount":false,"calculateValue":"","calculateServer":false,"customConditional":"","allowMultipleMasks":false,"customDefaultValue":"","allowCalculateOverride":false},{"id":"etj7j1e","key":"clientData1","case":"","mask":false,"tags":[],"type":"textfield","input":true,"label":"Client Data 1","logic":[],"hidden":false,"prefix":"","suffix":"","unique":false,"widget":{"type":"input"},"dbIndex":false,"overlay":{"top":"","left":"","page":"","style":"","width":"","height":""},"tooltip":"","disabled":false,"multiple":false,"redrawOn":"","tabindex":"","validate":{"json":"","custom":"","unique":false,"pattern":"","multiple":false,"required":false,"maxLength":"","minLength":"","customMessage":"","customPrivate":false,"strictDateValidation":false},"autofocus":false,"encrypted":false,"hideLabel":false,"inputMask":"","inputType":"text","modalEdit":false,"protected":false,"refreshOn":"","tableView":true,"attributes":{},"errorLabel":"","persistent":true,"properties":{},"spellcheck":true,"validateOn":"change","clearOnHide":true,"conditional":{"eq":"","json":"","show":null,"when":null},"customClass":"","description":"","inputFormat":"plain","placeholder":"","autocomplete":"","defaultValue":"","dataGridLabel":false,"labelPosition":"top","showCharCount":false,"showWordCount":false,"calculateValue":"","calculateServer":false,"customConditional":"","allowMultipleMasks":false,"customDefaultValue":"","allowCalculateOverride":false},{"id":"e8kl3il","key":"submit","size":"md","type":"button","block":false,"input":true,"label":"Submit","theme":"primary","action":"submit","hidden":false,"prefix":"","suffix":"","unique":false,"widget":{"type":"input"},"dbIndex":false,"overlay":{"top":"","left":"","style":"","width":"","height":""},"tooltip":"","disabled":false,"leftIcon":"","multiple":false,"redrawOn":"","tabindex":"","validate":{"custom":"","unique":false,"multiple":false,"required":false,"customPrivate":false,"strictDateValidation":false},"autofocus":false,"encrypted":false,"hideLabel":false,"modalEdit":false,"protected":false,"refreshOn":"","rightIcon":"","tableView":false,"attributes":{},"errorLabel":"","persistent":false,"properties":{},"validateOn":"change","clearOnHide":true,"conditional":{"eq":"","show":null,"when":null},"customClass":"","description":"","placeholder":"","defaultValue":null,"dataGridLabel":true,"labelPosition":"top","showCharCount":false,"showWordCount":false,"calculateValue":"","calculateServer":false,"disableOnInvalid":true,"allowMultipleMasks":false,"customDefaultValue":"","allowCalculateOverride":false}]}',
  current_timestamp
);

TRUNCATE TABLE FormsCreated RESTART IDENTITY;

INSERT INTO FormsCreated VALUES (
  DEFAULT,
  'a8cc0e8c-1d63-4022-bfa1-7b99fea4edc8',
  1, /* FormTemplateId */
  1, /* VersionNo */
  1, /* CatchmentNo */
  'Port Hardy',
  false, /* IsCreated */
  false, /* IsInICM */
  false, /* IsCompleted */
  null,
  'USERA',
   current_timestamp
);

INSERT INTO FormsCreated VALUES (
  DEFAULT,
  'a8cc0e8c-1d63-4022-bfa1-7b99fea4edc9',
  1, /* FormTemplateId */
  1, /* VersionNo */
  1, /* CatchmentNo */
  'Campbell River',
  true, /* IsCreated */
  false, /* IsInICM */
  false, /* IsCompleted */
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
  'USERB',
   current_timestamp
);