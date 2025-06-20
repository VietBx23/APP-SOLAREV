import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { height, width } = Dimensions.get("screen");

const size = (size: number) => RFValue(size, height);

export { height, width, size };
