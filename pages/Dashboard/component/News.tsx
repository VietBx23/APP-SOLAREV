import { ContainerScreen } from "@/components";
import { size } from "@/constants";
import { makeStyles, Text } from "@rneui/themed";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

type IProps = {
  title: string;
  image: string;
  url: string;
};
const NEWS_ARRAY: Array<IProps> = [
  {
    title:
      "SolarEV tiếp tục phủ sóng trạm sạc, đồng hành phát triển cùng các hãng xe điện có mặt tại thị trường Việt Nam.",
    image:
      "https://www.solarev.vn/wp-content/uploads/2024/07/8385aa68811a24447d0b.jpg",
    url: "solarev-khong-ngung-phu-song-tram-sac/",
  },
  {
    title:
      "SOLAREV – Hệ thống trạm sạc xe điện sử dụng nguồn năng lượng tái tạo",
    image:
      "https://www.solarev.vn/wp-content/uploads/2023/09/Tram-sac-xe-dien-SolarEV-Focus-300x179.jpg",
    url: "solarev-he-thong-tram-sac-xe-dien-su-dung-nguon-nang-luong-tai-tao/",
  },
  {
    title:
      "FOCUS SOLAR và LADO TAXI hợp tác phát triển hệ thống Điện Năng Lượng Mặt Trời và Trạm sạc xe điện trên toàn tỉnh Lâm Đồng",
    image:
      "https://www.solarev.vn/wp-content/uploads/2023/07/Lado-Taxi-ky-niem-10-nam-thanh-lap-300x200.jpg",
    url: "focus-solar-va-lado-taxi-hop-tac-phat-trien-he-thong-dien-nang-luong-mat-troi-va-tram-sac-xe-dien-tren-toan-tinh-lam-dong/",
  },
  {
    title: "Cùng FOCUS SOLAR khám phá The Future Energy Show Vietnam 2023",
    image:
      "https://www.solarev.vn/wp-content/uploads/2023/07/The-Future-Energy-Show-2023-1-300x251.jpg",
    url: "cung-focus-solar-kham-pha-the-future-energy-show-vietnam-2023/",
  },
  {
    title: "Giải pháp cuối vòng đời cho điện mặt trời",
    image:
      "https://www.solarev.vn/wp-content/uploads/2023/07/vong-doi-cua-pin-mat-troi-300x240.jpg",
    url: "giai-phap-cuoi-vong-doi-cho-dien-mat-troi/",
  },
];

const News = () => {
  return (
    <ContainerScreen style={{ paddingTop: 0, paddingRight: 0, padding: 0 }}>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      >
        {NEWS_ARRAY.map((item, index) => (
          <Action key={index} {...item} />
        ))}
      </ScrollView>
    </ContainerScreen>
  );
};
export default News;

const Action: FC<IProps> = ({ url, image, title }) => {
  const styled = useStyle();
  const route = useRouter();
  return (
    <TouchableOpacity
      style={[styled.item]}
      onPress={() => {
        route.navigate(`/(private)/(screens)/(detail)/news/${url}`);
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        resizeMode="cover"
        style={[styled.image]}
      />
      <Text numberOfLines={2} style={{ fontSize: size(13), fontWeight: "600" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const useStyle = makeStyles((theme) => ({
  item: {
    width: 128,
    overflow: "hidden",
    borderRadius: 10,
    gap: 5,
  },
  image: {
    height: 108,
    borderRadius: 10,
  },
}));
