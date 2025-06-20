import { ContainerScreen, NoData, TabBarIcon } from "@/components";
import { useStorageState } from "@/hooks";
import { IChargeStation, TYPE_STORE } from "@/types";
import { Input, Text, useTheme } from "@rneui/themed";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useChargeStationStore } from "@/stores";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  const { selectStation } = useChargeStationStore();
  const { navigate } = useRouter();
  const [[isLoading, chargingLocal], setChargingLocal] = useStorageState(
    TYPE_STORE.SAVE_CHARGING,
  );
  const [data, setData] = useState<Array<IChargeStation>>([]);

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (!isLoading && chargingLocal) {
      setData(JSON.parse(chargingLocal));
    }
  }, [isLoading, chargingLocal]);

  const {
    theme: { colors },
  } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      {isLoading ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : (
        <ContainerScreen>
          <Input
            leftIcon={<TabBarIcon size={20} name="search" color={"black"} />}
            value={value}
            onChangeText={(e) => setValue(e)}
            placeholder={t("Tìm kiếm trạm sạc")}
          />
          {data.length ? (
            data
              .filter((val) =>
                `${val.name + val.position}`
                  .toLowerCase()
                  .includes(value.toLowerCase()),
              )
              .map((item, index) => (
                <View
                  key={index}
                  style={{
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.divider,
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={[{ width: 26, height: 26 }]}
                    resizeMode="contain"
                    source={require("@/assets/images/star.png")}
                  />
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                      selectStation(item);
                      navigate("/(private)/(screens)/chargingStation");
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: 700 }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{ fontSize: 13, fontWeight: 500, opacity: 0.7 }}
                    >
                      {item.address}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ alignItems: "flex-end" }}
                    onPress={() => {
                      setChargingLocal(
                        JSON.stringify(
                          data.filter(
                            (val) =>
                              val.chargeStationId !== item.chargeStationId,
                          ),
                        ),
                      );
                    }}
                  >
                    <EvilIcons name="trash" size={28} color={colors.error} />
                  </TouchableOpacity>
                </View>
              ))
          ) : (
            <NoData />
          )}
        </ContainerScreen>
      )}
    </ScrollView>
  );
};
