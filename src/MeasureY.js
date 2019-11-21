import React, { PureComponent } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

export class MeasureY extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
            opacity: new Animated.Value(1),
            yLine: null,
        };

        this._val = { x: 0, y: 0 };

        this.state.pan.addListener((value) => {
            return (this._val = value);
        });

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: ({ nativeEvent }, { numberActiveTouches }) => {
                if (nativeEvent.pageX > width * 0.95 || numberActiveTouches > 1) {
                    this.props.swapLines();
                }
                return true;
            },
            onPanResponderMove: Animated.event([
                null,
                {
                    dy: this.state.pan.y,
                },
            ]),
            onPanResponderRelease: (e, { dy }) => {
                const yLine = height + dy - 30;
                console.log('y location', yLine);

                this.setState({ yLine, opacity: new Animated.Value(1) }, () => {
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
            return { alignItems: 'flex-start' };
        }
        if (mark === width) {
            return { alignItems: 'flex-end' };
        }
        return { alignItems: 'center' };
    }

    renderHatchMarks() {
        const marks = [0, width * 0.25, width * 0.5, width * 0.75, width];
        return marks.map((mark) => {
            return (
                <View key={mark} style={[{ width: 50 }, this.setAlignment({ mark })]}>
                    <View style={{ width: 1, height: 10, backgroundColor: 'black' }} />
                    <Text style={{ fontSize: 11 }}>{mark}</Text>
                </View>
            );
        });
    }

    render() {
        const { yLine, pan, opacity } = this.state;

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
                    {yLine === null ? '' : yLine.toFixed(2)}
                </Animated.Text>
                {/* <Text
          style={[
            defaultStyles.lineText,
            {
              top: yLine - 15
            }
          ]}
        >
          {yLine.toFixed(2)}
        </Text> */}
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: 1,
                        backgroundColor: yLine === null ? 'transparent' : 'black',
                        top: yLine,
                    }}
                />
                {/* <Text
          style={[
            defaultStyles.lineText,
            {
              top: yLine
            }
          ]}
        >
          {yLine.toFixed(2)}
        </Text> */}
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[
                        panStyle,
                        {
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: '100%',
                        },
                    ]}
                >
                    <View
                        style={{
                            backgroundColor: 'rgba(254,229,95,0.9)',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            height: 30,
                            borderTopColor: 'black',
                            borderBottomColor: 'black',
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                        }}
                    >
                        {this.renderHatchMarks()}
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
