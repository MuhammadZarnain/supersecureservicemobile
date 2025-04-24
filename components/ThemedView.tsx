import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor ?? '#fff', dark: darkColor ?? '#000' },
    'background'
  );

  return <View style={[{ backgroundColor }, style].filter(Boolean)} {...otherProps} />;
}
