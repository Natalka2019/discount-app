import styles from './VendorListItem.module.scss';
import ItemActionButton from '../../../../components/ItemActionButton';

function VendorListItem({ vendor }) {
  const onEdit = () => {
    // do code to edit item
  };

  const onDelete = () => {
    // do code to delete item
  };

  return (
    <div className={styles['item-wrapper']}>
      <figure className={styles['img-wrapper']}>
        <img src={vendor.vn_image_url} alt={vendor.vn_title} />
      </figure>
      <div className={styles['text-wrapper']}>
        <p className={styles['vendor-title']}>{vendor.vn_title}</p>
        <p className={styles['vendor-location']}>{vendor.vn_loc}</p>
        <p className={styles['vendor-description']}>{vendor.vn_description}</p>
      </div>
      <div className={styles.buttons}>
        <ItemActionButton
          title="Edit"
          className={styles['action-btn']}
          onActionClick={onEdit}
        />
        <ItemActionButton
          title="Delete"
          type="delete"
          className={styles['action-btn']}
          onActionClick={onDelete}
        />
      </div>
    </div>
  );
}

export default VendorListItem;
