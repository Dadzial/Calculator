import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import React from 'react';
import CalculatorPortrait from './screens/CalculatorPortrait';
import CalculatorLandscape from './screens/CalculatorLandscape';

const App =() => {
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;

    return (
        <View style={styles.container}>
            {isPortrait ? <CalculatorPortrait /> : <CalculatorLandscape />}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;

