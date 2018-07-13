/*
MERGE SORT

*** Description

Merge sort employs a divide and conquer strategy - merge two sorted subarrays into one sorted array.

Recursive top-down approach:
Recursively break down array into two subarrays and sort them recursively. Subarrays are broken down until they have only 1 element (implying they are sorted).

Iterative bottom-up approach:
Split array into sublists of size 1, merge adjacent sublists into sorted lists, repeat until no more sublists.

*** Exercises

- Implement recursive merge sort (you might want to write a helper function to handle the merge step)
- Implement iterative merge sort
- Identify time complexity

- Modify function to take comparator function. specify default if not provided (check out native Array.sort comparator function for reference)
- Use your comparator function to verify that your sort is stable by taking input: [{value: 15}, {value: 10, order: 1}, {value: 10, order: 2}]

Optimization:
- Refactor your iterative solution to be a natural merge sort. This means that the initial subarrays are naturally occurring sorted sequences. How does this impact time complexity and adaptivity?
ex:
input array: [ 1 2 4 5 9 ]
subarrays for regular merge sort: [ [1], [2], [4], [5], [9] ]
subarrays for natural merge sort: [ [1,2], [4,5], [9] ]

*/

const mergeSort = (list = []) => {
    const listLength = list.length;

    if (listLength < 2)
        return list;

    const listHalfIndex = listLength / 2;
    const leftHalf = list.slice(0, listHalfIndex);
    const rightHalf = list.slice(listHalfIndex);
    const listA = mergeSort(leftHalf);
    const listB = mergeSort(rightHalf);

    return merge(listA, listB);
};

const merge = (listA = [], listB = []) => {
    let sortedList = [];
    let leftHalfPointer = 0;
    let rightHalfPointer = 0;

    // while sorted list length not equal splitted lists length sum keep looping
    while (sortedList.length < (listA.length + listB.length)) {
        // if listA pointer equal listA length, concat it with listB list
        if (listA.length === leftHalfPointer)
            sortedList = sortedList.concat(listB.slice(rightHalfPointer));
        // if listB pointer equal listB length, concat it with listA list
        else if (listB.length === rightHalfPointer)
            sortedList = sortedList.concat(listA.slice(leftHalfPointer));
        // if listA element equal or less then listB element
        else if (listA[leftHalfPointer] <= listB[rightHalfPointer]) {
            sortedList.push(listA[leftHalfPointer]);
            leftHalfPointer += 1;
        } else {
            sortedList.push(listB[rightHalfPointer]);
            rightHalfPointer += 1;
        }
    }

    return sortedList;
};