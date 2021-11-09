错误再犯, 变量名乱命名, 导致写错位置  
DP 的初始值问题 , 也是有含义的 ,  比如这里 , 最大值表示不可替换 , 也是容易出错的环节 , 但是多走几个 case 应该能碰到

//Input: coins = [1,2,5], amount = 11
//Output: 3
//Explanation: 11 = 5 + 5 + 1
/*
dp[0]=0
dp[1]=1
dp[2]=1
dp[3] = min(dp[i-1 -2 -5] +1 )

 */
func coinChange(coins []int, amount int) int {

	dp:=make([]int,amount+1)

	for i:=1;i<=amount;i++ {
		min:=math.MaxInt64
		for _,coin:=range coins {
			idx:=i-coin
			if idx>=0 && dp[idx]!=math.MaxInt64 {
				if dp[idx]+1 < min {     // idx 写成 i
					min=dp[idx]+1     //idx 写成 i
				}
			}
		}
		dp[i]=min
	}
	if dp[amount]!=math.MaxInt64 {
		return dp[amount]
	}

	return -1
}