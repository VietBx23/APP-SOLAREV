import { FocusAwareStatusBar, TabBarIcon } from "@/components";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Region, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";
import {
  BottomSheetDetailChargeStation,
  RefBSDetailChargeStation,
} from "./component/BottomSheetDetailChargeStation";
import { useChargeStation } from "@/hooks";
import { useChargeStationStore } from "@/stores";
import { Text, useTheme } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import { height, width } from "@/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    ...StyleSheet.absoluteFillObject,
    top: height - 100,
    left: width - 70,
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const CharginStationScreen = () => {
  const [mapRegion, setMapRegion] = useState<Region>();
  const [loadingLocation, setLoadingLocation] = useState(false);
  const isFocused = useIsFocused();
  const { chargeStation, selectStation } = useChargeStationStore();
  const route = useRouter();
  const { top } = useSafeAreaInsets();
  const { data } = useChargeStation();
  const {
    theme: { colors },
  } = useTheme();

  const refMap = useRef(null);

  const findMe = useCallback(async () => {
    try {
      setLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("permission");
      }

      const location = await Location.getCurrentPositionAsync({});

      if (refMap) {
        (refMap as any).current.animateToRegion(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          1000,
        );
      }

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    } catch (error) {
      console.log("error when find me");
    } finally {
      setLoadingLocation(false);
    }
  }, [refMap]);

  useEffect(() => {
    (async () => {
      if (chargeStation) {
        setMapRegion({
          latitude: Number(chargeStation.lat),
          longitude: Number(chargeStation.long),
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      } else {
        findMe();
        // try {
        //   setLoadingLocation(true);
        //   const { status } = await Location.requestForegroundPermissionsAsync();
        //   if (status !== "granted") {
        //     console.log("permission");
        //   }
        //   const location = await Location.getCurrentPositionAsync({});
        //   setMapRegion({
        //     latitude: location.coords.latitude,
        //     longitude: location.coords.longitude,
        //     latitudeDelta: 0.005,
        //     longitudeDelta: 0.005,
        //   });
        // } catch (error) {
        // } finally {
        //   setLoadingLocation(false);
        // }
      }
    })();
  }, [chargeStation, findMe]);

  useEffect(() => {
    if (isFocused) {
      chargeStation && ref.current?.onOpen();
    } else {
      ref.current?.onClose();
    }
  }, [isFocused]);

  const ref = createRef<RefBSDetailChargeStation>();

  return (
    <View style={[styles.container]}>
      <FocusAwareStatusBar style="dark" />
      <View
        style={[
          styles.map,
          {
            paddingHorizontal: 20,
            top: Platform.OS === "ios" ? top : top + 10,
            zIndex: 1,
            height: 50,
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity
            onPress={() => {
              route.back();
            }}
          >
            <TabBarIcon size={25} name="arrow-back" color={"black"} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.background,
              borderRadius: 30,
              elevation: 10,
              shadowColor: "#171717",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}
          >
            <TouchableOpacity
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  // paddingVertical: 15,
                  height: 50,
                  gap: 15,
                },
              ]}
              onPress={() =>
                route.navigate("/(private)/(screens)/SearchLocation")
              }
            >
              <TabBarIcon size={20} name="search" color={"grey"} />
              <Text
                style={[
                  {
                    flex: 1,
                    fontSize: RFValue(17, height),
                  },
                ]}
                numberOfLines={1}
              >
                {chargeStation?.name ? chargeStation.name : "Tìm kiếm trạm sạc"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <MapView
        ref={refMap}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={Platform.OS === "ios"}
        showsUserLocation
        initialRegion={mapRegion}
        region={mapRegion}
        zoomEnabled
      >
        {data?.data.map((item, index) => (
          <Marker
            key={index}
            onPress={() => {
              selectStation(item);
              ref.current?.onOpen();
            }}
            coordinate={{
              latitude: Number(item.lat),
              longitude: Number(item.long),
            }}
          />
        ))}
      </MapView>
      {Platform.OS === "ios" ? null : (
        <TouchableOpacity
          disabled={loadingLocation}
          onPress={findMe}
          style={[styles.button]}
        >
          {loadingLocation ? (
            <ActivityIndicator color={"black"} />
          ) : (
            <MaterialIcons name="my-location" size={24} color="black" />
          )}
        </TouchableOpacity>
      )}
      <BottomSheetDetailChargeStation ref={ref} />
    </View>
  );
};
