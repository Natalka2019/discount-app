import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import DatePicker from 'react-date-picker';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import validationSchema from '../../../../utilities/validationSchema';
import styles from './CreateDiscount.module.scss';
import TextInput from '../../../../components/TextInput';
import SelectField from '../../../../components/SelectField';
import Button from '../../../../components/Button';
import * as actions from '../../../../store/actions';
import {
  getLocationsOptions,
  getCountriesOptions,
  getCitiesGroupedByCountryOptions,
  getCategoriesOptions,
  getTypeaheadVendorsOptions
} from '../../../../store/selectors';
import useVendorTypeahead from '../../../../utilities/useVendorTypeahead';
import Vocabulary from '../../../../translations/vocabulary';

function CreateDiscount({
  discount,
  onModalClose
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [onVendorSelectInputChange, onVendorSelectBlur] = useVendorTypeahead();
  const countriesOptions = useSelector(getCountriesOptions);
  const citiesOptions = useSelector(getCitiesGroupedByCountryOptions);
  const categoriesOptions = useSelector(getCategoriesOptions);
  const createDiscountStatus = useSelector((state) => state.discountsReducer.createDiscountStatus);
  const locationOptions = useSelector(getLocationsOptions);
  const vendorsTypeaheadOptions = useSelector(getTypeaheadVendorsOptions);

  // SET INITIAL VALUE TO SELECTS
  const initialVendorOptions = discount ? {
    value: discount.vendor.id,
    label: discount.vendor.title
  }
    : null;

  const initialCategoryOptions = discount ? {
    value: discount.category.id,
    label: discount.category.title,
    tags: discount.category.tags
  }
    : null;

  const initialLocationsOptions = useMemo(() => (discount ? discount.locations.map((el) => ({
    value: el.id,
    label: Object.values(el).join(', ')
  })) : null), [discount]);

  const locationsToRequst = useMemo(() => (discount && discount.locations.map((el) => (el.id))), [discount]);

  const isFormSubmitted = createDiscountStatus.loading === false && createDiscountStatus.success;

  // DEFINE VALUES THAT ARE REQUESTED
  const discountRequest = {
    title: discount ? discount.title : '',
    imageUrl: discount ? discount.imageUrl : '',
    promocode: discount ? discount.promocode : '',
    description: discount ? discount.description : '',
    shortDescription: discount ? discount.shortDescription : '',
    flatAmount: discount ? discount.flatAmount : '',
    percentage: discount ? discount.percentage : '',
    startDate: discount ? new Date(discount.startDate) : new Date(Date.now()),
    expirationDate: discount ? new Date(discount.expirationDate) : null,
    locationIds: discount ? locationsToRequst : [],
    categoryId: discount ? discount.category.id : null,
    vendorId: discount ? discount.vendor.id : null,
    tagIds: discount ? discount.tags : []
    // mocked fields
    // perUser: 1,
    // price: 0,
    // quantity: 1
  };

  // GET REQUIRED DATA FROM API
  useEffect(() => {
    // if (!countriesOptions.length || !citiesOptions.length) {
    // dispatch(actions.locationActions.getLocationsList());
    // }

    if (!categoriesOptions.length) dispatch(actions.categoryActions.getCategories());
  }, [dispatch, countriesOptions, citiesOptions, categoriesOptions]);

  // FORM SUBMIT
  const submitHandler = (formData) => {
    if (discount) {
      const formDataUpdate = { ...formData, id: discount.id };
      dispatch(actions.discountsActions.createDiscount(formDataUpdate));
    } else {
      dispatch(actions.discountsActions.createDiscount(formData));
    }
  };

  const onOkClick = () => {
    onModalClose();
    dispatch(actions.discountsActions.clearCreateDiscountStatus());
    dispatch(actions.discountsActions.getDiscountsList());
  };

  const formik = useFormik({
    initialValues: discountRequest,
    validationSchema,
    onSubmit: submitHandler
  });

  // SET SELECT VALUE INTO FORMIK STATE
  const onSelectValueChange = (selected, options) => {
    const { name } = options;
    let value;
    if (Array.isArray(selected)) {
      value = selected.map((el) => el.value);
    } else {
      value = selected && selected.value;
    }
    console.log(name);
    if (name === 'categoryId') {
      formik.setFieldValue('tagIds', [], true);
    }
    formik.setFieldValue(name, value, true);
  };

  const startDateHandler = useCallback((value) => formik.setFieldValue('startDate', value), [formik]);

  const expirationDateHandler = useCallback((value) => formik.setFieldValue('expirationDate', value), [formik]);

  const tagsOptions = useMemo(() => (formik.values.categoryId ? categoriesOptions
    .find((el) => el.id === formik.values.categoryId).tags.map((tag) => ({ value: tag.id, label: tag.name }))
    : []), [formik.values.categoryId, categoriesOptions]);

  const initialTagsOptions = useMemo(() => (formik.values.tagIds ? categoriesOptions
    .find((el) => el.id === formik.values.categoryId)?.tags
    .filter((tag) => formik.values.tagIds.includes(tag.id))
    .map((tag) => ({ value: tag.id, label: tag.name }))
    : []), [formik.values.categoryId, formik.values.tagIds, categoriesOptions]);

  console.log(formik.values);

  return (
    <div className={styles.modalContent}>
      {isFormSubmitted
      && <div className = {styles.successMessageContainer}>
        <div className = {styles.successMessage}>{createDiscountStatus.success}</div>
        <Button
          btnText = {t(Vocabulary.OK)}
          onClick = {onOkClick}
          type = "submit"
        />
      </div>}
      {createDiscountStatus.loading === true
      && <div className = {styles.loadingContainer}>
        <CircularProgress />
      </div>}
      <form className={isFormSubmitted ? styles.formDisplayNone : ''}>
        <TextInput
          placeholder = {t(Vocabulary.DISCOUNT_TITLE)}
          label = {t(Vocabulary.TITLE)}
          name = "title"
          type = "text"
          className={styles.inputContainer}
          value = {formik.values.title}
          onValueChange = {formik.handleChange}
          onBlur={formik.handleBlur}
          error = {formik.errors.title}
        />
        <div className={styles.twoColumnsWrapper}>
          <SelectField
            options = {vendorsTypeaheadOptions}
            initialValue = {initialVendorOptions}
            label = {t(Vocabulary.VENDOR_MIN_3_CHARS)}
            name = "vendorId"
            placeholder = {t(Vocabulary.SELECT_VENDOR)}
            className={styles.inputContainer}
            onChange = {onSelectValueChange}
            onInputChange={(characters) => onVendorSelectInputChange(characters)}
            error = {formik.errors.vendorId}
            onBlur = {onVendorSelectBlur}
          />
          <SelectField
            options = {categoriesOptions}
            initialValue = {initialCategoryOptions}
            label = {t(Vocabulary.CATEGORY)}
            name = "categoryId"
            placeholder = {t(Vocabulary.SELECT_CATEGORY)}
            className={styles.inputContainer}
            onChange = {onSelectValueChange}
            error = {formik.errors.categoryId}
          />
        </div>
        <SelectField
          options = {tagsOptions}
          value = {initialTagsOptions}
          label = {t(Vocabulary.TAGS)}
          name = "tagIds"
          placeholder = {t(Vocabulary.SELECT_TAGS)}
          className={styles.inputContainer}
          isMulti={true}
          onChange = {onSelectValueChange}
          error = {formik.errors.tags}
        />
        <SelectField
          options = {locationOptions}
          initialValue={initialLocationsOptions}
          label = {t(Vocabulary.LOCATION)}
          name = "locationIds"
          className={styles.inputContainer}
          isMulti={true}
          onChange = {onSelectValueChange}
          error = {formik.errors.locationIds}
        />
        <TextInput
          placeholder = {t(Vocabulary.IMAGE_URL)}
          label = {t(Vocabulary.IMAGE_URL)}
          name = "imageUrl"
          type = "url"
          className={styles.inputContainer}
          value = {formik.values.imageUrl}
          onValueChange = {formik.handleChange}
          onBlur={formik.handleBlur}
          error = {formik.errors.imageUrl}
        />
        <TextInput
          placeholder = {t(Vocabulary.PROMO_CODE)}
          label = {t(Vocabulary.PROMO_CODE)}
          name = "promocode"
          type = "text"
          className={styles.inputContainer}
          value = {formik.values.promocode}
          onValueChange = {formik.handleChange}
          onBlur={formik.handleBlur}
          error = {formik.errors.promocode}
        />
        <div className={`${styles.inputContainer} ${styles.textareaWrapper}`}>
          <label htmlFor="description">{t(Vocabulary.FULL_DESCRIPTION)}</label>
          <textarea
            placeholder = {t(Vocabulary.FULL_DESCRIPTION)}
            id="description"
            name = "description"
            onChange = {formik.handleChange}
            onBlur={formik.handleBlur}
            value = {formik.values.description}
          />
          <div className = {styles.error}>{formik.errors.description}</div>
        </div>
        <div className={`${styles.inputContainer} ${styles.textareaWrapper}`}>
          <label htmlFor="shortDescription">{t(Vocabulary.SHORT_DESCRIPTION)}</label>
          <textarea
            placeholder = {t(Vocabulary.SHORT_DESCRIPTION)}
            id = "shortDescription"
            name = "shortDescription"
            className={styles.shortDescr}
            value = {formik.values.shortDescription}
            onChange = {formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className = {styles.error}>{formik.errors.shortDescription}</div>
        </div>
        <div className={`${styles.discountDateSection} ${styles.twoColumnsWrapper}`}>
          <div className={styles.discountContainer}>
            <TextInput
              placeholder = {t(Vocabulary.DISCOUNT_FLAT)}
              label = {t(Vocabulary.DISCOUNT_FLAT)}
              name = "flatAmount"
              type = "text"
              className={styles.inputContainer}
              value = {formik.values.flatAmount}
              onValueChange = {formik.handleChange}
              onBlur={formik.handleBlur}
              disabled = {!!formik.values.percentage}
            />
            <TextInput
              placeholder = {t(Vocabulary.DISCOUNT_PERCENTAGE)}
              label = {t(Vocabulary.DISCOUNT_PERCENTAGE)}
              name = "percentage"
              type = "text"
              className={styles.inputContainer}
              onValueChange = {formik.handleChange}
              value = {formik.values.percentage}
              onBlur={formik.handleBlur}
              disabled = {!!formik.values.flatAmount}
            />
            {(formik.errors.flatAmount && formik.errors.percentage)
            && <div className = {styles.error}>{formik.errors.flatAmount || formik.errors.percentage}</div>}
          </div>
          <div className={styles.dateContainer}>
            <div className={`${styles.labelInputRow} ${styles.inputContainer}`}>
              <label>{t(Vocabulary.FROM)}</label>
              <DatePicker
                format="dd-MM-y"
                name="startDate"
                className={styles.customDatePicker}
                value={formik.values.startDate}
                onChange={startDateHandler}
                returnValue="start"
              />
            </div>
            <div className={`${styles.labelInputRow} ${styles.inputContainer}`}>
              <label>{t(Vocabulary.TO)}</label>
              <DatePicker
                format="dd-MM-y"
                name="expirationDate"
                className={styles.customDatePicker}
                value={formik.values.expirationDate}
                onChange={expirationDateHandler}
                returnValue="end"
              />
            </div>
            {(formik.errors.startDate || formik.errors.expirationDate)
            && <div className = {styles.error}>{formik.errors.startDate || formik.errors.expirationDate}</div>}
          </div>
        </div >
        {createDiscountStatus.loading === false && createDiscountStatus.error
          && <div className = {styles.errorMessage}>
          {createDiscountStatus.error.message}
        </div>}
        <div className={styles.btnContainer}>
          <Button
            btnText = {t(Vocabulary.SAVE)}
            type = "submit"
            isDisabled = {!formik.isValid || !formik.dirty}
            onClick={formik.handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateDiscount;
