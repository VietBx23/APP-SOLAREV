import { Card, ContainerScreen, ModalConfirm } from "@/components";
import { size } from "@/constants";
import { makeStyles, Text } from "@rneui/themed";
import { Href, useRouter } from "expo-router";
import { FC, ReactNode, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, Image, View } from "react-native";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get("screen");

type IProps = {
  title: string;
  icon: ReactNode;
  goTo: Href;
  enable: boolean;
};

const ListMiniApp = () => {
  const OPTIONS: Array<IProps> = useMemo(
    () => [
      {
        title: "Vị trí trạm sạc",
        icon: (
          <Image
            source={require("@/assets/images/dashboard/solarEv.png")}
            resizeMode="cover"
            style={{ width: size(48), height: size(48) }}
          />
        ),
        goTo: "/(private)/(screens)/chargingStation",
        enable: true,
      },
      {
        title: "Nạp tiền",
        icon: (
          <Image
            source={require("@/assets/images/dashboard/wallet.png")}
            resizeMode="cover"
            style={{ width: size(48), height: size(48) }}
          />
        ),
        goTo: "/(private)/(tabs)/payment",
        enable: true,
      },
      {
        title: "Đặt xe",
        icon: (
          <Image
            source={require("@/assets/images/dashboard/car.png")}
            resizeMode="contain"
            style={{ width: size(48), height: size(48) }}
          />
        ),
        goTo: "/(private)/(tabs)/payment",
        enable: false,
      },
      {
        title: "Bảo hiểm",
        icon: (
          <Image
            source={require("@/assets/images/dashboard/card.png")}
            resizeMode="contain"
            style={{ width: size(50), height: size(50) }}
          />
        ),
        goTo: "/(private)/(screens)/chargingStation",
        enable: false,
      },
      {
        title: "Nạp tiền phí không dừng",
        icon: (
          <Image
            source={require("@/assets/images/dashboard/dollar.png")}
            resizeMode="cover"
            style={{ width: size(48), height: size(48) }}
          />
        ),
        goTo: "/(private)/(screens)/chargingStation",
        enable: false,
      },
      {
        title: "Nhà đầu tư",
        icon: (
          <Image
            source={require("@/assets/images/dashboard/hand.png")}
            resizeMode="cover"
            style={{ width: size(48), height: size(48) }}
          />
        ),
        goTo: "/(private)/(screens)/chargingStation",
        enable: false,
      },
      {
        title: "Nhân viên",
        icon: (
          <Image
            source={require("@/assets/images/dashboard/user.png")}
            resizeMode="cover"
            style={{ width: size(48), height: size(48) }}
          />
        ),
        goTo: "/(private)/(screens)/chargingStation",
        enable: false,
      },
      {
        title: "Thêm",
        icon: (
          <Image
            source={require("@/assets/images/dashboard/more.png")}
            resizeMode="cover"
            style={{ width: size(48), height: size(48) }}
          />
        ),
        goTo: "/(private)/(screens)/chargingStation",
        enable: false,
      },
    ],
    [],
  );

  const styles = useStyle();

  return (
    <ContainerScreen style={[styles.row]}>
      {OPTIONS.map((ops, index) => (
        <MiniApp key={index} {...ops} />
      ))}
    </ContainerScreen>
  );
};

export default ListMiniApp;

const MiniApp: FC<IProps> = ({ title, icon, goTo, enable }) => {
  const styles = useStyle();
  const route = useRouter();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={() => {
        if (enable) {
          route.navigate(goTo);
        } else {
          setOpen(true);
        }
      }}
    >
      <Card
        style={[
          styles.card,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </View>
      </Card>
      <Text style={{ textAlign: "center", fontSize: RFValue(12, height) }}>
        {title}
      </Text>
      <ModalConfirm
        isVisible={open}
        onBackdropPress={() => setOpen(false)}
        title={t("Tính năng đang được phát triển")}
      />
    </TouchableOpacity>
  );
};

const useStyle = makeStyles(() => ({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignSelf: "flex-start",
    width: "25%",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    aspectRatio: 1,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  shadowProp: {
    elevation: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
}));
