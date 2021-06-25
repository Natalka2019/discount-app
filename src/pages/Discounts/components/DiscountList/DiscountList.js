import styles from './DiscountList.module.scss';
import DiscountCard from '../../../../components/discountCard';

function DiscountList({ discounts, onCardClick }) {
  console.log(discounts);
  const discountsList = discounts?.length
    ? discounts.map((discount) => <li key={discount.id} onClick = {onCardClick}>
        <DiscountCard
          title = {discount.title}
          category = {discount.category.title}
          company = {discount.vendor.title}
          description = {discount.description}
          discount = {discount.percentage}
          className = {styles.discountsCard}
        />
      </li>)
    : <p className = {styles.noContent}>There are no discounts</p>;
  return (
    <ul className = {styles.discountsList}>{discountsList}</ul>
  );
}

export default DiscountList;
