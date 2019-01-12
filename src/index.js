import React, { PureComponent } from 'react';
import { Dimensions, View } from 'react-native';
import { MeasureY } from './MeasureY';
// import { MeasureX } from "./MeasureX";

const { width, height } = Dimensions.get('screen');

export class RNRuler extends PureComponent {
    render() {
        return (
            <View style={{ height, width, position: 'absolute' }}>
                <MeasureY />
            </View>
        );
    }
}
