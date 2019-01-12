// import React, { PureComponent } from "react";
// import { Animated, Dimensions, PanResponder, Text, View } from "react-native";

// const { width, height } = Dimensions.get("screen");

// export class MeasureX extends PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       pan: new Animated.ValueXY(),
//       xLine: 0
//     };

//     this._val = { x: 0, y: 0 };

//     this.state.pan.addListener(value => (this._val = value));

//     this.panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: Animated.event([
//         null,
//         {
//           dx: this.state.pan.x
//         }
//       ]),
//       onPanResponderRelease: (e, gesture) => {
//         const xLine = height + gesture.dx - 30;
//         console.log("x location", xLine);
//         this.setState({ xLine });
//         Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
//       }
//     });
//   }

//   modifyVerticalAlignment({ tick }) {
//     if (tick < 10) {
//       return { alignItems: "flex-end" };
//     } else if (tick > height - 10) {
//       return { alignItems: "flex-start" };
//     }
//   }

//   renderVerticalRulerTicks() {
//     const ticks = [0, height * 0.25, height * 0.5, height * 0.75, height];
//     return ticks.map(tick => {
//       return (
//         <View
//           key={tick}
//           //   style={[
//           //     { alignItems: "center" },
//           //     this.modifyVerticalAlignment({ tick })
//           //   ]}
//         >
//           <View style={{ width: 10, height: 1, backgroundColor: "black" }} />
//           <Text style={{ fontSize: 10 }}>{tick}</Text>
//         </View>
//       );
//     });
//   }

//   render() {
//     const panStyle = {
//       transform: this.state.pan.getTranslateTransform()
//     };

//     return (
//       <View style={{ height, width, position: "absolute" }}>
//         <Animated.View
//           {...this.panResponder.panHandlers}
//           style={[
//             panStyle,
//             {
//               position: "absolute",
//               bottom: 0,
//               right: 0,
//               backgroundColor: "yellow",
//               height,
//               zIndex: 10
//             }
//           ]}
//         >
//           <View
//             style={{
//               backgroundColor: "black",
//               width: 1,
//               height
//             }}
//           />
//           <View
//             style={{
//               justifyContent: "space-between",
//               height,
//               width: 28
//             }}
//           >
//             {this.renderVerticalRulerTicks()}
//           </View>
//           <View
//             style={{
//               backgroundColor: "black",
//               width: 1,
//               height
//             }}
//           />
//         </Animated.View>
//       </View>
//     );
//   }
// }
