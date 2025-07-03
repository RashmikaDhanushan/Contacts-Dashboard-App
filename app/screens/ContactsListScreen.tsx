import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import ContactCard from '../components/ContactCard';

export interface Contact {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  phone: string;
  picture: { thumbnail: string; large: string };
}

type RootStackParamList = {
  ContactsList: undefined;
  ContactDetail: { contact: Contact };
};

const ContactsListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ContactsList'>>();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filtered, setFiltered] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=10')
      .then(res => res.json())
      .then(data => {
        setContacts(data.results);
        setFiltered(data.results);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFiltered(
      contacts.filter(c =>
        `${c.name.first} ${c.name.last}`.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, contacts]);

  if (loading) return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by name"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.login.uuid}
        renderItem={({ item }) => (
          <View style={styles.cardSpacing}>
            <ContactCard
              contact={item}
              onPress={() => navigation.navigate('ContactDetail', { contact: item })}
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  searchContainer: {
    marginBottom: 18,
    marginTop: 8,
  },
  searchInput: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 2,
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  listContent: {
    paddingBottom: 24,
  },
  cardSpacing: {
    marginBottom: 14,
  },
});

export default ContactsListScreen;
// No fragments with style prop found in this file. No changes needed.
