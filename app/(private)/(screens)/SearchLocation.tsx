import {
  FocusAwareStatusBar,
  ItemLocation,
  NoData,
  TabBarIcon,
} from "@/components";
import { height } from "@/constants";
import { useChargeStation, useStorageState } from "@/hooks";
import { useChargeStationStore } from "@/stores";
import { IChargeStation, TYPE_STORE } from "@/types";
import { useIsFocused } from "@react-navigation/native";
import { Divider, Input, makeStyles, Text, useTheme } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default () => {
  const styled = useStyle();
  const route = useRouter();
  const { t } = useTranslation();
  const [value, setValue] = useState<string>("");
  const { data } = useChargeStation();
  const { top, bottom } = useSafeAreaInsets();
  const { selectStation, chargeStation } = useChargeStationStore();
  const isFocused = useIsFocused();
  const {
    theme: { colors },
  } = useTheme();

  const [[isLoading, chargingLocal], __] = useStorageState(
    TYPE_STORE.SAVE_CHARGING,
  );

  const handleSelect = useCallback((e: IChargeStation) => {
    setValue(e.name);
    selectStation(e);
    route.dismissTo("/(private)/(screens)/chargingStation");
  }, []);

  useEffect(() => {
    if (chargeStation) {
      setValue(chargeStation.name);
    }
    return () => {
      setValue("");
    };
  }, [isFocused]);

  return (
    <View
      style={[
        styled.container,
        { paddingTop: Platform.OS === "ios" ? top : top + 10 },
      ]}
    >
      <FocusAwareStatusBar style="dark" />
      <View style={{ paddingHorizontal: 20 }}>
        <Input
          placeholder={t("Tìm kiếm trạm sạc")}
          autoFocus
          value={value}
          onChangeText={(e) => setValue(e)}
          errorStyle={{ display: "none" }}
          leftIcon={
            <TouchableOpacity onPress={route.back}>
              <TabBarIcon name="arrow-back" size={20} />
            </TouchableOpacity>
          }
          rightIcon={
            value.trim() !== "" && (
              <TouchableOpacity
                onPress={() => {
                  setValue("");
                  selectStation();
                }}
              >
                <TabBarIcon size={20} name="close" color={"black"} />
              </TouchableOpacity>
            )
          }
          inputContainerStyle={[
            styled.inputContent,
            {
              borderWidth: 0,
              borderBottomWidth: 0,
              gap: 10,
            },
          ]}
        />

        <Text
          style={{
            fontWeight: 600,
            fontSize: RFValue(15, height),
            marginTop: 10,
          }}
        >
          {t("Trạm đã lưu")}
        </Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ gap: 10, marginTop: 10 }}
          showsHorizontalScrollIndicator={false}
        >
          {!isLoading &&
            (JSON.parse(chargingLocal || "[]") as Array<IChargeStation>).map(
              (item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelect(item)}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.divider,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    maxWidth: 200,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={{ fontSize: RFValue(13, height), fontWeight: 400 }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ),
            )}
        </ScrollView>
      </View>
      <Divider />

      <Text
        style={{
          marginLeft: 20,
          fontWeight: 600,
          fontSize: RFValue(15, height),
        }}
      >
        {t("Danh sách trạm sạc")}
      </Text>
      <ScrollView>
        {(data?.data || []).filter((val) =>
          `${val.name + val.position}`
            .toLowerCase()
            .includes(value.toLowerCase()),
        ).length > 0 ? (
          (data?.data || [])
            .filter((val) =>
              `${val.name + val.position}`
                .toLowerCase()
                .includes(value.toLowerCase()),
            )
            .map((item, index) => (
              <ItemLocation key={index} {...item} onSelect={handleSelect} />
            ))
        ) : (
          <NoData />
        )}
        <View style={{ height: bottom }} />
      </ScrollView>
    </View>
  );
};

const useStyle = makeStyles(({ colors }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    gap: 10,
  },
  inputContent: {
    backgroundColor: colors.background,
    borderRadius: 30,
    elevation: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
}));
