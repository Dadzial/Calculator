import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CalcButtonProps {
    label: string;
    onPress: (label: string) => void;
    size?: number;
    textSize?: number;
}

const CalcButton: React.FC<CalcButtonProps> = ({ label, onPress, size = 70, textSize }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { width: size, height: size, borderRadius: size / 2 }]}
            onPress={() => onPress(label)}
        >
            <Text
                style={[
                    styles.text,
                    textSize ? { fontSize: textSize } : null,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default CalcButton;
