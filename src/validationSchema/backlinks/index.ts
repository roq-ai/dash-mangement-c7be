import * as yup from 'yup';

export const backlinkValidationSchema = yup.object().shape({
  url: yup.string().required(),
  individual_id: yup.string().nullable(),
});
