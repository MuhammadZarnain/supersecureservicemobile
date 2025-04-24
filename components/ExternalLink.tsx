import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { 
  Platform, 
  Pressable, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  GestureResponderEvent 
} from 'react-native';

// Define more specific prop types
type LinkProps = ComponentProps<typeof Link>;
type PressableProps = ComponentProps<typeof Pressable>;
type TextProps = ComponentProps<typeof Text>;

// Create a more restrictive prop type
type Props = {
  href: string;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
};

export function ExternalLink({ href, children, style, textStyle }: Props) {
  const isExternal = /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <Pressable
        onPress={() => {
          openBrowserAsync(href);
        }}
        style={[styles.pressable, style as ViewStyle]}
      >
        <Text style={[styles.linkText, textStyle]}>{children}</Text>
      </Pressable>
    );
  }

  // For internal links, we need to ensure href is properly typed
  return (
    <Link 
      href={href as LinkProps['href']} 
      style={style as LinkProps['style']}
    >
      <Text style={[styles.linkText, textStyle]}>{children}</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});