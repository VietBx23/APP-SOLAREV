import { ContainerScreen } from "@/components";
import { makeStyles, Text } from "@rneui/themed";
import { Href, useRouter } from "expo-router";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { View, Image } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { size } from "@/constants";

type IProps = { title: string; des: string; url: Href; icon: ReactNode };

const QuickAction = () => {
  const { t } = useTranslation();

  const OPTIONS: Array<IProps> = [
    {
      title: t("Trạm đã lưu"),
      des: t("Dách sách trạm đã lưu"),
      url: "/(private)/(screens)/SaveCharging",
      icon: <FontAwesome6 name="location-dot" size={24} color="red" />,
    },
    {
      title: t("Nạp tiền nhanh"),
      des: t("Nạp tiền nhanh vào ví "),
      url: "/(private)/(tabs)/payment",
      icon: (
        <Image
          source={require("@/assets/images/dashboard/phone.png")}
          resizeMode="contain"
          style={{ width: 37, height: 40 }}
        />
      ),
    },
  ];

  return (
    <ContainerScreen style={{ paddingTop: 0, paddingHorizontal: 0 }}>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      >
        {OPTIONS.map((item, index) => (
          <Action key={index} {...item} />
        ))}
      </ScrollView>
    </ContainerScreen>
  );
};
export default QuickAction;

const Action = (props: IProps) => {
  const styled = useStyle();

  const route = useRouter();
  return (
    <TouchableOpacity
      style={[styled.item]}
      onPress={() => route.navigate(props.url)}
    >
      <View>
        <Text style={[{ fontWeight: 600, fontSize: size(13) }]}>
          {props.title}
        </Text>
        <Text style={{ fontSize: size(12), fontWeight: 300 }}>{props.des}</Text>
      </View>
      <View style={{ height: 40, justifyContent: "center" }}>{props.icon}</View>
    </TouchableOpacity>
  );
};

const useStyle = makeStyles((theme) => ({
  item: {
    paddingHorizontal: 16,
    paddingRight: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 10,
    width: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
