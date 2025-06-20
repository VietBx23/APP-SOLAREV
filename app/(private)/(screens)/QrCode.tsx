import {
  ErrorBoundary,
  ModalConfirm,
  ModalLoading,
  RefScanQr,
  ScanQr,
} from "@/components";
import { Platform, View } from "react-native";
import { Button, makeStyles, Text } from "@rneui/themed";
import { createRef, Fragment, useEffect, useRef, useState } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import {
  useChargeStationInfo,
  useCheckPendingTransaction,
  useGetBalance,
  useStartCharging,
} from "@/hooks";
import { useAuthStore } from "@/stores";
import { useRouter } from "expo-router";
import { size } from "@/constants";

export default () => {
  const styles = useStyle();
  const [id, setId] = useState<string>();
  const [toast, setToast] = useState<string | undefined>();
  const { user } = useAuthStore();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const { mutateAsync } = useStartCharging();

  const ref = createRef<RefScanQr>();
  const { data, isSuccess } = useChargeStationInfo(id);

  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  useEffect(() => {
    if (isSuccess) {
      if (data?.data) {
        bottomSheetModalRef.current?.present();
      } else {
        setToast("Không có thông tin trụ sạc");
      }
    }
  }, [isSuccess, data, id]);

  const { data: balance } = useGetBalance();
  const { mutateAsync: checkProgress } = useCheckPendingTransaction();

  const handleStart = async () => {
    try {
      const result = await checkProgress(user?.id);
      if (result?.data) {
        setToast(t("Bạn đang có đơn sạc chưa hoàn thành"));
        return;
      }

      if (data?.data && user && id)
        try {
          setLoading(true);
          const result = await mutateAsync({
            UserAppId: user?.id,
            Amount: balance?.data || 0,
            ChargePointId: id,
          });

          if (result.statusCode === 200) {
            route.replace({
              pathname: "/(private)/(screens)/(detail)/charging",
              params: {
                ChargePointId: id,
              },
            });
            bottomSheetModalRef.current?.close();
          } else {
            setToast(result.message);
          }
        } catch (error) {
          console.log("error");
        } finally {
          setLoading(false);
        }
    } catch (error) {
      console.log("checkProgress error", error);
    }
  };

  return (
    <View style={styles.container}>
      <ErrorBoundary>
        <ScanQr onSuccess={(e) => setId(e)} ref={ref} />
      </ErrorBoundary>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={(e) => {
          if (e === -1) {
            setId(undefined);
            ref.current?.onClose();
          }
        }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            paddingHorizontal: 25,
            paddingTop: 20,
            gap: 40,
            paddingBottom: Platform.OS === "ios" ? bottom : 10,
          }}
        >
          {data?.data && (
            <Fragment>
              <View style={{ gap: 15, flex: 1 }}>
                <Row name={t("Mã trụ sạc:")} value={data?.data.chargePointId} />
                <Row name={t("Tên trụ sạc:")} value={data?.data.name} />
                <Row
                  name={t("Vị trí súng:")}
                  value={Number(id?.slice(-1)) === 1 ? "Súng A" : "Súng B"}
                />
                <Row
                  name={t("Công suất trụ:")}
                  value={data?.data.chargerPower}
                />
                <Row
                  name={t("Dòng điện xuất:")}
                  value={data?.data.outputType}
                />
                <Row
                  name={t("Loại đầu gắn:")}
                  value={data?.data.connectorType}
                />
              </View>
              <Button title={t("Bắt đầu sạc")} onPress={handleStart} />
            </Fragment>
          )}
        </BottomSheetView>
      </BottomSheetModal>

      <ModalLoading isVisible={loading} />

      <ModalConfirm
        isVisible={Boolean(toast)}
        onBackdropPress={() => {
          setToast(undefined);
          ref.current?.onClose();
          bottomSheetModalRef.current?.close();
          setId(undefined);
        }}
        title={toast}
      />
    </View>
  );
};

const Row = ({ name, value }: { name: string; value?: string }) => {
  return (
    <View
      style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}
    >
      <Text
        style={{
          fontSize: size(17),
          opacity: 0.8,
          width: "40%",
          textAlign: "left",
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          fontSize: size(17),
          fontWeight: 600,
          width: "50%",
          textAlign: "right",
        }}
      >
        {value}
      </Text>
    </View>
  );
};

const useStyle = makeStyles(() => ({
  container: {
    flex: 1,
  },
}));
