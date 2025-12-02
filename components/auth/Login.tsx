import { authApi } from "@/hooks/api/authapi";
import { loginDto, type loginDto as LoginFormType } from "@/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<LoginFormType>({
        resolver: zodResolver(loginDto),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data: LoginFormType) => {
        try {
            console.log("Login form:", data);


            await authApi.login(data);
            router.replace("/(tabs)")

            reset();
        } catch (error) {
            console.log("Login failed:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Welcome Back 👋</Text>
                <Text style={styles.subtitle}>Login to your account</Text>

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { value, onChange, onBlur } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input, errors.email && styles.errorInput]}
                                placeholder="Email"
                                placeholderTextColor="#888"
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { value, onChange, onBlur } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input, errors.password && styles.errorInput]}
                                placeholder="Password"
                                placeholderTextColor="#888"
                                secureTextEntry
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                            />
                            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                        </View>
                    )}
                />

                <TouchableOpacity
                    style={[styles.button, isSubmitting && { opacity: 0.5 }]}
                    disabled={isSubmitting}
                    onPress={handleSubmit(onSubmit)}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0d0d0d",
    },
    inner: {
        flex: 1,
        paddingHorizontal: 22,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#fff",
    },
    subtitle: {
        fontSize: 14,
        color: "#aaa",
        marginBottom: 28,
    },
    fieldContainer: {
        marginBottom: 18,
    },
    input: {
        backgroundColor: "#1b1b1b",
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#333",
        color: "#fff",
        fontSize: 16,
    },
    errorInput: {
        borderColor: "#ff5b5b",
    },
    error: {
        fontSize: 12,
        marginTop: 6,
        color: "#ff5b5b",
    },
    button: {
        marginTop: 16,
        backgroundColor: "#5b67f1",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});
