import { useAuthStore } from "@/store/auth";
import { darkColors } from "@/theme/colors";
import { Redirect, Tabs } from "expo-router";
import { Home, PlusSquare, User } from "lucide-react-native";
import { useEffect } from "react";
import { Text, View } from "react-native";

const TabIcon = ({
    focused,
    icon: Icon,
    label,
}: {
    focused: boolean;
    icon: any;
    label: string;
}) => (
    <View style={{ alignItems: "center", gap: 6 }}>
        <Icon
            size={22}
            color={focused ? darkColors.primary : darkColors.textMuted}
            strokeWidth={focused ? 2.3 : 1.8}
        />

        {focused && (
            <Text
                style={{
                    fontSize: 10,
                    color: darkColors.primary,
                    fontWeight: "600",
                }}
            >
                {label}
            </Text>
        )}

        {/* subtle underline indicator */}
        {focused && (
            <View
                style={{
                    width: 20,
                    height: 2,
                    backgroundColor: darkColors.primary,
                    borderRadius: 10,
                    marginTop: 2,
                }}
            />
        )}
    </View>
);

export default function TabsLayout() {
    const { user, isInitialized, restore } = useAuthStore();

    useEffect(() => {
        restore().catch(console.error);
    }, []);


    if (!isInitialized) return null;
    if (!user) return <Redirect href="/(auth)/Login" />;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: darkColors.background,
                    height: 60,
                    borderTopWidth: 0,
                },
                sceneStyle: {
                    backgroundColor: darkColors.background,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={Home} label="Home" />
                    ),
                }}
            />

            <Tabs.Screen
                name="create-quotation"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={PlusSquare} label="Create" />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={User} label="Profile" />
                    ),
                }}
            />
        </Tabs>
    );
}
