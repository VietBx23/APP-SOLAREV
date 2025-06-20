import { ContainerScreen } from "@/components";
import { makeStyles } from "@rneui/themed";
import { ScrollView, TouchableOpacity, Image } from "react-native";

const Banner = () => {
  return (
    <ContainerScreen style={{ paddingTop: 0, paddingHorizontal: 0 }}>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      >
        <Action />
        <Action />
        <Action />
      </ScrollView>
    </ContainerScreen>
  );
};
export default Banner;

const Action = () => {
  const styled = useStyle();
  return (
    <TouchableOpacity style={[styled.item]}>
      <Image
        source={require("@/assets/images/dashboard/Banner.png")}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const useStyle = makeStyles((theme) => ({
  item: {
    overflow: "hidden",
    borderRadius: 10,
    width: 300,
    height: 130,
  },
}));
