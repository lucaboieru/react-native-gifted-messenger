import React, {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import Bubble from './Bubble';
import ErrorButton from './ErrorButton';
import moment from 'moment';

var styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 26,
    paddingLeft: 10,
    paddingRight: 10
  },
  dateText: {
    fontSize: 10,
    position: 'absolute',
    bottom: -14,
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
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 8,
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

  renderUserImage(data) {
    if (!data.image) return null;

    return (
      <Image source={{uri: data.image}} style={styles.image} />
    );
  }

  renderDate(date, position) {
    if (position === 'right') {
      return (
        <Text style={[styles.dateText, {right: 5}]}>{moment(date).format('Do MMM, HH:mm')}</Text>
      );
    } else {
      return (
        <Text style={[styles.dateText, {left: 45}]}>{moment(date).format('Do MMM, HH:mm')}</Text>
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
        <View style={[styles.rowContainer, {
          justifyContent: position === 'left' ? "flex-start" : "flex-end"
        }]}>
          {position === 'left' ? this.renderUserImage(rowData) : null}
          <RowView
            {...rowData}
            renderCustomText={this.props.renderCustomText}
            styles={styles}
            />
          {this.renderDate(date, position)}
        </View>
      </View>
    )
  }
}
