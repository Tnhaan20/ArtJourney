import PropTypes from 'prop-types';
import './Checkbox.css';

const Checkbox = ({
  checked = false,
  onChange,
  className = '',
  disabled = false,
  children,
  color = 'primary-yellow',
  ...props
}) => {
  return (
    <label 
      className={`custom-checkbox ${color} ${disabled ? 'disabled' : ''} ${className}`} 
      {...props}
    >
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange}
        disabled={disabled}
      />
      <div className="checkbox-container">
        <svg viewBox="0 0 64 64" height="1.5em" width="1.5em">
          <path 
            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" 
            pathLength="575.0541381835938" 
            className="checkbox-path"
          />
        </svg>
      </div>
      {children && <span className="checkbox-label">{children}</span>}
    </label>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  color: PropTypes.string,
};

export default Checkbox;