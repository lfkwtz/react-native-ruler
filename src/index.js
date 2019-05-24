import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { MeasureY } from './MeasureY';
import { MeasureX } from './MeasureX';

export class RNRuler extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            showY: true,
        };

        this.swapLines = this.swapLines.bind(this);
    }

    swapLines() {
        this.setState({ showY: !this.state.showY });
    }

    render() {
        const { showY } = this.state;
        return (
            <View
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    zIndex: 100,
                }}
            >
                {showY ? (
                    <MeasureY swapLines={this.swapLines} />
                ) : (
                    <MeasureX swapLines={this.swapLines} />
                )}
            </View>
        );
    }
}
