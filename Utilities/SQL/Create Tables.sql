/* FormTemplates */
  CREATE TABLE FormTemplates (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Code VARCHAR(80) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    VersionNo INTEGER NOT NULL,
    ClientURL VARCHAR(255) NOT NULL,
    ClientAPIKey VARCHAR(60) NOT NULL,
    ProviderURL VARCHAR(255) NOT NULL,
    ProviderAPIKey VARCHAR(60) NOT NULL,
    IsActive BOOLEAN NOT NULL,
    FormDefinition JSONB NOT NULL,
    DateCreated TIMESTAMP NOT NULL  
  );
        
  CREATE INDEX Idx_FormTemplates_Name ON FormTemplates(Name);

  CREATE INDEX Idx_FormTemplates_Code ON FormTemplates(Code);

/* FormsCreated */
CREATE TABLE FormsCreated (
   Id SERIAL PRIMARY KEY,
   FormKey VARCHAR(60) NOT NULL,
   FormTemplateId INTEGER NOT NULL,
   VersionNo INTEGER NOT NULL,
   CatchmentNo INTEGER NOT NULL,
   StoreFrontName VARCHAR(60),   
   IsCreated BOOLEAN NOT NULL,
   IsInICM BOOLEAN NOT NULL,   
   IsCompleted BOOLEAN NOT NULL,
   FormData JSONB,
   CreatedBy VARCHAR(128),
   DateCreated TIMESTAMP NOT NULL
 );
      
CREATE INDEX Idx_FormsCreated_FormTemplateId ON FormsCreated(FormTemplateId);

CREATE INDEX Idx_FormsCreated_FormKey ON FormsCreated(FormKey);

CREATE INDEX Idx_FormsCreated_CatchmentNo ON FormsCreated(CatchmentNo);

CREATE INDEX Idx_FormsCreated_DateCreated ON FormsCreated(DateCreated);

/* Views */

/* 
  FormsCreate_Listing is intended for the default view of forms created. 
  It only lists forms which have not completed. (NOT IsCompleted)
  This should include a WHERE CatchmentNo = # filter.
*/
CREATE VIEW FormsCreated_Listing AS
SELECT 
  FormTemplates.Code,
  FormTemplates.ClientAPIKey,
  FormTemplates.ProviderAPIKey,
  FormsCreated.FormKey,
  FormsCreated.CatchmentNo,
  FormsCreated.StoreFrontName,
  FormsCreated.IsCreated,
  FormsCreated.IsInICM,
  FormsCreated.IsCompleted,
  FormsCreated.DateCreated,
  FormsCreated.CreatedBy,
  FormsCreated.FormData ->> 'lastName' AS LastName,
  FormsCreated.FormData ->> 'firstName' AS FirstName,
  FormsCreated.FormData ->> 'caseNumber' As CaseNumber
FROM
  FormsCreated,FormTemplates
WHERE
  FormTemplates.Id = FormsCreated.FormTemplateId AND
  (NOT FormsCreated.IsCompleted)
