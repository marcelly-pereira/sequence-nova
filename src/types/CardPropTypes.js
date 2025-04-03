import PropTypes from 'prop-types';

const CardPropTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default CardPropTypes;