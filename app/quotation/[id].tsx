import { useGetQuotation } from "@/hooks/api/use-dashboard";
import { darkColors } from "@/theme/colors";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function QuotationDetails() {
    const { id } = useLocalSearchParams();
    const { data, isLoading } = useGetQuotation(id as string);

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={darkColors.primary} />
            </View>
        );
    }

    if (!data) return null;

    // ✅ Prefer the response that matches final quotation.status
    const latestResponse =
        data.responses && data.responses.length > 0
            ? (
                data.responses
                    .filter((r) => r.status === data.status) // match APPROVED / REJECTED
                    .sort(
                        (a, b) =>
                            new Date(b.respondedAt).getTime() -
                            new Date(a.respondedAt).getTime()
                    )[0] ||
                // fallback: latest overall
                data.responses
                    .slice()
                    .sort(
                        (a, b) =>
                            new Date(b.respondedAt).getTime() -
                            new Date(a.respondedAt).getTime()
                    )[0]
            )
            : null;

    const subtotal = data.items.reduce(
        (sum, item) => sum + Number(item.unitPrice) * item.quantity,
        0
    );
    const taxTotal = data.items.reduce(
        (sum, item) => sum + Number(item.tax),
        0
    );
    const total = Number(data.totalAmount);

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.brand}>Quotation</Text>
                <Text style={styles.quoteId}>
                    ID: {data.id.slice(0, 6).toUpperCase()}
                </Text>
            </View>

            {/* STATUS */}
            <View
                style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(data.status) },
                ]}
            >
                <Text style={styles.statusText}>{data.status}</Text>
            </View>

            {/* CLIENT DETAILS */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Client Details</Text>
                <Text style={styles.text}>{data.clientName}</Text>
                <Text style={styles.subText}>{data.clientEmail}</Text>
            </View>

            {/* ITEMS */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Quotation Items</Text>

                {data.items.map((item) => (
                    <View key={item.id} style={styles.itemRow}>
                        <View>
                            <Text style={styles.itemName}>{item.itemName}</Text>
                            <Text style={styles.itemSub}>
                                {item.quantity} x ₹{item.unitPrice}
                            </Text>
                        </View>
                        <Text style={styles.itemPrice}>₹ {item.totalPrice}</Text>
                    </View>
                ))}
            </View>

            {/* SUMMARY */}
            <View style={styles.summaryBox}>
                <Row label="Subtotal" value={`₹ ${subtotal}`} />
                <Row label="Tax" value={`₹ ${taxTotal}`} />
                <Row label="Total" value={`₹ ${total}`} bold />
            </View>

            {/* Latest Response */}
            {latestResponse && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Latest Client Action</Text>

                    <View
                        style={[
                            styles.responseBox,
                            { borderColor: getStatusColor(latestResponse.status) },
                        ]}
                    >
                        <Text style={styles.responseStatus}>
                            {latestResponse.status}
                        </Text>

                        <Text style={styles.responseMeta}>
                            On {new Date(latestResponse.respondedAt).toLocaleString()}
                        </Text>

                        {latestResponse.rejectionComment && (
                            <Text style={styles.responseComment}>
                                ❌ Reason: {latestResponse.rejectionComment}
                            </Text>
                        )}

                        {latestResponse.userAgent && (
                            <Text style={styles.responseMeta}>
                                Device: {latestResponse.userAgent.split("(")[0]}
                            </Text>
                        )}

                        {latestResponse.clientIp && (
                            <Text style={styles.responseMeta}>
                                IP: {latestResponse.clientIp}
                            </Text>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
}

const Row = ({
    label,
    value,
    bold,
}: {
    label: string;
    value: string;
    bold?: boolean;
}) => (
    <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, bold && { fontWeight: "700" }]}>
            {label}
        </Text>
        <Text style={[styles.summaryValue, bold && { fontWeight: "700" }]}>
            {value}
        </Text>
    </View>
);

const getStatusColor = (status: string) =>
({
    PENDING: darkColors.status.pending,
    APPROVED: darkColors.status.approved,
    REJECTED: darkColors.status.rejected,
    EXPIRED: darkColors.status.expired,
}[status] || darkColors.muted);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkColors.background,
        padding: 20,
        paddingTop: 40,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkColors.background,
    },

    header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
    brand: { fontSize: 28, fontWeight: "700", color: darkColors.text },
    quoteId: { fontSize: 14, color: darkColors.textMuted, alignSelf: "center" },

    statusBadge: {
        alignSelf: "flex-start",
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginBottom: 18,
    },
    statusText: { fontWeight: "600", color: darkColors.foreground },

    section: { marginBottom: 25 },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        color: darkColors.text,
    },
    text: { fontSize: 16, color: darkColors.text },
    subText: { fontSize: 13, color: darkColors.textMuted },

    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomColor: darkColors.border,
        borderBottomWidth: 1,
    },
    itemName: { fontSize: 16, color: darkColors.text, fontWeight: "500" },
    itemSub: { fontSize: 12, color: darkColors.textMuted },
    itemPrice: { fontSize: 16, fontWeight: "600", color: darkColors.primary },

    summaryBox: {
        backgroundColor: darkColors.card,
        padding: 14,
        borderRadius: 10,
        marginBottom: 30,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    summaryLabel: { color: darkColors.text },
    summaryValue: { color: darkColors.text },

    responseBox: {
        borderWidth: 1,
        padding: 14,
        borderRadius: 10,
        backgroundColor: darkColors.card,
    },
    responseStatus: {
        fontSize: 18,
        fontWeight: "700",
        color: darkColors.text,
    },
    responseMeta: {
        fontSize: 12,
        marginTop: 6,
        color: darkColors.textMuted,
    },
    responseComment: {
        marginTop: 10,
        fontSize: 14,
        color: darkColors.destructive ?? darkColors.error ?? "#ff4d4f",
        fontStyle: "italic",
    },
});
