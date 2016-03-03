import React, {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import Bubble from './Bubble';
import ErrorButton from './ErrorButton';

var styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'column',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  dateText: {
    fontSize: 10,
    color: '#bbbbbb',
    paddingRight: 7,
    paddingLeft: 7,
    paddingTop: 2
  },
  name: {
    color: '#aaaaaa',
    fontSize: 12,
    marginLeft: 55,
    marginBottom: 5,
  },
  imagePosition: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    marginLeft: 8,
    marginRight: 8,
  },
  image: {
    alignSelf: 'center',
    borderRadius: 15,
  },
  imageLeft: {
  },
  imageRight: {
  },
  spacer: {
    width: 10,
  },
  status: {
    color: '#aaaaaa',
    fontSize: 12,
    textAlign: 'right',
    marginRight: 15,
    marginBottom: 10,
    marginTop: -5,
  },
});

export default class Message extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    Object.assign(styles, this.props.styles);
  }

  renderName(name, displayNames, diffMessage){
    if (displayNames === true) {
      if (diffMessage === null || name !== diffMessage.name) {
        return (
          <Text style={[styles.name]}>
            {name}
          </Text>
        );
      }
    }
    return null;
  }

  renderErrorButton(rowData, rowID, onErrorButtonPress){
    if (rowData.status === 'ErrorButton') {
      return (
        <ErrorButton
          onErrorButtonPress={onErrorButtonPress}
          rowData={rowData}
          rowID={rowID}
          styles={styles}
        />
      )
    }
    return null;
  }

  renderStatus(status){
    if (status !== 'ErrorButton' && typeof status === 'string') {
      if (status.length > 0) {
        return (
          <View>
            <Text style={styles.status}>{status}</Text>
          </View>
        );
      }
    }
    return null;
  }

  renderDate(date, position) {
    if (position === 'right') {
      return (
        <Text style={[styles.dateText, {alignSelf: 'flex-end'}]}>{date}</Text>
      );
    } else {
      return (
        <Text style={[styles.dateText, {alignSelf: 'flex-start'}]}>{date}</Text>
      );
    }
  }

  render(){

    var {
      rowData,
      rowID,
      onErrorButtonPress,
      position,
      date,
      displayNames,
      diffMessage,
      forceRenderImage,
      onImagePress
    } = this.props;

    var flexStyle = {};
    var RowView = Bubble;
    if ( rowData.text.length > 40 ) {
      flexStyle.flex = 1;
    }

    if ( rowData.view ) {
      RowView = rowData.view;
    }

    return (
      <View>
        {position === 'left' ? this.renderName(rowData.name, displayNames, diffMessage) : null}
        <View style={[styles.rowContainer, {
            alignItems: position==='left'?"flex-start":"flex-end"
          }]}>
          <RowView
            {...rowData}
            renderCustomText={this.props.renderCustomText}
            styles={styles}
            />
          {this.renderDate(date, position)}
        </View>
        {rowData.position === 'right' ? this.renderStatus(rowData.status) : null}
      </View>
    )
  }
}
