import React, { PureComponent } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

export class MeasureX extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
            opacity: new Animated.Value(1),
            xLine: null,
        };

        this._val = { x: 0, y: 0 };

        this.state.pan.addListener((value) => {
            return (this._val = value);
        });

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: ({ nativeEvent }, { numberActiveTouches }) => {
                if (nativeEvent.pageY > height * 0.95 || numberActiveTouches > 1) {
                    this.props.swapLines();
                }
                return true;
            },
            onPanResponderMove: Animated.event([
                null,
                {
                    dx: this.state.pan.x,
                },
            ]),
            onPanResponderRelease: (e, { dx }) => {
                const xLine = width + dx - 30;
                console.log('x location', xLine);
                this.setState({ xLine, opacity: new Animated.Value(1) }, () => {
                    Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
                    Animated.timing(this.state.opacity, {
                        toValue: 0,
                        duration: 1500,
                    }).start();
                });
            },
        });
    }

    setAlignment({ mark }) {
        if (mark === 0) {
            return 2;
        } else if (mark === height) {
            return -12;
        }
        return 2;
    }

    renderHatchMarks() {
        const marks = [0, height * 0.25, height * 0.5, height * 0.75, height];
        return marks.map((mark, idx) => {
            return (
                <View key={mark}>
                    <View style={{ width: 10, height: 1, backgroundColor: 'black' }} />
                    <Text
                        style={{
                            fontSize: 11,
                            position: 'absolute',
                            top: this.setAlignment({ mark }),
                            left: 1,
                        }}
                    >
                        {mark}
                    </Text>
                </View>
            );
        });
    }

    render() {
        const { xLine, pan, opacity } = this.state;

        const panStyle = {
            transform: pan.getTranslateTransform(),
        };

        return (
            <View
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Animated.Text
                    style={{
                        opacity,
                        position: 'absolute',
                        fontSize: 80,
                    }}
                    testID="linePosition"
                >
                    {xLine === null ? '' : xLine.toFixed(2)}
                </Animated.Text>
                {/* <Text
          style={{
            position: "absolute",
            left: xLine - 55 + (xLine < 100 ? 10 : 0),
            top: height / 2,
            fontWeight: "bold"
          }}
        >
          {xLine.toFixed(2)}
        </Text> */}
                <View
                    style={{
                        position: 'absolute',
                        width: 1,
                        height,
                        backgroundColor: xLine === null ? 'transparent' : 'black',
                        left: xLine,
                    }}
                />
                {/* <Text
          style={{
            position: "absolute",
            left: xLine + 5,
            top: height / 2,
            fontWeight: "bold",
            transform: [{ rotate: "90deg" }]
          }}
        >
          {xLine.toFixed(2)}
        </Text> */}
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[
                        panStyle,
                        {
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            height: '100%',
                        },
                    ]}
                >
                    <View
                        style={{
                            backgroundColor: 'rgba(254,229,95,0.9)',
                            width: 30,
                            height,
                            borderLeftColor: 'black',
                            borderRightColor: 'black',
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            justifyContent: 'space-between',
                        }}
                    >
                        {this.renderHatchMarks()}
                    </View>
                </Animated.View>
            </View>
        );
    }
}
