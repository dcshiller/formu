ynr
##### Users

| Column Name | Type | Relation | Other |
| --- | --- | --- | --- | --- |
| Id  | Int | - | - |
| Username | String | - | Unique, Not Null, Indexed |
| Email | String | - | Unique, Not Null, Indexed |
| Password | String | - | Not Null |    

##### Forms

| Column Name | Type |  Relation | Other |
| :------------- | :------------- | --- | --- |
| Id  | Int | - | - |
| Designer_Id | Int | Users:Id | Not Null, Indexed |
| Title | String | - | Not Null |
| Instructions | Text | - | - |

##### Form Fields

| Column Name | Type |  Relation | Other |
| :------------- | :------------- | --- | --- |
| Id | Int | - | - |
| Type | String | - | Not Null |
| Form_Id | Int | Forms:Id | Not Null, Indexed |
| Label | String | - | Not Null |
| Instructions | Text | - | - |
| Form_Position | Int | - | Not Null |

##### Form Field Options


| Column Name | Type |  Relation | Other |
| :------------- | :------------- | --- | --- |
| Id | Int | - | - |
| Form_Field_Id | Int | Form_Field:Id | Not Null, Indexed |
| Option_text | String | - | Not Null |


##### Form Responses

| Column Name | Type |  Relation | Other |
| :------------- | :------------- | --- | --- |
| Id | Int | - | - |
| Form_Id | Int | Form:Id | Indexed, Not Null |


##### Form Field Responses

| Column Name | Type |  Relation | Other |
| :------------- | :------------- | --- | --- |
| Id | Int | - | - |
| Form_Field_Id | Int | Form_Field:Id | Indexed, Not Null, Unique by Response_Id |
| Response_Id | Int | Form_Response:Id | Indexed, Not Null, Unique by Form_Field_Id |
| Response_Value | Text | - | - |  
