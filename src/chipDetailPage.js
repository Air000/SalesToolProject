import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

export default class ChipsList extends React.Component {
  render() {
    return (
      <Text>Description: {this.props.chip.description}</Text>
    )
  }
}
