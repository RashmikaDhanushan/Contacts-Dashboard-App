import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Graph from '../../components/Graph';
// Update the import path below if the Graph component exists elsewhere:
import Graph from '../components/Graph';
// Make sure the Graph component exists at this path and accepts a 'data' prop as used below.
import { getFavoriteTimestamps } from '../../utils/timestampTracker';
const StatsScreen = () => {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const load = async () => {
      const timestamps = await getFavoriteTimestamps();
      const now = new Date();
      const hours = Array.from({ length: 6 }, (_, i) => (now.getHours() - 5 + i + 24) % 24);
      const counts = hours.map(h =>
        timestamps.filter(t => new Date(t).getHours() === h).length
      );
      setData(counts);
    };
    load();
  }, []);

  // Avoid using React.Fragment with style prop in the render tree
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites per Hour (last 6 hours)</Text>
      <Graph data={data.map((count, idx) => ({ hour: ((new Date().getHours() - 5 + idx + 24) % 24), count }))} />
    </View>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});