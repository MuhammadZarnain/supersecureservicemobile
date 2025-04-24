import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      onPressIn={(ev) => {
        if (Platform.OS === 'ios') {
          // ✅ Use Platform.OS for reliable platform check
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
      {...props} // ✅ Spread props last to ensure overrides don't affect our logic
    />
  );
}
