import { registerDto } from "@/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import z from "zod";
// import { authApi } from "@/api/authApi"; // <--- later you'll integrate

type RegisterFormValues = z.infer<typeof registerDto>;

const Register = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerDto),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    });

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            console.log("Login form:", data);

            // Uncomment when auth implemented:
            // await authApi.login(data);

            reset();
        } catch (error) {
            console.log("Login failed:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome 👋</Text>
            <Text style={styles.subtitle}>Register to continue</Text>

            {/* --- Email Field --- */}
            <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange, onBlur } }) => (
                    <>
                        <TextInput
                            style={[styles.input, errors.email && styles.errorInput]}
                            placeholder="Email"
                            placeholderTextColor="#888"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                    </>
                )}
            />

            {/* --- Password Field --- */}
            <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange, onBlur } }) => (
                    <>
                        <TextInput
                            style={[styles.input, errors.password && styles.errorInput]}
                            placeholder="Password"
                            placeholderTextColor="#888"
                            secureTextEntry
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                    </>
                )}
            />

            <Controller
                control={control}
                name="name"
                render={({ field: { value, onChange, onBlur } }) => (
                    <>
                        <TextInput
                            style={[styles.input]}
                            placeholder="Name"
                            placeholderTextColor="#888"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                    </>
                )}
            />

            {/* --- Submit Button --- */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#0d0d0d",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 6,
        color: "#fff",
    },
    subtitle: {
        fontSize: 14,
        color: "#aaa",
        marginBottom: 30,
    },
    input: {
        width: "100%",
        padding: 14,
        backgroundColor: "#1a1a1a",
        borderRadius: 10,
        marginBottom: 10,
        color: "#fff",
        borderWidth: 1,
        borderColor: "#333",
    },
    button: {
        backgroundColor: "#5b67f1",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 15,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
    errorText: {
        color: "#f66",
        marginBottom: 10,
        fontSize: 12,
    },
    errorInput: {
        borderColor: "#ff5050",
    },
});

