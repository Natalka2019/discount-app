import React, {
  // useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import { useState, useCallback } from 'react';
import styles from './Discounts.module.scss';
import FiltersContainer from '../../components/FiltersContainer';
import countriesList from '../../mockData/countriesList';
import citiesList from '../../mockData/citiesList';
import categoriesList from '../../mockData/categoriesList';
import vendorsList from '../../mockData/vendorsList';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SelectField from '../../components/SelectField';
import DiscountList from './components/DiscountList/DiscountList';
import OutlineButton from '../../components/OutlineButton';
import AddNewItemButton from '../../components/AddNewItemButton';
import Modal from '../../components/Modal';
import AddDiscountModal from './components/AddDiscountModal';

const onChange = () => {
  console.log('change');
};
const onBlur = () => {
  console.log('blur');
};
const onShowMoreClick = () => {
  console.log('show more');
};
const options = ['Vendors', 'Category', 'Discount', 'Expiration Date'];

function Discounts() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.discountsActions.getDiscountsList());
  }, [dispatch]);

  const discounts = useSelector((state) => state.discountsReducer.discounts);
  console.log(discounts);
  const [modalState, setModalState] = useState(false);

  const onModalOpen = () => {
    setModalState(true);
  };

  const closeModal = useCallback(() => {
    setModalState(false);
  },
  [setModalState]);

  const onApplyButtonClick = (parameters) => {
    console.log(parameters);
  };

  return (
    <div className = {styles.containerFluid}>
      <div>
        <Header/>
        <main className = {styles.container}>
          <FiltersContainer
            onApplyButtonClick = {onApplyButtonClick}
            countriesList = {countriesList}
            citiesList = {citiesList}
            categoriesList = {categoriesList}
            vendorsList = {vendorsList}
            className = {styles.discountsFilter}
            />
            <div className = {styles.discountsActions}>
              <AddNewItemButton
                btnTitle="Add new discount"
                onAddNewItem={onModalOpen}
                name = "add_discount"
              />
              <SelectField
                options = {options}
                initialValue = "Expiration Date"
                onChange = {onChange}
                isLoading = "false"
                className = ""
                onBlur = {onBlur}
              />
            </div>
            <div className = {styles.discountsContainer}>
              <DiscountList
                discounts = {discounts}
              />
            </div>
            <div className = {styles.discountsShowMoreBtnWrap}>
              <OutlineButton
                btnText = "Show more"
                onClick = {onShowMoreClick}
                className = {styles.discountsShowMoreBtn}
              />
            </div>
          </main>
        </div>
        <Modal isOpen={modalState} onClose={closeModal}>
          <AddDiscountModal discount={{ title: 'title' }}/>
        </Modal>
      <Footer/>
    </div>
  );
}

export default Discounts;
