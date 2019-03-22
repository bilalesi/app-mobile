/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import {
  ListItem,
  Left,
  Body,
  Thumbnail
} from 'native-base';

import ContributorHeader from './listItem/contribHeader';
import ContributorDevTeam from './listItem/contribDevTeam';


const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flex: 1,
  },
  listItem: {
    height: 130,
    marginLeft: 0,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  active: {

  },
  inactive: {
    backgroundColor: '#ce3ecc',
  }
});

export default class ListContainer extends Component {
  constructor() {
    super();
    this.state = {
      contributorsData: [],
      dataLoaded: false,
    };
  }

  componentDidMount() {
    fetch('https://app-backend-iel278lgr.now.sh/contributors')
      .then(res => res.json())
      .then((data) => {
        data.sort((firstItem, secondItem) => (firstItem.joined < secondItem.joined ? -1 : 1));
        this.setState({
          contributorsData: data,
          dataLoaded: true
        });
      })
      .catch(error => console.log(error));
  }

  renderSeparator = () => <View style={{ height: 1, backgroundColor: '#121212', }}></View>;

  render() {
    if (this.state.dataLoaded) {
      return (
        <FlatList
          style={styles.flex}
          data={this.state.contributorsData}
          renderItem={({ item }) => {
            console.log(item);
            const {
              name,
              teamIds,
              image,
              active
            } = item;

            return (
            <ListItem style={[styles.listItem, active ? styles.active : styles.inactive]} avatar>
              <Left>
                <Thumbnail
                  source={{ uri: image }}
                  style={[styles.thumbnail, { paddingVertical: 0 }]}
                />
              </Left>
              <Body style={{ paddingVertical: 0 }}>

                <ContributorHeader name={name} link={ 'null' } />
                <ContributorDevTeam teamIds={teamIds} />
              </Body>
            </ListItem>
            );
          }
        }
          keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
        />
      );
    }
    return <Text style={{ alignSelf: 'center', marginTop: 50 }}>Loading...</Text>;
  }
}
