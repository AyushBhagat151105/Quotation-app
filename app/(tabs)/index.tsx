import { useHelth } from "@/hooks/api/useHelth";
import { useAuthStore } from "@/store/auth";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Index() {
    const { data, isLoading } = useHelth();
    const { user } = useAuthStore()
    if (isLoading) return <Text>Loading...</Text>;
    return (

        <ScrollView style={styles.scrollView}>
            <Text>Hello {user?.name}</Text>
        </ScrollView>

    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 42,
    },
});

