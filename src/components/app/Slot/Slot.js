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

  render() {
    const { dispatch, index, isStarted, path, status } = this.props;
    const color = status ? '#000000' : '#000000';

    return (
      <div className={s.root}>
        <div className={s.label}>{index}</div>
        <input
          color={color}
          name={`input${index}`}
          onInput={e => {
            e.preventDefault();
            if (!isStarted) {
              dispatch(setSlot(index, e.target.value));
            }
          }}
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
