import { Text } from "@rneui/themed";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // console.error("Uncaught error:", error, errorInfo);
    console.log("error from componentDidCatch", error);
    // alert(error.message);
  }

  public render() {
    if (this.state.hasError) {
      return <Text>Sorry.. there was an error</Text>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
