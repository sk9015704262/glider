// Point is assumed to be an object with { x: number, y: number }

// Solves a system of linear equations Ax = B using Gaussian elimination.
// A is an n x n matrix, B is an n x 1 vector.
// Returns x.
function solveLinearSystem(A, B) {
  const n = A.length;
  for (let i = 0; i < n; i++) {
    A[i].push(B[i]);
  }

  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) {
        maxRow = k;
      }
    }

    [A[i], A[maxRow]] = [A[maxRow], A[i]];

    if (Math.abs(A[i][i]) < 1e-8) {
      return null;
    }

    for (let k = i + 1; k < n; k++) {
      const factor = A[k][i] / A[i][i];
      for (let j = i; j < n + 1; j++) {
        A[k][j] -= factor * A[i][j];
      }
    }
  }

  const x = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    x[i] = A[i][n] / A[i][i];
    for (let k = i - 1; k >= 0; k--) {
      A[k][n] -= A[k][i] * x[i];
    }
  }
  return x;
}

// srcPoints and dstPoints are arrays of 4 points {x, y}
// in counter-clockwise order: top-left, top-right, bottom-right, bottom-left
export function getPerspectiveTransformMatrix(srcPoints, dstPoints) {
// function getPerspectiveTransformMatrix(srcPoints, dstPoints) {
  if (srcPoints.length !== 4 || dstPoints.length !== 4) {
    throw new Error("Both source and destination must have 4 points.");
  }

  const P = [];
  for (let i = 0; i < 4; i++) {
    const sx = srcPoints[i].x;
    const sy = srcPoints[i].y;
    const dx = dstPoints[i].x;
    const dy = dstPoints[i].y;
    P.push([sx, sy, 1, 0, 0, 0, -sx * dx, -sy * dx]);
    P.push([0, 0, 0, sx, sy, 1, -sx * dy, -sy * dy]);
  }

  const B = [];
  for (let i = 0; i < 4; i++) {
    B.push(dstPoints[i].x);
    B.push(dstPoints[i].y);
  }

  const h = solveLinearSystem(P, B);

  if (!h) {
    console.warn("Perspective matrix calculation failed, returning identity.");
    return "matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1)";
  }

  const H = [h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], 1];

  return `matrix3d(${H[0]}, ${H[3]}, 0, ${H[6]}, ${H[1]}, ${H[4]}, 0, ${H[7]}, 0, 0, 1, 0, ${H[2]}, ${H[5]}, 0, ${H[8]})`;
}

