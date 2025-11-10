import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeTokens = async (accessToken, refreshToken) => {
  await AsyncStorage.setItem('access_token', accessToken);
  if (refreshToken) await AsyncStorage.setItem('refresh_token', refreshToken);
};
