/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Box from './Box';
import Border from './Border';
import { Dimensions, StyleSheet, StatusBar } from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";

const { width, height } = Dimensions.get("screen");
const boxSize = Math.trunc(Math.max(width, height) * 0.075);
const initialBox1 = Matter.Bodies.rectangle(boxSize, 0, boxSize, boxSize,
  {
    frictionAir: 0.07
  });

const initialBox2 = Matter.Bodies.rectangle(boxSize + 0.9 * width / 4, 0, boxSize, boxSize,
  {
    frictionAir: 0.07
  });
const initialBox3 = Matter.Bodies.rectangle(boxSize + 1.8 * width / 4, 0, boxSize, boxSize,
  {
    frictionAir: 0.07
  });
const initialBox4 = Matter.Bodies.rectangle(boxSize + 2.7 * width / 4, 0, boxSize, boxSize,
  {
    frictionAir: 0.07
  });
const floor = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });
const top = Matter.Bodies.rectangle(width / 2, 0 + boxSize / 2, width, boxSize, { isStatic: true });

const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;
Matter.World.add(world, [initialBox1]);
Matter.World.add(world, [initialBox2]);
Matter.World.add(world, [initialBox3]);
Matter.World.add(world, [initialBox4]);

let boxIds = 0;
const CreateBox = (entities, { touches, screen }) => {
  let world = entities["physics"].world;
  let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);

  entities[++boxIds] = {
    body: initialBox1,
    size: [boxSize, boxSize],
    color: boxIds % 2 == 0 ? "pink" : "#B8E986",
    renderer: Box
  };

  entities[++boxIds] = {
    body: initialBox2,
    size: [boxSize, boxSize],
    color: boxIds % 2 == 0 ? "pink" : "#B8E986",
    renderer: Box
  };

  entities[++boxIds] = {
    body: initialBox3,
    size: [boxSize, boxSize],
    color: boxIds % 2 == 0 ? "pink" : "#B8E986",
    renderer: Box
  };

  entities[++boxIds] = {
    body: initialBox4,
    size: [boxSize, boxSize],
    color: boxIds % 2 == 0 ? "pink" : "#B8E986",
    renderer: Box
  };

  return entities;
};

const Physics = (entities, { time }) => {
  let engine = entities["physics"].engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

export default class App extends Component {
  render() {
    return (
      <GameEngine style={styles.container}
        systems={[Physics, CreateBox]}
        entities={{
          physics: {
            engine: engine,
            world: world
          },
          floor: {
            body: floor,
            size: [width, boxSize],
            color: "#EAEDED",
            renderer: Border
          },
          top: {
            body: top,
            size: [width, boxSize],
            color: "#EAEDED",
            renderer: Border
          }
        }} >
        <StatusBar hidden={true} />
      </ GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
