import React from 'react';
import { Text, View } from 'react-native';
import { BarChart, XAxis } from 'react-native-svg-charts';


type DataPoint = {
  hour: number;
  count: number;
};

export default function Graph({ data }: { data: DataPoint[] }) {
  const barData = data.map(item => item.count);
  const labels = data.map(item => `${item.hour}:00`);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>
        Favorites in the Last 6 Hours
      </Text>
      <BarChart
        style={{ height: 200 }}
        data={barData}
        svg={{ fill: '#e9615e' }}
        spacingInner={0.2}
        gridMin={0}
      />
      <XAxis
        style={{ marginTop: 10 }}
        data={barData}
        formatLabel={(value: number, index: number) => labels[index]}
        contentInset={{ left: 10, right: 10 }}
        svg={{ fontSize: 12, fill: 'black' }}
      />
    </View>
  );
}

