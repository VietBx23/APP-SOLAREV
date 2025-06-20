import { IChargeStation } from "@/types";
import { makeStyles, Text } from "@rneui/themed";
import { FC, memo } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { TabBarIcon } from "../Icon";
import { useTranslation } from "react-i18next";
import { RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get("screen");

export const ItemLocation: FC<
  IChargeStation & { onSelect: (arg: IChargeStation) => void }
> = memo((props) => {
  const styled = useStyle();
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={[styled.container]}
      onPress={() => props.onSelect(props)}
    >
      <View>
        <TabBarIcon size={20} name="location" color={"black"} />
      </View>
      <View style={[styled.content]}>
        <Text
          style={{ fontSize: RFValue(15, height), fontWeight: 700 }}
          numberOfLines={1}
        >
          {props.name}
        </Text>
        <Text
          numberOfLines={2}
          style={{ fontSize: RFValue(13, height), fontWeight: 600 }}
        >
          {props.position}
        </Text>
        <Text
          style={{
            fontSize: RFValue(13, height),
            fontWeight: 600,
            color: "green",
          }}
        >
          {t("{{number}} trụ khả dụng", { number: props.qtyChargePoint })}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const useStyle = makeStyles(({ colors }) => ({
  container: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  content: {
    paddingVertical: 10,
    flex: 1,
    borderBottomColor: colors.divider,
    borderBottomWidth: 0.5,
  },
}));
