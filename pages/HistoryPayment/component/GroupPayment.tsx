import { Card } from "@/components";
import { size } from "@/constants";
import { IDepositHistory } from "@/types";
import { formatCurrency } from "@/utils";
import { Text, useTheme } from "@rneui/themed";
import { View } from "react-native";

type IProps = {
  title: string;
  array: Array<IDepositHistory>;
};

export const GroupPayment = (props: IProps) => {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <Card
      style={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginBottom: 20,
      }}
    >
      <View
        style={[
          {
            backgroundColor: colors.disabled,
            paddingHorizontal: 18,
            paddingVertical: 11,
          },
        ]}
      >
        <Text style={{ fontSize: size(12), fontWeight: 600 }}>
          {props.title}
        </Text>
      </View>
      <View style={{ paddingHorizontal: 26 }}>
        {props.array.map((item, index) => (
          <View
            key={index}
            style={{
              gap: 5,
              borderBottomWidth: index + 1 === props.array.length ? 0 : 0.5,
              borderBottomColor: colors.divider,
              paddingBottom: 20,
              paddingTop: 17,
            }}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <Text style={{ color: colors.primary, fontSize: size(12) }}>
                #{item.depositHistoryId}
              </Text>
              <Text style={{ fontWeight: 700, fontSize: size(12) }}>
                +{formatCurrency(item.amount)} VNĐ
              </Text>
            </View>
            <View>
              <Text
                numberOfLines={2}
                style={{ fontWeight: 600, fontSize: size(12), opacity: 0.7 }}
              >
                {item.message}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
};
