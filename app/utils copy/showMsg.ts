import { Notifier, Easing, NotifierComponents } from 'react-native-notifier';
import colors from './colors';

interface toast_alert {
  title: string,
  description: string,
  type: "WARNING" | "FAILED" | "PASSED"
}

export function showMsg(props: toast_alert) {
  const { title, description, type } = props;
  Notifier.showNotification({
    title: title,
    description: description,
    Component: NotifierComponents.Notification,
    componentProps: {
      // imageSource: TOST_ALERT[type],
      descriptionStyle: { color: colors.BLACK },
      titleStyle: { color: type === "PASSED" ? colors.GREEN : (type === "WARNING") ? colors.YELLOW : colors.RED },
      containerStyle: {
        backgroundColor: colors.WHITE
      }
    },
    showAnimationDuration: 800,
    showEasing: Easing.bounce,

    onPress: () => console.log('Press'),
    hideOnPress: false,
  });
}