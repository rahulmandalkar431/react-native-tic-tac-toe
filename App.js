
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tiles: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      player: 1,
      lastWinner: 0
    }
  }


  componentDidMount() {
    this.resetTiles();
  }

  resetTiles = () => {
    this.setState({
      tiles: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      player: 1,
      lastWinner: 0
    })
  }

  onClickTile = (row, column) => {
    let currentTileValue = this.state.tiles[row][column];
    let lastWinner = this.state.lastWinner;

    if (lastWinner !== 0) {
      Alert.alert(`Player ${(lastWinner === 1) ? 'X' : 'O'} is already winner`);
      return;
    }

    if (currentTileValue != 0) {
      return
    }

    let player = this.state.player;
    let tempTiles = [...this.state.tiles]
    tempTiles[row][column] = player;
    this.setState({ tiles: tempTiles })

    this.setState({ player: player === 1 ? -1 : 1 });

    let winner = this.checkForWinner();

    if (winner === 1) {
      Alert.alert('Winner is X')
      this.setState({ lastWinner: 1 })
    } else if (winner === -1) {
      Alert.alert('Winner is O')
      this.setState({ lastWinner: -1 })
    }
  }

  TileIcon = ({ row, column }) => {
    const val = this.state.tiles[row][column];
    switch (val) {
      case 1: return (<Icon size={32} name="close" style={styles.tileX} />)
      case -1: return (<Icon size={32} name="checkbox-blank-circle-outline" style={styles.tileO} />)
      default: return (<View></View>)
    }
  }

  checkForWinner = () => {
    let total;
    let tempTiles = [...this.state.tiles];

    for (let i = 0; i < tempTiles.length; i++) {
      total = tempTiles[0][i] + tempTiles[1][i] + tempTiles[2][i];
      if (total === 3) {
        return 1;
      } else if (total === -3) {
        return -1
      }
    }


    for (let i = 0; i < tempTiles.length; i++) {
      total = tempTiles[i][0] + tempTiles[i][1] + tempTiles[i][2];
      if (total === 3) {
        return 1;
      } else if (total === -3) {
        return -1
      }
    }

    total = tempTiles[0][0] + tempTiles[1][1] + tempTiles[2][2];
    if (total === 3) {
      return 1;
    } else if (total === -3) {
      return -1
    }

    total = tempTiles[0][2] + tempTiles[1][1] + tempTiles[2][0];
    if (total === 3) {
      return 1;
    } else if (total === -3) {
      return -1
    }

    return 0;

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor='white' />
        <View style={styles.root}>
          <Text style={styles.title}>Tic-Tac-Toe Game</Text>
          <View style={styles.square}>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.cell, { borderRightWidth: 4 }]} onPress={() => this.onClickTile(0, 0)}>
                <this.TileIcon row={0} column={0}></this.TileIcon>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cell, { borderRightWidth: 4 }]} onPress={() => this.onClickTile(0, 1)}>
                <this.TileIcon row={0} column={1}></this.TileIcon>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cell]} onPress={() => this.onClickTile(0, 2)}>
                <this.TileIcon row={0} column={2}></this.TileIcon>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.cell, { borderRightWidth: 4, borderTopWidth: 4 }]} onPress={() => this.onClickTile(1, 0)}>
                <this.TileIcon row={1} column={0}></this.TileIcon>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cell, { borderRightWidth: 4, borderTopWidth: 4, }]} onPress={() => this.onClickTile(1, 1)}>
                <this.TileIcon row={1} column={1}></this.TileIcon>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cell, { borderTopWidth: 4, }]} onPress={() => this.onClickTile(1, 2)}>
                <this.TileIcon row={1} column={2}></this.TileIcon>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.cell, { borderRightWidth: 4, borderTopWidth: 4 }]} onPress={() => this.onClickTile(2, 0)}>
                <this.TileIcon row={2} column={0}></this.TileIcon>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cell, { borderRightWidth: 4, borderTopWidth: 4, }]} onPress={() => this.onClickTile(2, 1)}>
                <this.TileIcon row={2} column={1}></this.TileIcon>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cell, { borderTopWidth: 4, }]} onPress={() => this.onClickTile(2, 2)}>
                <this.TileIcon row={2} column={2}></this.TileIcon>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.resetButton} onPress={() => this.resetTiles()}>
            <Text style={styles.resetText}>Reset Game</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({

  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    marginBottom:32,
    fontSize:24,
    color:'green',
    fontWeight:'bold',
    fontStyle:'italic'
  },
  square: {
    borderWidth: 4,
    borderColor: 'green',
    borderRadius: 4,
    backgroundColor: '#eafaf1'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    // borderTopColor:'black'
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    borderColor: 'green'
  },
  tileX: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red'
  },
  tileO: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'green'
  },
  resetText: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center'
  },
  resetButton: {
    marginTop: 16,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 2,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 32,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

