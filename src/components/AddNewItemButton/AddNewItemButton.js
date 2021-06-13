import AddIcon from '@material-ui/icons/Add';
import styles from './AddNewItemButton.module.scss';

function AddNewItemButton({
  btnTitle,
  onAddNewItem
}) {
  return (
    <button
      type="button"
      className={styles['add-btn']}
      onClick={onAddNewItem}
    >
      <AddIcon fontSize="large" />
      {btnTitle}
    </button>
  );
}

export default AddNewItemButton;
