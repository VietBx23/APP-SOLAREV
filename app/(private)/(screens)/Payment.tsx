import { ModalConfirm } from "@/components";
import { queryClient } from "@/providers/ProviderQueries";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import WebView from "react-native-webview";

export default () => {
  const { url } = useLocalSearchParams<{ url: string }>();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const route = useRouter();

  return (
    <Fragment>
      <WebView
        startInLoadingState
        style={{
          flex: 1,
        }}
        source={{ uri: url }}
        onNavigationStateChange={async ({ url, canGoBack }) => {
          //your code goes here
          if (url.includes("https://pay.vnpay.vn/Payment/Error.html")) {
            setOpen(true);
            return;
          }
          if (canGoBack) {
            if (url.includes("https://focusev-admin.insitu.com.vn/ReturnUrl")) {
              route.back();  // back -1 payment 
              queryClient.invalidateQueries({ queryKey: ["get_balance"] }); // 
              return;
            }
          }
        }}
      />
      <ModalConfirm
        isVisible={open}
        title={t(
          "Giao dịch đã quá thời gian chờ thanh toán. Quý khách vui lòng thực hiện lại giao dịch",
        )}
        onBackdropPress={() => {
          setOpen(false);
          route.back();
        }}
      />
    </Fragment>
  );
};
