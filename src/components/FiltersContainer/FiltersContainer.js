import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './FiltersContainer.module.scss';
import Button from '../Button';
import SelectField from '../SelectField';
import TextInput from '../TextInput';
import {
  getTypeaheadVendorsOptions, getCountriesOptions, getCitiesOptions,
  getCategoriesOptions
} from '../../store/selectors';
import useVendorTypeahead from '../../utilities/useVendorTypeahead';
import Vocabulary from '../../translations/vocabulary';

const inputStyles = {
  width: '200px',
  marginRight: '10px'
};

function FiltersContainer({
  onApplyButtonClick,
  onChangeCountry,
  onChangeCity,
  onChangeCategory,
  onSearchInputChange,
  filters,
  onVendorSelectOptionChange,
  sortOptions,
  onSortFilterChange,
  onChangeTags
}) {
  const { t } = useTranslation();
  const [onVendorSelectInputChange, onVendorSelectBlur] = useVendorTypeahead();
  const vendorsTypeaheadOptions = useSelector(getTypeaheadVendorsOptions);
  const countriesOptions = useSelector(getCountriesOptions);
  const citiesOptions = useSelector(getCitiesOptions);
  const categoriesOptions = useSelector(getCategoriesOptions);
  // const [selectedCategory, setSelectedCategory] = useState(categoriesOptions.find(
  //   (el) => el.id === Number(filters.category)
  // ) || null);
  const [categoryTags, setCategoryTags] = useState([]);

  // const x = categoriesOptions.find(
  //   (el) => el.id === Number(filters.category)
  // ).tags;

  // console.log(x);

  // console.log(selectedCategory);

  const onChangeSearchInput = (e) => {
    onSearchInputChange(e.target.value);
  };

  const onChangeCountries = (selectedOption) => {
    onChangeCountry(selectedOption);
  };

  const onChangeCities = (selectedOption) => {
    onChangeCity(selectedOption);
  };

  const onChangeCategories = (selectedOption) => {
    onChangeCategory(selectedOption);
    console.log(selectedOption);
    setCategoryTags(selectedOption?.tags || []);
  };

  const countryMemoized = useMemo(
    () => countriesOptions.find(
      (el) => el.countryCode === filters.country
    ) || null, [countriesOptions, filters]
  );

  const categoriesOptionsMemoized = useMemo(
    () => categoriesOptions.find(
      (el) => el.id === Number(filters.category)
    ) || null, [categoriesOptions, filters]
  );

  const sortOptionMemoized = useMemo(
    () => sortOptions.find(
      (el) => el.value === filters.sort
    ), [sortOptions, filters]
  );

  const tagsOptionsMemoized = useMemo(
    () => categoryTags.map(
      (el) => ({ value: el.id, label: el.name })
    ) || null, [categoryTags]
  );

  console.log(categoriesOptionsMemoized);
  console.log(categoryTags);
  console.log(filters);
  console.log(tagsOptionsMemoized);

  // const x = useMemo(
  //   () => (filters.tags ? filters.tags.split(',').map(
  //     (el) => tagsOptionsMemoized.find((tag) => Number(el) === tag.value)
  //   ) : null), [tagsOptionsMemoized, filters.tags]
  // );

  // console.log(x);

  const selectedTagsMemoized = useMemo(
    () => (filters.tags ? filters.tags?.map(
      (el) => categoriesOptionsMemoized?.tags.find((tag) => Number(el) === tag.id)
    )?.map((item) => ({ value: item?.id, label: item?.name })) : null), [filters.tags, categoriesOptionsMemoized]
  );

  console.log(selectedTagsMemoized);

  return (
    <div className = {styles.container}>
      <div className = {styles.filtersContainer}>
          <div className = {styles.filter}>
            <SelectField
              value = {countryMemoized}
              options = {countriesOptions}
              label = {t(Vocabulary.COUNTRY)}
              onChange = {onChangeCountries}
            />
            </div>
            <div className = {styles.filter}>
              <SelectField
                options = {citiesOptions}
                label = {t(Vocabulary.CITY)}
                onChange = {onChangeCities}
                value = {{ value: filters.city, label: filters.city }}
              />
            </div>
          <div className = {styles.filter}>
            <SelectField
              options = {categoriesOptions}
              label = {t(Vocabulary.CATEGORY)}
              onChange = {onChangeCategories}
              value = {categoriesOptionsMemoized}
            />
          </div>
          <div className = {styles.filter}>
            {onChangeTags && <SelectField
              options = {tagsOptionsMemoized}
              label = {t(Vocabulary.TAGS)}
              isMulti
              onChange = {onChangeTags}
              value = {selectedTagsMemoized}
            />}
          </div>
          <div className = {styles.filter}>
            <SelectField
              options = {vendorsTypeaheadOptions}
              value = {{ value: filters.vendorTitle, label: filters.vendorTitle }}
              label = {t(Vocabulary.VENDOR_MIN_3_CHARS)}
              name = "vendorId"
              onChange = {(option) => onVendorSelectOptionChange(option)}
              onInputChange={(characters) => onVendorSelectInputChange(characters)}
              onBlur = {onVendorSelectBlur}
            />
          </div>
          <div className = {styles.filter}>
            <TextInput
              onValueChange = {onChangeSearchInput}
              label = {t(Vocabulary.SEARCH)}
              name = "Search"
              placeholder = {`${t(Vocabulary.SEARCH)}...`}
              type = "search"
              style = {inputStyles}
              value = {filters.description || filters.shortDescription || ''}
            />
          </div>
          <div className = {styles.filter}>
            <SelectField
              value = {sortOptionMemoized }
              options={sortOptions}
              onChange={onSortFilterChange}
              isClearable={false}
              label = {t(Vocabulary.SORT)}
              className = {styles.filterSort}
            />
          </div>
        <div className = {styles.buttonContainer}>
        <Button
          btnText = {t(Vocabulary.APPLY)}
          onClick = {onApplyButtonClick}
        />
        </div>
      </div>
    </div>
  );
}

export default FiltersContainer;
