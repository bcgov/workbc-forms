/* Remove completed items */
DELETE FROM FormsCreated WHERE (IsCompleted)

/* Selecting curent items to display to provider. # is the catchment number (1-45) */
SELECT * FROM FormsCreated_Listing WHERE CatchmentNo = #

/* Update a record when data is sent into the API. Note: json data may have issues with ' needing to be replaced by '' characters */
UPDATE CreatedForms
SET 
  IsCreated = true,
  FormData = '{jsontext}'
WHERE
  FormKey = '*formkeyvalue*'

