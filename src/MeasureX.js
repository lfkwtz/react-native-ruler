import React, { PureComponent } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

export class MeasureX extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
            xLine: 0,
        };

        this._val = { x: 0, y: 0 };

        this.state.pan.addListener((value) => {
            return (this._val = value);
        });

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => {
                return true;
            },
            onPanResponderMove: Animated.event([
                null,
                {
                    dx: this.state.pan.x,
                },
            ]),
            onPanResponderRelease: (e, gesture) => {
                const xLine = width + gesture.dx - 30;
                console.log('x location', xLine);
                this.setState({ xLine });
                Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
            },
        });
    }

    modifyVerticalAlignment({ tick }) {
        if (tick < 10) {
            return { alignItems: 'flex-end' };
        } else if (tick > height - 10) {
            return { alignItems: 'flex-start' };
        }
    }

    renderVerticalRulerTicks() {
        const ticks = [0, height * 0.25, height * 0.5, height * 0.75, height];
        return ticks.map((tick) => {
            return (
                <View
                    key={tick}
                    //   style={[
                    //     { alignItems: "center" },
                    //     this.modifyVerticalAlignment({ tick })
                    //   ]}
                >
                    <View style={{ width: 10, height: 1, backgroundColor: 'black' }} />
                    <Text style={{ fontSize: 10 }}>{tick}</Text>
                </View>
            );
        });
    }

    render() {
        const { xLine, pan } = this.state;

        const panStyle = {
            transform: pan.getTranslateTransform(),
        };

        return (
            <View style={{ height: '100%', width: '100%', position: 'absolute' }}>
                <Text
                    style={{
                        position: 'absolute',
                        left: xLine - 15,
                        top: 15,
                        transform: [{ rotate: '90deg' }],
                    }}
                >
                    {xLine.toFixed(2)}
                </Text>
                <View
                    style={{
                        position: 'absolute',
                        width: 1,
                        height,
                        backgroundColor: 'black',
                        left: xLine,
                    }}
                />
                <Text
                    style={{
                        position: 'absolute',
                        left: xLine - 30,
                        top: 15,
                        transform: [{ rotate: '90deg' }],
                    }}
                >
                    {xLine.toFixed(2)}
                </Text>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[
                        panStyle,
                        {
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            height: '100%',
                            zIndex: 10,
                        },
                    ]}
                >
                    <View
                        style={{
                            backgroundColor: 'yellow',
                            width: 30,
                            height,
                            borderLeftColor: 'black',
                            borderRightColor: 'black',
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                        }}
                    >
                        {/* {this.renderVerticalRulerTicks()} */}
                    </View>
                </Animated.View>
            </View>
        );
    }
}

const defaultStyles = StyleSheet.create({
    lineText: {
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
        fontWeight: 'bold',
    },
});
