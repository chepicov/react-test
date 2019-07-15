import React, { PureComponent as Component } from 'react';
import noop from 'lodash/noop';
import ClickOutside from 'components/common/clickOutside';
import PropTypes from 'react-proptypes';
import cx from 'classnames';
import './select.styles.css';

class Select extends Component {
  state = {
    opened: false,
  };

  onOptionClick = value => (event) => {
    event.stopPropagation();
    this.close();
    this.props.onChange(value);
  };

  onBlur = () => {
    this.close();
  };

  onClick = () => {
    this.open();
  };

  close = () => {
    this.setState({ opened: false });
    this.props.onToggle(false);
  };

  open = () => {
    this.setState({ opened: true });
    this.props.onToggle(true);
  };

  renderOption = ({ value, label, secondLabel }) => {
    const { selectedOption } = this.props;
    const isSelected = selectedOption && selectedOption.value === value;
    return (
      <div
        key={value}
        className={cx('option', {
          option__selected: isSelected,
        })}
        tabIndex={-1}
        onClick={this.onOptionClick({ value, label })}
        onKeyDown={this.onOptionClick({ value, label })}
        role="option"
        aria-selected={false}
      >
        {label}
        <span>{secondLabel}</span>
      </div>
    );
  };

  render() {
    const {
      options, selectedOption, className,
    } = this.props;
    const { opened } = this.state;
    const floatingPart = (
      <div
        ref={(c) => { this.floating = c; }}
        className="floating"
      >
        {options.map(this.renderOption)}
      </div>
    );

    return (
      <ClickOutside
        onClickOutside={this.onBlur}
        className="mainContainer"
      >
        <div
          className={cx('root', className)}
          tabIndex={-1}
          role="button"
          onKeyUp={this.onClick}
          onClick={this.onClick}
        >
          <div
            role="option"
            aria-selected
            className="option"
          >
            {selectedOption ? selectedOption.label : ''}
            <div />
          </div>
          {opened && floatingPart}
        </div>
      </ClickOutside>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  })),
  selectedOption: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

Select.defaultProps = {
  onChange: noop,
  onToggle: noop,
  options: [],
  errors: [],
  className: '',
  selectedOption: null,
  textClassName: null,
  optionsClassName: null,
  scrollOnOpening: false,
};

export default Select;
