import React, { PureComponent } from "react";
import { Dimensions, Text, View, PanResponder, Animated } from "react-native";
// import _ from "lodash";

const { width, height } = Dimensions.get("screen");

export class RNRuler extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      //   pan2: new Animated.ValueXY(),
      yLine: 0
    };

    this._val = { x: 0, y: 0 };
    // this._val2 = { x: 0, y: 0 };

    this.state.pan.addListener(value => (this._val = value));
    // this.state.pan2.addListener(value => (this._val = value));

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null,
        {
          // dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ]),
      onPanResponderRelease: (e, gesture) => {
        const yLine = height + gesture.dy - 30;
        console.log("y location", yLine);
        this.setState({ yLine });
        Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
      }
    });

    // this.panResponder2 = PanResponder.create({
    //   onStartShouldSetPanResponder: (e, gesture) => true,
    //   onPanResponderMove: Animated.event([
    //     null,
    //     {
    //       dx: this.state.pan2.x
    //       // dy: this.state.pan2.y
    //     }
    //   ]),
    //   onPanResponderRelease: (e, gesture) => {
    //     console.log("moveX", gesture.moveX);
    //     Animated.spring(this.state.pan2, { toValue: { x: 0, y: 0 } }).start();
    //   }
    // });
  }

  modifyHorizonalAlignment({ tick }) {
    if (tick < 10) {
      return { alignItems: "flex-start" };
    } else if (tick > width - 10) {
      return { alignItems: "flex-end" };
    }
  }

  //   modifyVerticalAlignment({ tick }) {
  //     if (tick < 10) {
  //       return { alignItems: "flex-end" };
  //     } else if (tick > height - 10) {
  //       return { alignItems: "flex-start" };
  //     }
  //   }

  renderHorizontalRulerTicks() {
    const ticks = [0, width * 0.25, width * 0.5, width * 0.75, width];
    return ticks.map(tick => {
      return (
        <View
          key={tick}
          style={[
            { alignItems: "center" },
            this.modifyHorizonalAlignment({ tick })
          ]}
        >
          <View style={{ width: 1, height: 10, backgroundColor: "black" }} />
          <Text>{tick}</Text>
        </View>
      );
    });
  }

  //   renderVerticalRulerTicks() {
  //     const ticks = [0, height * 0.25, height * 0.5, height * 0.75, height];
  //     return ticks.map(tick => {
  //       return (
  //         <View
  //           key={tick}
  //           style={[
  //             { alignItems: "center", transform: [{ rotate: "-90deg" }] },
  //             this.modifyVerticalAlignment({ tick })
  //           ]}
  //         >
  //           <View style={{ width: 1, height: 10, backgroundColor: "black" }} />
  //           <Text>{tick}</Text>
  //         </View>
  //       );
  //     });
  //   }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };

    // const panStyle2 = {
    //   transform: this.state.pan2.getTranslateTransform()
    // };

    return (
      <View style={{ height, width, position: "absolute" }}>
        <Text
          style={{
            position: "absolute",
            top: this.state.yLine - 15
          }}
        >
          {this.state.yLine.toFixed(2)}
        </Text>
        <View
          style={{
            position: "absolute",
            width,
            height: 1,
            backgroundColor: "black",
            top: this.state.yLine
          }}
        />
        <Text
          style={{
            position: "absolute",
            top: this.state.yLine
          }}
        >
          {this.state.yLine.toFixed(2)}
        </Text>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            panStyle,
            {
              position: "absolute",
              bottom: 0,
              right: 0,
              width,
              zIndex: 10
            }
          ]}
        >
          <View
            style={{
              backgroundColor: "black",
              height: 1
            }}
          />
          <View
            style={{
              backgroundColor: "yellow",
              justifyContent: "space-between",
              flexDirection: "row",
              height: 28
            }}
          >
            {this.renderHorizontalRulerTicks()}
          </View>
          <View
            style={{
              backgroundColor: "black",
              height: 1
            }}
          />
        </Animated.View>
        {/* <Animated.View
          {...this.panResponder2.panHandlers}
          style={[
            panStyle2,
            {
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 30,
              height,
              backgroundColor: "yellow",
              justifyContent: "space-between"
            }
          ]}
        >
          {this.renderVerticalRulerTicks()}
        </Animated.View> */}
      </View>
    );
  }
}
