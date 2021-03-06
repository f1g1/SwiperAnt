

import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import CreatedRentItems from './CreatedRentItems';
import LikedRentItems from './LikedRentItems';

const FirstRoute = () => (
  <LikedRentItems/>
  );

const SecondRoute = () => (
    <CreatedRentItems/>

);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function MyRentItems() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Liked' },
    { key: 'second', title: 'Created' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}