import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../constants/theme';
import { useTheme } from '@react-navigation/native';
import { useStateCityArea } from '../hooks/useStateCityArea';

const MAX_DROPDOWN_HEIGHT = 200;

interface IdLabelItem {
  id: number;
  label: string;
}

interface SingleDropdownProps {
  label: string;
  placeholder: string;
  items: IdLabelItem[];
  selectedId: number | null;
  selectedLabel: string | null;
  onSelect: (id: number, label: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

function SingleDropdown({
  label,
  placeholder,
  items,
  selectedId,
  selectedLabel,
  onSelect,
  disabled,
  loading,
}: SingleDropdownProps) {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const [open, setOpen] = useState(false);
  const dropAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(dropAnim, {
        toValue: open ? 1 : 0,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: open ? 1 : 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  }, [open, dropAnim, fadeAnim]);

  const dropdownHeight = dropAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.min(items.length * 44, MAX_DROPDOWN_HEIGHT)],
  });

  const displayText = loading ? 'Loading...' : selectedLabel || placeholder;

  return (
    <View style={styles.fieldWrap}>
      {label ? (
        <Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }, styles.fieldLabel]}>
          {label}
        </Text>
      ) : null}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => !disabled && !loading && setOpen(!open)}
        disabled={disabled || loading}
        style={[
          styles.selectBox,
          {
            borderColor: theme.dark ? '#565656' : 'rgba(107,45,197,0.4)',
            borderWidth: 1.5,
            backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
            opacity: disabled ? 0.7 : 1,
          },
        ]}
      >
        <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: selectedLabel ? colors.gray100 : colors.gray50 }]} numberOfLines={1}>
          {displayText}
        </Text>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={18} color={colors.gray40} />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.dropdown,
          {
            height: dropdownHeight,
            opacity: fadeAnim,
            borderWidth: 1.5,
            borderColor: theme.dark ? '#565656' : 'rgba(107,45,197,0.4)',
            backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
          },
        ]}
      >
        <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled style={styles.dropdownScroll}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                onSelect(item.id, item.label);
                setOpen(false);
              }}
              style={[styles.dropdownItem, { borderBottomColor: theme.dark ? '#565656' : 'rgba(107,45,197,0.4)' }]}
            >
              <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: colors.title }]} numberOfLines={1}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

export interface LocationDropdownsProps {
  onValuesChange?: (values: {
    stateId: number | null;
    cityId: number | null;
    areaId: number | null;
    stateName: string | null;
    cityName: string | null;
    areaName: string | null;
  }) => void;
}

export default function LocationDropdowns({ onValuesChange }: LocationDropdownsProps) {
  const theme = useTheme();
  const {
    states,
    cities,
    areas,
    loadingStates,
    loadingCities,
    loadingAreas,
    values,
    selectState,
    selectCity,
    selectArea,
  } = useStateCityArea();

  const onValuesChangeRef = useRef(onValuesChange);
  onValuesChangeRef.current = onValuesChange;

  useEffect(() => {
    onValuesChangeRef.current?.(values);
  }, [values.stateId, values.cityId, values.areaId, values.stateName, values.cityName, values.areaName]);

  const stateItems: IdLabelItem[] = Array.isArray(states) ? states.map((s) => ({ id: s.id, label: s.state_name })) : [];
  const cityItems: IdLabelItem[] = Array.isArray(cities) ? cities.map((c) => ({ id: c.id, label: c.city_name })) : [];
  const areaItems: IdLabelItem[] = Array.isArray(areas) ? areas.map((a) => ({ id: a.id, label: a.area_name })) : [];

  return (
    <View style={styles.container}>
      <SingleDropdown
        label="State"
        placeholder="Select state"
        items={stateItems}
        selectedId={values.stateId}
        selectedLabel={values.stateName}
        onSelect={(id, label) => selectState(id, label)}
        loading={loadingStates}
      />
      <SingleDropdown
        label="City"
        placeholder="Select city"
        items={cityItems}
        selectedId={values.cityId}
        selectedLabel={values.cityName}
        onSelect={(id, label) => selectCity(id, label)}
        loading={loadingCities}
      />
      <SingleDropdown
        label="Area"
        placeholder="Select area"
        items={areaItems}
        selectedId={values.areaId}
        selectedLabel={values.areaName}
        onSelect={(id, label) => selectArea(id, label)}
        disabled={values.cityId == null}
        loading={values.cityId != null && loadingAreas}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 12,
  },
  fieldWrap: {
    width: '100%',
    marginBottom: 4,
  },
  fieldLabel: {
    marginBottom: 6,
  },
  selectBox: {
    padding: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdown: {
    width: '100%',
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    zIndex: 99,
    overflow: 'hidden',
    borderRadius: 10,
  },
  dropdownScroll: {
    maxHeight: MAX_DROPDOWN_HEIGHT,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
  },
});
