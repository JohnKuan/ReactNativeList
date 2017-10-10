import React from 'react';
import PropTypes from 'prop-types';
import { Button, NavigatorIOS, Text, View, SectionList, StyleSheet, Header } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        barTintColor= 'rgba(234,36,110,1.0)'
        titleTextColor='#fff'
        tintColor='#fff'
        initialRoute={{
          component: SectionListBasics,
          title: 'My Initial Scene',
          passProps: {index: 1},
        }}
        style={styles.navigatorStyle}/>
    )
  }
}

export class SectionListBasics extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          ItemSeparatorComponent={ () => <View style={styles.itemSeparatorComponent} /> }
          keyExtractor={(item, index) => index}
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  container2: {
   flex: 1,
   paddingTop: 44
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    height: 47,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  navigatorStyle: {
    flex: 1,
  },
  itemSeparatorComponent: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})

class MyScene extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string.isRequired
    }),
    navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
  }

  _onForward() {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: SectionListBasics,
      title: 'Scene ' + nextIndex,
      passProps: {index: nextIndex}
    });
  }

  render() {
    return (
      <View style={styles.container2}>
        <Text>Current Scene: { this.props.title }</Text>
        <Button 
          onPress={this._onForward}
          title="Tap me to load the next scene"
        />
      </View>
    )
  }
  
}
