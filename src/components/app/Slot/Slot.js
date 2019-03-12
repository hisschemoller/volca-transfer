import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { setSlot } from '../../../actions/volca.actions';
import s from './Slot.css';

class Slot extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isStarted: PropTypes.bool.isRequired,
    path: PropTypes.string,
    status: PropTypes.number.isRequired,
  };

  static defaultProps = {
    path: '',
  };

  static statusClasses = ['', '', s.success, s.success, s.active, s.error];

  constructor(props) {
    super(props);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(e) {
    e.preventDefault();
    const { dispatch, index, isStarted } = this.props;
    if (!isStarted) {
      dispatch(setSlot(index, e.target.value));
    }
  }

  render() {
    const { index, path, status } = this.props;

    return (
      <div className={s.root}>
        <div className={s.label}>{index}</div>
        <input
          className={Slot.statusClasses[status]}
          name={`input${index}`}
          onInput={this.onTextChange}
          onChange={this.onTextChange}
          type="text"
          value={path}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isStarted: state.sounds.isStarted,
});

export default compose(withStyles(s), connect(mapStateToProps))(Slot);
