import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form, useFormikContext } from "formik";
import { useStateValue } from "../state";
import { TextField, SelectFieldTypes, TypeOption,   DiagnosisSelection} from "./FormField";
import {    EntryWithoutId ,  InitialEntryTypesForm} from "../types";

export type EntryFormValues = EntryWithoutId;

interface Props {
  onSubmit: (values: any) => void;
  onCancel: () => void;
}



const typeOptions: TypeOption[] = [
  { value:  "Hospital", label: "Hospital" },
  { value:  "HealthCheck", label: "HealthCheck" },
  { value:  "OccupationalHealthcare", label: "OccupationalHealthcare" }
];

export const AddEntryForm = ({ onSubmit, onCancel} : Props ) => {


	const context: any = useFormikContext();
	console.log(context.values);

	const [{ diagnoses }] = useStateValue();

	const initialValues: InitialEntryTypesForm = {	
			type: undefined,
			description: undefined,
			date: undefined,
			specialist: undefined,
			diagnosisCodes: undefined,
			healthCheckRating: undefined,
			discharge: undefined,
			sickLeave: undefined,
			employerName: undefined	
	};


  return (
    <Formik		
        initialValues={initialValues} 
		onSubmit={onSubmit}
		validate={values => {
			const requiredError = "Field is required";
			const errors: { [field: string]: string } = {};
			if (!values.type) {
				errors.type = requiredError;
			}
			if (!values.date) {
				errors.date = requiredError;
			}
			if (!values.description) {
				errors.description = requiredError;
			}
			if (!values.specialist) {
				errors.specialist = requiredError;
			}
			return errors;
		}} 	
    >
      {({ isValid, dirty  , setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
				<SelectFieldTypes
					label="type"
					name="type"
					options={typeOptions}
				/>
				<Field
					label="Date"
					placeholder="YYYY-MM-DD"
					name="date"
					component={TextField}
				/>

				<Field
					label="Description"
					placeholder="Description"
					name="description"
					component={TextField}
				/>

				<Field
					label="specialist"
					placeholder="specialist"
					name="specialist"
					component={TextField}
				/>

				
           
				<DiagnosisSelection
					diagnoses={Object.values(diagnoses)}
					setFieldValue = {setFieldValue}
					setFieldTouched = {setFieldTouched}
				/>

				
				{ context.values.type === "Hospital" &&
				
						<Field
							label="diagnosis"
							placeholder="diagnosis"
							name="diagnosis"
							component={TextField}
						/>
				}
        
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
