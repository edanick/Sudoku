
//#region custom functions

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function arrayItemCount(arr, item) {


    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            count++;
        }
    }

    return count;
}

function arraysEqual(arr1, arr2) {

    if (arr1.length != arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            return false;
        }
    }

    return true;
}

function matrixIncludesArray(matrix, array) {

    for (let i = 0; i < matrix.length; i++) {
        if (arraysEqual(matrix[i], array)) {
            return true;
        }
    }

    return false;
}

function generateRandomPositions(positionsCount) {
    let randomPoses = [];

    while (randomPoses.length != positionsCount) {

        let randomPos = [random(0, 8), random(0, 8)];

        if (!matrixIncludesArray(randomPoses, randomPos)) {
            randomPoses.push(randomPos);
        }

    }

    return randomPoses;
}

//#endregion

function isSudokuBoardValid(board) {


    let valid = true;

    let invalidPositions = [];

    let groupFlags = [];


    if (board.length == 0) {
        valid = false;
    }

    for (let gy = 0; gy < (board.length / 3); gy++) {


        groupFlags.push([]);

        for (let gx = 0; gx < (board[gy].length / 3); gx++) {


            let groupCompleted = true;
            let groupValid = true;

            let group = [];

            for (let iy = 0; iy < (board.length / 3); iy++) {

                for (let ix = 0; ix < (board[gy].length / 3); ix++) {

                    let y = gy * 3 + iy;
                    let x = gx * 3 + ix;

                    group.push(board[y][x]);

                }
            }

            for (let iy = 0; iy < (board.length / 3); iy++) {

                for (let ix = 0; ix < (board[gy].length / 3); ix++) {

                    let y = gy * 3 + iy;
                    let x = gx * 3 + ix;

                    let tile = board[y][x];

                    if (tile == 0) {
                        groupCompleted = false;
                    } else {
                        if (arrayItemCount(group, tile) > 1) {
                           invalidPositions.push([y, x]);
                        }
                    }

                    for (let y2 = 0; y2 < board.length; y2++) {
                        for (let x2 = 0; x2 < board[y2].length; x2++) {
                            let ptile = board[y2][x2];


                            if (!(y == y2 && x == x2)) {

                                if ((tile == ptile && (x == x2 || y == y2)) || !(tile > 0 && tile < 10)) {

                                    valid = false;
                                }

                                if (tile == ptile && (x == x2 || y == y2)) {
                                    groupValid = false;
                                    let pos = [y, x];
                                    if (!matrixIncludesArray(invalidPositions, pos)) {
                                        invalidPositions.push(pos);
                                    }
                                }

                            }


                        }

                    }

                }

            }

            groupFlags[gy].push({ groupCompleted: groupCompleted, groupValid: groupValid });



        }

    }

    return { valid: valid, invalidPositions: invalidPositions, groupFlags: groupFlags };
}

function manipulateSudokuBoard(board) {

    let add = random(1, 8);

    for (let y = 0; y < board.length; y++) {

        for (let x = 0; x < board[y].length; x++) {

            board[y][x] += add;
            if (board[y][x] > 9) {
                board[y][x] -= 9;
            }
        }

    }

}


function generateNewBoard(tilesCount, size) {


    let randomTilesPoses = generateRandomPositions(tilesCount);

    let original = [

        [4, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, 9, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 9, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 1, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 5, 9]

    ];


    manipulateSudokuBoard(original);


    let newBoard = [];


    for (let r = 0; r < size; r++) {
        newBoard.push([]);

        for (let c = 0; c < size; c++) {

            newBoard[r].push(0);
        }
    }




    for (let i = 0; i < randomTilesPoses.length; i++) {

        let pos = randomTilesPoses[i];

        newBoard[pos[0]][pos[1]] = original[pos[0]][pos[1]];

    }


    return newBoard;



}

