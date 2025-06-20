import { Platform, View } from "react-native";
import ListMiniApp from "./component/MiniApp";
import { useTheme } from "@rneui/themed";
import QuickAction from "./component/QuickAction";
import { HeaderProfile, SearchLocation } from "@/components";
import Banner from "./component/Banner";
import News from "./component/News";
import { useEffect } from "react";
import { queryClient } from "@/providers/ProviderQueries";
import { ScrollView } from "react-native-gesture-handler";

export const Dashboard = () => {
  const { theme } = useTheme();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["get_balance"] });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <HeaderProfile />
      <View
        style={[
          {
            marginTop: -25,
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 10,
          },
        ]}
      >
        <SearchLocation />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          { paddingBottom: Platform.OS === "ios" ? 100 : 50, marginTop: 30 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ListMiniApp />
        <QuickAction />
        <Banner />
        <News />
      </ScrollView>
    </View>
  );
};
