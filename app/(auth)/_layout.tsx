import { useAuthStore } from "@/store/auth";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AuthLayout() {
    const { user, isInitialized, restore } = useAuthStore();

    useEffect(() => {
        restore();
    }, []);

    if (!isInitialized) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0d0d0d" }}>
                <ActivityIndicator size="large" color="#5b67f1" />
            </View>
        );
    }

    if (user) return <Redirect href="/(tabs)" />;

    return <Stack screenOptions={{ headerShown: false }} />;
}
