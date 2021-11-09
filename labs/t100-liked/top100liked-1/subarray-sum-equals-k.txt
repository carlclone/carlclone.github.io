//Example 1:
//
//Input: nums = [1,1,1], k = 2
//Output: 2
//Example 2:
//
//Input: nums = [1,2,3], k = 3
//Output: 2

// n^3解法

// n^2解法


//https://leetcode.com/problems/subarray-sum-equals-k/discuss/190674/Python-O(n)-Based-on-%22running_sum%22-concept-of-%22Cracking-the-coding-interview%22-book
//看了解答才做出来的 , 还是得写一遍 n^2的解法 , 不然 interview 的时候想不起来就麻烦
//这个是真的没想出来这种解法 , 画图可能形象一点 , cracking the coding interview 里有讲这道
func subarraySum(nums []int, k int) int {

	m:=make(map[int]int) //存储 sum freq
	runningSum:=0

	res:=0
	for _,v:=range nums {
		runningSum+=v
		if runningSum==k {        //可以使用 m[0]=1 移除这个特殊判断
			res+=1
		}
		preSum:=runningSum-k
		freq,ok:=m[preSum]
		if ok {
			res+=freq
		}
		m[runningSum]+=1
	}
	return res
}