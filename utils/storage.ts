import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { Contact } from '../app/screens/ContactsListScreen';

const FAVORITES_KEY = 'favorites';

export async function getFavorites(): Promise<Contact[]> {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  return json ? JSON.parse(json) : [];
}

export async function isFavorite(uuid: string): Promise<boolean> {
  const favs = await getFavorites();
  return favs.some((c: Contact) => c.login.uuid === uuid);
}

export async function toggleFavorite(contact: Contact): Promise<boolean> {
  let favs = await getFavorites();
  const idx = favs.findIndex((c: Contact) => c.login.uuid === contact.login.uuid);
  if (idx >= 0) {
    favs.splice(idx, 1);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    return false;
  } else {
    favs.push(contact);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    return true;
  }
}

export async function exportFavorites(): Promise<string> {
  const favs = await getFavorites();
  const path = FileSystem.documentDirectory + 'favorites.json';
  await FileSystem.writeAsStringAsync(path, JSON.stringify(favs, null, 2));
  return path;
}
