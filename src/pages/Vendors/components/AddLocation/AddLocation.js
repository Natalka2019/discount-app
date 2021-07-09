import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import styles from './AddLocation.module.scss';
import SelectField from '../../../../components/SelectField';
import Button from '../../../../components/Button';
import * as actions from '../../../../store/actions';
import { getCitiesOptions, getCountriesOptions } from '../../../../store/selectors';

function AddLocation({ onModalClose, addLocationToVendor }) {
  const dispatch = useDispatch();
  const citiesOptions = useSelector(getCitiesOptions);
  const countriesOptions = useSelector(getCountriesOptions);

  const createOnSelectValueChange = (setFieldValue) => (selected, options) => {
    const { name } = options;
    let value;
    if (Array.isArray(selected)) {
      value = selected;
    } else {
      value = selected && selected.value;
    }
    setFieldValue(name, value);
    if (name === 'countryCode') {
      dispatch(actions.locationActions.getCities(value));
    }
  };

  const onApplyFilter = (filterData) => {
    console.log('filterData', filterData);
  };

  const onChooseLocation = (locationData) => {
    console.log('locationData', locationData);
    addLocationToVendor();
    onModalClose();
  };
  return (
    <div className={styles.chooseLocationWrapper}>
      <Formik
        initialValues={{ countryCode: '' }}
        validationSchema={yup.object().shape({
          country: yup.string().nullable().required('The fiels is required')
        })}
        onSubmit={onApplyFilter}
      >
        {(formikProps) => {
          const {
            handleBlur, setFieldValue, errors, isValid, dirty, isSubmitting
          } = formikProps;

          const onSelectValueChange = createOnSelectValueChange(setFieldValue);

          return (
            <Form>
              <div className={styles.twoColumnsWrapper}>
                <SelectField
                  // defaultValue={citiesOptions}
                  options = {countriesOptions}
                  name="countryCode"
                  label = "Country"
                  placeholder = "Country"
                  className={styles.inputContainer}
                  onChange = {onSelectValueChange}
                  onBlur = {handleBlur}
                  error = {errors.country}
                />
                <SelectField
                  // defaultValue={citiesOptions}
                  options = {citiesOptions}
                  name="city"
                  label = "City"
                  placeholder = "City"
                  className={styles.inputContainer}
                  onChange = {onSelectValueChange}
                  onBlur = {handleBlur}
                  error = {errors.city}
                />
              </div>
              <Button
                btnText = "Apply filter"
                className={styles.locationActionBtn}
                type = "submit"
                isDisabled={!isValid || !dirty || isSubmitting}
              />
            </Form>
          );
        }}
      </Formik>
      <Formik
        initialValues={{ location: [] }}
        validationSchema={yup.object().shape({
          location: yup.mixed().nullable().test('location', 'Choose at least one location', (val) => val.length > 0)
        })}
        onSubmit={onChooseLocation}
      >
        {(formikProps) => {
          const {
            handleBlur, setFieldValue, errors, isValid, dirty
          } = formikProps;

          const onSelectValueChange = createOnSelectValueChange(setFieldValue);

          return (
            <Form>
              <SelectField
                placeholder = "Location"
                label = "Location"
                name = "location"
                className={styles.inputContainer}
                onValueChange = {onSelectValueChange}
                onBlur={handleBlur}
                error = {errors.location}
              />
              <Button
                btnText = "Add location"
                className={`${styles.chooseLocationBtn} ${styles.locationActionBtn}`}
                type = "submit"
                isDisabled={!isValid || !dirty}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddLocation;
