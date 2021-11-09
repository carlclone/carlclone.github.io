/*

dp 0 0 = 2
dp 0 1 = 2
dp 1 0 = (-10,-10,-5) -> -10
dp 1 1 =  ->-5

dp 2 0 = (-2X-10 , -2X-5,-2) = -2
dp 2 1 = -> 20

// -4
dp 3 0 = (-2X-4,20X-4,-4) -> -80
dp 3 1 = 8

//3
dp 4 0 = (-80X3=-240 , 8X3=24,3)
dp 4 1 = 24


dp[i][0] = min(dp[i-1][0]*nums[i],dp[i-1][1]*nums[i],nums[i])
dp[i][1] = max(dp[i-1]*nums[i],dp[i-1][1]*nums[i],nums[i])
 */

//DP 不容易想到, 但是想到之后,编码简单,不容易出 bug
// 从两种角度想 DP , 一种是状态转移 , 状态机 , 从已有的状态推出其他的状态  , 数组题目适合用这种思路
// 递归+记忆化搜索 ,  找到子问题 和重叠子问题

//能不用滑动窗口就不要用滑动窗口 , 用队列都好一点

func maxProduct(nums []int) int {
	if len(nums)==0 {
		return 0
	}
	dp:=make([][2]int,len(nums))
	dp[0][0]=nums[0]
	dp[0][1]=nums[0]

	mx:=dp[0][0]

	for i:=1;i<len(nums);i++ {
		dp[i][0]=min(min(dp[i-1][0]*nums[i],dp[i-1][1]*nums[i]),nums[i])
		dp[i][1]=max(max(dp[i-1][0]*nums[i],dp[i-1][1]*nums[i]),nums[i])

		mx=max(dp[i][0],mx)
		mx=max(dp[i][1],mx)
	}
	return mx
}

func max(i,j int) int {
	if i>j {
		return i
	}
	return j
}
func min(i,j int) int {
	if i<j {
		return i
	}
	return j
}



//糟糕的面向测试用例编程经历 , 没写对
//滑动窗口容易写错 , 能用 DP 就 DP 吧 , 用队列也好写一点

//Input: nums = [2,3,-2,4]
//Output: 6
//Explanation: [2,3] has the largest product 6.
func maxProductWrong(nums []int) int {
	l:=0
	r:=-1

	currProduct:=1
	maxP:=1
	isFirstInQueue:=true

	for r+1<len(nums) {
		r++
		//驱逐元素为入队做准备
		//如果新元素入队后,乘积变小 , 全部驱逐掉
		if (currProduct*nums[r]<currProduct && !isFirstInQueue) || (nums[r]>0 && currProduct==0) {
			for l<r {
				if nums[l]!=0 {
					currProduct/=nums[l]
				} else {
					currProduct=1
				}
				l++
			}
		}
		//入队
		currProduct*=nums[r]
		if currProduct>maxP || isFirstInQueue {
			maxP=currProduct
		}
		if isFirstInQueue {
			isFirstInQueue=false
		}

	}
	return maxP
}
