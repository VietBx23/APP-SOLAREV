import { CameraView, useCameraPermissions } from "expo-camera";
import { Canvas, DiffRect, rect, rrect } from "@shopify/react-native-skia";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const { width, height } = Dimensions.get("window");

const innerDimension = 300;

export type PropsScanQr = {
  onSuccess: (e: string) => void;
};

export type RefScanQr = {
  onClose: () => void;
};

export const ScanQr = forwardRef<RefScanQr, PropsScanQr>(
  ({ onSuccess }, ref) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [_, setLoading] = useState<boolean>(false);
    const cameraRef = useRef<any>(null);

    useImperativeHandle(ref, () => {
      return {
        onClose() {
          cameraRef.current?.resumePreview();
        },
      };
    }, []);

    useLayoutEffect(() => {
      (async () => {
        if (permission && !permission.granted) {
          try {
            setLoading(true);
            await requestPermission();
          } catch (error) {
            console.log("check requestPermission");
          } finally {
            setLoading(false);
          }
        }
      })();
    }, [permission]);

    return (
      <SafeAreaView style={StyleSheet.absoluteFillObject}>
        <CameraView
          ref={cameraRef}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={async ({ data }) => {
            await cameraRef.current.pausePreview();
            onSuccess(data);

            // if (data && !qrLock.current) {
            //   qrLock.current = true;
            //   onSuccess(data);
            // }
          }}
          style={StyleSheet.absoluteFillObject}
        />
        <Overlay />
      </SafeAreaView>
    );
  },
);

const Overlay = () => {
  const outer = rrect(rect(0, 0, width, height), 0, 0);
  const inner = rrect(
    rect(
      width / 2 - innerDimension / 2,
      height / 2 - innerDimension / 2,
      innerDimension,
      innerDimension,
    ),
    50,
    50,
  );
  return (
    <Canvas
      style={
        Platform.OS === "android" ? { flex: 1 } : StyleSheet.absoluteFillObject
      }
    >
      <DiffRect inner={inner} outer={outer} color="black" opacity={0.5} />
    </Canvas>
  );
};
