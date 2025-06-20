import { useAuthStore } from "@/stores";
import { Image, makeStyles, Text } from "@rneui/themed";
import { Dimensions, ImageBackground, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AnimatedNumbers from "react-native-animated-numbers";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useGetBalance } from "@/hooks";
import { RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get("screen");

export const HeaderProfile = () => {
  const styled = useStyle();
  const { top } = useSafeAreaInsets();

  const { refetch } = useGetBalance();

  useFocusEffect(
    useCallback(() => {
      refetch();
      return () => {};
    }, []),
  );

  return (
    <ImageBackground
      source={require("@/assets/images/bgheader.png")}
      resizeMode="stretch"
      style={[styled.container, styled.main]}
    >
      <View
        style={[
          {
            marginTop: top,
            zIndex: 1,
            marginBottom: 30,
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
          },
        ]}
      >
        <UserName />
        {/* <BalanceInfo /> */}
      </View>
    </ImageBackground>
  );
};

const UserName = () => {
  const styled = useStyle();
  const { user } = useAuthStore();

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (user) setBalance(Number(user?.balance));
  }, [user]);
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        marginTop: 20,
        flex: 1,
      }}
    >
      <Image
        source={require("@/assets/images/avatardefault.png")}
        style={[styled.avatar]}
      />
      <View style={{ gap: 5, flex: 1 }}>
        <Text style={[styled.text, { fontWeight: 700 }]} numberOfLines={1}>
          {user?.fullname}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <AnimatedNumbers
            includeComma
            animateToNumber={balance}
            animationDuration={3000}
            fontStyle={[
              styled.text,
              styled.textAlign,
              {
                fontWeight: 600,
                fontSize: RFValue(18, height),
              },
            ]}
          />
          <Text
            style={[
              styled.text,
              styled.textAlign,
              {
                fontWeight: 800,
                fontSize: RFValue(19, height),
              },
            ]}
          >
            đ
          </Text>
        </View>
        {/* <View */}
        {/*   style={[ */}
        {/*     { */}
        {/*       borderRadius: 10, */}
        {/*       backgroundColor: "white", */}
        {/*       alignSelf: "flex-start", */}
        {/*       paddingHorizontal: 10, */}
        {/*     }, */}
        {/*   ]} */}
        {/* > */}
        {/*   <Text style={[]}>Bronze</Text> */}
        {/* </View> */}
      </View>
    </View>
  );
};

const BalanceInfo = () => {
  const styled = useStyle();
  const { user } = useAuthStore();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (user) setBalance(Number(user?.balance));
  }, [user]);

  return (
    <View
      style={[
        styled.balanceInfo,
        styled.boxShadowBalance,
        { gap: 10, flex: 1 },
      ]}
    >
      <Text
        numberOfLines={1}
        style={[styled.text, styled.textAlign, { fontWeight: 600 }]}
      >
        Tổng số dư tài khoản
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Text
          style={[
            styled.text,
            styled.textAlign,
            {
              fontWeight: 600,
              fontSize: 20,
            },
          ]}
        >
          đ
        </Text>
        <AnimatedNumbers
          includeComma
          animateToNumber={balance}
          animationDuration={3000}
          fontStyle={[
            styled.text,
            styled.textAlign,
            {
              fontWeight: 600,
              fontSize: 20,
            },
          ]}
        />
      </View>
    </View>
  );
};

const useStyle = makeStyles(() => ({
  container: {},
  main: {
    // paddingTop: 20,
    paddingStart: 20,
    paddingEnd: 20,
  },
  avatar: {
    width: 46,
    height: 46,
  },
  text: {
    color: "white",
  },
  bgColor: {
    backgroundColor: "white",
  },
  boxShadow: {
    elevation: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  balanceInfo: {
    padding: 20,
    borderRadius: 10,
  },
  boxShadowBalance: {
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    //
    // elevation: 5,

    elevation: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textAlign: {
    textAlign: "center",
  },
}));
