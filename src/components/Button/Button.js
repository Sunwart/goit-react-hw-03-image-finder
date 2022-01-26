import { LoadButton } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ btnName, onClick }) => {
  return <LoadButton onClick={onClick}>{btnName}</LoadButton>;
};

export default Button;
