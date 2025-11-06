import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CalcButton from '../components/CalcButton';

const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
];

const CalculatorPortrait = () => {
    const [result, setResult] = useState('0');
    const [expression, setExpression] = useState('');

    const handlePress = (btn: string) => {
        if (btn === '=') {
            calculate();
            return;
        }
        const lastChar = expression.slice(-1);
        if ('+-*/.'.includes(btn) && '+-*/.'.includes(lastChar)) {
            setExpression(expression.slice(0, -1) + btn);
            return;
        }
        setExpression(expression + btn);
    };

    const calculate = () => {
        if (!expression) return;
        try {
            const sanitized = expression.replace(/[^0-9+\-*/.]/g, '');
            const value = eval(sanitized);
            setResult(String(value));
            setExpression(String(value));
        } catch {
            setResult('Error');
            setExpression('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.display}>
                <TouchableOpacity onPress={() => { setExpression(''); setResult('0'); }}>
                    <Text style={styles.restart}>C</Text>
                </TouchableOpacity>
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>{expression || result}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.buttonsContainer}>
                {buttons.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((btn) => (
                            <CalcButton key={btn} label={btn} onPress={handlePress} />
                        ))}
                    </View>
                ))}
            </View>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 50,
    },
    display: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '90%',
        height: 100,
        backgroundColor: '#fff',
        padding: 16,
    },
    resultContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    restart: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f4a107',
        backgroundColor: '#000',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 15,
    },
    resultText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
    },
    divider: {
        width: '90%',
        height: 2,
        backgroundColor: '#000',
        marginVertical: 20,
        borderRadius: 1,
    },
    buttonsContainer: {
        width: '90%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
});

export default CalculatorPortrait;
