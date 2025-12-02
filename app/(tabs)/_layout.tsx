import { useAuthStore } from "@/store/auth";
import { Redirect, Tabs } from "expo-router";
import { useEffect } from "react";

export default function TabsLayout() {
    const { user, isInitialized, restore } = useAuthStore();

    useEffect(() => {
        restore();
    }, []);

    if (!isInitialized) return null;

    if (!user) return <Redirect href="/(auth)/Login" />;

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" />
            <Tabs.Screen name="create-quotation" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}
