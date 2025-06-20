import { makeStyles, Text } from "@rneui/themed";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export const Item = () => {
  const styled = useStyled();
  const route = useRouter();
  return (
    <TouchableOpacity
      style={[styled.container]}
      onPress={() =>
        route.navigate("/(private)/(screens)/(detail)/notification/1")
      }
    >
      <View style={[styled.row]}>
        <Text style={[styled.info, { fontSize: 16 }]} numberOfLines={1}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
          voluptas earum, possimus vero voluptatum repellendus beatae sapiente
          ipsam impedit et delectus laboriosam modi perspiciatis quas, incidunt
          nesciunt ullam doloribus blanditiis?
        </Text>
        <Text style={{ textAlign: "right" }}>3 thg 1</Text>
      </View>
      <View style={[styled.row]}>
        <Text style={[styled.info, styled.description]} numberOfLines={1}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque fugit
          nemo non sequi soluta, pariatur incidunt. Voluptates nemo vero itaque.
          Ut perferendis dolores velit veniam. Dolorem beatae illo at pariatur.
        </Text>
        <View style={styled.dot} />
      </View>
    </TouchableOpacity>
  );
};

const useStyled = makeStyles(({ colors }) => ({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: { width: "80%" },
  description: {
    color: colors.grey0,
  },
  dot: {
    backgroundColor: colors.primary,
    width: 10,
    height: 10,
    borderRadius: 10,
  },
}));
