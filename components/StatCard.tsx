import { darkColors } from "@/theme/colors";
import { StyleSheet, Text, View } from "react-native";

export type StatCardProps = {
    label: string;
    value: number;
    color?: string;
};

export default function StatCard({ label, value, color }: StatCardProps) {
    return (
        <View style={[styles.card, { backgroundColor: color ?? darkColors.card }]}>
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "47%",
        padding: 20,
        borderRadius: 14,
        justifyContent: "space-between",
    },
    value: {
        fontSize: 28,
        fontWeight: "700",
        color: darkColors.foreground,
    },
    label: {
        fontSize: 14,
        marginTop: 4,
        color: darkColors.foreground,
        opacity: 0.8,
    },
});
