import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Slot from '../Slot/Slot';
import s from './Slots.css';
import Section from '../../molecules/Section';

class Slots extends React.PureComponent {
  static propTypes = {
    slotIndex: PropTypes.number,
    slots: PropTypes.arrayOf(
      PropTypes.shape({
        status: PropTypes.number.isRequired,
        path: PropTypes.string,
      }).isRequired,
    ),
  };

  static defaultProps = {
    slotIndex: null,
    slots: null,
  };

  render() {
    const { slotIndex, slots } = this.props;
    return (
      <Section title="Volca sample slots">
        <div className={s.root}>
          {slots.map((slot, index) => (
            <Slot
              key={index.toString()}
              path={slot.path}
              status={index === slotIndex ? 4 : slot.status}
              index={index}
            />
          ))}
        </div>
      </Section>
    );
  }
}

function mapStateToProps(state) {
  return {
    slotIndex: state.sounds.slotIndex,
    slots: state.sounds.slots,
  };
}

export default compose(withStyles(s), connect(mapStateToProps))(Slots);
