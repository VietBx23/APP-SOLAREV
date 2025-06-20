import { makeStyles, Text, useTheme } from "@rneui/themed";
import { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { TabBarIcon } from "@/components";
import { IOPTIONS, IOPTIONS_SETTING } from "../type";
import { useRouter } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import { height } from "@/constants";

export const Title = ({ title }: { title: string }) => {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <View
      style={[
        {
          paddingVertical: 15,
          paddingHorizontal: 25,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: colors.bgDefault,
        },
      ]}
    >
      <Text style={{ fontSize: RFValue(12, height) }}>{title}</Text>
    </View>
  );
};

export const Row: FC<IOPTIONS> = ({ title, navigate }) => {
  const styled = useStyle();
  const route = useRouter();

  return (
    <TouchableOpacity
      style={[styled.row]}
      onPress={() => route.navigate(navigate)}
    >
      <Text style={{ fontSize: RFValue(14, height), fontWeight: 500 }}>
        {title}
      </Text>
      <TabBarIcon
        size={RFValue(15, height)}
        name="arrow-forward"
        color={"black"}
      />
    </TouchableOpacity>
  );
};

export const ButtonCustom: FC<{ title: string; onPress: () => void }> = ({
  title,
  onPress,
}) => {
  const styled = useStyle();

  return (
    <TouchableOpacity
      style={[
        styled.row,
        {
          justifyContent: "center",
          width: "50%",
          paddingVertical: 0,
          borderBottomWidth: 0,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[{ fontWeight: 700 }, styled.red]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const RowSetting: FC<IOPTIONS_SETTING> = ({ title, component }) => {
  const styled = useStyle();

  return (
    <View style={[styled.row]}>
      <Text style={{ fontSize: 14, fontWeight: 500 }}>{title}</Text>
      <View>{component}</View>
    </View>
  );
};

const useStyle = makeStyles(({ colors }) => ({
  row: {
    paddingHorizontal: 25,
    flexDirection: "row",
    paddingVertical: 13,
    borderBottomColor: colors.divider,
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  red: {
    color: colors.error,
  },
}));
