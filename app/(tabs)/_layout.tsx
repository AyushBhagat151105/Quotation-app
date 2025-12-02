import { useAuthStore } from "@/store/auth";
import { darkColors } from "@/theme/colors";
import { Redirect, Tabs } from "expo-router";
import { Home, PlusSquare, User } from "lucide-react-native";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const TabIcon = ({
    focused,
    icon: Icon,
    label,
}: {
    focused: boolean;
    icon: any;
    label: string;
}) => (
    <View style={styles.tabItem}>
        <Icon
            size={22}
            color={focused ? darkColors.primary : darkColors.textMuted}
            strokeWidth={focused ? 2 : 1.6}
        />
        <Text
            numberOfLines={1}
            style={[
                styles.label,
                {
                    color: focused ? darkColors.primary : darkColors.textMuted,
                },
            ]}
        >
            {label}
        </Text>
    </View>
);

export default function TabsLayout() {
    const { user, isInitialized, restore } = useAuthStore();

    useEffect(() => {
        restore();
    }, []);

    if (!isInitialized) return null;
    if (!user) return <Redirect href="/(auth)/Login" />;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarItemStyle: styles.tabSlot,
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

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: darkColors.card,
        borderTopWidth: 1,
        borderTopColor: darkColors.border,
        height: 60,
    },

    // fixes overflow — forces equal spacing
    tabSlot: {
        flex: 1,
    },

    tabItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
    },

    label: {
        fontSize: 11,
        fontWeight: "500",
        maxWidth: 60, // prevents overflow on long label text
        textAlign: "center",
    },
});
