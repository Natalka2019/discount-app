import { useMemo } from 'react';
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import style from './DiscountCard.module.scss';
import DiscountTag from '../DiscountTag';

function DiscountCard({
  discount,
  className = '',
  isLike,
  onFavouriteClick
}) {
  const cardTags = useMemo(() => (discount.tags.reduce((res, el, i, arr) => {
    if (i < 2) {
      res.push(<li key={el.id}>{`#${el.name}`}&nbsp;</li>);
    } else if (arr.length - 1 === i) {
      res.push(<li key={el.id}>{i + 1 - res.length ? `${i + 1 - res.length}+` : ''}</li>);
    }
    return res;
  }, [])), [discount]);

  return (
  <div className={`${style.borderCard} ${className}`}>
    <div className={style.col1}>
      <img className={style.roundImg} src={discount.imageUrl} alt={'vendor'} width="90" height="90"/>
    </div>
    <div className={style.col2}>
      <div className={`${style.row} ${style.titleWrapper}`}>
        <h2>{discount.title}</h2>
      </div>
      <div className={`${style.row} ${style.info}`}>
        <div className={style.col3}>
          <CategoryRoundedIcon fontSize = "small"/><p>{discount.category.title}</p>
        </div>
        <div className={style.col3}><StorefrontRoundedIcon fontSize = "small"/><p>{discount.vendor.title}</p></div>
      </div>
      <div className={`${style.row} ${style.descrTag}`}>
        <p className={style.description}>{discount.shortDescription}</p>
      </div>
      <div className={style.flexRow}>
        <ul className={style.tagsWrapper}>
          {cardTags}
        </ul>
        <DiscountTag
          percentage = {discount.percentage}
          flatAmount = {discount.flatAmount}
          className={style.discountTag}
        />
      </div>
    </div>
    <div className = {style.like} onClick = {(e) => onFavouriteClick(e, discount.id)}>
      {isLike ? <FavoriteRoundedIcon color = "error" /> : <FavoriteBorderRoundedIcon />}
    </div>
  </div>
  );
}

export default DiscountCard;
