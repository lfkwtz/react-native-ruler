import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { MeasureY } from './MeasureY';
// import { MeasureX } from "./MeasureX";
// TODO: finish MeasureX

export class RNRuler extends PureComponent {
    render() {
        return (
            <View style={{ height: '100%', width: '100%', position: 'absolute' }}>
                {/* <MeasureX /> */}
                <MeasureY />
            </View>
        );
    }
}
