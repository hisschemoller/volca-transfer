import {
  CLEAR_ALL,
  INITIALIZE,
  MODAL_HIDE,
  MODAL_SHOW,
  PAUSE,
  SET_SLOT,
  START,
  STOP,
  TOGGLE_DOUBLE_SPEED,
  TOGGLE_NORMALIZE,
} from '../constants';
import { makeActionCreator } from './actionUtils';

export const initialize = makeActionCreator(INITIALIZE);
export const start = makeActionCreator(START);
export const stop = makeActionCreator(STOP);
export const pause = makeActionCreator(PAUSE);

export const setSlot = makeActionCreator(SET_SLOT, 'index', 'filePath');

export const clearAll = makeActionCreator(CLEAR_ALL);

export const toggleDoubleSpeed = makeActionCreator(TOGGLE_DOUBLE_SPEED);
export const toggleNormalize = makeActionCreator(TOGGLE_NORMALIZE);

export const hideModal = makeActionCreator(MODAL_HIDE);
export const showModal = makeActionCreator(MODAL_SHOW, 'modalType');
