/**
 * Slot values:
 * 0 - empty
 * 1 - empty, selected to load a sample
 * 2 - sample was loaded in the slot
 * 3 - sample loaded, selected to overwrite
 * 4 - currently transferring sample
 * 5 - sample was not loaded, an error occurred
 */

import {
  CLEAR_ALL,
  INITIALIZE,
  MODAL_HIDE,
  MODAL_SHOW,
  PAUSE,
  PLAY_END,
  PLAY_PROGRESS,
  PLAY_START,
  REQUEST_SOUND,
  SET_SLOT,
  START,
  STOP,
  TOGGLE_DOUBLE_SPEED,
  TOGGLE_NORMALIZE,
} from '../constants';

const initialState = {
  duration: 0,
  isDoubleSpeed: false,
  isNormalize: false,
  isPaused: false,
  isStarted: false,
  modalType: null,
  position: 0,
  slotCount: 100,
  slotIndex: null,
  slots: [],
  totalDuration: 0,
};

export default function sounds(state = initialState, action) {
  switch (action.type) {
    case PLAY_PROGRESS:
      return {
        ...state,
        position: action.position,
      };
    case PLAY_START:
      return {
        ...state,
      };
    case PLAY_END: {
      const { isSuccess } = action;
      return {
        ...state,
        duration: 0,
        position: 1,
        slots: state.slots.reduce((accumulator, slot, index) => {
          accumulator.push(
            index === state.slotIndex
              ? { ...slot, status: isSuccess ? 2 : 5 }
              : slot,
          );
          return accumulator;
        }, []),
        totalDuration: state.totalDuration + state.duration,
      };
    }
    case REQUEST_SOUND: {
      const slotIndex = state.slots.findIndex(
        slot => slot.status === 1 || slot.status === 3,
      );
      return {
        ...state,
        slotIndex,
      };
    }

    case SET_SLOT: {
      const { index, filePath } = action;
      return {
        ...state,
        slots: state.slots.reduce((accumulator, currentValue, currentIndex) => {
          let { status, path } = state.slots[currentIndex];
          if (index === currentIndex) {
            path = filePath;
            switch (status) {
              case 0:
              case 1:
                status = path.length ? 1 : 0;
                break;
              case 2:
              case 3:
                status = path.length ? 3 : 2;
                break;
              default:
                status = 0;
            }
          }
          accumulator.push({ status, path });
          return accumulator;
        }, []),
      };
    }

    case CLEAR_ALL:
      return {
        ...state,
        slots: new Array(state.slotCount).fill(
          { path: '', status: 0 },
          0,
          state.slotCount,
        ),
      };
    case INITIALIZE:
      return {
        ...state,
        slots: new Array(state.slotCount).fill(
          { path: '', status: 0 },
          0,
          state.slotCount,
        ),
      };
    case START:
      return {
        ...state,
        isStarted: true,
        slotIndex: null,
      };
    case STOP:
      return {
        ...state,
        isPaused: false,
        isStarted: false,
        slotIndex: null,
      };
    case PAUSE:
      return {
        ...state,
        isPaused: true,
      };
    case TOGGLE_DOUBLE_SPEED:
      return {
        ...state,
        isDoubleSpeed: !state.isDoubleSpeed,
      };
    case TOGGLE_NORMALIZE:
      return {
        ...state,
        isNormalize: !state.isNormalize,
      };
    case MODAL_HIDE:
      return {
        ...state,
        modalType: initialState.modalType,
      };
    case MODAL_SHOW:
      return {
        ...state,
        modalType: action.modalType,
      };
    default:
      return state;
  }
}
