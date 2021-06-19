import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Routes from '../../../../routes';
import styles from './VendorListItem.module.scss';
import ItemActionButton from '../../../../components/ItemActionButton';
import Modal from '../../../../components/Modal';
import DeleteConfirmation from '../../../../components/DeleteConfirmation';

function VendorListItem({ vendor, onEdit, onDelete }) {
  const [modalOpen, setModalOpen] = useState(false);
  const deleteVendorStatus = useSelector((state) => state.vendorReducer.deleteVendorStatus);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const onDeleteClick = useCallback(() => {
    setModalOpen(true);
  }, []);

  return (
    <div className={styles.itemWrapper}>
      <figure className={styles.imgWrapper}>
        <img src={vendor.imageUrl} alt={vendor.title} />
      </figure>
      <div className={styles.textWrapper}>
        <p className={styles.vendorTitle}>{vendor.title}</p>
        <p className={styles.vendorLocation}>{vendor.location}</p>
        <p className={styles.vendorDescription}>{vendor.description}</p>
      </div>
      <div className={styles.buttons}>
        <ItemActionButton
          title="Edit"
          onActionClick={(e) => onEdit(e, vendor.id)}
          className={styles.editBtn}
          name = "edit"
        />
        <ItemActionButton
          title="Delete"
          type="delete"
          className={styles.deleteBtn}
          onActionClick={onDeleteClick}
          name = "delete"
        />
        <Link to={`${Routes.VENDOR}/${vendor.id}`} className={styles.detailsBtn}>View</Link>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <DeleteConfirmation
          onYesClick ={() => onDelete(vendor.id)}
          status = {deleteVendorStatus}
          itemTitle = "vendor"
        />
      </Modal>
    </div>
  );
}

export default VendorListItem;
