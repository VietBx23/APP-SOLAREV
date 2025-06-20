import { Input, makeStyles, Text } from "@rneui/themed";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TabBarIcon } from "../Icon";
import { FC, useCallback, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useChargeStation } from "@/hooks";
import { IChargeStation } from "@/types";
import { useChargeStationStore } from "@/stores";
import { router, useRouter } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";

const DURATION = 200;
const { height } = Dimensions.get("screen");

type IProps = {
  handleFocus?: (e: boolean) => void;
};

export const SearchLocation: FC<IProps> = ({ handleFocus }) => {
  const isFocused = useIsFocused();
  const { selectStation, chargeStation } = useChargeStationStore();

  const { navigate } = useRouter();

  //animation value
  const animation = useSharedValue(0);

  const [value, setValue] = useState<string>("");
  const [animationValue, setAnimationValue] = useState(0);

  useEffect(() => {
    if (chargeStation) {
      setValue(chargeStation.name);
    }
    return () => {
      setAnimationValue(0);
      animation.value = 0;
    };
  }, [isFocused]);

  const animateStyle = useAnimatedStyle(() => {
    return {
      gap:
        animation.value === 0
          ? withTiming(10, { duration: DURATION })
          : withTiming(0, { duration: DURATION }),
    };
  });

  const animateStyleButtonScan = useAnimatedStyle(() => {
    return {
      width:
        animation.value === 0
          ? withTiming(50, { duration: DURATION })
          : withTiming(0, { duration: DURATION }),
      height:
        animation.value === 0
          ? withTiming(50, { duration: DURATION })
          : withTiming(0, { duration: DURATION }),
      padding:
        animation.value === 0
          ? withTiming(10, { duration: DURATION })
          : withTiming(0, { duration: DURATION }),
      opacity:
        animation.value === 0
          ? withTiming(1, { duration: DURATION })
          : withTiming(0, { duration: DURATION }),
    };
  });
  const animateStyleButtonInput = useAnimatedStyle(() => {
    return {
      display:
        animation.value === 0
          ? withTiming("flex", { duration: DURATION })
          : withTiming("none", { duration: DURATION }),
      borderBottomLeftRadius:
        animation.value === 0
          ? withTiming(10, { duration: DURATION })
          : withTiming(0, { duration: DURATION }),
      borderBottomRightRadius:
        animation.value === 0
          ? withTiming(10, { duration: DURATION })
          : withTiming(0, { duration: DURATION }),
    };
  });

  const styled = useStyle();

  const handleAnimation = () => {
    navigate("/SearchLocation");
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Animated.View style={[styled.container, animateStyle]}>
        <Animated.View
          style={[
            styled.bgColor,
            {
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            },
            animationValue === 0 && styled.boxShadow,
            animateStyleButtonScan,
          ]}
        >
          <TouchableOpacity
            onPress={() => router.navigate("/(private)/(screens)/QrCode")}
          >
            <TabBarIcon size={27} name="scan" color={"black"} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            {
              height: 50,
              backgroundColor: "white",
              borderRadius: 10,
              flex: 1,
            },
            styled.boxShadow,
            animateStyleButtonInput,
          ]}
        >
          {animationValue === 0 ? (
            <TouchableOpacity
              onPress={handleAnimation}
              style={[
                {
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  gap: 5,
                },
              ]}
            >
              <TabBarIcon size={20} name="search" color={"grey"} />
              <Text
                style={[
                  {
                    flex: 1,
                    fontSize: RFValue(17, height),
                    color: "grey",
                  },
                ]}
                numberOfLines={1}
              >
                {value.trim() === "" ? "Tìm kiếm trạm sạc" : value}
              </Text>
            </TouchableOpacity>
          ) : (
            <Input
              leftIcon={
                animationValue === 1 && (
                  <TouchableOpacity onPress={handleAnimation}>
                    <TabBarIcon size={20} name="arrow-back" color={"black"} />
                  </TouchableOpacity>
                )
              }
              rightIcon={
                animationValue === 1 &&
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
              value={value}
              onChangeText={(e) => setValue(e)}
              placeholder="Tìm kiếm trạm sạc"
              inputContainerStyle={[{ borderWidth: 0, borderBottomWidth: 0 }]}
              autoFocus
            />
          )}
        </Animated.View>
      </Animated.View>
      {/* <Animated.View */}
      {/*   style={[styled.content, styled.boxShadow, animateStyleContent]} */}
      {/* > */}
      {/*   <ScrollView style={{ maxHeight: 400 }}> */}
      {/*     {(data?.data || []).filter((val) => */}
      {/*       `${val.name + val.position}` */}
      {/*         .toLowerCase() */}
      {/*         .includes(value.toLowerCase()), */}
      {/*     ).length > 0 ? ( */}
      {/*       (data?.data || []) */}
      {/*         .filter((val) => */}
      {/*           `${val.name + val.position}` */}
      {/*             .toLowerCase() */}
      {/*             .includes(value.toLowerCase()), */}
      {/*         ) */}
      {/*         .map((item, index) => ( */}
      {/*           <ItemLocation */}
      {/*             key={index} */}
      {/*             {...item} */}
      {/*             onSelect={(e) => handleSelect(e)} */}
      {/*           /> */}
      {/*         )) */}
      {/*     ) : ( */}
      {/*       <NoData /> */}
      {/*     )} */}
      {/*   </ScrollView> */}
      {/* </Animated.View> */}
    </View>
  );
};

const useStyle = makeStyles(({ colors }) => ({
  container: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    zIndex: 1,
  },
  bgColor: {
    backgroundColor: colors.background,
  },
  boxShadow: {
    elevation: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  content: {
    backgroundColor: colors.background,
    width: "100%",
    // height: 300,
    paddingVertical: 5,
    position: "absolute",
    left: 0,
    top: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // zIndex: 1,
  },
}));
