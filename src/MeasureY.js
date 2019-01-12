import React, { PureComponent } from 'react';
import { Animated, Dimensions, PanResponder, Text, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

export class MeasureY extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
            yLine: 0,
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
                    dy: this.state.pan.y,
                },
            ]),
            onPanResponderRelease: (e, gesture) => {
                const yLine = height + gesture.dy - 30;
                console.log('y location', yLine);
                this.setState({ yLine });
                Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
            },
        });
    }

    modifyHorizonalAlignment({ tick }) {
        if (tick < 10) {
            return { alignItems: 'flex-start' };
        } else if (tick > width - 10) {
            return { alignItems: 'flex-end' };
        }
    }

    renderHorizontalRulerTicks() {
        const ticks = [0, width * 0.25, width * 0.5, width * 0.75, width];
        return ticks.map((tick) => {
            return (
                <View
                    key={tick}
                    style={[{ alignItems: 'center' }, this.modifyHorizonalAlignment({ tick })]}
                >
                    <View style={{ width: 1, height: 10, backgroundColor: 'black' }} />
                    <Text>{tick}</Text>
                </View>
            );
        });
    }

    render() {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform(),
        };

        return (
            <View style={{ height, width, position: 'absolute' }}>
                <Text
                    style={{
                        position: 'absolute',
                        top: this.state.yLine - 15,
                    }}
                >
                    {this.state.yLine.toFixed(2)}
                </Text>
                <View
                    style={{
                        position: 'absolute',
                        width,
                        height: 1,
                        backgroundColor: 'black',
                        top: this.state.yLine,
                    }}
                />
                <Text
                    style={{
                        position: 'absolute',
                        top: this.state.yLine,
                    }}
                >
                    {this.state.yLine.toFixed(2)}
                </Text>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[
                        panStyle,
                        {
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width,
                            zIndex: 10,
                        },
                    ]}
                >
                    <View
                        style={{
                            backgroundColor: 'black',
                            height: 1,
                        }}
                    />
                    <View
                        style={{
                            backgroundColor: 'yellow',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            height: 28,
                        }}
                    >
                        {this.renderHorizontalRulerTicks()}
                    </View>
                    <View
                        style={{
                            backgroundColor: 'black',
                            height: 1,
                        }}
                    />
                </Animated.View>
            </View>
        );
    }
}
