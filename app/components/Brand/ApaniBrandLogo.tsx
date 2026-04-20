import React from 'react';
import { View, Image, StyleSheet, ImageStyle, ViewStyle } from 'react-native';
import { IMAGES } from '../../constants/Images';
import { COLORS } from '../../constants/theme';

type Props = {
  /** White logo on existing purple/dark header — no extra box */
  variant?: 'header' | 'card';
  style?: ViewStyle;
  imageStyle?: ImageStyle;
};

/**
 * Apani Asset wordmark (white on transparent). Use `header` on purple bars;
 * use `card` on light backgrounds (adds purple rounded container).
 */
const ApaniBrandLogo = ({ variant = 'header', style, imageStyle }: Props) => {
  if (variant === 'header') {
    return (
      <Image
        source={IMAGES.logo}
        style={[styles.headerImage, imageStyle]}
        resizeMode="contain"
        accessibilityLabel="Apani Asset"
      />
    );
  }

  return (
    <View style={[styles.cardWrap, style]}>
      <Image
        source={IMAGES.logo}
        style={[styles.cardImage, imageStyle]}
        resizeMode="contain"
        accessibilityLabel="Apani Asset"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: 176,
    height: 104,
  },
  cardWrap: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 120,
    height: 72,
  },
});

export default ApaniBrandLogo;
