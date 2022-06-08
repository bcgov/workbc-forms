/* Remove completed items */
DELETE FROM FormsCreated WHERE (IsCompleted)

/* Selecting curent items to display to provider. # is the catchment number (1-45) */
SELECT * FROM FormsCreated_Listing WHERE CatchmentNo = #

/* Selecting curent items to display to provider. By user name */
SELECT * FROM FormsCreated_Listing WHERE CreatedBy = :UserName

/* Sorting ORDER BY */
SELECT * FROM FormsCreated_Listing 
WHERE CatchmentNo = #
ORDER BY StorefrontName, FormsCreatedId DESC


/* Adding a new record, dialog prompt */
INSERT INTO FormsCreated VALUES (
  DEFAULT,
  'a8cc0e8c-1d63-4022-bfa1-7b99fea4edc8',
  #, /* FormTemplateId */
  #, /* VersionNo */
  #, /* CatchmentNo */
  '', /* Storefront Name */
  false, /* IsCreated */
  false, /* IsInICM */
  false, /* IsCompleted */
  null,  /* FormData */
  '*',   /* User name */
   current_timestamp
);


/* Update a record when data is sent into the API. Note: json data may have issues with ' needing to be replaced by '' characters */
UPDATE CreatedForms
SET 
  IsCreated = true,
  FormData = '{jsontext}'
WHERE
  FormKey = '*formkeyvalue*'

/* Update created forms if checkboxes are set for IsInICM or IsCompleted */
UPDATE CreatedForms
SET
  IsInICM = true|false,
  IsCompleted = true|false
WHERE
  FormKey = '*formkeyvalue*'
