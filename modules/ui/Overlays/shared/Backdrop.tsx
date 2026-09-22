import { Animated, Pressable, StyleSheet } from "react-native";

/**
 * KuiReact's overlay backdrop: `absolute inset-0 bg-black/50`, fading with
 * the overlay, `aria-hidden`. It is a *sibling* of the panel — wrapping the
 * panel in it would make iOS VoiceOver merge the whole dialog into one
 * element.
 */
export function Backdrop({ progress, onPress }: { progress: Animated.Value; onPress?: () => void }) {
  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: progress }]}>
      <Pressable
        testID="overlay-backdrop"
        style={StyleSheet.absoluteFill}
        onPress={onPress}
        accessible={false}
        importantForAccessibility="no"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // rgba is the documented exception for raw colour (KuiReact: bg-black/50).
  backdrop: { backgroundColor: "rgba(0,0,0,0.5)" },
});
