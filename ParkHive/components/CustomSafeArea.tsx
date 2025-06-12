import { PropsWithChildren } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function CustomSafeArea ({children}: PropsWithChildren) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1}}>{children}</SafeAreaView>
        </SafeAreaProvider>
    )
    
}

export default CustomSafeArea;