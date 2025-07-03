import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMESTAMPS_KEY = 'favorite_timestamps';

export async function trackFavoriteTimestamp() {
  const now = new Date().toISOString();
  let arr = await getFavoriteTimestamps();
  arr.push(now);
  await AsyncStorage.setItem(TIMESTAMPS_KEY, JSON.stringify(arr));
}

export async function getFavoriteTimestamps(): Promise<string[]> {
  const json = await AsyncStorage.getItem(TIMESTAMPS_KEY);
  return json ? JSON.parse(json) : [];
}
