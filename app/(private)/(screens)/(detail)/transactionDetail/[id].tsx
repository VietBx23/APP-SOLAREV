import { ContainerScreen } from "@/components";
import { useDetailTransaction } from "@/hooks";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";

export default () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const styled = useStyle();
  const { data } = useDetailTransaction(id);
  return (
    <ContainerScreen style={[styled.container]}>
      <Text>{id}</Text>
    </ContainerScreen>
  );
};

const useStyle = makeStyles(({ colors }) => ({
  container: {
    backgroundColor: colors.background,
  },
}));
