###

Cube representation: array that stores 12 corner and 8 edge positions

Placement of the facelets demonstrated below:
             +------------+
             | U1  U2  U3 |
             |            |
             | U4  U5  U6 |
             |            |
             | U7  U8  U9 |
+------------+------------+------------+------------+
| L1  L2  L3 | F1  F2  F3 | R1  R2  F3 | B1  B2  B3 |
|            |            |            |            |
| L4  L5  L6 | F4  F5  F6 | R4  R5  R6 | B4  B5  B6 |
|            |            |            |            |
| L7  L8  L9 | F7  F8  F9 | R7  R8  R9 | B7  B8  B9 |
+------------+------------+------------+------------+
             | D1  D2  D3 |
             |            |
             | D4  D5  D6 |
             |            |
             | D7  D8  D9 |
             +------------+
###

# Corners
[URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB] = [0..7]

# Edges
[UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR] = [0..11]

# Initialize array

[cornerFacelet, edgeFacelet] = do ->
  U = (x) -> x - 1
  R = (x) -> U(9) + x
  F = (x) -> R(9) + x
  D = (x) -> F(9) + x
  L = (x) -> D(9) + x
  B = (x) -> L(9) + x
  [
    # Corners
    [
      [U(9), R(1), F(3)], [U(7), F(1), L(3)],
      [U(1), L(1), B(3)], [U(3), B(1), R(3)],
      [D(3), F(9), R(7)], [D(1), L(9), F(7)],
      [D(7), B(9), L(7)], [D(9), R(9), B(7)],
    ],
    # Edges
    [
      [U(6), R(2)], [U(8), F(2)], [U(4), L(2)], [U(2), B(2)],
      [D(6), R(8)], [D(2), F(8)], [D(4), L(8)], [D(8), B(8)],
      [F(6), R(4)], [F(4), L(6)], [B(6), L(4)], [B(4), R(6)],
    ],
  ]

# Stores facelet color values in array

cornerColor = [
  ['U', 'R', 'F'], ['U', 'F', 'L'], ['U', 'L', 'B'], ['U', 'B', 'R'],
  ['D', 'F', 'R'], ['D', 'L', 'F'], ['D', 'B', 'L'], ['D', 'R', 'B'],
]

edgeColor = [
  ['U', 'R'], ['U', 'F'], ['U', 'L'], ['U', 'B'], ['D', 'R'], ['D', 'F'],
  ['D', 'L'], ['D', 'B'], ['F', 'R'], ['F', 'L'], ['B', 'L'], ['B', 'R'],
]
