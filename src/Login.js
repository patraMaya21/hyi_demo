import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { storeTokens } from './utils/storage';
import { loginUser } from './api/authApi';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

export default function Login({ onLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

 const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please enter email and password');
    return;
  }

  setLoading(true);
  try {
    const data = await loginUser(email, password);

    if (data.access_token) {
      await storeTokens(data.access_token, data.refresh_token);
      onLogin();
    }
  } catch (error) {
    Alert.alert('Login Failed', error.message || 'Invalid credentials');
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../src/Images/bottole.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['#d8cce4ff', '#17172aff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.curveContainer}
        >
          <Text style={styles.title}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={handleLogin} activeOpacity={0.8} disabled={loading}>
            <LinearGradient
              colors={['#d0b3ecff', '#6709d2c4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'flex-end' },
  curveContainer: {
    height: height * 0.45,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    justifyContent: 'center',
    elevation: 5,
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e2d8efff',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: '#000',
    backgroundColor: '#f9f9f9',
  },
  gradientButton: {
    marginTop: 30,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
