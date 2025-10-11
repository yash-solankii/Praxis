// Problems data for Praxis
// 50 comprehensive algorithmic problems with test cases

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: "54.1%",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

Input Format:
- First line: space-separated integers representing the array
- Second line: target integer

Output Format:
- Print the indices as space-separated integers

Example:
Input:
2 7 11 15
9

Output:
0 1`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" }
    ],
    testCases: [
      { input: "2 7 11 15\n9", expected: "0 1" },
      { input: "3 2 4\n6", expected: "1 2" },
      { input: "3 3\n6", expected: "0 1" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5\n8", expected: "2 4" },
      { input: "5 5 11\n10", expected: "0 1" },
      { input: "1 3 4 2\n6", expected: "2 3" },
      { input: "0 4 3 0\n0", expected: "0 3" }
    ]
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    acceptance: "40.1%",
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

Input Format:
- First line: space-separated integers representing the first linked list
- Second line: space-separated integers representing the second linked list

Output Format:
- Print the result linked list as space-separated integers

Example:
Input:
2 4 3
5 6 4

Output:
7 0 8`,
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]" },
      { input: "l1 = [0], l2 = [0]", output: "[0]" },
      { input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]", output: "[8,9,9,9,0,0,0,1]" }
    ],
    testCases: [
      { input: "2 4 3\n5 6 4", expected: "7 0 8" },
      { input: "0\n0", expected: "0" },
      { input: "9 9 9 9 9 9 9\n9 9 9 9", expected: "8 9 9 9 0 0 0 1" }
    ],
    hiddenTestCases: [
      { input: "1 2\n3 4", expected: "4 6" },
      { input: "5\n5", expected: "0 1" },
      { input: "1 8\n0", expected: "1 8" },
      { input: "9 9\n1", expected: "0 0 1" }
    ]
  },
  {
    id: 3,
    title: "3. Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    acceptance: "33.8%",
    description: `Given a string s, find the length of the longest substring without repeating characters.

Input Format:
- Single line: the input string

Output Format:
- Print the length of the longest substring without repeating characters

Example:
Input:
abcabcbb

Output:
3`,
    examples: [
      { input: "s = 'abcabcbb'", output: "3" },
      { input: "s = 'bbbbb'", output: "1" },
      { input: "s = 'pwwkew'", output: "3" }
    ],
    testCases: [
      { input: "abcabcbb", expected: "3" },
      { input: "bbbbb", expected: "1" },
      { input: "pwwkew", expected: "3" }
    ],
    hiddenTestCases: [
      { input: "abcdef", expected: "6" },
      { input: "aab", expected: "2" },
      { input: "", expected: "0" },
      { input: "dvdf", expected: "3" }
    ]
  },
  {
    id: 4,
    title: "4. Median of Two Sorted Arrays",
    difficulty: "Hard",
    acceptance: "38.1%",
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

Input Format:
- First line: space-separated integers representing the first sorted array
- Second line: space-separated integers representing the second sorted array

Output Format:
- Print the median with 5 decimal places

Example:
Input:
1 3
2

Output:
2.00000`,
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000" },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000" }
    ],
    testCases: [
      { input: "1 3\n2", expected: "2.00000" },
      { input: "1 2\n3 4", expected: "2.50000" }
    ],
    hiddenTestCases: [
      { input: "0 0\n0 0", expected: "0.00000" },
      { input: "\n1", expected: "1.00000" },
      { input: "2\n", expected: "2.00000" }
    ]
  },
  {
    id: 5,
    title: "5. Longest Palindromic Substring",
    difficulty: "Medium",
    acceptance: "34.1%",
    description: `Given a string s, return the longest palindromic substring in s.

Input Format:
- Single line: the input string

Output Format:
- Print the longest palindromic substring

Example:
Input:
babad

Output:
bab`,
    examples: [
      { input: "s = 'babad'", output: "'bab'" },
      { input: "s = 'cbbd'", output: "'bb'" }
    ],
    testCases: [
      { input: "babad", expected: "bab" },
      { input: "cbbd", expected: "bb" }
    ],
    hiddenTestCases: [
      { input: "a", expected: "a" },
      { input: "ac", expected: "a" },
      { input: "racecar", expected: "racecar" },
      { input: "abcdef", expected: "a" }
    ]
  },
  {
    id: 6,
    title: "6. Zigzag Conversion",
    difficulty: "Medium",
    acceptance: "48.6%",
    description: `The string 'PAYPALISHIRING' is written in a zigzag pattern on a given number of rows like this: P   A   H   N, A P L S I I G, Y   I   R. And then read line by line: 'PAHNAPLSIIGYIR'

Input Format:
- First line: the input string
- Second line: number of rows

Output Format:
- Print the zigzag converted string

Example:
Input:
PAYPALISHIRING
3

Output:
PAHNAPLSIIGYIR`,
    examples: [
      { input: "s = 'PAYPALISHIRING', numRows = 3", output: "'PAHNAPLSIIGYIR'" },
      { input: "s = 'PAYPALISHIRING', numRows = 4", output: "'PINALSIGYAHRPI'" },
      { input: "s = 'A', numRows = 1", output: "'A'" }
    ],
    testCases: [
      { input: "PAYPALISHIRING\n3", expected: "PAHNAPLSIIGYIR" },
      { input: "PAYPALISHIRING\n4", expected: "PINALSIGYAHRPI" },
      { input: "A\n1", expected: "A" }
    ],
    hiddenTestCases: [
      { input: "AB\n1", expected: "AB" },
      { input: "ABCD\n2", expected: "ACBD" }
    ]
  },
  {
    id: 7,
    title: "7. Reverse Integer",
    difficulty: "Medium",
    acceptance: "28.9%",
    description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

Input Format:
- Single line: the input integer

Output Format:
- Print the reversed integer

Example:
Input:
123

Output:
321`,
    examples: [
      { input: "x = 123", output: "321" },
      { input: "x = -123", output: "-321" },
      { input: "x = 120", output: "21" }
    ],
    testCases: [
      { input: "123", expected: "321" },
      { input: "-123", expected: "-321" },
      { input: "120", expected: "21" }
    ],
    hiddenTestCases: [
      { input: "0", expected: "0" },
      { input: "1534236469", expected: "0" },
      { input: "-2147483648", expected: "0" }
    ]
  },
  {
    id: 8,
    title: "8. String to Integer (atoi)",
    difficulty: "Medium",
    acceptance: "17.6%",
    description: `Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).

Input Format:
- Single line: the input string

Output Format:
- Print the converted integer

Example:
Input:
42

Output:
42`,
    examples: [
      { input: "s = '42'", output: "42" },
      { input: "s = '   -42'", output: "-42" },
      { input: "s = '4193 with words'", output: "4193" }
    ],
    testCases: [
      { input: "42", expected: "42" },
      { input: "   -42", expected: "-42" },
      { input: "4193 with words", expected: "4193" }
    ],
    hiddenTestCases: [
      { input: "words and 987", expected: "0" },
      { input: "-91283472332", expected: "-2147483648" },
      { input: "+", expected: "0" }
    ]
  },
  {
    id: 9,
    title: "9. Palindrome Number",
    difficulty: "Easy",
    acceptance: "56.9%",
    description: `Given an integer x, return true if x is a palindrome integer. An integer is a palindrome when it reads the same backward as forward.

Input Format:
- Single line: the input integer

Output Format:
- Print "true" if palindrome, "false" otherwise

Example:
Input:
121

Output:
true`,
    examples: [
      { input: "x = 121", output: "true" },
      { input: "x = -121", output: "false" },
      { input: "x = 10", output: "false" }
    ],
    testCases: [
      { input: "121", expected: "true" },
      { input: "-121", expected: "false" },
      { input: "10", expected: "false" }
    ],
    hiddenTestCases: [
      { input: "0", expected: "true" },
      { input: "1", expected: "true" },
      { input: "12321", expected: "true" },
      { input: "123", expected: "false" }
    ]
  },
  
    {
      id: 10,
      title: "10. Regular Expression Matching",
      difficulty: "Hard",
      acceptance: "28.3%",
      description: `Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where: '.' Matches any single character. '*' Matches zero or more of the preceding element.

Input Format:
- First line: the input string
- Second line: the pattern

Output Format:
- Print "true" if matches, "false" otherwise

Example:
Input:
aa
a

Output:
false`,
      examples: [
        { input: "s = 'aa', p = 'a'", output: "false" },
        { input: "s = 'aa', p = 'a*'", output: "true" },
        { input: "s = 'ab', p = '.*'", output: "true" }
      ],
      testCases: [
        { input: "aa\na", expected: "false" },
        { input: "aa\na*", expected: "true" },
        { input: "ab\n.*", expected: "true" }
      ],
      hiddenTestCases: [
        { input: "aab\nc*a*b", expected: "true" },
        { input: "mississippi\nmis*is*p*.", expected: "false" }
      ]
    },
    {
      id: 11,
      title: "11. Container With Most Water",
      difficulty: "Medium",
      acceptance: "62.5%",
      description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.

Input Format:
- Single line: space-separated integers representing the height array

Output Format:
- Print the maximum area of water that can be contained

Example:
Input:
1 8 6 2 5 4 8 3 7

Output:
49`,
      examples: [
        { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
        { input: "height = [1,1]", output: "1" }
      ],
      testCases: [
        { input: "1 8 6 2 5 4 8 3 7", expected: "49" },
        { input: "1 1", expected: "1" }
      ],
      hiddenTestCases: [
        { input: "1 2 1", expected: "2" },
        { input: "1 2 4 3", expected: "4" },
        { input: "2 1", expected: "1" }
      ]
    },
    {
      id: 12,
      title: "12. Integer to Roman",
      difficulty: "Medium",
      acceptance: "63.1%",
      description: `Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. Given an integer, convert it to a roman numeral.

Input Format:
- Single line: the integer n (1..3999)

Output Format:
- Print the Roman numeral string for n`,
      examples: [
        { input: "num = 3", output: "'III'" },
        { input: "num = 58", output: "'LVIII'" },
        { input: "num = 1994", output: "'MCMXCIV'" }
      ],
      testCases: [
        { input: "3", expected: "'III'" },
        { input: "4", expected: "'IV'" },
        { input: "9", expected: "'IX'" },
        { input: "58", expected: "'LVIII'" },
        { input: "1994", expected: "'MCMXCIV'" }
      ],
      hiddenTestCases: [
        { input: "1", expected: "'I'" },
        { input: "3999", expected: "'MMMCMXCIX'" }
      ]
    },
    {
      id: 13,
      title: "13. Roman to Integer",
      difficulty: "Easy",
      acceptance: "60.2%",
      description: `Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. Given a roman numeral, convert it to an integer.

Input Format:
- Single line: the Roman numeral string s

Output Format:
- Print the integer value of s`,
      examples: [
        { input: "s = 'III'", output: "3" },
        { input: "s = 'LVIII'", output: "58" },
        { input: "s = 'MCMXCIV'", output: "1994" }
      ],
      testCases: [
        { input: "'III'", expected: "3" },
        { input: "'IV'", expected: "4" },
        { input: "'XL'", expected: "40" },
        { input: "'CM'", expected: "900" },
        { input: "'MCMXCIV'", expected: "1994" }
      ],
      hiddenTestCases: [
        { input: "'I'", expected: "1" },
        { input: "'MMMCMXCIX'", expected: "3999" }
      ]
    },
    {
      id: 14,
      title: "14. Longest Common Prefix",
      difficulty: "Easy",
      acceptance: "42.9%",
      description: `Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.

Input Format:
- Single line: space-separated strings

Output Format:
- Print the longest common prefix as a string (empty if none)`,
      examples: [
        { input: "strs = ['flower','flow','flight']", output: "'fl'" },
        { input: "strs = ['dog','racecar','car']", output: "''" }
      ],
      testCases: [
        { input: "flower flow flight", expected: "fl" },
        { input: "dog racecar car", expected: "" },
        { input: "solo", expected: "solo" }
      ],
      hiddenTestCases: [
        { input: " b", expected: "" },
        { input: " ", expected: "" }
      ]
    },
    {
      id: 15,
      title: "15. 3Sum",
      difficulty: "Medium",
      acceptance: "32.8%",
      description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.

Input Format:
- Single line: space-separated integers representing the array

Output Format:
- Print all unique triplets that sum to 0 as a list of lists`,
      examples: [
        { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
        { input: "nums = [0,1,1]", output: "[]" },
        { input: "nums = [0,0,0]", output: "[[0,0,0]]" }
      ],
      testCases: [
        { input: "-1 0 1 2 -1 -4", expected: "[[-1,-1,2],[-1,0,1]]" },
        { input: "0 1 1", expected: "[]" },
        { input: "0 0 0", expected: "[[0,0,0]]" }
      ],
      hiddenTestCases: [
        { input: "0 0 0 0", expected: "[[0,0,0]]" },
        { input: "-2 0 1 1 2", expected: "[[-2,0,2],[-2,1,1]]" }
      ]
    },
    {
      id: 16,
      title: "16. 3Sum Closest",
      difficulty: "Medium",
      acceptance: "45.8%",
      description: `Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers.

Input Format:
- First line: space-separated integers representing the array
- Second line: target integer

Output Format:
- Print the closest sum of any three numbers`,
      examples: [
        { input: "nums = [-1,2,1,-4], target = 1", output: "2" },
        { input: "nums = [0,0,0], target = 1", output: "0" }
      ],
      testCases: [
        { input: "-1 2 1 -4\n1", expected: "2" },
        { input: "0 0 0\n1", expected: "0" },
        { input: "1 1 1 0\n-100", expected: "2" }
      ],
      hiddenTestCases: [
        { input: "0 2 1 -3\n1", expected: "0" },
        { input: "1 2 5 10 11\n12", expected: "13" }
      ]
    },
    {
      id: 17,
      title: "17. Letter Combinations of a Phone Number",
      difficulty: "Medium",
      acceptance: "58.1%",
      description: `Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

Input Format:
- Single line: digits string (characters 2-9)

Output Format:
- Print the list of all possible letter combinations as JSON array`,
      examples: [
        { input: "digits = '23'", output: "['ad','ae','af','bd','be','bf','cd','ce','cf']" },
        { input: "digits = ''", output: "[]" },
        { input: "digits = '2'", output: "['a','b','c']" }
      ],
      testCases: [
        { input: "23", expected: "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]" },
        { input: "", expected: "[]" },
        { input: "2", expected: "[\"a\",\"b\",\"c\"]" }
      ],
      hiddenTestCases: [
        { input: "7", expected: "[\"p\",\"q\",\"r\",\"s\"]" },
        { input: "9", expected: "[\"w\",\"x\",\"y\",\"z\"]" }
      ]
    },
    {
      id: 18,
      title: "18. 4Sum",
      difficulty: "Medium",
      acceptance: "37.8%",
      description: `Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that: a, b, c, and d are distinct, and nums[a] + nums[b] + nums[c] + nums[d] == target.

Input Format:
- First line: space-separated integers representing the array
- Second line: target integer

Output Format:
- Print all unique quadruplets that sum to target as a list of lists`,
      examples: [
        { input: "nums = [1,0,-1,0,-2,2], target = 0", output: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]" },
        { input: "nums = [2,2,2,2,2], target = 8", output: "[[2,2,2,2]]" }
      ],
      testCases: [
        { input: "1 0 -1 0 -2 2\n0", expected: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]" },
        { input: "2 2 2 2 2\n8", expected: "[[2,2,2,2]]" }
      ],
      hiddenTestCases: [
        { input: "0 0 0 0\n0", expected: "[[0,0,0,0]]" },
        { input: "2 2 2 2\n9", expected: "[]" }
      ]
    },
    {
      id: 19,
      title: "19. Remove Nth Node From End of List",
      difficulty: "Medium",
      acceptance: "40.2%",
      description: `Given the head of a linked list, remove the nth node from the end of the list and return its head.

Input Format:
- First line: space-separated integers representing the linked list
- Second line: integer n

Output Format:
- Print the resulting list after removing the n-th node from the end`,
      examples: [
        { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" },
        { input: "head = [1], n = 1", output: "[]" },
        { input: "head = [1,2], n = 1", output: "[1]" }
      ],
      testCases: [
        { input: "1 2 3 4 5\n2", expected: "[1,2,3,5]" },
        { input: "1\n1", expected: "[]" },
        { input: "1 2\n1", expected: "[1]" }
      ],
      hiddenTestCases: [
        { input: "1 2 3\n3", expected: "[2,3]" },
        { input: "1 2\n2", expected: "[2]" }
      ]
    },
    {
      id: 20,
      title: "20. Valid Parentheses",
      difficulty: "Easy",
      acceptance: "40.2%",
      description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.

Input Format:
- Single line: the string s consisting of '()[]{}'

Output Format:
- Print 'true' if valid, 'false' otherwise`,
      examples: [
        { input: "s = '()'", output: "true" },
        { input: "s = '()[]{}'", output: "true" },
        { input: "s = '(]'", output: "false" }
      ],
      testCases: [
        { input: "()", expected: "true" },
        { input: "()[]{}", expected: "true" },
        { input: "(]", expected: "false" }
      ],
      hiddenTestCases: [
        { input: "([)]", expected: "false" },
        { input: "{[]}", expected: "true" }
      ]
    },
    {
      id: 21,
      title: "21. Merge Two Sorted Lists",
      difficulty: "Easy",
      acceptance: "66.4%",
      description: `You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Input Format:
- Two lines:
- First line: list1 in bracket notation
- Second line: list2 in bracket notation

Output Format:
- Print the merged sorted list in bracket notation`,
      examples: [
        { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
        { input: "list1 = [], list2 = []", output: "[]" },
        { input: "list1 = [], list2 = [0]", output: "[0]" }
      ],
      testCases: [
        { input: "list1 = [1,2,4], list2 = [1,3,4]", expected: "[1,1,2,3,4,4]" },
        { input: "list1 = [], list2 = []", expected: "[]" },
        { input: "list1 = [], list2 = [0]", expected: "[0]" }
      ],
      hiddenTestCases: [
        { input: "list1 = [1], list2 = []", expected: "[1]" },
        { input: "list1 = [2], list2 = [1]", expected: "[1,2]" }
      ]
    },
    {
      id: 22,
      title: "22. Generate Parentheses",
      difficulty: "Medium",
      acceptance: "74.9%",
      description: `Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Input Format:
- Single line: integer n

Output Format:
- Print all combinations of well-formed parentheses as a list of strings`,
      examples: [
        { input: "n = 3", output: "['((()))','(()())','(())()','()(())','()()()']" },
        { input: "n = 1", output: "['()']" }
      ],
      testCases: [
        { input: "3", expected: "['((()))','(()())','(())()','()(())','()()()']" },
        { input: "1", expected: "['()']" }
      ],
      hiddenTestCases: [
        { input: "2", expected: "['(())','()()']" },
        { input: "4", expected: "['(((())))','((()()))','((())())','((()))()','(()(()))','(()()())','(()())()','(())(())','(())()()','()((()))','()(()())','()(())()','()()(())','()()()()']" }
      ]
    },
    {
      id: 23,
      title: "23. Merge k Sorted Lists",
      difficulty: "Hard",
      acceptance: "48.1%",
      description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.

Input Format:
- Single line: array of k lists in bracket notation (e.g., [[1,4,5],[1,3,4],[2,6]])

Output Format:
- Print the merged sorted list in bracket notation`,
      examples: [
        { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
        { input: "lists = []", output: "[]" },
        { input: "lists = [[]]", output: "[]" }
      ],
      testCases: [
        { input: "lists = [[1,4,5],[1,3,4],[2,6]]", expected: "[1,1,2,3,4,4,5,6]" },
        { input: "lists = []", expected: "[]" },
        { input: "lists = [[]]", expected: "[]" }
      ],
      hiddenTestCases: [
        { input: "lists = [[1],[0]]", expected: "[0,1]" },
        { input: "lists = [[2],[],[1]]", expected: "[1,2]" }
      ]
    },
    {
      id: 24,
      title: "24. Swap Nodes in Pairs",
      difficulty: "Medium",
      acceptance: "63.2%",
      description: `Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).

Input Format:
- Single line: linked list in bracket notation

Output Format:
- Print the list after swapping nodes in pairs`,
      examples: [
        { input: "head = [1,2,3,4]", output: "[2,1,4,3]" },
        { input: "head = []", output: "[]" },
        { input: "head = [1]", output: "[1]" }
      ],
      testCases: [
        { input: "head = [1,2,3,4]", expected: "[2,1,4,3]" },
        { input: "head = []", expected: "[]" },
        { input: "head = [1]", expected: "[1]" }
      ],
      hiddenTestCases: [
        { input: "head = [1,2,3]", expected: "[2,1,3]" },
        { input: "head = [1,2,3,4,5]", expected: "[2,1,4,3,5]" }
      ]
    },
    {
      id: 25,
      title: "25. Reverse Nodes in k-Group",
      difficulty: "Hard",
      acceptance: "55.8%",
      description: `Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. k is a positive integer and is less than or equal to the length of the linked list.

Input Format:
- Two lines:
- First line: linked list in bracket notation
- Second line: integer k

Output Format:
- Print the list after reversing nodes in groups of k`,
      examples: [
        { input: "head = [1,2,3,4,5], k = 2", output: "[2,1,4,3,5]" },
        { input: "head = [1,2,3,4,5], k = 3", output: "[3,2,1,4,5]" }
      ],
      testCases: [
        { input: "head = [1,2,3,4,5], k = 2", expected: "[2,1,4,3,5]" },
        { input: "head = [1,2,3,4,5], k = 3", expected: "[3,2,1,4,5]" }
      ],
      hiddenTestCases: [
        { input: "head = [1,2,3,4,5], k = 1", expected: "[1,2,3,4,5]" },
        { input: "head = [1,2,3,4,5,6], k = 2", expected: "[2,1,4,3,6,5]" }
      ]
    },
    {
      id: 26,
      title: "26. Remove Duplicates from Sorted Array",
      difficulty: "Easy",
      acceptance: "55.1%",
      description: `Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.

Input Format:
- Single line: space-separated sorted integers

Output Format:
- Print k and the array state as in examples (underscores for ignored tail)`,
      examples: [
        { input: "nums = [1,1,2]", output: "2, nums = [1,2,_]" },
        { input: "nums = [0,0,1,1,1,2,2,3,3,4]", output: "5, nums = [0,1,2,3,4,_,_,_,_,_]" }
      ],
      testCases: [
        { input: "1 1 2", expected: "2, nums = [1,2,_]" },
        { input: "0 0 1 1 1 2 2 3 3 4", expected: "5, nums = [0,1,2,3,4,_,_,_,_,_]" }
      ],
      hiddenTestCases: [
        { input: "1 1 1", expected: "1, nums = [1,_,_]" },
        { input: "1 2 3", expected: "3, nums = [1,2,3]" }
      ]
    },
    {
      id: 27,
      title: "27. Remove Element",
      difficulty: "Easy",
      acceptance: "55.1%",
      description: `Given an integer array nums and an integer val, remove all occurrences of val in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.

Input Format:
- Two lines:
- First line: array of integers in bracket notation
- Second line: integer val

Output Format:
- Print k and the array state as in examples (underscores for removed spots)`,
      examples: [
        { input: "nums = [3,2,2,3], val = 3", output: "2, nums = [2,2,_,_]" },
        { input: "nums = [0,1,2,2,3,0,4,2], val = 2", output: "5, nums = [0,1,4,0,3,_,_,_]" }
      ],
      testCases: [
        { input: "nums = [3,2,2,3], val = 3", expected: "2, nums = [2,2,_,_]" },
        { input: "nums = [0,1,2,2,3,0,4,2], val = 2", expected: "5, nums = [0,1,4,0,3,_,_,_]" }
      ],
      hiddenTestCases: [
        { input: "nums = [3,3,3], val = 3", expected: "0, nums = [_,_,_]" },
        { input: "nums = [1,2,3], val = 4", expected: "3, nums = [1,2,3]" }
      ]
    },
    {
      id: 28,
      title: "28. Find the Index of the First Occurrence in a String",
      difficulty: "Easy",
      acceptance: "41.4%",
      description: `Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Input Format:
- Two lines:
- First line: haystack string
- Second line: needle string

Output Format:
- Print the index of the first occurrence, or -1`,
      examples: [
        { input: "haystack = 'sadbutsad', needle = 'sad'", output: "0" },
        { input: "haystack = 'leetcode', needle = 'leeto'", output: "-1" }
      ],
      testCases: [
        { input: "haystack = 'sadbutsad', needle = 'sad'", expected: "0" },
        { input: "haystack = 'leetcode', needle = 'leeto'", expected: "-1" }
      ],
      hiddenTestCases: [
        { input: "haystack = 'a', needle = 'a'", expected: "0" },
        { input: "haystack = 'aaaaa', needle = 'bba'", expected: "-1" }
      ]
    },
    {
      id: 29,
      title: "29. Divide Two Integers",
      difficulty: "Medium",
      acceptance: "17.2%",
      description: `Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator. The integer division should truncate toward zero, which means losing its fractional part.

Input Format:
- Two lines:
- First line: dividend integer
- Second line: divisor integer

Output Format:
- Print the quotient after truncating toward zero`,
      examples: [
        { input: "dividend = 10, divisor = 3", output: "3" },
        { input: "dividend = 7, divisor = -3", output: "-2" }
      ],
      testCases: [
        { input: "dividend = 10, divisor = 3", expected: "3" },
        { input: "dividend = 7, divisor = -3", expected: "-2" }
      ],
      hiddenTestCases: [
        { input: "dividend = -2147483648, divisor = -1", expected: "2147483647" },
        { input: "dividend = 1, divisor = 1", expected: "1" }
      ]
    },
    {
      id: 30,
      title: "30. Substring with Concatenation of All Words",
      difficulty: "Hard",
      acceptance: "32.1%",
      description: `You are given a string s and an array of strings words. All the strings of words are of the same length. A concatenated substring in s is a substring that contains all the strings of any permutation of words concatenated.

Input Format:
- Two lines:
- First line: the string s
- Second line: array of words in bracket notation

Output Format:
- Print a list of starting indices of concatenated substrings`,
      examples: [
        { input: "s = 'barfoothefoobarman', words = ['foo','bar']", output: "[0,9]" },
        { input: "s = 'wordgoodgoodgoodbestword', words = ['word','good','best','word']", output: "[]" }
      ],
      testCases: [
        { input: "s = 'barfoothefoobarman', words = ['foo','bar']", expected: "[0,9]" },
        { input: "s = 'wordgoodgoodgoodbestword', words = ['word','good','best','word']", expected: "[]" }
      ],
      hiddenTestCases: [
        { input: "s = 'barfoofoobarthefoobarman', words = ['bar','foo','the']", expected: "[6,9,12]" },
        { input: "s = 'foobarfoobar', words = ['foo','bar']", expected: "[0,3,6]" }
      ]
    },
    {
      id: 31,
      title: "31. Next Permutation",
      difficulty: "Medium",
      acceptance: "39.4%",
      description: `A permutation of an array of integers is an arrangement of its members into a sequence or linear order. The next permutation of an array of integers is the next lexicographically greater permutation of its integer.

Input Format:
- Single line: array of integers in bracket notation

Output Format:
- Print the next permutation as an array in bracket notation`,
      examples: [
        { input: "nums = [1,2,3]", output: "[1,3,2]" },
        { input: "nums = [3,2,1]", output: "[1,2,3]" },
        { input: "nums = [1,1,5]", output: "[1,5,1]" }
      ],
      testCases: [
        { input: "[1,2,3]", expected: "[1,3,2]" },
        { input: "[3,2,1]", expected: "[1,2,3]" },
        { input: "[1,1,5]", expected: "[1,5,1]" }
      ],
      hiddenTestCases: [
        { input: "[1,3,2]", expected: "[2,1,3]" },
        { input: "[1,5,1]", expected: "[5,1,1]" }
      ]
    },
    {
      id: 32,
      title: "32. Longest Valid Parentheses",
      difficulty: "Hard",
      acceptance: "33.2%",
      description: `Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.

Input Format:
- Single line: the string s containing '(' and ')'

Output Format:
- Print the length of the longest valid substring`,
      examples: [
        { input: "s = '(()'", output: "2" },
        { input: "s = ')()())'", output: "4" },
        { input: "s = ''", output: "0" }
      ],
      testCases: [
        { input: "'(()'", expected: "2" },
        { input: "')()())'", expected: "4" },
        { input: "''", expected: "0" }
      ],
      hiddenTestCases: [
        { input: "'()(())'", expected: "6" },
        { input: "'())'", expected: "2" }
      ]
    },
    {
      id: 33,
      title: "33. Search in Rotated Sorted Array",
      difficulty: "Medium",
      acceptance: "40.6%",
      description: `There is an integer array nums sorted in ascending order (with distinct values). Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

Input Format:
- Two lines:
- First line: rotated sorted array in bracket notation
- Second line: target integer

Output Format:
- Print the index of target, or -1`,
      examples: [
        { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
        { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
        { input: "nums = [1], target = 0", output: "-1" }
      ],
      testCases: [
        { input: "nums = [4,5,6,7,0,1,2], target = 0", expected: "4" },
        { input: "nums = [4,5,6,7,0,1,2], target = 3", expected: "-1" },
        { input: "nums = [1], target = 0", expected: "-1" }
      ],
      hiddenTestCases: [
        { input: "nums = [5,1,3], target = 3", expected: "2" },
        { input: "nums = [1,3], target = 2", expected: "-1" }
      ]
    },
    {
      id: 34,
      title: "34. Find First and Last Position of Element in Sorted Array",
      difficulty: "Medium",
      acceptance: "42.1%",
      description: `Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1].

Input Format:
- Two lines:
- First line: sorted array in bracket notation (may contain duplicates)
- Second line: target integer

Output Format:
- Print [start, end] index range, or [-1,-1]`,
      examples: [
        { input: "nums = [5,7,7,8,8,10], target = 8", output: "[3,4]" },
        { input: "nums = [5,7,7,8,8,10], target = 6", output: "[-1,-1]" },
        { input: "nums = [], target = 0", output: "[-1,-1]" }
      ],
      testCases: [
        { input: "nums = [5,7,7,8,8,10], target = 8", expected: "[3,4]" },
        { input: "nums = [5,7,7,8,8,10], target = 6", expected: "[-1,-1]" },
        { input: "nums = [], target = 0", expected: "[-1,-1]" }
      ],
      hiddenTestCases: [
        { input: "nums = [1], target = 1", expected: "[0,0]" },
        { input: "nums = [2,2], target = 3", expected: "[-1,-1]" }
      ]
    },
    {
      id: 35,
      title: "35. Search Insert Position",
      difficulty: "Easy",
      acceptance: "45.1%",
      description: `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

Input Format:
- Two lines:
- First line: sorted array of distinct integers in bracket notation
- Second line: target integer

Output Format:
- Print the index if found, else the insertion index`,
      examples: [
        { input: "nums = [1,3,5,6], target = 5", output: "2" },
        { input: "nums = [1,3,5,6], target = 2", output: "1" },
        { input: "nums = [1,3,5,6], target = 7", output: "4" }
      ],
      testCases: [
        { input: "nums = [1,3,5,6], target = 5", expected: "2" },
        { input: "nums = [1,3,5,6], target = 2", expected: "1" },
        { input: "nums = [1,3,5,6], target = 7", expected: "4" }
      ],
      hiddenTestCases: [
        { input: "nums = [1,3,5,6], target = 0", expected: "0" },
        { input: "nums = [1], target = 0", expected: "0" }
      ]
    },
    {
      id: 36,
      title: "36. Valid Sudoku",
      difficulty: "Medium",
      acceptance: "58.1%",
      description: `Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules: Each row must contain the digits 1-9 without repetition. Each column must contain the digits 1-9 without repetition. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

Input Format:
- Single line: 9x9 board in bracket notation of chars '1'-'9' and '.'

Output Format:
- Print 'true' if the board is valid, 'false' otherwise`,
      examples: [
        { input: "board = [['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]", output: "true" }
      ],
      testCases: [
        { input: "[['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]", expected: "true" },
        { input: "[['8','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]", expected: "false" }
      ],
      hiddenTestCases: [
        { input: "[['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.']]", expected: "true" },
        { input: "[['5','3','.','.','7','.','.','.','.'],['6','.','3','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]", expected: "false" }
      ]
    },
    {
      id: 37,
      title: "37. Sudoku Solver",
      difficulty: "Hard",
      acceptance: "60.1%",
      description: `Write a program to solve a Sudoku puzzle by filling the empty cells. A sudoku solution must satisfy all of the following rules: Each of the digits 1-9 must occur exactly once in each row. Each of the digits 1-9 must occur exactly once in each column. Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.

Input Format:
- Single line: 9x9 board in bracket notation with '.' for empty cells

Output Format:
- Print the solved board in bracket notation (or 'Solved board')`,
      examples: [
        { input: "board = [['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]", output: "Solved board" }
      ],
      testCases: [
        { input: "[['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]", expected: "Solved board" },
        { input: "[['.','.','9','7','4','8','.','.','.'],['7','.','.','.','.','.','.','.','.'],['.','2','.','1','.','9','.','.','.'],['.','.','7','.','.','.','2','4','.'],['.','6','4','.','1','.','5','9','.'],['.','9','8','.','.','.','3','.','.'],['.','.','.','8','.','3','.','2','.'],['.','.','.','.','.','.','.','.','6'],['.','.','.','2','7','5','9','.','.']]", expected: "Solved board" }
      ],
      hiddenTestCases: [
        { input: "[['.','.','.','.','.','7','.','.','9'],['.','4','.','.','8','1','2','.','.'],['.','.','.','9','.','.','.','.','1'],['.','.','5','3','.','.','9','.','.'],['.','.','.','.','.','.','.','.','.'],['.','.','1','.','.','6','8','.','.'],['9','.','.','.','.','3','.','.','.'],['.','.','2','1','2','.','.','7','.'],['1','.','.','.','.','.','.','.','.']]", expected: "Solved board" },
        { input: "[['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.']]", expected: "Solved board" }
      ]
    },
    {
      id: 38,
      title: "38. Count and Say",
      difficulty: "Medium",
      acceptance: "54.8%",
      description: `The count-and-say sequence is a sequence of digit strings defined by the recursive formula: countAndSay(1) = '1', countAndSay(n) is the way you would 'say' the digit string from countAndSay(n-1), which is then converted into a different digit string.

Input Format:
- Single line: integer n (1-indexed)

Output Format:
- Print the n-th term of the count-and-say sequence as a string`,
      examples: [
        { input: "n = 1", output: "'1'" },
        { input: "n = 4", output: "'1211'" }
      ],
      testCases: [
        { input: "1", expected: "'1'" },
        { input: "4", expected: "'1211'" },
        { input: "5", expected: "'111221'" }
      ],
      hiddenTestCases: [
        { input: "6", expected: "'312211'" },
        { input: "2", expected: "'11'" }
      ]
    },
    {
      id: 39,
      title: "39. Combination Sum",
      difficulty: "Medium",
      acceptance: "70.2%",
      description: `Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

Input Format:
- Two lines:
- First line: candidates array in bracket notation (distinct integers)
- Second line: target integer

Output Format:
- Print all unique combinations that sum to target`,
      examples: [
        { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" },
        { input: "candidates = [2,3,5], target = 8", output: "[[2,2,2,2],[2,3,3],[3,5]]" },
        { input: "candidates = [2], target = 1", output: "[]" }
      ],
      testCases: [
        { input: "candidates = [2,3,6,7], target = 7", expected: "[[2,2,3],[7]]" },
        { input: "candidates = [2,3,5], target = 8", expected: "[[2,2,2,2],[2,3,3],[3,5]]" }
      ],
      hiddenTestCases: [
        { input: "candidates = [2], target = 1", expected: "[]" },
        { input: "candidates = [1], target = 2", expected: "[[1,1]]" }
      ]
    },
    {
      id: 40,
      title: "40. Combination Sum II",
      difficulty: "Medium",
      acceptance: "58.1%",
      description: `Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target. Each number in candidates may only be used once in the combination.

Input Format:
- Two lines:
- First line: candidates array in bracket notation (may contain duplicates)
- Second line: target integer

Output Format:
- Print all unique combinations that sum to target using each candidate at most once`,
      examples: [
        { input: "candidates = [10,1,2,7,6,1,5], target = 8", output: "[[1,1,6],[1,2,5],[1,7],[2,6]]" },
        { input: "candidates = [2,5,2,1,2], target = 5", output: "[[1,2,2],[5]]" }
      ],
      testCases: [
        { input: "candidates = [10,1,2,7,6,1,5], target = 8", expected: "[[1,1,6],[1,2,5],[1,7],[2,6]]" },
        { input: "candidates = [2,5,2,1,2], target = 5", expected: "[[1,2,2],[5]]" }
      ],
      hiddenTestCases: [
        { input: "candidates = [1,1,1,1], target = 2", expected: "[[1,1]]" },
        { input: "candidates = [3,1,3,5,1,1], target = 8", expected: "[[1,1,1,5],[1,1,3,3],[3,5]]" }
      ]
    },
    {
      id: 41,
      title: "41. First Missing Positive",
      difficulty: "Hard",
      acceptance: "38.1%",
      description: `Given an unsorted integer array nums, return the smallest missing positive integer. You must implement an algorithm that runs in O(n) time and uses O(1) extra space.

Input Format:
- Single line: unsorted array of integers in bracket notation

Output Format:
- Print the smallest missing positive integer`,
      examples: [
        { input: "nums = [1,2,0]", output: "3" },
        { input: "nums = [3,4,-1,1]", output: "2" },
        { input: "nums = [7,8,9,11,12]", output: "1" }
      ],
      testCases: [
        { input: "[1,2,0]", expected: "3" },
        { input: "[3,4,-1,1]", expected: "2" },
        { input: "[7,8,9,11,12]", expected: "1" }
      ],
      hiddenTestCases: [
        { input: "[1,1]", expected: "2" },
        { input: "[2]", expected: "1" }
      ]
    },
    {
      id: 42,
      title: "42. Trapping Rain Water",
      difficulty: "Hard",
      acceptance: "62.5%",
      description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Input Format:
- Single line: non-negative integer heights array in bracket notation

Output Format:
- Print the total trapped water`,
      examples: [
        { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
        { input: "height = [4,2,0,3,2,5]", output: "9" }
      ],
      testCases: [
        { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6" },
        { input: "[4,2,0,3,2,5]", expected: "9" }
      ],
      hiddenTestCases: [
        { input: "[4,2,3]", expected: "1" },
        { input: "[5,4,1,2]", expected: "1" }
      ]
    },
    {
      id: 43,
      title: "43. Multiply Strings",
      difficulty: "Medium",
      acceptance: "40.1%",
      description: `Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

Input Format:
- Two lines:
- First line: num1 as a non-negative integer string
- Second line: num2 as a non-negative integer string

Output Format:
- Print the product as a string`,
      examples: [
        { input: "num1 = '2', num2 = '3'", output: "'6'" },
        { input: "num1 = '123', num2 = '456'", output: "'56088'" }
      ],
      testCases: [
        { input: "num1 = '2', num2 = '3'", expected: "'6'" },
        { input: "num1 = '123', num2 = '456'", expected: "'56088'" }
      ],
      hiddenTestCases: [
        { input: "num1 = '0', num2 = '52'", expected: "'0'" },
        { input: "num1 = '99', num2 = '99'", expected: "'9801'" }
      ]
    },
    {
      id: 44,
      title: "44. Wildcard Matching",
      difficulty: "Hard",
      acceptance: "28.1%",
      description: `Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where: '?' Matches any single character. '*' Matches any sequence of characters (including the empty sequence).

Input Format:
- Two lines:
- First line: string s
- Second line: pattern p (with '?' and '*')

Output Format:
- Print 'true' if s matches p, 'false' otherwise`,
      examples: [
        { input: "s = 'aa', p = 'a'", output: "false" },
        { input: "s = 'aa', p = '*'", output: "true" },
        { input: "s = 'cb', p = '?a'", output: "false" }
      ],
      testCases: [
        { input: "s = 'aa', p = 'a'", expected: "false" },
        { input: "s = 'aa', p = '*'", expected: "true" },
        { input: "s = 'cb', p = '?a'", expected: "false" }
      ],
      hiddenTestCases: [
        { input: "s = 'adceb', p = '*a*b'", expected: "true" },
        { input: "s = 'acdcb', p = 'a*c?b'", expected: "false" }
      ]
    },
    {
      id: 45,
      title: "45. Jump Game II",
      difficulty: "Medium",
      acceptance: "40.1%",
      description: `You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0]. Each element nums[i] represents the maximum jump length at position i. Return the minimum number of jumps to reach nums[n - 1].

Input Format:
- Single line: array of integers in bracket notation

Output Format:
- Print the minimum number of jumps to reach the last index`,
      examples: [
        { input: "nums = [2,3,1,1,4]", output: "2" },
        { input: "nums = [2,3,0,1,4]", output: "2" }
      ],
      testCases: [
        { input: "[2,3,1,1,4]", expected: "2" },
        { input: "[2,3,0,1,4]", expected: "2" }
      ],
      hiddenTestCases: [
        { input: "[1]", expected: "0" },
        { input: "[1,2]", expected: "1" }
      ]
    },
    {
      id: 46,
      title: "46. Permutations",
      difficulty: "Medium",
      acceptance: "80.1%",
      description: `Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

Input Format:
- Single line: array of distinct integers in bracket notation

Output Format:
- Print all permutations as a list of lists`,
      examples: [
        { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
        { input: "nums = [0,1]", output: "[[0,1],[1,0]]" },
        { input: "nums = [1]", output: "[[1]]" }
      ],
      testCases: [
        { input: "[1,2,3]", expected: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
        { input: "[0,1]", expected: "[[0,1],[1,0]]" }
      ],
      hiddenTestCases: [
        { input: "[1,2]", expected: "[[1,2],[2,1]]" },
        { input: "[1]", expected: "[[1]]" }
      ]
    },
    {
      id: 47,
      title: "47. Permutations II",
      difficulty: "Medium",
      acceptance: "60.1%",
      description: `Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

Input Format:
- Single line: array of integers (may contain duplicates) in bracket notation

Output Format:
- Print all unique permutations as a list of lists`,
      examples: [
        { input: "nums = [1,1,2]", output: "[[1,1,2],[1,2,1],[2,1,1]]" },
        { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" }
      ],
      testCases: [
        { input: "[1,1,2]", expected: "[[1,1,2],[1,2,1],[2,1,1]]" },
        { input: "[1,2,3]", expected: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" }
      ],
      hiddenTestCases: [
        { input: "[1,1]", expected: "[[1,1]]" },
        { input: "[1,2,1]", expected: "[[1,1,2],[1,2,1],[2,1,1]]" }
      ]
    },
    {
      id: 48,
      title: "48. Rotate Image",
      difficulty: "Medium",
      acceptance: "73.1%",
      description: `You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.

Input Format:
- Single line: n x n matrix in bracket notation

Output Format:
- Print the matrix after in-place 90° clockwise rotation`,
      examples: [
        { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" },
        { input: "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]", output: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]" }
      ],
      testCases: [
        { input: "[[1,2,3],[4,5,6],[7,8,9]]", expected: "[[7,4,1],[8,5,2],[9,6,3]]" },
        { input: "[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]", expected: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]" }
      ],
      hiddenTestCases: [
        { input: "[[1]]", expected: "[[1]]" },
        { input: "[[1,2],[3,4]]", expected: "[[3,1],[4,2]]" }
      ]
    },
    {
      id: 49,
      title: "49. Group Anagrams",
      difficulty: "Medium",
      acceptance: "75.1%",
      description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Input Format:
- Single line: array of strings in bracket notation

Output Format:
- Print the grouped anagrams as a list of lists`,
      examples: [
        { input: "strs = ['eat','tea','tan','ate','nat','bat']", output: "[['bat'],['nat','tan'],['ate','eat','tea']]" },
        { input: "strs = ['']", output: "[['']]" },
        { input: "strs = ['a']", output: "[['a']]" }
      ],
      testCases: [
        { input: "['eat','tea','tan','ate','nat','bat']", expected: "[['bat'],['nat','tan'],['ate','eat','tea']]" },
        { input: "['']", expected: "[['']]" },
        { input: "['a']", expected: "[['a']]" }
      ],
      hiddenTestCases: [
        { input: "['ab','ba','abc']", expected: "[['ab','ba'],['abc']]" },
        { input: "['','']", expected: "[['','']]" }
      ]
    },
    {
      id: 50,
      title: "50. Pow(x, n)",
      difficulty: "Medium",
      acceptance: "33.1%",
      description: `Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).

Input Format:
- Two lines:
- First line: floating-point x
- Second line: integer n

Output Format:
- Print x^n with 5 decimal places`,
      examples: [
        { input: "x = 2.00000, n = 10", output: "1024.00000" },
        { input: "x = 2.10000, n = 3", output: "9.26100" },
        { input: "x = 2.00000, n = -2", output: "0.25000" }
      ],
      testCases: [
        { input: "2.00000\n10", expected: "1024.00000" },
        { input: "2.10000\n3", expected: "9.26100" },
        { input: "2.00000\n-2", expected: "0.25000" }
      ],
      hiddenTestCases: [
        { input: "1.00000\n2147483647", expected: "1.00000" },
        { input: "2.00000\n0", expected: "1.00000" }
      ]
    }
];

// Remove numeric ID prefixes like "3. " from all problem titles at runtime
for (const problem of problems) {
  if (typeof problem.title === 'string') {
    problem.title = problem.title.replace(/^\s*\d+\.\s*/, '');
  }
}

module.exports = problems;