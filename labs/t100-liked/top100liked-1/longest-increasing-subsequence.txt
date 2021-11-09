//Example 1:
//
//Input: nums = [10,9,2,5,3,7,101,18]
//Output: 4
//Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
//Example 2:
//
//Input: nums = [0,1,0,3,2,3]
//Output: 4
//Example 3:
//
//Input: nums = [7,7,7,7,7,7,7]
//Output: 1

// dp i = which nums i-1 ~ nums 0  < nums i , take max dp[0~i-1] +1
func main() {
	n:=[]int{7,7,7,7,7,7,7}
	fmt.Println(lengthOfLIS(n))

}

func lengthOfLIS(nums []int) int {
	dp:=make([]int,len(nums)+1)

	for i:=0;i<len(nums);i++ {
		max:=0
		for j:=0;j<i;j++ {
			if nums[j]<nums[i] {
				if dp[j]>max {
					max=dp[j]
				}
			}
		}
		dp[i]=max+1
	}
	res:=0
	for _,v:=range dp {
		if v>res {
			res=v
		}
	}
	return res
}
