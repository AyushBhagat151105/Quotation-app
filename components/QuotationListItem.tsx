import { darkColors } from "@/theme/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Quotation } from "@/types/status";
import { useRouter } from "expo-router";

type Props = {
    item: Quotation;
};

export default function QuotationListItem({ item }: Props) {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push({
                pathname: "/quotation/[id]",
                params: { id: item.id }
            })}
            style={styles.card}
            activeOpacity={0.6}
        >
            <Text style={styles.name}>{item.clientName}</Text>
            <Text style={styles.email}>{item.clientEmail}</Text>

            <View style={styles.row}>
                <Text style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
                    {item.status}
                </Text>
                <Text style={styles.amount}>₹ {item.totalAmount}</Text>
            </View>
        </TouchableOpacity>
    );
}

const getStatusColor = (status: string) => ({
    PENDING: darkColors.status.pending,
    APPROVED: darkColors.status.approved,
    REJECTED: darkColors.status.rejected,
    EXPIRED: darkColors.status.expired,
}[status] || darkColors.muted);

const styles = StyleSheet.create({
    card: {
        backgroundColor: darkColors.card,
        padding: 16,
        borderRadius: 14,
        marginVertical: 6,
    },
    name: {
        fontSize: 18,
        color: darkColors.text,
        fontWeight: "600",
    },
    email: {
        color: darkColors.textMuted,
        fontSize: 12,
        marginBottom: 8,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    badge: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        color: darkColors.foreground,
        fontSize: 10,
        fontWeight: "600",
    },
    amount: {
        fontWeight: "700",
        fontSize: 16,
        color: darkColors.text,
    },
});
