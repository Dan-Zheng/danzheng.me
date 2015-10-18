/* Rubik's Cube model

Cube representation: 6x3x3 array of chars [faceColor][row][column]

*/

var cube = [
  // White face, Up
  [
    [W,W,W],
    [W,W,W],
    [W,W,W],
  ],
  // Red face, Front
  [
    [R,R,R],
    [R,R,R],
    [R,R,R],
  ],
  // Blue face, Right
  [
    [B,B,B],
    [B,B,B],
    [B,B,B],
  ],
  // Orange face, Back
  [
    [O,O,O],
    [O,O,O],
    [O,O,O],
  ],
  // Green face, Left
  [
    [G,G,G],
    [G,G,G],
    [G,G,G],
  ],
  // Yellow face, Down
  [
    [Y,Y,Y],
    [Y,Y,Y],
    [Y,Y,Y],
  ],
];

function
