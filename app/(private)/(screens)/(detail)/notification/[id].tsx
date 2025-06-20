import { ContainerScreen } from "@/components";
import { useTheme } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import WebView from "react-native-webview";
import { StyleSheet } from "react-native";

export default () => {
  const { id } = useLocalSearchParams();
  const {
    theme: { colors },
  } = useTheme();
  return (
    <ContainerScreen style={{ backgroundColor: colors.background }}>
      <WebView
        style={styles.container}
        source={{ uri: "https://expo.dev" }}
        startInLoadingState
      />
    </ContainerScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
