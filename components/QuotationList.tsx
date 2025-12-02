
import { useQuotationsList } from "@/hooks/api/use-dashboard";
import { darkColors } from "@/theme/colors";
import { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QuotationList() {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading, isFetching } = useQuotationsList(page, limit);

    const totalPages = Math.ceil((data?.count ?? 0) / limit);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={darkColors.primary} />
                    <Text style={styles.loadingText}>Loading quotations...</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={data?.items}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ gap: 14 }}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text style={styles.name}>{item.clientName}</Text>
                                <Text style={styles.email}>{item.clientEmail}</Text>

                                <View style={styles.statusRow}>
                                    <Text style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                                        {item.status}
                                    </Text>
                                    <Text style={styles.amount}>₹ {item.totalAmount}</Text>
                                </View>
                            </View>
                        )}
                    />

                    {/* Pagination */}
                    <View style={styles.pagination}>
                        <TouchableOpacity
                            disabled={page === 1}
                            onPress={() => setPage((p) => p - 1)}
                            style={[styles.pageBtn, page === 1 && { opacity: 0.4 }]}
                        >
                            <Text style={styles.pageText}>Prev</Text>
                        </TouchableOpacity>

                        <Text style={styles.pageIndicator}>{page} / {totalPages}</Text>

                        <TouchableOpacity
                            disabled={page === totalPages}
                            onPress={() => setPage((p) => p + 1)}
                            style={[styles.pageBtn, page === totalPages && { opacity: 0.4 }]}
                        >
                            <Text style={styles.pageText}>Next</Text>
                        </TouchableOpacity>
                    </View>

                    {isFetching && (
                        <Text style={styles.loadingMoreText}>Updating...</Text>
                    )}
                </>
            )}
        </View>
    );
}

const getStatusColor = (status: string) => {
    return {
        PENDING: darkColors.status.pending,
        APPROVED: darkColors.status.approved,
        REJECTED: darkColors.status.rejected,
        EXPIRED: darkColors.status.expired,
    }[status] || darkColors.muted;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkColors.background,
        padding: 18,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 8,
        color: darkColors.textMuted,
    },
    card: {
        backgroundColor: darkColors.card,
        padding: 16,
        borderRadius: 14,
    },
    name: {
        fontSize: 18,
        color: darkColors.text,
        fontWeight: "600",
    },
    email: {
        fontSize: 12,
        color: darkColors.textMuted,
        marginBottom: 6,
    },
    statusRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    statusBadge: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        color: darkColors.foreground,
        fontSize: 10,
        fontWeight: "600",
    },
    amount: {
        color: darkColors.text,
        fontWeight: "600",
        fontSize: 16,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },
    pageBtn: {
        padding: 10,
        backgroundColor: darkColors.primary,
        borderRadius: 8,
    },
    pageText: {
        color: darkColors.foreground,
        fontSize: 14,
        fontWeight: "600",
    },
    pageIndicator: {
        color: darkColors.text,
        fontSize: 14,
        marginTop: 6,
    },
    loadingMoreText: {
        textAlign: "center",
        color: darkColors.textMuted,
        marginTop: 8,
        fontSize: 12,
    },
});
