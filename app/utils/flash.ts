import { showMessage, MessageOptions } from 'react-native-flash-message';
import { COLORS } from '../constants/theme';

type FlashArgs = {
  title: string;
  body?: string;
  duration?: number;
};

const base: Partial<MessageOptions> = {
  floating: true,
  duration: 3500,
};

export function flashSuccess({ title, body, duration }: FlashArgs) {
  showMessage({
    ...base,
    message: title,
    description: body,
    type: 'success',
    backgroundColor: '#15803d',
    color: COLORS.white,
    duration: duration ?? 3200,
  });
}

export function flashError({ title, body, duration }: FlashArgs) {
  showMessage({
    ...base,
    message: title,
    description: body,
    type: 'danger',
    backgroundColor: COLORS.danger,
    color: COLORS.white,
    duration: duration ?? 4000,
  });
}

export function flashInfo({ title, body, duration }: FlashArgs) {
  showMessage({
    ...base,
    message: title,
    description: body,
    type: 'info',
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    duration: duration ?? 3000,
  });
}
