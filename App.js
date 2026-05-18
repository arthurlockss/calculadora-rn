import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider, Button, Text, Surface } from 'react-native-paper';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (value) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'DEL') {
      setInput(input.slice(0, -1));
    } else if (value === '=') {
      try {
        // Evaluate the expression safely. Using Function constructor as a safer eval alternative.
        // eslint-disable-next-line no-new-func
        const evalResult = new Function('return ' + input)();
        if (evalResult !== undefined) {
          setResult(String(evalResult));
        }
      } catch (e) {
        setResult('Erro');
      }
    } else {
      setInput(input + value);
    }
  };

  const renderButton = (value, mode = "outlined", color = undefined) => (
    <Button 
      mode={mode} 
      onPress={() => handlePress(value)} 
      style={styles.button}
      labelStyle={styles.buttonLabel}
      buttonColor={color}
    >
      {value}
    </Button>
  );

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Surface style={styles.display} elevation={2}>
          <Text variant="headlineMedium" style={styles.inputText}>
            {input || '0'}
          </Text>
          <Text variant="displaySmall" style={styles.resultText}>
            {result}
          </Text>
        </Surface>
        
        <View style={styles.row}>
          {renderButton('C', 'contained', '#ff5252')}
          {renderButton('(', 'contained-tonal')}
          {renderButton(')', 'contained-tonal')}
          {renderButton('/', 'contained-tonal')}
        </View>
        <View style={styles.row}>
          {renderButton('7')}
          {renderButton('8')}
          {renderButton('9')}
          {renderButton('*', 'contained-tonal')}
        </View>
        <View style={styles.row}>
          {renderButton('4')}
          {renderButton('5')}
          {renderButton('6')}
          {renderButton('-', 'contained-tonal')}
        </View>
        <View style={styles.row}>
          {renderButton('1')}
          {renderButton('2')}
          {renderButton('3')}
          {renderButton('+', 'contained-tonal')}
        </View>
        <View style={styles.row}>
          {renderButton('0')}
          {renderButton('.')}
          {renderButton('DEL')}
          {renderButton('=', 'contained', '#4caf50')}
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-end',
  },
  display: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    minHeight: 180,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  inputText: {
    color: '#666',
    marginBottom: 10,
  },
  resultText: {
    color: '#000',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 24,
    paddingVertical: 8,
  }
});
