和 jump-game ii 差不多,  dp[i] 保存从 i 点是否能到达终点
func canJump(nums []int) bool {
    // dp[4]=true  dp[3] = dp(1~nums[i]) 
    
    dp:=make([]bool,len(nums))
    dp[len(nums)-1]=true
    
    for i:=len(nums)-2;i>=0;i-- {
        
        for j:=1;j<=nums[i];j++ {
            if dp[i+j]==true {
                dp[i]=true
                break
            }
        }
    }
    return dp[0]
    
    
}