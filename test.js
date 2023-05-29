// Case 1
// Input
// arr = [1, 2, 3, 5]
// n = 5
// output = 4

// Case 2
// Input
// arr = [2, 3, 4, 5, 6, 7, 8]
// n = 8
// Output = 1

function missingVal(arr, n) {
    /*
    let i;
    let temp = [];
    for (i = 0; i <= n; i++) {
        temp[i] = 0;
    }

    for (i = 0; i < n; i++) {
        temp[arr[i] - 1] = 1;
    }

    let ans = 0;
    for (i = 0; i <= n; i++) {
        if (temp[i] == 0)
            ans = i + 1;
    }
    console.log(ans);
    */

    /*
    let total = Math.floor((n + 1) * (n + 2) / 2);
    for (let i = 0; i < n; i++) {
        total -= arr[i];
    }
    console.log(total);
    */

    console.log(Array.from({length: n}, (_,k)=>k+1).filter(x=>!arr.includes(x)));
}

missingVal([1,2,3,5],5)
missingVal([2, 3, 4, 5, 6, 7, 8],8)