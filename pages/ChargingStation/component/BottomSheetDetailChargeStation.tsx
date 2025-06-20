import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useChargeStationStore } from "@/stores";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { Linking, Platform, TouchableOpacity, View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TYPE_STORE } from "@/types/store";
import { useStorageState } from "@/hooks";
import { IChargeStation } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { height } from "@/constants";

export type PropsBSDetailChargeStation = {};

export type RefBSDetailChargeStation = {
  onOpen: () => void;
  onClose: () => void;
};

export const BottomSheetDetailChargeStation = forwardRef<
  RefBSDetailChargeStation,
  PropsBSDetailChargeStation
>(({}, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const { chargeStation } = useChargeStationStore();

  const [[isLoading, chargingLocal], setChargingLocal] = useStorageState(
    TYPE_STORE.SAVE_CHARGING,
  );

  useImperativeHandle(
    ref,
    () => ({
      onOpen() {
        bottomSheetModalRef.current?.present();
      },
      onClose() {
        bottomSheetModalRef.current?.close();
      },
    }),
    [],
  );

  const handleRedirect = () => {
    const scheme = Platform.select({
      ios: `maps://?q=${chargeStation?.name}&ll=${chargeStation?.lat},${chargeStation?.long}`,
      android: `geo:${chargeStation?.lat},${chargeStation?.long}?q=${chargeStation?.lat},${chargeStation?.long}(${chargeStation?.name})`,
    });

    if (scheme) {
      Linking.openURL(scheme).catch((err) =>
        console.error("Error opening map: ", err),
      );
    }
  };

  const isSave = useMemo(() => {
    if (!chargingLocal || !chargeStation) {
      return false;
    } else {
      const arr: Array<IChargeStation> = JSON.parse(chargingLocal || "[]");
      return arr
        .map((val) => val.chargeStationId)
        .includes(chargeStation.chargeStationId);
    }
  }, [chargeStation, chargingLocal]);

  return (
    <BottomSheetModal ref={bottomSheetModalRef}>
      <BottomSheetView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          gap: 40,
          paddingBottom: Platform.OS === "ios" ? bottom : 10,
        }}
      >
        <View style={{ gap: 15 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: RFValue(20, height),
                fontWeight: 700,
                maxWidth: "69%",
              }}
            >
              {chargeStation?.name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                const arr = JSON.parse(
                  chargingLocal || "[]",
                ) as Array<IChargeStation>;
                if (isSave) {
                  const newarr = arr.filter(
                    (val) =>
                      val.chargeStationId !== chargeStation?.chargeStationId,
                  );
                  setChargingLocal(JSON.stringify(newarr));
                } else {
                  const newarr = [...arr, chargeStation];
                  setChargingLocal(JSON.stringify(newarr));
                }
              }}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                gap: 4,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: "#FDC53A",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                alignSelf: "flex-end",
              }}
            >
              <FontAwesome
                name={isSave ? "star" : "star-o"}
                size={24}
                color="#FDC53A"
              />
              <Text style={{ fontSize: RFValue(13, height), fontWeight: 500 }}>
                {isSave ? t("Đã lưu") : t("Lưu")}
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: RFValue(15, height),
              fontWeight: 600,
              opacity: 0.7,
            }}
          >
            {chargeStation?.position}
          </Text>
          <Text style={{ fontSize: RFValue(15, height), fontWeight: 600 }}>
            {t("Số lượng trủ khả dụng: {{number}}", {
              number: chargeStation?.qtyChargePoint,
            })}
          </Text>
        </View>
        {/* <View style={{ width: "100%" }}> */}
        {/*   <View */}
        {/*     style={{ width: "50%", height: 200, backgroundColor: "red" }} */}
        {/*   ></View> */}
        {/*   <View style={{ width: "50%" }}></View> */}
        {/*   <View style={{ width: "50%" }}></View> */}
        {/* </View> */}
        <Button title={t("Xem trên bản đồ")} onPress={handleRedirect} />
      </BottomSheetView>
    </BottomSheetModal>
  );
});
