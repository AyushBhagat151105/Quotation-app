import QuotationListItem from "@/components/QuotationListItem";
import StatCard from "@/components/StatCard";
import { useDashboard, useQuotationsList } from "@/hooks/api/use-dashboard";
import { useAuthStore } from "@/store/auth";
import { darkColors } from "@/theme/colors";
import { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View
} from "react-native";

export default function Index() {
    const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useDashboard();
    const { user } = useAuthStore();
    const [page, setPage] = useState(1);

    const { data, isLoading, isFetching, refetch } = useQuotationsList(page, 10);
    const [refreshing, setRefreshing] = useState(false);

    const totalPages = Math.ceil((data?.count ?? 0) / 10);

    async function handleRefresh() {
        setRefreshing(true);
        await Promise.all([refetch(), refetchStats()]);
        setRefreshing(false);
    }

    if (statsLoading || isLoading)
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={darkColors.primary} />
                <Text style={styles.loadingText}>Loading dashboard...</Text>
            </View>
        );

    return (
        <FlatList
            style={styles.container}
            data={data?.items}
            keyExtractor={(item) => item.id}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    tintColor={darkColors.primary}
                    colors={[darkColors.primary]}
                />
            }
            ListHeaderComponent={
                <>
                    <Text style={styles.greeting}>Hello {user?.name} 👋</Text>
                    <Text style={styles.subtitle}>Here’s your quotation overview</Text>

                    <View style={styles.grid}>
                        <StatCard value={stats?.total as number} label="Total" color={darkColors.primary} />
                        <StatCard value={stats?.pending as number} label="Pending" color={darkColors.status.pending} />
                        <StatCard value={stats?.approved as number} label="Approved" color={darkColors.status.approved} />
                        <StatCard value={stats?.rejected as number} label="Rejected" color={darkColors.status.rejected} />
                        <StatCard value={stats?.expired as number} label="Expired" color={darkColors.status.expired} />
                    </View>

                    <Text style={styles.sectionTitle}>Recent Quotations</Text>
                </>
            }
            renderItem={({ item }) => <QuotationListItem item={item} />}
            ListFooterComponent={
                <View style={styles.footer}>
                    {isFetching ? (
                        <Text style={styles.loadingMore}>Updating...</Text>
                    ) : (
                        <View style={styles.pagination}>
                            <Text
                                style={[styles.pageBtn, page === 1 && { opacity: 0.4 }]}
                                onPress={() => page > 1 && setPage(page - 1)}
                            >
                                Prev
                            </Text>
                            <Text style={styles.pageIndicator}>{page} / {totalPages}</Text>
                            <Text
                                style={[styles.pageBtn, page === totalPages && { opacity: 0.4 }]}
                                onPress={() => page < totalPages && setPage(page + 1)}
                            >
                                Next
                            </Text>
                        </View>
                    )}
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkColors.background,
        paddingHorizontal: 20,
        paddingTop: 30
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkColors.background,
    },
    loadingText: {
        marginTop: 10,
        color: darkColors.textMuted,
    },
    greeting: {
        fontSize: 26,
        fontWeight: "600",
        color: darkColors.text,
        marginTop: 20,
    },
    subtitle: {
        fontSize: 14,
        color: darkColors.textMuted,
        marginBottom: 20,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: darkColors.text,
        marginBottom: 10,
        marginTop: 10,
    },
    footer: {
        marginVertical: 20,
        alignItems: "center",
    },
    pagination: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
    },
    pageBtn: {
        padding: 10,
        color: darkColors.primary,
        fontSize: 16,
        fontWeight: "600",
    },
    pageIndicator: {
        color: darkColors.text,
        fontSize: 14,
    },
    loadingMore: {
        color: darkColors.textMuted,
        fontSize: 12,
    },
});
