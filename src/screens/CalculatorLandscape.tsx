import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CalcButton from '../components/CalcButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const buttons = [
    ['Ans', '(', ')', '%', '7', '8', '9', '/'],
    ['√', '^', 'π', '±', '4', '5', '6', '*'],
    ['sin', 'cos', 'tan', 'ln', '1', '2', '3', '-'],
    ['log', 'e', 'x²', '!', '0', '.', '=', '+'],
];

const CalculatorLandscape = () => {
    const [result, setResult] = useState('0');
    const [expression, setExpression] = useState('');

    const handlePress = (btn: string) => {
        if (btn === '') return;

        if (btn === 'AC') {
            setExpression('');
            setResult('0');
            return;
        }

        if (btn === '=') {
            calculate();
            return;
        }

        if (btn === '±') {
            toggleSign();
            return;
        }

        const mapping: Record<string, string> = {
            'π': 'Math.PI',
            'e': 'Math.E',
            '√': 'Math.sqrt(',
            'x²': '**2',
            '^': '**',
            '!': '!',
            'sin': 'Math.sin(',
            'cos': 'Math.cos(',
            'tan': 'Math.tan(',
            'ln': 'Math.log(',
            'log': 'Math.log10(',
        };

        const mapped = mapping[btn] ?? btn;
        const lastChar = expression.slice(-1);

        if ('+-*/.'.includes(btn) && '+-*/.'.includes(lastChar)) {
            setExpression(expression.slice(0, -1) + mapped);
            return;
        }

        setExpression(expression + mapped);
    };

    const toggleSign = () => {
        if (!expression) return;
        try {
            const tokens = expression.split(/([+\-*/()])/);
            let last = tokens.pop();
            if (last) {
                if (last.startsWith('-')) last = last.slice(1);
                else last = '-' + last;
                tokens.push(last);
                setExpression(tokens.join(''));
            }
        } catch { }
    };

    const factorial = (n: number): number => {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    };

    const calculate = () => {
        if (!expression) return;
        try {
            let sanitized = expression
                .replace(/%/g, '/100')
                .replace(/([0-9eE.+\-*/()]+)!/g, (_, n) => `factorial(${n})`);

            const openCount = (sanitized.match(/\(/g) || []).length;
            const closeCount = (sanitized.match(/\)/g) || []).length;
            if (openCount > closeCount) {
                sanitized += ')'.repeat(openCount - closeCount);
            }

            const context = { Math, factorial };
            const value = Function(...Object.keys(context), `return ${sanitized}`)(
                ...Object.values(context)
            );

            setResult(String(value));
            setExpression(String(value));
        } catch (err) {
            setResult('Error');
            setExpression('');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => { setExpression(''); setResult('0'); }}>
                        <Text style={styles.restart}>C</Text>
                    </TouchableOpacity>
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultText}>{expression || result}</Text>
                    </View>
                </View>

                <View style={styles.divider} />
            </View>

            <View style={styles.buttonsContainer}>
                {buttons.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((btn) => (
                            <CalcButton key={btn} label={btn} onPress={handlePress} size={45} textSize={15}/>
                            ))}
                    </View>
                ))}
            </View>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 10,
        justifyContent: 'space-between',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    restart: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#f4a107',
        backgroundColor: '#000',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 15,
    },
    resultContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginLeft: 10,
    },
    resultText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#000',
    },
    divider: {
        alignSelf: 'stretch',
        height: 2,
        backgroundColor: '#000',
        borderRadius: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 20, // mniejszy oddech
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4, // ciaśniej
    },
    button: {
        backgroundColor: '#000',
        width: 45,
        height: 45,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4, // ciaśniej
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CalculatorLandscape;
