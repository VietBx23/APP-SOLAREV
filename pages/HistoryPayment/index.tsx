import { Card, ContainerScreen, NoData } from "@/components";
import { useTheme } from "@rneui/themed";
import { ActivityIndicator, FlatList } from "react-native";
import { GroupPayment } from "./component/GroupPayment";
import { useListDeposit } from "@/hooks";
import { useAuthStore } from "@/stores";
import { IDepositHistory } from "@/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

export const HistoryPayment = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { bottom } = useSafeAreaInsets();
  const { data, isFetching, refetch, isLoading } = useListDeposit(user?.id);

  const {
    theme: { colors },
  } = useTheme();

  return (
    <ContainerScreen style={{ backgroundColor: colors.background }}>
      {isLoading ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : (
        <FlatList
          data={Object.keys(groupByDateCreate(data?.data || []))}
          style={{
            margin: -15,
            padding: 15,
          }}
          onRefresh={refetch}
          refreshing={isFetching}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: bottom,
          }}
          ListEmptyComponent={
            <Card>
              <NoData title={t("Bạn không có lịch sử nào")} />
            </Card>
          }
          renderItem={({ item }) => (
            <GroupPayment
              title={item}
              array={groupByDateCreate(data?.data || [])[item]}
              // key={index}
            />
          )}
          keyExtractor={(item) => item}
        />
      )}
    </ContainerScreen>
  );
};

function groupByDateCreate(
  array: IDepositHistory[],
): Record<string, IDepositHistory[]> {
  return array.reduce(
    (acc, item) => {
      const date = item.dateCreate.split(" ")[0]; // Extract only the date part
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {} as Record<string, IDepositHistory[]>,
  );
}
