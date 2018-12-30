import React, { PureComponent } from "react";
import { Dimensions, Text, View, PanResponder, Animated } from "react-native";

const { width, height } = Dimensions.get("screen");

export class RNRuler extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      pan2: new Animated.ValueXY()
    };

    this._val = { x: 0, y: 0 };
    this._val2 = { x: 0, y: 0 };

    this.state.pan.addListener(value => (this._val = value));
    this.state.pan2.addListener(value => (this._val = value));

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
        console.log("moveY", gesture.moveY);
        Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
      }
    });

    this.panResponder2 = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan2.x
          // dy: this.state.pan2.y
        }
      ]),
      onPanResponderRelease: (e, gesture) => {
        console.log("moveX", gesture.moveX);
        Animated.spring(this.state.pan2, { toValue: { x: 0, y: 0 } }).start();
      }
    });
  }

  modifyHorizonalAlignment({ tick }) {
    if (tick < 10) {
      return { alignItems: "flex-start" };
    } else if (tick > width - 10) {
      return { alignItems: "flex-end" };
    }
  }

  modifyVerticalAlignment({ tick }) {
    if (tick < 10) {
      return { alignItems: "flex-end" };
    } else if (tick > height - 10) {
      return { alignItems: "flex-start" };
    }
  }

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

  renderVerticalRulerTicks() {
    const ticks = [0, height * 0.25, height * 0.5, height * 0.75, height];
    return ticks.map(tick => {
      return (
        <View
          key={tick}
          style={[
            { alignItems: "center", transform: [{ rotate: "-90deg" }] },
            this.modifyVerticalAlignment({ tick })
          ]}
        >
          <View style={{ width: 1, height: 10, backgroundColor: "black" }} />
          <Text>{tick}</Text>
        </View>
      );
    });
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };

    const panStyle2 = {
      transform: this.state.pan2.getTranslateTransform()
    };

    return (
      //   <View>
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          panStyle,
          {
            position: "absolute",
            bottom: 0,
            right: 0,
            width,
            height: 30,
            backgroundColor: "yellow",
            justifyContent: "space-between",
            flexDirection: "row"
          }
        ]}
      >
        {this.renderHorizontalRulerTicks()}
      </Animated.View>
      //     <Animated.View
      //       {...this.panResponder2.panHandlers}
      //       style={[
      //         panStyle2,
      //         {
      //           position: "absolute",
      //           bottom: 0,
      //           right: 0,
      //           width: 30,
      //           height,
      //           backgroundColor: "yellow",
      //           justifyContent: "space-between"
      //         }
      //       ]}
      //     >
      //       {this.renderVerticalRulerTicks()}
      //     </Animated.View>
      //   </View>
    );
  }
}
