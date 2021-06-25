// import { useState, useEffect } from 'react';
import { useState } from 'react';
import styles from './FiltersContainer.module.scss';
import Button from '../Button';
import SelectField from '../SelectField';
import TextInput from '../TextInput';

function FiltersContainer({
  onApplyButtonClick,
  countriesList,
  citiesList,
  categoriesList,
  vendorsList,
  userCountry,
  userCities
}) {
  const [searchWord, setSearchWord] = useState('');
  const [country, setCountry] = useState(userCountry);
  const [city, setCity] = useState(null);
  const [category, setCategory] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [citiesBySelectedCountry, setCitiesBySelectedCountry] = useState(
    // citiesList.filter((el) => el.country === userCountry.value)
    userCities
  );

  const onChangeInput = (e) => {
    console.log(e.target.value);
    setSearchWord(e.target.value);
  };

  const onChangeCountries = (selectedOption) => {
    console.log(selectedOption);
    setCountry(selectedOption);
    const selectedCities = citiesList.filter((el) => el.country === selectedOption.value);
    setCitiesBySelectedCountry(selectedCities);
  };

  const onChangeCities = (selectedOption) => {
    console.log(selectedOption);
    setCity(selectedOption);
  };

  const onChangeCategories = (selectedOption) => {
    console.log(selectedOption);
    setCategory(selectedOption);
  };

  const onChangeVendor = (selectedOption) => {
    console.log(selectedOption);
    setVendor(selectedOption);
  };

  console.log(vendorsList);
  console.log(countriesList);
  // console.log(countriesList.find((el) => el.value === userCountry));
  console.log(country);
  console.log(citiesBySelectedCountry);

  return (
    <div className = {styles.container}>
      <div className = {styles.filtersContainer}>
        <div className = {styles.smallColumn}>
          <div className = {styles.filter}>
            <SelectField
              initialValue = {country} // temporary. Should be user country later
              options = {countriesList}
              label = "Country"
              onChange = {onChangeCountries}
            />
            </div>
            <div className = {styles.filter}>
              <SelectField
                options = {citiesBySelectedCountry}
                label = "City"
                onChange = {onChangeCities}
              />
            </div>
        </div>
        <div className = {styles.smallColumn}>
          <div className = {styles.filter}>
            <SelectField
              options = {categoriesList}
              label = "Category"
              onChange = {onChangeCategories}
            />
          </div>
          {vendorsList && <div className = {styles.filter}>
            <SelectField
              options = {vendorsList}
              label = "Vendor"
              onChange = {onChangeVendor}
            />
          </div>}
        </div>
      </div>
      <div className = {styles.inputContainer}>
        <TextInput
          onValueChange = {onChangeInput}
          label = "Search"
          name = "Search"
          placeholder = "Search..."
          type = "text"
        />
      </div>
      <div className = {styles.buttonContainer}>
      <Button
        btnText = "Apply"
        onClick = {() => onApplyButtonClick(
          {
            searchWord,
            country,
            city,
            category,
            vendor
          }
        )}
      />
      </div>
    </div>
  );
}

export default FiltersContainer;
